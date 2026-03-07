import { db } from '../src/lib/db';
import bcrypt from 'bcryptjs';

// Datos existentes del usuario
const registrosExistentes = [
  {
    fecha: new Date('2026-02-18T17:16:49'),
    patrocinadorNombre: 'Helaman Lopez',
    patrocinadorCodigo: '20669704',
    nombres: 'Daphnee Yasmin',
    apellidos: 'De Leon Tejeda',
    dpi: '1643715670115',
    nacimiento: '1983-05-30',
    telefono: '59845023',
    email: 'daphyy1973@gmail.com',
    direccion: '1ra ave L64 Apt. C Ciudad Palmares zona 0',
    pais: 'Guatemala',
    departamento: 'Escuintla',
    municipio: 'Escuintla',
    estadoCivil: 'Casada',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: '47317064',
    password: 'Botas2026@',
    linkDPIFrente: null,
    linkDPIReverso: null,
  },
  {
    fecha: new Date('2026-02-18T17:16:49'),
    patrocinadorNombre: 'Daphnee Yasmin De Leon Tejeda',
    patrocinadorCodigo: '47317064',
    nombres: 'WENDY GABRIELA',
    apellidos: 'VELIZ CASTELLANOS',
    dpi: '3238597120512',
    nacimiento: '1998-09-29',
    telefono: '41780779',
    email: '17veca@gmail.com',
    direccion: 'Escuintla',
    pais: 'Guatemala',
    departamento: 'Escuintla',
    municipio: 'Escuintla',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Consumidor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: 'G.Veliz1998',
    password: 'Gaby1998@',
    linkDPIFrente: 'https://drive.google.com/file/d/11m1zqEMFGknmPJlMc4PCPOe3myWhassv/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1zw9yAyvKrKox5FCA4dUnrnXJwi6emYC3/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-22T12:31:02'),
    patrocinadorNombre: 'Atenaida Burgos',
    patrocinadorCodigo: '16159442',
    nombres: 'Daniel',
    apellidos: 'Lucio',
    dpi: '1721440749',
    nacimiento: '1991-01-31',
    telefono: '793806219',
    email: 'dl@danilucio.com',
    direccion: 'Alma Lojana Monjas, S3C, E21-205 y E21C',
    pais: 'Ecuador',
    departamento: 'Quito',
    municipio: 'Quito',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: '162021714',
    password: 'LucioKapele5-',
    linkDPIFrente: 'https://drive.google.com/file/d/1HdJkPYsv7fa4xiP6Y-vIYvOt8VTamcmC/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1q9zwL_iDiwpMiD7v3plP9n30FdvYSprU/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-22T12:47:25'),
    patrocinadorNombre: 'Jean Robert',
    patrocinadorCodigo: '1525698',
    nombres: 'Atenaida',
    apellidos: 'Burgos',
    dpi: '1302481997',
    nacimiento: '1957-02-11',
    telefono: '593984251879',
    email: 'ateburgos@gmail.com',
    direccion: 'Los Esteros',
    pais: 'Ecuador',
    departamento: 'Manabí',
    municipio: 'Manta',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: 'A.B1957',
    password: 'Atenaida1957+',
    linkDPIFrente: 'https://drive.google.com/file/d/1rB6Jd7-U32zwmLktSKSd36YIk7MMExR7/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1x2-As0GJThlybO1ewVPgPnbaKn87I7iJ/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-22T15:09:28'),
    patrocinadorNombre: 'Piedad Haro',
    patrocinadorCodigo: '22091483',
    nombres: 'Bethy del Carmen',
    apellidos: 'Zambrano',
    dpi: '1306697515',
    nacimiento: '1973-05-21',
    telefono: '986787084',
    email: 'bethyzambrano94@gmail.com',
    direccion: 'Esmeraldas',
    pais: 'Ecuador',
    departamento: 'Emergencia',
    municipio: 'Viche',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Distribuidor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: '24996609',
    password: 'Gdiamant321@',
    linkDPIFrente: 'https://drive.google.com/file/d/1ITPJ8-63fN9bru4SZGoneRmx-MymPvhE/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1q7hplrE96_XQPXknPNeXUxc6e6vI2O-G/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-24T08:51:18'),
    patrocinadorNombre: 'Bethy del Carmen Zambrano',
    patrocinadorCodigo: '24996609',
    nombres: 'MARTHA CARMEN',
    apellidos: 'ZAMBRANO',
    dpi: '1305816165',
    nacimiento: '1975-07-22',
    telefono: '990623798',
    email: 'marcarmzam1975@gmail.com',
    direccion: 'Via Chones km 40',
    pais: 'Ecuador',
    departamento: 'Km 40',
    municipio: 'El Carmen',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: '31520291',
    password: 'Carma75$',
    linkDPIFrente: 'https://drive.google.com/file/d/18i0artQEbtPJ9ijaH-fHRBOATd1zTP33/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1YfUyig3JDwt6JZC6uZwwzRrStHxT2Q24/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-24T09:11:28'),
    patrocinadorNombre: 'Bethy del Carmen Zambrano',
    patrocinadorCodigo: '24996609',
    nombres: 'Betty Mariany',
    apellidos: 'Chilán Chilán',
    dpi: '908747496',
    nacimiento: '1960-11-01',
    telefono: '988124927',
    email: 'bettychilan60@gmail.com',
    direccion: 'Sarajevo y oslo',
    pais: 'Ecuador',
    departamento: 'Coop 9 de Dicirmbre',
    municipio: 'Santo Domingo de los Tsachilas',
    estadoCivil: 'Casado',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: 'Rene',
    dpiConyuge: '1302801558',
    beneficiario: true,
    usuario: '33045125',
    password: 'Bmarianch1@',
    linkDPIFrente: 'https://drive.google.com/file/d/1SJNZyTmWJeLxrMMZcy03eHLcZ8NQFQL9/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1yFYzGkMb5kduvC2LG1vLeuUGdBKvwBHf/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-02-27T12:07:22'),
    patrocinadorNombre: 'Irene Espinoza Cascante',
    patrocinadorCodigo: '47366081',
    nombres: 'Dillman',
    apellidos: 'Brenes Rodriguez',
    dpi: '302910422',
    nacimiento: '1967-07-10',
    telefono: '50660303630',
    email: 'dillmanarts@gmail.com',
    direccion: 'Tobosi de el Guarco (centro) Rancho Aegre',
    pais: 'Costa Rica',
    departamento: 'Cartago',
    municipio: 'Cartago',
    estadoCivil: 'Soltero',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: null,
    dpiConyuge: null,
    beneficiario: false,
    usuario: '47385844',
    password: 'Dillman2026@',
    linkDPIFrente: 'https://drive.google.com/file/d/1ochLppFiK7QGgzjtj4yTnjHAWehwXMcg/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/18JySNJSGTKitByPjj6X8yjDmry8hiHwX/view?usp=drivesdk',
  },
  {
    fecha: new Date('2026-03-02T16:12:26'),
    patrocinadorNombre: 'Atenaida Burgos',
    patrocinadorCodigo: '16159442',
    nombres: 'Franklin',
    apellidos: 'López',
    dpi: '1101442026',
    nacimiento: '1956-04-18',
    telefono: '593987256127',
    email: 'fels1802@hotmail.com',
    direccion: 'ManuS1658 y Catacocha',
    pais: 'Ecuador',
    departamento: 'Pichincha',
    municipio: 'Quito',
    estadoCivil: 'Casado',
    tipoMembresia: 'Emprendedor',
    nombreConyuge: 'Rosario Rivera',
    dpiConyuge: '1705478962',
    beneficiario: true,
    usuario: '33296674',
    password: 'Rosario1955@',
    linkDPIFrente: 'https://drive.google.com/file/d/1IIsKHT3xSRYHJoAZdSYXs5iADJr9uXXD/view?usp=drivesdk',
    linkDPIReverso: 'https://drive.google.com/file/d/1lT-uEVy64MV4T4u2nV4iR1cKTQDhPuqD/view?usp=drivesdk',
  },
];

async function importData() {
  console.log('🚀 Iniciando importación de datos...\n');

  for (const registro of registrosExistentes) {
    try {
      // Verificar si ya existe
      const existe = await db.registro.findFirst({
        where: { dpi: registro.dpi }
      });

      if (existe) {
        console.log(`⏭️  Ya existe: ${registro.nombres} ${registro.apellidos} (DPI: ${registro.dpi})`);
        continue;
      }

      // Hashear contraseña
      const hashedPassword = await bcrypt.hash(registro.password, 10);

      // Crear registro
      const nuevoRegistro = await db.registro.create({
        data: {
          fecha: registro.fecha,
          patrocinadorNombre: registro.patrocinadorNombre,
          patrocinadorCodigo: registro.patrocinadorCodigo,
          nombres: registro.nombres,
          apellidos: registro.apellidos,
          dpi: registro.dpi,
          nacimiento: registro.nacimiento,
          telefono: registro.telefono,
          email: registro.email,
          direccion: registro.direccion,
          pais: registro.pais,
          departamento: registro.departamento,
          municipio: registro.municipio,
          estadoCivil: registro.estadoCivil,
          tipoMembresia: registro.tipoMembresia,
          nombreConyuge: registro.nombreConyuge,
          dpiConyuge: registro.dpiConyuge,
          beneficiario: registro.beneficiario,
          usuario: registro.usuario,
          password: hashedPassword,
          linkDPIFrente: registro.linkDPIFrente,
          linkDPIReverso: registro.linkDPIReverso,
          estado: 'activo',
        }
      });

      // Crear usuario para login
      const rol = registro.tipoMembresia.toLowerCase().includes('emprendedor')
        ? 'emprendedor'
        : registro.tipoMembresia.toLowerCase().includes('distribuidor')
          ? 'distribuidor'
          : 'consumidor';

      await db.usuario.create({
        data: {
          nombre: `${registro.nombres} ${registro.apellidos}`,
          usuario: registro.usuario,
          password: hashedPassword,
          rol: rol,
          dpi: registro.dpi,
        }
      });

      console.log(`✅ Importado: ${registro.nombres} ${registro.apellidos} (${registro.tipoMembresia})`);
    } catch (error) {
      console.error(`❌ Error importando ${registro.nombres} ${registro.apellidos}:`, error);
    }
  }

  console.log('\n🎉 Importación completada!');
  
  // Mostrar resumen
  const total = await db.registro.count();
  const usuarios = await db.usuario.count();
  
  console.log(`\n📊 Resumen:`);
  console.log(`   - Registros: ${total}`);
  console.log(`   - Usuarios: ${usuarios}`);
}

importData()
  .catch(console.error)
  .finally(() => db.$disconnect());
