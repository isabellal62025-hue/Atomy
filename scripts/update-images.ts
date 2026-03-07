import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const updates = [
    { badge: 'Toothpaste', imagen: 'toothpaste.jpg' },
    { badge: 'Absolute Hair Care Set', imagen: 'absolute-hair-care.jpg' },
    { badge: 'Hair & Body Set', imagen: 'hair-body-set.jpg' },
    { badge: 'Scalpcare Set', imagen: 'scalpcare-set.jpg' },
    { badge: 'Scalpcare Conditioner', imagen: 'scalpcare-conditioner.jpg' },
    { badge: 'Sugar Body Scrub', imagen: 'sugar-body-scrub.jpg' },
    { badge: 'Organic Fermented Noni 6 Set', imagen: 'organic-noni.jpg' },
  ];

  for (const update of updates) {
    const result = await prisma.producto.updateMany({
      where: { badge: update.badge },
      data: { imagen: update.imagen }
    });
    console.log(`Updated ${update.badge}: ${result.count} records`);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
