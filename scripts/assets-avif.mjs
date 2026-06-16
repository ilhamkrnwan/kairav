#!/usr/bin/env node

import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fg from 'fast-glob';
import fs from 'fs-extra';
import pc from 'picocolors';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');
const ARTIFACT_DIR = path.join(ROOT_DIR, '.asset-conversion');
const MANIFEST_PATH = path.join(ARTIFACT_DIR, 'assets-avif-manifest.json');
const LOG_PATH = path.join(ARTIFACT_DIR, 'assets-avif.log');
const CLOUDINARY_FOLDER = 'kairav-assets-conversion';

const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const SOURCE_FILE_GLOBS = ['**/*.{astro,tsx,ts,js,vue,md,mdx,json,css}'];
const SOURCE_FILE_IGNORES = [
  '.asset-conversion/**',
  '.git/**',
  '.nuxt/**',
  '.output/**',
  '.data/**',
  'dist/**',
  'node_modules/**',
  'public/**',
  'pnpm-lock.yaml',
  'package-lock.json',
  'yarn.lock',
  'bun.lockb',
];

const args = process.argv.slice(2);
const command = args.find((arg) => !arg.startsWith('-')) || 'convert';
const flags = new Set(args.filter((arg) => arg.startsWith('-')));
const valueFlags = new Map(
  args
    .filter((arg) => arg.startsWith('--') && arg.includes('='))
    .map((arg) => {
      const [key, ...valueParts] = arg.split('=');
      return [key, valueParts.join('=')];
    }),
);
const dryRun = flags.has('--dry-run');
const force = flags.has('--force');
const yes = flags.has('--yes');
const allowDirty = flags.has('--allow-dirty');
const updateRefs = flags.has('--update-references') || flags.has('--update-refs');
const cleanupAfterConvert = flags.has('--cleanup');
const avifQuality = valueFlags.get('--quality') || process.env.ASSETS_AVIF_QUALITY || 'auto:eco';
const maxWidth = Number(valueFlags.get('--max-width') || process.env.ASSETS_AVIF_MAX_WIDTH || 0);

const logLines = [];

dotenv.config({ path: path.join(ROOT_DIR, '.env.local'), quiet: true });
dotenv.config({ path: path.join(ROOT_DIR, '.env'), quiet: true });

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function publicUrl(relPath) {
  return `/${toPosix(relPath)}`;
}

function avifRelPath(relPath) {
  const posixPath = toPosix(relPath);
  return posixPath.replace(/\.[^.]+$/, '.avif');
}

function bytes(value) {
  if (!Number.isFinite(value)) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = value;
  let unit = 0;

  while (size >= 1024 && unit < units.length - 1) {
    size /= 1024;
    unit += 1;
  }

  return `${size.toFixed(unit === 0 ? 0 : 2)} ${units[unit]}`;
}

function log(message) {
  console.log(message);
  logLines.push(message.replace(/\u001b\[[0-9;]*m/g, ''));
}

function parseEnv() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const missing = [
    ['CLOUDINARY_CLOUD_NAME', cloudName],
    ['CLOUDINARY_API_KEY', apiKey],
    ['CLOUDINARY_API_SECRET', apiSecret],
  ].filter(([, value]) => !value);

  if (missing.length > 0) {
    throw new Error(
      `Missing Cloudinary env: ${missing.map(([name]) => name).join(', ')}. Add them to .env.local.`,
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

function formatErrorDetail(error) {
  if (error?.message) {
    return error.message;
  }

  if (error?.error?.message) {
    return error.error.message;
  }

  if (error?.http_code || error?.name) {
    return [error.http_code ? `HTTP ${error.http_code}` : null, error.name].filter(Boolean).join(' ');
  }

  return 'Cloudinary SDK did not return a detailed error message.';
}

async function assertCloudinaryCredentials() {
  try {
    await cloudinary.api.ping();
  } catch (error) {
    throw new Error(
      `Cloudinary auth check failed before upload. Check that CLOUDINARY_CLOUD_NAME is the product environment/cloud name and CLOUDINARY_API_SECRET is the actual API secret for the same API key. Detail: ${formatErrorDetail(error)}`,
    );
  }
}

function shouldSkip(relPath, size) {
  const posixPath = toPosix(relPath);
  const lowerPath = posixPath.toLowerCase();
  const segments = lowerPath.split('/');
  const basename = path.posix.basename(lowerPath);
  const ext = path.posix.extname(lowerPath);

  if (!SOURCE_EXTENSIONS.has(ext)) {
    return 'not-target-image';
  }

  if (segments.includes('sound-effect')) {
    return 'excluded-folder';
  }

  if (basename === 'favicon.ico' || basename === 'favicon.png' || basename.includes('favicon')) {
    return 'favicon';
  }

  if (segments.includes('logo')) {
    return null;
  }

  if (basename === 'profile-blck.webp' || basename === 'placeholder.webp') {
    return null;
  }

  if (basename.includes('placeholder')) {
    return 'ui-placeholder';
  }

  if (/(^|[-_])(icon|logo)([-_.]|$)/.test(basename)) {
    return 'icon-or-logo-name';
  }

  const alwaysConvertFolders = ['portofolio/', 'portfolio/', 'gallery/', 'blog/'];
  const isPrimaryAsset = alwaysConvertFolders.some((folder) => lowerPath.startsWith(folder));

  if (!isPrimaryAsset && size < 32 * 1024) {
    return 'small-ui-asset';
  }

  return null;
}

async function discoverPublicImages() {
  const files = await fg(['**/*'], {
    cwd: PUBLIC_DIR,
    dot: false,
    onlyFiles: true,
    unique: true,
  });

  const records = [];

  for (const relPath of files.sort()) {
    const absPath = path.join(PUBLIC_DIR, relPath);
    const stat = await fs.stat(absPath);
    const ext = path.extname(relPath).toLowerCase();
    const targetRel = avifRelPath(relPath);
    const targetAbs = path.join(PUBLIC_DIR, targetRel);
    const skipReason = shouldSkip(relPath, stat.size);

    records.push({
      source: `public/${toPosix(relPath)}`,
      target: `public/${targetRel}`,
      sourceRel: toPosix(relPath),
      targetRel,
      sourceUrl: publicUrl(relPath),
      targetUrl: publicUrl(targetRel),
      extension: ext,
      bytesIn: stat.size,
      bytesOut: null,
      status: skipReason ? 'skipped' : 'candidate',
      reason: skipReason,
      convertedAt: null,
      referenceUpdates: 0,
      error: null,
      sourceExists: true,
      targetExists: await fs.pathExists(targetAbs),
    });
  }

  const duplicateGroups = records
    .filter((record) => record.status === 'candidate')
    .reduce((groups, record) => {
      groups.set(record.targetRel, [...(groups.get(record.targetRel) || []), record]);
      return groups;
    }, new Map());

  for (const group of duplicateGroups.values()) {
    if (group.length <= 1) {
      continue;
    }

    const [preferred, ...aliases] = group.sort((a, b) => b.bytesIn - a.bytesIn);
    preferred.reason = 'duplicate-target-source';

    for (const alias of aliases) {
      alias.status = 'alias';
      alias.reason = `duplicate-target:${preferred.source}`;
    }
  }

  return records;
}

function hashFile(buffer) {
  return crypto.createHash('sha1').update(buffer).digest('hex').slice(0, 10);
}

function cloudinaryPublicId(relPath, sourceBuffer) {
  const withoutExt = toPosix(relPath).replace(/\.[^.]+$/, '');
  const safePath = withoutExt
    .split('/')
    .map((part) => part.replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '') || 'asset')
    .join('/');

  return `${CLOUDINARY_FOLDER}/${safePath}-${hashFile(sourceBuffer)}`;
}

async function fetchAvif(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'image/avif,image/*;q=0.8,*/*;q=0.1',
    },
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(`Cloudinary transform failed: ${response.status} ${response.statusText} ${body.slice(0, 160)}`);
  }

  const contentType = response.headers.get('content-type') || '';
  const buffer = Buffer.from(await response.arrayBuffer());

  if (buffer.length === 0) {
    throw new Error('Cloudinary returned an empty AVIF response.');
  }

  if (!contentType.includes('image')) {
    throw new Error(`Cloudinary returned non-image content: ${contentType}`);
  }

  return buffer;
}

async function convertRecord(record) {
  const sourceAbs = path.join(PUBLIC_DIR, record.sourceRel);
  const targetAbs = path.join(PUBLIC_DIR, record.targetRel);
  const targetExists = await fs.pathExists(targetAbs);

  if (targetExists && !force) {
    const targetStat = await fs.stat(targetAbs);
    return {
      ...record,
      bytesOut: targetStat.size,
      status: 'exists',
      reason: 'target-avif-exists',
      targetExists: true,
    };
  }

  const sourceBuffer = await fs.readFile(sourceAbs);
  const publicId = cloudinaryPublicId(record.sourceRel, sourceBuffer);

  let uploaded = false;

  try {
    await cloudinary.uploader.upload(sourceAbs, {
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      invalidate: true,
    });
    uploaded = true;

    const transformedUrl = cloudinary.url(publicId, {
      resource_type: 'image',
      secure: true,
      fetch_format: 'avif',
      quality: avifQuality,
      ...(Number.isFinite(maxWidth) && maxWidth > 0 ? { width: maxWidth, crop: 'limit' } : {}),
    });
    const avifBuffer = await fetchAvif(transformedUrl);

    await fs.ensureDir(path.dirname(targetAbs));
    await fs.writeFile(`${targetAbs}.tmp`, avifBuffer);
    await fs.move(`${targetAbs}.tmp`, targetAbs, { overwrite: true });

    return {
      ...record,
      bytesOut: avifBuffer.length,
      status: 'converted',
      reason: null,
      convertedAt: new Date().toISOString(),
      targetExists: true,
    };
  } finally {
    if (uploaded) {
      await cloudinary.uploader.destroy(publicId, {
        resource_type: 'image',
        invalidate: true,
      }).catch((error) => {
        log(pc.yellow(`Cloudinary temp cleanup failed for ${record.source}: ${error.message}`));
      });
    }
  }
}

function buildManifest(records, referenceSummary = null) {
  const totals = records.reduce(
    (acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      if (record.status === 'converted') {
        acc.bytesIn += record.bytesIn || 0;
        acc.bytesOut += record.bytesOut || 0;
      }
      return acc;
    },
    { bytesIn: 0, bytesOut: 0 },
  );

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    cloudinaryFolder: CLOUDINARY_FOLDER,
    publicDir: 'public',
    rules: {
      sourceExtensions: [...SOURCE_EXTENSIONS],
      cloudinaryQuality: avifQuality,
      maxWidth: Number.isFinite(maxWidth) && maxWidth > 0 ? maxWidth : null,
      excludedFolders: ['sound-effect'],
      excludedNames: ['favicon.*', '*icon*', '*logo*'],
      smallUiAssetThresholdBytes: 32768,
      alwaysConvertFolders: ['public/portofolio', 'public/portfolio', 'public/gallery', 'public/blog'],
    },
    totals,
    referenceSummary,
    files: records,
  };
}

async function writeArtifacts(manifest) {
  await fs.ensureDir(ARTIFACT_DIR);
  await fs.writeJson(MANIFEST_PATH, manifest, { spaces: 2 });
  await fs.writeFile(LOG_PATH, `${logLines.join('\n')}\n`);
}

function conversionEntries(manifest) {
  return manifest.files.filter((record) => {
    return ['converted', 'exists', 'alias'].includes(record.status) && record.sourceRel && record.targetRel;
  });
}

function countOccurrences(input, needle) {
  if (!needle) {
    return 0;
  }

  let count = 0;
  let offset = 0;

  while (true) {
    const index = input.indexOf(needle, offset);
    if (index === -1) {
      return count;
    }

    count += 1;
    offset = index + needle.length;
  }
}

function replaceAllLiteral(input, needle, replacement) {
  return input.split(needle).join(replacement);
}

function applyPortfolioDynamicRewrites(repoRel, input, hasPortfolioEntries) {
  if (!hasPortfolioEntries || toPosix(repoRel) !== 'app/pages/portofolio/[...slug].vue') {
    return { text: input, count: 0 };
  }

  let text = input;
  let count = 0;
  const replacements = [
    ['1.webp', '1.avif'],
    ['2.webp', '2.avif'],
    ['3.webp', '3.avif'],
    ['\\.webp', '\\.(?:avif|webp|png|jpe?g)'],
  ];

  for (const [needle, replacement] of replacements) {
    const occurrences = countOccurrences(text, needle);
    if (occurrences > 0) {
      text = replaceAllLiteral(text, needle, replacement);
      count += occurrences;
    }
  }

  return { text, count };
}

async function sourceFiles() {
  return fg(SOURCE_FILE_GLOBS, {
    cwd: ROOT_DIR,
    dot: false,
    onlyFiles: true,
    unique: true,
    ignore: SOURCE_FILE_IGNORES,
  });
}

async function updateReferences(manifest, options = {}) {
  const entries = conversionEntries(manifest).filter((record) => record.targetExists || fs.existsSync(path.join(PUBLIC_DIR, record.targetRel)));
  const hasPortfolioEntries = entries.some((record) => record.sourceRel.startsWith('portofolio/'));
  const mappings = entries
    .flatMap((record) => [
      [record.sourceUrl, record.targetUrl, record],
      [record.sourceRel, record.targetRel, record],
      [`public/${record.sourceRel}`, `public/${record.targetRel}`, record],
    ])
    .sort((a, b) => b[0].length - a[0].length);

  const files = await sourceFiles();
  const changedFiles = [];
  let totalUpdates = 0;

  for (const repoRel of files) {
    const absPath = path.join(ROOT_DIR, repoRel);
    const original = await fs.readFile(absPath, 'utf8');
    let next = original;
    let count = 0;

    for (const [needle, replacement, record] of mappings) {
      const occurrences = countOccurrences(next, needle);
      if (occurrences > 0) {
        next = replaceAllLiteral(next, needle, replacement);
        record.referenceUpdates += occurrences;
        count += occurrences;
      }
    }

    const dynamicRewrite = applyPortfolioDynamicRewrites(repoRel, next, hasPortfolioEntries);
    next = dynamicRewrite.text;
    count += dynamicRewrite.count;

    if (next !== original) {
      changedFiles.push({ file: repoRel, updates: count });
      totalUpdates += count;

      if (!options.dryRun) {
        await fs.writeFile(absPath, next);
      }
    }
  }

  return { changedFiles, totalUpdates };
}

async function findLegacyReferences(manifest) {
  const entries = conversionEntries(manifest);
  const needles = entries.flatMap((record) => [
    record.sourceUrl,
    record.sourceRel,
    `public/${record.sourceRel}`,
    record.sourceRel.startsWith('portofolio/') ? `\${imagePath}/${path.posix.basename(record.sourceRel)}` : null,
  ]).filter(Boolean);
  const files = await sourceFiles();
  const references = [];

  for (const repoRel of files) {
    const absPath = path.join(ROOT_DIR, repoRel);
    const text = await fs.readFile(absPath, 'utf8');

    for (const needle of needles) {
      if (text.includes(needle)) {
        references.push({ file: repoRel, needle });
      }
    }
  }

  return references;
}

function ensureCleanForCleanup() {
  if (allowDirty || !yes) {
    return;
  }

  const output = execFileSync('git', ['status', '--porcelain'], {
    cwd: ROOT_DIR,
    encoding: 'utf8',
  });

  if (output.trim()) {
    throw new Error(
      'Cleanup refused because the working tree is dirty. Commit the converted state first, or rerun with --allow-dirty.',
    );
  }
}

async function cleanupOldImages(manifest, options = {}) {
  ensureCleanForCleanup();

  const legacyReferences = await findLegacyReferences(manifest);
  const referencedNeedles = new Set(legacyReferences.map((item) => item.needle));
  const removed = [];
  const skipped = [];

  for (const record of conversionEntries(manifest)) {
    const sourceAbs = path.join(PUBLIC_DIR, record.sourceRel);
    const targetAbs = path.join(PUBLIC_DIR, record.targetRel);
    const sourceExists = await fs.pathExists(sourceAbs);
    const targetExists = await fs.pathExists(targetAbs);
    const possibleNeedles = [
      record.sourceUrl,
      record.sourceRel,
      `public/${record.sourceRel}`,
      record.sourceRel.startsWith('portofolio/') ? `\${imagePath}/${path.posix.basename(record.sourceRel)}` : null,
    ].filter(Boolean);

    if (!sourceExists) {
      skipped.push({ source: record.source, reason: 'source-missing' });
      continue;
    }

    if (!targetExists) {
      skipped.push({ source: record.source, reason: 'target-avif-missing' });
      continue;
    }

    if (possibleNeedles.some((needle) => referencedNeedles.has(needle))) {
      skipped.push({ source: record.source, reason: 'still-referenced' });
      continue;
    }

    removed.push(record.source);

    if (!options.dryRun) {
      await fs.remove(sourceAbs);
    }
  }

  return { removed, skipped, legacyReferences };
}

async function readManifest() {
  if (!(await fs.pathExists(MANIFEST_PATH))) {
    throw new Error(`Manifest not found at ${toPosix(path.relative(ROOT_DIR, MANIFEST_PATH))}. Run convert first.`);
  }

  return fs.readJson(MANIFEST_PATH);
}

function printAudit(records) {
  const candidates = records.filter((record) => record.status === 'candidate');
  const aliases = records.filter((record) => record.status === 'alias');
  const skipped = records.filter((record) => record.status === 'skipped');
  const existing = candidates.filter((record) => record.targetExists);

  log(pc.bold('Asset audit'));
  log(`Candidates: ${candidates.length}`);
  log(`Duplicate-target aliases: ${aliases.length}`);
  log(`Existing AVIF targets: ${existing.length}`);
  log(`Skipped: ${skipped.length}`);
  log(`Candidate input size: ${bytes(candidates.reduce((sum, record) => sum + record.bytesIn, 0))}`);

  const skippedByReason = skipped.reduce((acc, record) => {
    acc[record.reason] = (acc[record.reason] || 0) + 1;
    return acc;
  }, {});

  for (const [reason, count] of Object.entries(skippedByReason).sort()) {
    log(`  skipped ${reason}: ${count}`);
  }
}

function printConvertSummary(records, referenceSummary = null) {
  const converted = records.filter((record) => record.status === 'converted');
  const exists = records.filter((record) => record.status === 'exists');
  const aliases = records.filter((record) => record.status === 'alias');
  const failed = records.filter((record) => record.status === 'failed');
  const skipped = records.filter((record) => record.status === 'skipped');

  log(pc.bold('Conversion summary'));
  log(`Converted: ${converted.length}`);
  log(`Already existed: ${exists.length}`);
  log(`Duplicate-target aliases: ${aliases.length}`);
  log(`Skipped: ${skipped.length}`);
  log(`Failed: ${failed.length}`);

  if (converted.length > 0) {
    const bytesIn = converted.reduce((sum, record) => sum + (record.bytesIn || 0), 0);
    const bytesOut = converted.reduce((sum, record) => sum + (record.bytesOut || 0), 0);
    const saved = bytesIn > 0 ? ((1 - bytesOut / bytesIn) * 100).toFixed(2) : '0.00';
    log(`Converted size: ${bytes(bytesIn)} -> ${bytes(bytesOut)} (${saved}% saved)`);
  }

  if (referenceSummary) {
    log(`Reference updates: ${referenceSummary.totalUpdates} in ${referenceSummary.changedFiles.length} files`);
  }

  if (failed.length > 0) {
    log(pc.red('Failed files:'));
    for (const record of failed) {
      log(`  ${record.source}: ${record.error}`);
    }
  }
}

async function runAudit() {
  const records = await discoverPublicImages();
  printAudit(records);
  const manifest = buildManifest(records);
  await writeArtifacts(manifest);
  log(`Manifest: ${toPosix(path.relative(ROOT_DIR, MANIFEST_PATH))}`);
  log(`Log: ${toPosix(path.relative(ROOT_DIR, LOG_PATH))}`);
}

async function runConvert() {
  const records = await discoverPublicImages();
  printAudit(records);

  if (dryRun) {
    const dryRunRecords = records.map((record) => {
      if (record.status !== 'candidate') {
        return record;
      }

      return {
        ...record,
        status: record.targetExists && !force ? 'exists' : 'dry-run',
        reason: record.targetExists && !force ? 'target-avif-exists' : 'dry-run',
      };
    });
    const manifest = buildManifest(dryRunRecords);
    printConvertSummary(dryRunRecords);
    await writeArtifacts(manifest);
    return;
  }

  parseEnv();
  await assertCloudinaryCredentials();

  const convertedRecords = [];

  for (const record of records) {
    if (record.status !== 'candidate') {
      if (record.status === 'alias') {
        log(`${pc.yellow('alias')} ${record.source} -> ${record.target}`);
      }

      convertedRecords.push(record);
      continue;
    }

    log(`${pc.cyan('convert')} ${record.source} -> ${record.target}`);

    try {
      const converted = await convertRecord(record);
      convertedRecords.push(converted);

      if (converted.status === 'converted') {
        log(`  ${pc.green('done')} ${bytes(converted.bytesIn)} -> ${bytes(converted.bytesOut)}`);
      } else {
        log(`  ${pc.yellow('skip')} ${converted.reason}`);
      }
    } catch (error) {
      convertedRecords.push({
        ...record,
        status: 'failed',
        reason: 'conversion-failed',
        error: error.message,
      });
      log(`  ${pc.red('failed')} ${error.message}`);
    }
  }

  let manifest = buildManifest(convertedRecords);
  let referenceSummary = null;

  if (updateRefs) {
    referenceSummary = await updateReferences(manifest);
    manifest = buildManifest(convertedRecords, referenceSummary);
  }

  printConvertSummary(convertedRecords, referenceSummary);
  await writeArtifacts(manifest);

  if (cleanupAfterConvert) {
    const cleanupSummary = await cleanupOldImages(manifest, { dryRun: !yes });
    log(pc.bold('Cleanup summary'));
    log(`${yes ? 'Removed' : 'Would remove'}: ${cleanupSummary.removed.length}`);
    log(`Skipped cleanup: ${cleanupSummary.skipped.length}`);
    await writeArtifacts(buildManifest(convertedRecords, referenceSummary));
  }
}

async function runUpdateReferences() {
  const manifest = await readManifest();
  const referenceSummary = await updateReferences(manifest, { dryRun });
  manifest.referenceSummary = referenceSummary;
  printConvertSummary(manifest.files, referenceSummary);

  if (!dryRun) {
    await writeArtifacts(manifest);
  }
}

async function runCleanup() {
  const manifest = await readManifest();
  const cleanupSummary = await cleanupOldImages(manifest, { dryRun: !yes || dryRun });
  const action = yes && !dryRun ? 'Removed' : 'Would remove';

  log(pc.bold('Cleanup summary'));
  log(`${action}: ${cleanupSummary.removed.length}`);
  log(`Skipped: ${cleanupSummary.skipped.length}`);
  log(`Legacy references found: ${cleanupSummary.legacyReferences.length}`);

  if (!yes || dryRun) {
    log(pc.yellow('Dry run only. Commit the converted state, then rerun with --yes to delete old sources.'));
  }

  if (cleanupSummary.legacyReferences.length > 0) {
    log(pc.yellow('Remaining legacy references:'));
    for (const item of cleanupSummary.legacyReferences.slice(0, 30)) {
      log(`  ${item.file}: ${item.needle}`);
    }
  }
}

async function runCheckLegacyReferences() {
  const manifest = await readManifest();
  const references = await findLegacyReferences(manifest);

  if (references.length === 0) {
    log(pc.green('No legacy image references found for converted manifest entries.'));
    return;
  }

  log(pc.yellow(`Legacy references found: ${references.length}`));
  for (const item of references) {
    log(`  ${item.file}: ${item.needle}`);
  }
}

async function main() {
  try {
    if (command === 'audit') {
      await runAudit();
    } else if (command === 'convert') {
      await runConvert();
    } else if (command === 'update-references' || command === 'update-refs') {
      await runUpdateReferences();
    } else if (command === 'cleanup') {
      await runCleanup();
    } else if (command === 'check-references') {
      await runCheckLegacyReferences();
    } else {
      throw new Error(`Unknown command "${command}". Use audit, convert, update-references, cleanup, or check-references.`);
    }
  } finally {
    if (logLines.length > 0 && (await fs.pathExists(ARTIFACT_DIR))) {
      await fs.writeFile(LOG_PATH, `${logLines.join('\n')}\n`);
    }
  }
}

main().catch(async (error) => {
  log(pc.red(error.message));
  await fs.ensureDir(ARTIFACT_DIR);
  await fs.writeFile(LOG_PATH, `${logLines.join('\n')}\n`);
  process.exitCode = 1;
});
