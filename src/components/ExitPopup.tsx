'use client';

import { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Gift, Star, Zap, Crown, Sparkles } from 'lucide-react';

interface ExitPopupProps {
  setCurrentView: (view: string) => void;
}

export default function ExitPopup({ setCurrentView }: ExitPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleRegister = useCallback(() => {
    setIsOpen(false);
    setCurrentView('registro');
  }, [setCurrentView]);

  useEffect(() => {
    // Check if popup was already shown in this session
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('exitPopupShown');
      if (shown) {
        setHasShown(true);
      }
    }
  }, []);

  useEffect(() => {
    if (hasShown) return;

    let isExiting = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves from the top of the page
      if (e.clientY <= 0 && !isExiting) {
        isExiting = true;
        setIsOpen(true);
        sessionStorage.setItem('exitPopupShown', 'true');
        setHasShown(true);
      }
    };

    // Add a small delay before activating the listener
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-transparent shadow-none">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Main container */}
        <div className="relative bg-gradient-to-br from-[#0a1628] via-[#0f1f35] to-[#0a1628] rounded-2xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#c9a962]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#c9a962]/10 rounded-full blur-3xl" />
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#c9a962] rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
              />
            ))}
          </div>

          <div className="relative p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a962] to-[#a88b3d] mb-6 animate-bounce-slow">
                <Gift className="w-10 h-10 text-[#0a1628]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                ¡Espera! No te vayas
              </h2>
              <p className="text-lg text-white/70">
                Tenemos un regalo especial para ti
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-[#c9a962]/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9a962]/20 flex items-center justify-center">
                  <Star className="w-6 h-6 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Membresía GRATIS</h3>
                  <p className="text-sm text-white/60">Sin costos ocultos</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-[#c9a962]/20">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#c9a962]/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#c9a962]" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Productos Orgánicos Coreanos</h3>
                  <p className="text-sm text-white/60">Tecnología de punta a tu alcance</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#c9a962]/20 to-[#a88b3d]/20 border border-[#c9a962]/30">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a962] to-[#a88b3d] flex items-center justify-center animate-pulse">
                  <Crown className="w-6 h-6 text-[#0a1628]" />
                </div>
                <div>
                  <h3 className="font-semibold bg-gradient-to-r from-[#c9a962] to-[#e0c97d] bg-clip-text text-transparent">
                    BONUS EXCLUSIVO
                  </h3>
                  <p className="text-sm text-white/80">Acceso gratuito a nuestra herramienta de IA para tu negocio</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleRegister}
                className="flex-1 bg-gradient-to-r from-[#c9a962] to-[#a88b3d] hover:from-[#e0c97d] hover:to-[#c9a962] text-[#0a1628] py-6 text-lg font-semibold rounded-xl shadow-lg shadow-[#c9a962]/30 transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                ¡Quiero mi Regalo!
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-transparent border-2 border-slate-500/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-400 hover:text-white py-6 text-lg rounded-xl transition-all"
              >
                No, gracias
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex items-center justify-center gap-4 text-white/40 text-sm">
              <span>✓ Sin spam</span>
              <span>✓ Sin compromisos</span>
              <span>✓ 100% Gratis</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
