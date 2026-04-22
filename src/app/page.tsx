"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BusinessCard } from '@/components/BusinessCard';
import { FilterBar } from '@/components/FilterBar';

// Estructura inferida de la base de datos basándonos en tus indicadiones
interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string; 
  image_url?: string; 
  rating: number;
  is_visible: boolean;
  phone?: string;
  web_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  latitude?: string;
  longitude?: string;
}

export default function Home() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        // Consulta limpia a Supabase con filtro estricto por visibilidad
        const { data, error } = await supabase
          .from('businesses')
          .select('*')
          .eq('is_visible', true);

        if (error) {
          console.error("Error consultando a Supabase:", error);
          return;
        }

        if (data) {
          setBusinesses(data as Business[]);
        }
      } catch (error) {
        console.error('Error inesperado obteniendo negocios:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  // Extracción dinámica de categorías únicas para alimentar el FilterBar
  const categories = useMemo(() => {
    const rawCategories = businesses.map(b => b.category);
    return Array.from(new Set(rawCategories)).filter(Boolean).sort();
  }, [businesses]);

  // Lógica de filtrado transversal combinando búsqueda de texto y selección de categoría
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((bus) => {
      const matchCategory = activeCategory === 'All' || bus.category === activeCategory;
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = 
        bus.name?.toLowerCase().includes(searchLower) || 
        bus.description?.toLowerCase().includes(searchLower);

      return matchCategory && matchSearch;
    });
  }, [businesses, searchTerm, activeCategory]);

  return (
    <main className="min-h-screen py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Cabecera Editorial */}
        <header className="mb-8 md:mb-16">
          <h1 className="text-5xl md:text-[5rem] font-serif tracking-tight text-[#1A1A1A] mb-6 leading-none">
            Gooogleame
          </h1>
          <p className="text-google-blue font-sans text-lg md:text-xl max-w-xl font-light">
            El directorio editorial que destaca colecciones selectas de espacios y servicios.
          </p>
        </header>

        {/* Barra de Filtros */}
        <FilterBar 
          onSearch={setSearchTerm} 
          onCategoryChange={setActiveCategory} 
          categories={categories} 
          activeCategory={activeCategory} 
        />

        {/* Manejo de estado: Cargando */}
        {loading && (
          <div className="w-full flex justify-center items-center py-40 border border-slate-100 rounded-[3rem] bg-white/40 backdrop-blur-sm">
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-slate-400 animate-pulse font-medium">
              Obteniendo colecciones...
            </span>
          </div>
        )}

        {/* Cuadrícula de Contenido */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredBusinesses.map((b) => (
              <BusinessCard 
                key={b.id || b.name}
                name={b.name}
                category={b.category}
                description={b.description}
                imageUrl={(b.imageUrl || b.image_url) as string} 
                rating={b.rating}
                phone={b.phone}
                web_url={b.web_url}
                facebook_url={b.facebook_url}
                tiktok_url={b.tiktok_url}
                latitude={b.latitude}
                longitude={b.longitude}
              />
            ))}
          </div>
        )}

        {/* Manejo de estado: Cero Resultados */}
        {!loading && filteredBusinesses.length === 0 && (
          <div className="w-full flex justify-center items-center py-32 rounded-[2rem] bg-canvas opacity-80">
            <span className="font-sans text-sm text-slate-500 tracking-wide">
              No se encontraron resultados para la exploración actual.
            </span>
          </div>
        )}

      </div>
    </main>
  );
}
