import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:/Users/USER/.gemini/antigravity-ide/brain/2e66e541-3fa0-42f2-a13b-8c5d1a4085da';

// 1. Process AgriNuclear generated images to AVIF
const agrinuklirGen = {
  thumbnail: path.join(ARTIFACT_DIR, 'thumbnails_agrinuclear_gen_1787018683035.jpg'),
  galeri1: path.join(ARTIFACT_DIR, 'galeri_agrinuclear_1_gen_1787018701782.jpg'),
  galeri2: path.join(ARTIFACT_DIR, 'galeri_agrinuclear_2_gen_1787018723032.jpg'),
  galeri3: path.join(ARTIFACT_DIR, 'galeri_agrinuclear_3_gen_1787018861584.jpg'),
};

const ruangnuGen = {
  thumbnail: path.join(ARTIFACT_DIR, 'thumbnails_ruangnu_gen_1787019914988.jpg'),
  galeri1: path.join(ARTIFACT_DIR, 'galeri_ruangnu_1_gen_1787019929899.jpg'),
};

async function processGenImages() {
  console.log('--- Processing Generated Images ---');
  
  // AgriNuclear
  await sharp(agrinuklirGen.thumbnail).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/agrinuklir/thumbnails-agrinuclear.avif');
  await sharp(agrinuklirGen.galeri1).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/agrinuklir/galeri_agrinuclear_1.avif');
  await sharp(agrinuklirGen.galeri2).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/agrinuklir/galeri_agrinuclear_2.avif');
  await sharp(agrinuklirGen.galeri3).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/agrinuklir/galeri_agrinuclear_3.avif');
  console.log('Processed AgriNuclear images!');

  // RuangNU (Thumbnail & Gallery 1)
  await sharp(ruangnuGen.thumbnail).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/ruangnu/thumbnails-ruangnu.avif');
  await sharp(ruangnuGen.galeri1).resize(1536, 1024, { fit: 'cover' }).avif({ quality: 85 }).toFile('public/portofolio/ruangnu/galeri_ruangnu_1.avif');
  console.log('Processed RuangNU thumbnail & gallery 1!');
}

processGenImages().catch(console.error);
