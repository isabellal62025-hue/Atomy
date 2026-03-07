import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const format = searchParams.get('format') || 'json';

    const registros = await db.registro.findMany({
      orderBy: { createdAt: 'desc' }
    });

    if (format === 'csv') {
      // Generar CSV
      const headers = [
        'Fecha', 'PatrocinadorNombre', 'PatrocinadorCodigo', 'Nombres', 'Apellidos',
        'DPI', 'Nacimiento', 'Telefono', 'Email', 'Direccion', 'Pais',
        'Departamento', 'Municipio', 'EstadoCivil', 'TipoMembresia',
        'NombreConyuge', 'DPIConyuge', 'Beneficiario', 'Usuario',
        'LinkDPIFrente', 'LinkDPIReverso', 'Estado'
      ];

      const rows = registros.map(r => [
        r.fecha.toISOString(),
        r.patrocinadorNombre,
        r.patrocinadorCodigo,
        r.nombres,
        r.apellidos,
        r.dpi,
        r.nacimiento,
        r.telefono,
        r.email,
        r.direccion,
        r.pais,
        r.departamento,
        r.municipio,
        r.estadoCivil,
        r.tipoMembresia,
        r.nombreConyuge || '',
        r.dpiConyuge || '',
        r.beneficiario ? 'SÍ' : 'NO',
        r.usuario,
        r.linkDPIFrente || '',
        r.linkDPIReverso || '',
        r.estado
      ]);

      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="registros_atomy.csv"'
        }
      });
    }

    return NextResponse.json({
      success: true,
      total: registros.length,
      registros: registros.map(r => ({
        id: r.id,
        fecha: r.fecha.toISOString(),
        patrocinadorNombre: r.patrocinadorNombre,
        patrocinadorCodigo: r.patrocinadorCodigo,
        nombres: r.nombres,
        apellidos: r.apellidos,
        dpi: r.dpi,
        nacimiento: r.nacimiento,
        telefono: r.telefono,
        email: r.email,
        direccion: r.direccion,
        pais: r.pais,
        departamento: r.departamento,
        municipio: r.municipio,
        estadoCivil: r.estadoCivil,
        tipoMembresia: r.tipoMembresia,
        nombreConyuge: r.nombreConyuge,
        dpiConyuge: r.dpiConyuge,
        beneficiario: r.beneficiario,
        usuario: r.usuario,
        linkDPIFrente: r.linkDPIFrente,
        linkDPIReverso: r.linkDPIReverso,
        estado: r.estado
      }))
    });
  } catch (error) {
    console.error('Error exportando datos:', error);
    return NextResponse.json(
      { success: false, message: 'Error al exportar datos' },
      { status: 500 }
    );
  }
}
