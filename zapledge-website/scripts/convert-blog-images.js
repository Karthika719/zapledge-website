import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const brainDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/7be9537d-ab6a-41af-9ae9-cebffc6ceb59';
const outDir = 'c:/Users/HP/OneDrive/Desktop/BuildIt3/Website/zapledge-website/public/images/blog-images';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const images = [
  {
    src: path.join(brainDir, 'blog_pricing_guide_1790581584383.jpg'),
    destWebp: path.join(outDir, 'ai-automation-cost-india.webp'),
    destJpg: path.join(outDir, 'ai-automation-cost-india.jpg'),
  },
  {
    src: path.join(brainDir, 'blog_ai_automation_guide_1790581608044.jpg'),
    destWebp: path.join(outDir, 'what-is-ai-automation.webp'),
    destJpg: path.join(outDir, 'what-is-ai-automation.jpg'),
  },
  {
    src: path.join(brainDir, 'blog_manual_workflows_1790581631072.jpg'),
    destWebp: path.join(outDir, 'signs-you-need-workflow-automation.webp'),
    destJpg: path.join(outDir, 'signs-you-need-workflow-automation.jpg'),
  },
  {
    src: path.join(brainDir, 'blog_ai_vs_traditional_1790581655507.jpg'),
    destWebp: path.join(outDir, 'ai-vs-traditional-software.webp'),
    destJpg: path.join(outDir, 'ai-vs-traditional-software.jpg'),
  },
];

async function convert() {
  for (const img of images) {
    if (!fs.existsSync(img.src)) {
      console.error(`Source not found: ${img.src}`);
      continue;
    }
    // Convert to webp with high quality
    await sharp(img.src)
      .webp({ quality: 88 })
      .toFile(img.destWebp);
    console.log(`Saved: ${img.destWebp}`);
    
    // Also save jpg backup just in case
    await sharp(img.src)
      .jpeg({ quality: 90 })
      .toFile(img.destJpg);
    console.log(`Saved: ${img.destJpg}`);
  }
}

convert().catch(console.error);
