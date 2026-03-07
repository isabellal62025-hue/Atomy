const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log("⏳ Conectando a Supabase...");
    try {
        // Intentar una consulta muy básica para ver si la BD responde
        const result = await prisma.$queryRaw`SELECT 1 as test_connection`;
        console.log("✅ ¡Conexión exitosa a Supabase (PostgreSQL)!");
        console.log("Resultado:", result);

        // Contar los usuarios si la tabla ya existe
        const usuariosCount = await prisma.usuario.count();
        console.log(`👤 Total de usuarios en la base de datos: ${usuariosCount}`);

    } catch (error) {
        console.error("❌ Error al conectar a Supabase:");
        console.error(error);
    } finally {
        await prisma.$disconnect();
        console.log("🔌 Desconectado.");
    }
}

main();
