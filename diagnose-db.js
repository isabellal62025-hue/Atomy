const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        console.log('--- Iniciando Diagnóstico ---');
        const columns = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'registro'
    `;
        console.log('Columnas encontradas en tabla "registro":');
        columns.forEach(c => console.log(`- ${c.column_name} (${c.data_type})`));

        const lastReg = await prisma.registro.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        console.log('\nÚltimo registro:', JSON.stringify(lastReg, null, 2));

        if (lastReg && lastReg.usuarioId) {
            const user = await prisma.usuario.findUnique({
                where: { id: lastReg.usuarioId }
            });
            console.log('\nUsuario vinculado:', user ? 'ENCONTRADO' : 'NO ENCONTRADO');
        }

    } catch (err) {
        console.error('\n❌ ERROR EN DIAGNÓSTICO:', err.message);
    } finally {
        await prisma.$disconnect();
    }
}

check();
