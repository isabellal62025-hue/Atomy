import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const uploadDir = './upload';

// Imágenes más recientes (PNG)
const recentImages = [
  'pasted_image_1772653045460.png',
  'pasted_image_1772654713941.png',
  'pasted_image_1772654759165.png',
  'pasted_image_1772655746650.png',
  'pasted_image_1772656662122.png',
  'pasted_image_1772657351912.png',
  'pasted_image_1772658194175.png',
];

async function analyzeImages() {
  const zai = await ZAI.create();

  for (const imgName of recentImages) {
    const imgPath = path.join(uploadDir, imgName);
    
    if (!fs.existsSync(imgPath)) {
      console.log(`✗ No existe: ${imgName}`);
      continue;
    }

    try {
      const imageBuffer = fs.readFileSync(imgPath);
      const base64Image = imageBuffer.toString('base64');

      const response = await zai.chat.completions.createVision({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: '¿Qué producto Atomy es este? Responde solo con el nombre del producto en inglés, sin explicación. Por ejemplo: "Toothpaste" o "HemoHIM"'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/png;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        thinking: { type: 'disabled' }
      });

      const product = response.choices[0]?.message?.content?.trim();
      console.log(`${imgName} -> ${product}`);
    } catch (error) {
      console.log(`✗ Error: ${imgName}`);
    }
  }
}

analyzeImages().finally(() => process.exit(0));
