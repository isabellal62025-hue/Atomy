'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowUp,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  Shield,
  Award,
  Clock,
  Heart,
  Sparkles,
  Globe
} from 'lucide-react';

interface FooterProps {
  setCurrentView?: (view: string) => void;
  setProductCategory?: (category: string) => void;
}

export default function Footer({ setCurrentView, setProductCategory }: FooterProps) {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://www.facebook.com/profile.php?id=61586482017672',
      color: 'hover:bg-blue-500',
      label: 'Facebook'
    },
    {
      icon: MessageCircle,
      href: 'https://chat.whatsapp.com/Jr5SNg8WGif1QRPp0SON8Y',
      color: 'hover:bg-green-500',
      label: 'WhatsApp'
    },
    {
      icon: Instagram,
      href: 'https://www.instagram.com/atomyglobal',
      color: 'hover:bg-pink-500',
      label: 'Instagram'
    },
  ];

  const quickLinks = [
    { label: '¿Por qué Atomy?', id: 'por-que-atomy' },
    { label: 'Productos', id: 'productos' },
    { label: 'Videos', id: 'videos' },
  ];

  const categories = [
    { label: 'Higiene Personal', id: 'cuidado-personal' },
    { label: 'Cuidado de la Piel', id: 'belleza' },
    { label: 'Suplementos', id: 'salud' },
    { label: 'Bienestar Diario', id: 'hogar' },
  ];


  const trustItems = [
    { icon: Shield, label: 'Registro Seguro' },
    { icon: Award, label: 'Calidad Premium' },
    { icon: Clock, label: 'Soporte 24/7' },
    { icon: Heart, label: 'Comunidad Global' },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                ATOMY
              </span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed text-sm">
              Transformando vidas a través de productos premium y oportunidades de negocio
              que democratizan el éxito financiero.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-xl bg-slate-800 ${social.color} flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group`}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Enlaces
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              Categorías
            </h4>
            <ul className="space-y-3">
              {categories.map((cat, index) => (
                <li key={index}>
                  <button
                    onClick={() => {
                      if (setCurrentView && setProductCategory && cat.id) {
                        setProductCategory(cat.id);
                        setCurrentView('productos-categoria');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-400 hover:text-teal-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-teal-400 transition-colors"></span>
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-400" />
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>info@atomy.com</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                </div>
                <span>Guatemala, Centroamérica</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-500">
                <div className="w-10 h-10 rounded-lg bg-slate-800/50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/50 bg-slate-950/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {currentYear} Atomy Global. Todos los derechos reservados.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={scrollToTop}
              className="border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 text-slate-300 hover:text-white transition-all"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Volver arriba
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
