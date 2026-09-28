import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/7be9537d-ab6a-41af-9ae9-cebffc6ceb59';
const outDir = 'c:/Users/HP/OneDrive/Desktop/BuildIt3/Website/zapledge-website/public/images/blog-images';

const newImages = [
  {
    src: path.join(brainDir, 'blog_pricing_chart_hero_1790583233072.jpg'),
    destWebp: path.join(outDir, 'ai-automation-pricing-tiers-chart.webp'),
    destJpg: path.join(outDir, 'ai-automation-pricing-tiers-chart.jpg'),
  },
  {
    src: path.join(brainDir, 'blog_data_cleanup_graphic_1790583207331.jpg'),
    destWebp: path.join(outDir, 'data-cleanup-pipeline.webp'),
    destJpg: path.join(outDir, 'data-cleanup-pipeline.jpg'),
  },
];

async function convert() {
  for (const img of newImages) {
    if (!fs.existsSync(img.src)) {
      console.error(`Source not found: ${img.src}`);
      continue;
    }
    await sharp(img.src)
      .webp({ quality: 90 })
      .toFile(img.destWebp);
    console.log(`Saved: ${img.destWebp}`);
    
    await sharp(img.src)
      .jpeg({ quality: 92 })
      .toFile(img.destJpg);
    console.log(`Saved: ${img.destJpg}`);
  }
}

convert().catch(console.error);
