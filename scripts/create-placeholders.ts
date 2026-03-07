import fs from 'fs';
import path from 'path';

const productosDir = './public/productos';

// Productos que necesitan placeholder
const placeholders = [
  { name: 'toothpaste', label: 'Toothpaste', color: '#4ade80' },
  { name: 'absolute-hair-care', label: 'Absolute Hair Care', color: '#22d3ee' },
  { name: 'hair-body-set', label: 'Hair & Body Set', color: '#2dd4bf' },
  { name: 'scalpcare-set', label: 'Scalpcare Set', color: '#14b8a6' },
  { name: 'scalpcare-conditioner', label: 'Scalpcare Conditioner', color: '#0891b2' },
  { name: 'sugar-body-scrub', label: 'Sugar Body Scrub', color: '#f59e0b' },
  { name: 'organic-noni', label: 'Organic Noni', color: '#22c55e' }
];

function createSVG(label: string, color: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="${color}" opacity="0.2"/>
  <rect x="40" y="40" width="320" height="320" rx="20" fill="${color}" opacity="0.3"/>
  <text x="200" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#333">${label}</text>
  <text x="200" y="220" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#666">Atomy Product</text>
</svg>`;
}

// Create placeholders
for (const p of placeholders) {
  const outputPath = path.join(productosDir, `${p.name}.svg`);
  if (!fs.existsSync(outputPath)) {
    const svg = createSVG(p.label, p.color);
    fs.writeFileSync(outputPath, svg);
    console.log(`✓ Created placeholder: ${p.name}.svg`);
  } else {
    console.log(`→ Skipping: ${p.name}.svg (exists)`);
  }
}

console.log('\n✅ Placeholders created!');
