'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import WhyAtomy from '@/components/WhyAtomy';
import CountriesCarousel from '@/components/CountriesCarousel';
import ProductsSection from '@/components/ProductsSection';
import ProductsCategoryPage from '@/components/ProductsCategoryPage';
import VideosSection from '@/components/VideosSection';
import ExperienciasPage from '@/components/ExperienciasPage';
import RegistrationForm from '@/components/RegistrationForm';
import Dashboard from '@/components/Dashboard';
import AstroChat from '@/components/AstroChat';
import Footer from '@/components/Footer';
import ExitPopup from '@/components/ExitPopup';

export default function Home() {
  // Cargar vista y usuario guardados al inicio
  useEffect(() => {
    const savedView = localStorage.getItem('current_view');
    const savedUser = localStorage.getItem('current_user');

    if (savedView) setCurrentView(savedView);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Error parsing saved user', e);
      }
    }
  }, []);

  // Guardar vista y usuario cuando cambien
  useEffect(() => {
    localStorage.setItem('current_view', currentView);
    if (user) {
      localStorage.setItem('current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('current_user');
    }
  }, [currentView, user]);

  // Initialize seed data on first load
  useEffect(() => {
    const initSeed = async () => {
      try {
        await fetch('/api/seed', { method: 'POST' });
      } catch (error) {
        console.log('Seed already initialized or error:', error);
      }
    };
    initSeed();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        setUser={setUser}
      />

      <main className="flex-grow">
        {currentView === 'landing' && (
          <>
            <HeroSection setCurrentView={setCurrentView} />
            <WhyAtomy />
            <CountriesCarousel />
            <ProductsSection
              setCurrentView={setCurrentView}
              setProductCategory={setProductCategory}
            />
            <VideosSection />
          </>
        )}

        {currentView === 'productos-categoria' && (
          <ProductsCategoryPage
            categoryId={productCategory}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'experiencias' && (
          <ExperienciasPage setCurrentView={setCurrentView} />
        )}

        {currentView === 'registro' && (
          <RegistrationForm setCurrentView={setCurrentView} />
        )}

        {currentView === 'dashboard' && (
          <Dashboard user={user} />
        )}
      </main>

      <Footer />

      {/* Astro AI Chat - Available on all views */}
      <AstroChat />

      {/* Exit Intent Popup */}
      <ExitPopup setCurrentView={setCurrentView} />
    </div>
  );
}
