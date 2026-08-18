const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, '../public/portofolio/santap');

const files = [
  'thumbnails-santap',
  'galeri_santap_1',
  'galeri_santap_2',
  'galeri_santap_3'
];

async function convert() {
  for (const name of files) {
    const pngPath = path.join(dir, `${name}.png`);
    const avifPath = path.join(dir, `${name}.avif`);
    
    if (fs.existsSync(pngPath)) {
      console.log(`Converting ${name}.png -> ${name}.avif...`);
      await sharp(pngPath)
        .avif({ quality: 90, effort: 6 })
        .toFile(avifPath + '.tmp');
      
      fs.renameSync(avifPath + '.tmp', avifPath);
      const pngStat = fs.statSync(pngPath);
      const avifStat = fs.statSync(avifPath);
      console.log(`Finished ${name}.avif: PNG (${pngStat.size} B) -> AVIF (${avifStat.size} B)`);
    } else {
      console.warn(`File not found: ${pngPath}`);
    }
  }
}

convert().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
