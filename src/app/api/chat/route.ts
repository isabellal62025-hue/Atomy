import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Inicializar Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: NextRequest) {
  const fallbackResponses = [
    '¡Hola! Soy Astro, tu consultor Atomy. Atomy se basa en la FILOSOFÍA DEL BEBÉ: tú eres nuestro propósito, no un medio. ¿En qué puedo ayudarte hoy? 😊',
    'Nuestra promesa es CALIDAD ABSOLUTA a PRECIO ABSOLUTO. Ofrecemos productos premium como el HemoHIM y Absolute Skincare al mejor precio del mercado.',
    'Como centro de distribución global (GSGS), Atomy conecta productos de lujo con la masa (Masstige). ¿Quieres saber cómo registrarte gratis?',
    'Para unirte a nuestra red global GRATIS, usa estos datos de patrocinador: Nombre: Hlopez, Código: 20669704. ¡Tus puntos personales nunca vencen!',
    'Explora nuestras líneas: Salud (HemoHIM), Belleza (The Fame), Cuidado Personal y Hogar. ¡Calidad coreana premium para tu éxito!'
  ];

  try {
    const { message, isFirstMessage } = await request.json();
    if (!message) return NextResponse.json({ success: false, message: 'Falta mensaje' }, { status: 400 });

    try {
      if (!process.env.GOOGLE_API_KEY) {
        throw new Error('GOOGLE_API_KEY no configurada');
      }

      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt = `Eres Astro, Consultor Atomy. Tu base de conocimiento es la web oficial de Atomy USA. 
      FILOSOFÍA: Calidad Absoluta, Precio Absoluto. Estrategia Masstige y GSGS. 
      ÉXITO DEL CLIENTE: Filosofía del Bebé (el cliente es el propósito).
      PRODUCTOS: Salud (HemoHIM), Belleza (Absolute, The Fame), Hogar.
      REGISTRO: Gratis, sin cuotas. Patrocinador: Hlopez (20669704).
      Responde de manera amable, profesional y entusiasta. Usa emojis para ser más cercano.`;

      const prompt = `${systemPrompt}\n\nUsuario: ${message}\nAstro:`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      if (response) return NextResponse.json({ success: true, response });
    } catch (apiError) {
      console.error('Gemini API Falló:', apiError);
    }

    // Retornar fallback si el SDK no respondió
    return NextResponse.json({
      success: true,
      response: isFirstMessage ? fallbackResponses[0] : fallbackResponses[Math.floor(Math.random() * (fallbackResponses.length - 1)) + 1]
    });

  } catch (error) {
    console.error('Error Crítico en Chat API:', error);
    return NextResponse.json({
      success: true,
      response: '¡Hola! Soy Astro. En este momento mis sistemas de IA están descansando, pero recuerda que puedes registrarte gratis con el patrocinador 20669704.'
    });
  }
}
