import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/7be9537d-ab6a-41af-9ae9-cebffc6ceb59';
const outDir = 'c:/Users/HP/OneDrive/Desktop/BuildIt3/Website/zapledge-website/public/images/blog-images';

const img = {
  src: path.join(brainDir, 'blog_sense_decide_act_1790585846199.jpg'),
  destWebp: path.join(outDir, 'ai-automation-sense-decide-act.webp'),
  destJpg: path.join(outDir, 'ai-automation-sense-decide-act.jpg'),
};

async function convert() {
  if (!fs.existsSync(img.src)) {
    console.error(`Source not found: ${img.src}`);
    return;
  }
  await sharp(img.src).webp({ quality: 90 }).toFile(img.destWebp);
  console.log(`Saved: ${img.destWebp}`);
  await sharp(img.src).jpeg({ quality: 92 }).toFile(img.destJpg);
  console.log(`Saved: ${img.destJpg}`);
}

convert().catch(console.error);
