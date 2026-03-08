'use client';

import { Sparkles, Heart, Sparkles as SparkleIcon, HeartPulse, Home, ArrowRight } from 'lucide-react';

interface ProductsSectionProps {
  setCurrentView: (view: string) => void;
  setProductCategory: (category: string) => void;
}

const categorias = [
  {
    id: 'belleza',
    nombre: 'Belleza',
    descripcion: 'Cuidado facial, maquillaje y productos de belleza premium',
    icon: SparkleIcon,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'from-pink-500/10 to-rose-500/10',
    borderColor: 'border-pink-500/20 hover:border-pink-500/40',
    imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    shopUrl: 'https://us.atomy.com/product/beauty'
  },
  {
    id: 'cuidado-personal',
    nombre: 'Cuidado Personal',
    descripcion: 'Higiene personal, cuidado capilar y productos del hogar',
    icon: Heart,
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'from-cyan-500/10 to-teal-500/10',
    borderColor: 'border-cyan-500/20 hover:border-cyan-500/40',
    imagen: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80',
    shopUrl: 'https://us.atomy.com/product/personal-care'
  },
  {
    id: 'salud',
    nombre: 'Salud',
    descripcion: 'Suplementos nutricionales y productos de bienestar',
    icon: HeartPulse,
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20 hover:border-green-500/40',
    imagen: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&q=80',
    shopUrl: 'https://us.atomy.com/product/health-care'
  },
  {
    id: 'hogar',
    nombre: 'Hogar',
    descripcion: 'Productos para el hogar, limpieza y bienestar familiar',
    icon: Home,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20 hover:border-amber-500/40',
    imagen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    shopUrl: 'https://us.atomy.com/product/living'
  }
];

export default function ProductsSection({ setCurrentView, setProductCategory }: ProductsSectionProps) {
  const handleCategoryClick = (categoryId: string) => {
    setProductCategory(categoryId);
    setCurrentView('productos-categoria');
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden" id="productos">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">Catálogo Premium</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Nuestras{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Categorías
            </span>
          </h2>

          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Explora nuestra amplia gama de productos organizados por categorías.
            Calidad premium coreana al mejor precio.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categorias.map((categoria, index) => (
            <div
              key={categoria.id}
              className="group relative cursor-pointer"
              onClick={() => handleCategoryClick(categoria.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${categoria.color} rounded-3xl opacity-0 group-hover:opacity-20 blur transition-all duration-500`}></div>

              {/* Card */}
              <div className={`relative bg-gradient-to-b ${categoria.bgColor} rounded-3xl overflow-hidden border ${categoria.borderColor} transition-all duration-500 group-hover:-translate-y-2 h-full`}>
                {/* Image Background */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={categoria.imagen}
                    alt={categoria.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/60"></div>
                </div>

                {/* Content */}
                <div className="relative p-8 flex flex-col items-center text-center h-full">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${categoria.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <categoria.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {categoria.nombre}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-6 flex-grow">
                    {categoria.descripcion}
                  </p>

                  {/* CTA */}
                  <div className="flex flex-col gap-3 w-full mt-auto">
                    <div className="flex items-center justify-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all">
                      <span>Catálogo Local</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <a
                      href={categoria.shopUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest font-bold"
                    >
                      Ir a Tienda Oficial
                    </a>
                  </div>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${categoria.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-slate-800/50 border border-slate-700/50">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 border-2 border-slate-800 flex items-center justify-center text-xs font-bold text-white">
                  {i + 1}
                </div>
              ))}
            </div>
            <span className="text-slate-300 text-sm">+500 productos premium disponibles</span>
          </div>
        </div>
      </div>
    </section>
  );
}
