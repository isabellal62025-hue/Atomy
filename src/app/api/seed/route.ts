import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST() {
  try {
    // Solo crear videos y admin, NO tocar productos (se gestionan por separado)
    
    // Videos con los enlaces proporcionados
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
        productos: productosCount,
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
