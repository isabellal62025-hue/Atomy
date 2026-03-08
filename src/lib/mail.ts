import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, nombres: string, usuario: string, password: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Atomy Registro <onboarding@resend.dev>', // Cambiar por dominio verificado en el futuro
            to: [email],
            subject: '¡Bienvenido a Atomy! Confirma tus credenciales',
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h1 style="color: #0891b2; text-align: center;">¡Bienvenido a la familia Atomy, ${nombres}!</h1>
          <p style="color: #475569; font-size: 16px; line-height: 1.5;">Estamos muy felices de que te hayas unido a nuestra comunidad. Tu registro ha sido procesado exitosamente y pronto un asesor activará tu cuenta.</p>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h2 style="color: #334155; font-size: 18px; margin-top: 0;">Tus Credenciales de Acceso:</h2>
            <p style="margin: 5px 0;"><strong>Usuario (Atomy ID):</strong> ${usuario}</p>
            <p style="margin: 5px 0;"><strong>Contraseña:</strong> ${password}</p>
          </div>
          
          <p style="color: #475569; font-size: 14px;"><strong>Importante:</strong> Guarda este correo en un lugar seguro. Podrás iniciar sesión una vez que tu estado cambie a "Activo" en nuestro panel.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          <p style="text-align: center; color: #94a3b8; font-size: 12px;">© 2026 Atomy Guatemala - Registro de Miembros Gratuitos</p>
        </div>
      `,
        });

        if (error) {
            console.error('Error al enviar correo:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (error) {
        console.error('Error en servicio de correo:', error);
        return { success: false, error };
    }
}
