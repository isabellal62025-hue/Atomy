'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Quote, ChevronLeft, ChevronRight, MessageCircle, Sparkles, Heart, Check } from 'lucide-react';

interface ExperienciasPageProps {
  setCurrentView: (view: string) => void;
}

interface Experiencia {
  id: string;
  titulo: string;
  experiencia: string;
  producto: string | null;
  calificacion: number;
  usuarioId: string;
  nombreUsuario: string;
  destacado: boolean;
  aprobado: boolean;
  createdAt: string;
}

// Testimonios por defecto si no hay experiencias en la base de datos
const defaultTestimonios = [
  {
    name: 'María G.',
    location: 'Guatemala',
    rating: 5,
    text: 'Atomy cambió mi vida. Empecé usando los productos y el resultado ha sido increíble. La calidad es excepcional.',
    product: 'Cuidado Facial'
  },
  {
    name: 'Carlos R.',
    location: 'México',
    rating: 5,
    text: 'El plan de compensación es el más justo que he visto. Sin compras obligatorias y mis puntos nunca caducan.',
    product: 'Suplementos'
  },
  {
    name: 'Ana M.',
    location: 'Colombia',
    rating: 5,
    text: 'Los productos de higiene personal son increíbles. Toda mi familia los usa y hemos notado la diferencia.',
    product: 'Higiene Personal'
  },
  {
    name: 'Roberto P.',
    location: 'Estados Unidos',
    rating: 5,
    text: 'La oportunidad de negocio me permitió dejar mi trabajo de 9 a 5. Ahora tengo libertad financiera y tiempo para mi familia.',
    product: 'Negocio Atomy'
  },
  {
    name: 'Patricia L.',
    location: 'El Salvador',
    rating: 5,
    text: 'Los suplementos de Atomy mejoraron mi salud significativamente. Mi médico está sorprendido con los resultados.',
    product: 'Suplementos'
  },
  {
    name: 'José M.',
    location: 'Honduras',
    rating: 5,
    text: 'En 6 meses logré construir un equipo de más de 100 personas. El sistema de Atomy realmente funciona.',
    product: 'Negocio Atomy'
  }
];

export default function ExperienciasPage({ setCurrentView }: ExperienciasPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonios, setTestimonios] = useState(defaultTestimonios);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener experiencias aprobadas de la base de datos
    fetch('/api/experiencias?aprobados=true')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.experiencias && data.experiencias.length > 0) {
          const formatted = data.experiencias.map((exp: Experiencia) => ({
            name: exp.nombreUsuario || 'Usuario Atomy',
            location: 'Miembro Atomy',
            rating: exp.calificacion,
            text: exp.experiencia,
            product: exp.producto || 'Productos Atomy',
            destacado: exp.destacado
          }));
          setTestimonios(formatted);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonios.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Hero */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-teal-500/10 to-cyan-500/10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-amber-300">Testimonios Reales</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Experiencias de{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
              Éxito
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Historias reales de personas que transformaron sus vidas con Atomy
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {/* Carrusel de testimonios */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">Lo que dicen nuestros miembros</span>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-50"></div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 flex items-center justify-center transition-all shadow-lg"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500/50 hover:bg-slate-700 flex items-center justify-center transition-all shadow-lg"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>

            {/* Main card */}
            <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-slate-700/50">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-cyan-500/20" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-6 justify-center">
                  {[...Array(testimonios[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl sm:text-2xl text-white text-center mb-8 leading-relaxed font-light">
                  "{testimonios[currentIndex].text}"
                </blockquote>

                {/* Author */}
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <span className="text-2xl font-bold text-white">
                      {testimonios[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  <p className="font-semibold text-white text-lg">{testimonios[currentIndex].name}</p>
                  <p className="text-slate-400 mb-3">{testimonios[currentIndex].location}</p>
                  <span className="inline-block px-4 py-1.5 bg-cyan-500/10 text-cyan-300 rounded-full text-sm font-medium border border-cyan-500/20">
                    {testimonios[currentIndex].product}
                  </span>
                </div>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonios.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-gradient-to-r from-cyan-500 to-teal-500 w-6' : 'bg-slate-600 w-2 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Grid de testimonios adicionales */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Más experiencias de nuestros miembros
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonios.map((testimonio, index) => (
              <div
                key={index}
                className="group relative bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonio.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    "{testimonio.text}"
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div>
                      <p className="font-medium text-white">{testimonio.name}</p>
                      <p className="text-xs text-slate-500">{testimonio.location}</p>
                    </div>
                    <span className="text-xs px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full border border-cyan-500/20">
                      {testimonio.product}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-teal-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-cyan-500/20 rounded-3xl p-8 sm:p-12 text-center border border-cyan-500/20">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl"></div>
              <MessageCircle className="relative w-16 h-16 mx-auto mb-6 text-cyan-400" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Listo para escribir tu propia historia?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de personas que ya están transformando sus vidas con Atomy. 
              Registro gratuito y membresía sin costos.
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Sin costos ocultos', 'Acceso completo', 'Soporte 24/7'].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full border border-slate-700/50">
                  <Check className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-slate-300">{benefit}</span>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={() => setCurrentView('registro')}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold rounded-full px-10 py-6 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Registrarme Gratis
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
