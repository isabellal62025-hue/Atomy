import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // 1. Productos (Belleza, Cuidado Personal, Salud, Hogar)
    const productosData = [
      // BELLEZA
      { categoria: 'Belleza', badge: 'Absolute Skincare Set', imagen: '/productos/absolute-skincare-set.jpg', enlace: 'https://us.atomy.com/product/A00207', orden: 1 },
      { categoria: 'Belleza', badge: 'Evening Care 4 Set', imagen: '/productos/evening-care-4-set.jpg', enlace: 'https://us.atomy.com/product/A00355', orden: 2 },
      { categoria: 'Belleza', badge: 'Synergy Ampoule 3 Sets', imagen: '/productos/synergy-ampoule-3-sets.jpg', enlace: 'https://us.atomy.com/product/A06031', orden: 3 },
      { categoria: 'Belleza', badge: 'The Fame Set', imagen: '/productos/the-fame-set.jpg', enlace: 'https://us.atomy.com/product/A00003', orden: 4 },
      { categoria: 'Belleza', badge: 'Derma Real Cica Set', imagen: '/productos/derma-real-cica-set.jpg', enlace: 'https://us.atomy.com/product/A00759', orden: 5 },
      { categoria: 'Belleza', badge: 'Homme Skincare Set', imagen: '/productos/homme-skincare-set.jpg', enlace: 'https://us.atomy.com/product/A00749', orden: 6 },
      // CUIDADO PERSONAL
      { categoria: 'Cuidado Personal', badge: 'Toothpaste', imagen: '/productos/toothpaste.jpg', enlace: 'https://us.atomy.com/product/A00505', orden: 10 },
      { categoria: 'Cuidado Personal', badge: 'Absolute Hair Care Set', imagen: '/productos/absolute-hair-care.jpg', enlace: 'https://us.atomy.com/product/A00657', orden: 11 },
      { categoria: 'Cuidado Personal', badge: 'Hair & Body Set', imagen: '/productos/hair-body-set.jpg', enlace: 'https://us.atomy.com/product/A00655', orden: 12 },
      { categoria: 'Cuidado Personal', badge: 'Scalpcare Set', imagen: '/productos/scalpcare-set.jpg', enlace: 'https://us.atomy.com/product/A00693', orden: 13 },
      { categoria: 'Cuidado Personal', badge: 'Scalpcare Conditioner', imagen: '/productos/scalpcare-conditioner.jpg', enlace: 'https://us.atomy.com/product/A00692', orden: 14 },
      { categoria: 'Cuidado Personal', badge: 'Sugar Body Scrub', imagen: '/productos/sugar-body-scrub.jpg', enlace: 'https://us.atomy.com/product/A00488', orden: 15 },
      // SALUD
      { categoria: 'Salud', badge: 'HemoHIM PV Power-Up', imagen: '/productos/hemohim.jpg', enlace: 'https://us.atomy.com/product/A06629', orden: 20 },
      { categoria: 'Salud', badge: 'Health Care Best Kit', imagen: '/productos/health-care-kit.jpg', enlace: 'https://us.atomy.com/product/A06029', orden: 21 },
      { categoria: 'Salud', badge: 'Organic Fermented Noni 6 Set', imagen: '/productos/organic-noni.jpg', enlace: 'https://us.atomy.com/product/A06012', orden: 22 },
      { categoria: 'Salud', badge: 'Vital Mega Vitamin C 2000', imagen: '/productos/vitamin-c.jpg', enlace: 'https://us.atomy.com/product/A04030', orden: 23 },
      { categoria: 'Salud', badge: 'rTG Omega 3', imagen: '/productos/omega-3.jpg', enlace: 'https://us.atomy.com/product/A04041', orden: 24 },
      { categoria: 'Salud', badge: 'US Probiotics', imagen: '/productos/probiotics.jpg', enlace: 'https://us.atomy.com/product/A04011', orden: 25 },
      // HOGAR
      { categoria: 'Hogar', badge: 'Dishwashing Liquid', imagen: '/productos/dishwashing-liquid.jpg', enlace: 'https://us.atomy.com/product/A00801', orden: 30 },
      { categoria: 'Hogar', badge: 'Latex Gloves 2 Sets', imagen: '/productos/latex-gloves.jpg', enlace: 'https://us.atomy.com/product/A00833', orden: 31 },
      { categoria: 'Hogar', badge: 'Liquid Laundry Detergent', imagen: '/productos/liquid-laundry-detergent.jpg', enlace: 'https://us.atomy.com/product/A00861', orden: 32 },
      { categoria: 'Hogar', badge: 'Fabric Detergent', imagen: '/productos/fabric-detergent.jpg', enlace: 'https://us.atomy.com/product/A00828', orden: 33 },
      { categoria: 'Hogar', badge: 'Stainless Scrubber', imagen: '/productos/stainless-scrubber.jpg', enlace: 'https://us.atomy.com/product/A00835', orden: 34 },
      { categoria: 'Hogar', badge: 'Medi-Cook 5.4 L Wok', imagen: '/productos/medi-cook-wok.jpg', enlace: 'https://us.atomy.com/product/A00880', orden: 35 },
    ];

    // Limpiar y recrear productos
    await db.producto.deleteMany({});
    await db.producto.createMany({ data: productosData });

    // 2. Videos con los enlaces proporcionados
    const videosData = [
      { tipo: 'institucional', titulo: 'Atomy Institucional 2025', badge: 'Corporativo', url: 'https://drive.google.com/file/d/1AzfhK81iG-hSvNUgtQF2VjgVLnZ7LB97/view', descripcion: 'Nuestra visión y valores para el futuro del comercio global.', orden: 0 },
      { tipo: 'institucional', titulo: 'Plan de Marketing', badge: 'Negocio', url: 'https://drive.google.com/file/d/1Z7-Gfvf0iuQCvh_nn7imR02C02jFaxSW/view', descripcion: 'El sistema binario que democratiza el éxito empresarial.', orden: 1 },
      { tipo: 'institucional', titulo: 'El Poder de la Mente', badge: 'Corporativo', url: 'https://drive.google.com/file/d/1bXlaH60i4OY1RPKmHW_Tg8F1rYc_fbB_/view', descripcion: 'Han Gill Park, Presidente CEO de Atomy', orden: 2 },
      { tipo: 'testimonio', titulo: 'Marta Cabrera', badge: 'Diamond Master', url: 'https://drive.google.com/file/d/18md1mYEHfHJ0JIkbgHij_YyKHRjJYARn/view', descripcion: '', orden: 3 },
      { tipo: 'testimonio', titulo: 'Gustavo Zamora', badge: 'Líder Regional', url: 'https://drive.google.com/file/d/15NR8BQOyhDBhwdsQtSxGLEaBxPTwe6zS/view', descripcion: '', orden: 4 },
      { tipo: 'testimonio', titulo: 'Rosario Padilla', badge: 'Sales Master', url: 'https://drive.google.com/file/d/1nYDRn5ov0ZEjvlDs7BeoeF5x-gqsU2SP/view', descripcion: '', orden: 5 },
      { tipo: 'testimonio', titulo: 'Laura Ávalos', badge: 'Star Master', url: 'https://drive.google.com/file/d/1Wno31AFrxA1j9jsEQbzu2_rY1u59tIqQ/view', descripcion: '', orden: 6 },
      { tipo: 'testimonio', titulo: 'HemoHim', badge: 'Personal', url: 'https://drive.google.com/file/d/1dgOHB8dUoL5JbNrVwesIXm5Efyqw2pTc/view', descripcion: '', orden: 7 },
    ];

    // Eliminar y recrear solo videos
    await db.video.deleteMany({});
    await db.video.createMany({ data: videosData });

    // Verificar si existe admin
    const existingAdmin = await db.usuario.findFirst({ where: { usuario: 'admin' } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await db.usuario.create({
        data: {
          nombre: 'Administrador Global',
          usuario: 'admin',
          password: hashedPassword,
          rol: 'admin',
          dpi: 'MASTER'
        }
      });
    }

    // Contar productos existentes
    const productosCount = await db.producto.count();

    return NextResponse.json({
      success: true,
      message: 'Datos actualizados correctamente',
      data: {
        productos: productosData.length,
        videos: videosData.length,
        heroImage: 'https://drive.google.com/file/d/1Nt9E6SSfz_fcLmidTGi0ZSJyBmnL3YPR/view'
      }
    });
  } catch (error) {
    console.error('Error en seed:', error);
    return NextResponse.json(
      { success: false, message: 'Error al crear datos iniciales' },
      { status: 500 }
    );
  }
}
