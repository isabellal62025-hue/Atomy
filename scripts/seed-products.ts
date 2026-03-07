import { db } from '../src/lib/db';

async function seedAllProducts() {
  console.log('🌱 Creando productos...\n');

  // Eliminar productos existentes
  await db.producto.deleteMany({});
  console.log('Productos anteriores eliminados\n');

  const productos = [
    // BELLEZA (6 productos con imágenes)
    { categoria: 'Belleza', badge: 'Absolute Skincare Set', imagen: '/productos/absolute-skincare-set.jpg', enlace: 'https://us.atomy.com/product/A00207', orden: 1 },
    { categoria: 'Belleza', badge: 'Evening Care 4 Set', imagen: '/productos/evening-care-4-set.jpg', enlace: 'https://us.atomy.com/product/A00355', orden: 2 },
    { categoria: 'Belleza', badge: 'Synergy Ampoule 3 Sets', imagen: '/productos/synergy-ampoule-3-sets.jpg', enlace: 'https://us.atomy.com/product/A06031', orden: 3 },
    { categoria: 'Belleza', badge: 'The Fame Set', imagen: '/productos/the-fame-set.jpg', enlace: 'https://us.atomy.com/product/A00003', orden: 4 },
    { categoria: 'Belleza', badge: 'Derma Real Cica Set', imagen: '/productos/derma-real-cica-set.jpg', enlace: 'https://us.atomy.com/product/A00759', orden: 5 },
    { categoria: 'Belleza', badge: 'Homme Skincare Set', imagen: '/productos/homme-skincare-set.jpg', enlace: 'https://us.atomy.com/product/A00749', orden: 6 },

    // CUIDADO PERSONAL (6 productos)
    { categoria: 'Cuidado Personal', badge: 'Toothpaste', imagen: '/productos/toothpaste.svg', enlace: 'https://us.atomy.com/product/A00505', orden: 10 },
    { categoria: 'Cuidado Personal', badge: 'Absolute Hair Care Set', imagen: '/productos/absolute-hair-care.svg', enlace: 'https://us.atomy.com/product/A00657', orden: 11 },
    { categoria: 'Cuidado Personal', badge: 'Hair & Body Set', imagen: '/productos/hair-body-set.svg', enlace: 'https://us.atomy.com/product/A00655', orden: 12 },
    { categoria: 'Cuidado Personal', badge: 'Scalpcare Set', imagen: '/productos/scalpcare-set.svg', enlace: 'https://us.atomy.com/product/A00693', orden: 13 },
    { categoria: 'Cuidado Personal', badge: 'Scalpcare Conditioner', imagen: '/productos/scalpcare-conditioner.svg', enlace: 'https://us.atomy.com/product/A00692', orden: 14 },
    { categoria: 'Cuidado Personal', badge: 'Sugar Body Scrub', imagen: '/productos/sugar-body-scrub.svg', enlace: 'https://us.atomy.com/product/A00488', orden: 15 },

    // SALUD (6 productos con imágenes)
    { categoria: 'Salud', badge: 'HemoHIM PV Power-Up', imagen: '/productos/hemohim.jpg', enlace: 'https://us.atomy.com/product/A06629', orden: 20 },
    { categoria: 'Salud', badge: 'Health Care Best Kit', imagen: '/productos/health-care-kit.jpg', enlace: 'https://us.atomy.com/product/A06029', orden: 21 },
    { categoria: 'Salud', badge: 'Organic Fermented Noni 6 Set', imagen: '/productos/organic-noni.svg', enlace: 'https://us.atomy.com/product/A06012', orden: 22 },
    { categoria: 'Salud', badge: 'Vital Mega Vitamin C 2000', imagen: '/productos/vitamin-c.jpg', enlace: 'https://us.atomy.com/product/A04030', orden: 23 },
    { categoria: 'Salud', badge: 'rTG Omega 3', imagen: '/productos/omega-3.jpg', enlace: 'https://us.atomy.com/product/A04041', orden: 24 },
    { categoria: 'Salud', badge: 'US Probiotics', imagen: '/productos/probiotics.jpg', enlace: 'https://us.atomy.com/product/A04011', orden: 25 },

    // HOGAR (6 productos con imágenes)
    { categoria: 'Hogar', badge: 'Dishwashing Liquid', imagen: '/productos/dishwashing-liquid.jpg', enlace: 'https://us.atomy.com/product/A00801', orden: 30 },
    { categoria: 'Hogar', badge: 'Latex Gloves 2 Sets', imagen: '/productos/latex-gloves.jpg', enlace: 'https://us.atomy.com/product/A00833', orden: 31 },
    { categoria: 'Hogar', badge: 'Liquid Laundry Detergent', imagen: '/productos/liquid-laundry-detergent.jpg', enlace: 'https://us.atomy.com/product/A00861', orden: 32 },
    { categoria: 'Hogar', badge: 'Fabric Detergent', imagen: '/productos/fabric-detergent.jpg', enlace: 'https://us.atomy.com/product/A00828', orden: 33 },
    { categoria: 'Hogar', badge: 'Stainless Scrubber', imagen: '/productos/stainless-scrubber.jpg', enlace: 'https://us.atomy.com/product/A00835', orden: 34 },
    { categoria: 'Hogar', badge: 'Medi-Cook 5.4 L Wok', imagen: '/productos/medi-cook-wok.jpg', enlace: 'https://us.atomy.com/product/A00880', orden: 35 },
  ];

  // Crear todos los productos
  for (const producto of productos) {
    await db.producto.create({ data: producto });
    const img = producto.imagen.endsWith('.svg') ? '🎨' : '📷';
    console.log(`${img} ${producto.categoria}: ${producto.badge}`);
  }

  console.log(`\n✅ Total: ${productos.length} productos creados`);
}

seedAllProducts()
  .catch(console.error)
  .finally(() => process.exit(0));
