'use client';

import { Star, DollarSign, TrendingUp, Shield, Globe, Award, Sparkles, Check } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Calidad Absoluta',
    description: 'Ofrecemos los mejores productos desarrollados con biotecnología coreana de punta bajo el concepto Masstige: Masa + Prestigio.',
    color: 'from-cyan-400 to-teal-400',
    bgColor: 'from-cyan-500/10 to-teal-500/10',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40'
  },
  {
    icon: DollarSign,
    title: 'Precio Absoluto',
    description: 'Compromiso de entrega de productos orgánicos a precios inmejorables, optimizando la economía de cada hogar miembro.',
    color: 'from-emerald-400 to-green-400',
    bgColor: 'from-emerald-500/10 to-green-500/10',
    borderColor: 'border-emerald-500/20 hover:border-emerald-500/40'
  },
  {
    icon: TrendingUp,
    title: 'Ingreso Residual',
    description: 'Un sistema de negocio justo, sin cuotas de inscripción ni compras mensuales obligatorias, diseñado para tu éxito global.',
    color: 'from-amber-400 to-orange-400',
    bgColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40'
  }
];

const certifications = [
  { icon: Shield, label: 'ISO 9001', color: 'text-cyan-400' },
  { icon: Star, label: 'FDA Approved', color: 'text-teal-400' },
  { icon: Globe, label: '52+ Países', color: 'text-amber-400' },
  { icon: Award, label: '15+ Años', color: 'text-orange-400' },
];

export default function WhyAtomy() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" id="por-que-atomy">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">¿Por qué elegirnos?</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Tres Pilares que nos hacen{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Únicos
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-3xl mx-auto">
            En Atomy combinamos productos orgánicos, precios accesibles y una oportunidad de negocio
            sin precedentes para tu éxito financiero.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl bg-gradient-to-b ${feature.bgColor} border ${feature.borderColor} transition-all duration-500 hover:-translate-y-2`}
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.color} rounded-3xl opacity-0 group-hover:opacity-10 blur transition-all duration-500`}></div>

              {/* Icon */}
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.color} rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-6">Certificaciones y Reconocimientos</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1"
              >
                <cert.icon className={`w-5 h-5 ${cert.color}`} />
                <span className="text-sm font-medium text-slate-300">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { value: '15+', label: 'Años de experiencia' },
            { value: '27+', label: 'Sedes activas' },
            { value: '52+', label: 'Países' },
            { value: '10M+', label: 'Miembros globales' },
            { value: '500+', label: 'Productos orgánicos' },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
