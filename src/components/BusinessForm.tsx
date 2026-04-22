"use client";

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export const BusinessForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    phone: '',
    web: '',
    facebook: '',
    tiktok: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtenemos el ID de usuario activo en la sesión para atar la propiedad
      const { data: authData } = await supabase.auth.getUser();
      const ownerId = authData?.user?.id;

      const payload = {
        owner_id: ownerId || null,
        name: formData.name,
        category: formData.category,
        description: formData.description,
        phone: formData.phone,
        web_url: formData.web,
        facebook_url: formData.facebook,
        tiktok_url: formData.tiktok,
        latitude: formData.latitude,
        longitude: formData.longitude,
        is_visible: false, // Default rules: Pendiente de moderación
      };

      const { error } = await supabase
        .from('businesses')
        .insert([payload]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: '', category: '', description: '', phone: '',
        web: '', facebook: '', tiktok: '', latitude: '', longitude: ''
      });
      
    } catch (error) {
      console.error('Error durante la solicitud:', error);
      alert('Ha ocurrido un error insertando tu espacio en el índice principal. Contacta al equipo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center py-24 space-y-8 bg-canvas border border-slate-100 rounded-[3rem]">
        <h3 className="font-serif text-4xl text-slate-900 tracking-tight">Aplicación Indexada</h3>
        <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
          Tu aplicación ha sido recibida y se encuentra bajo el estado <span className="font-semibold">Pendiente de Moderación</span> para mantener los estándares estéticos.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-[0.65rem] font-sans font-semibold uppercase tracking-[0.2em] text-google-blue border-b border-transparent hover:border-google-blue pb-1 transition-all"
        >
          Anexar otro registro
        </button>
      </div>
    );
  }

  // Clases Globales para asegurar el cumplimiento del Quiet Luxury
  const inputUi = "w-full bg-transparent border-b border-slate-300 py-3 font-sans text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 transition-colors duration-500 rounded-none";
  const labelUi = "block text-[0.65rem] font-sans font-semibold uppercase tracking-[0.2em] text-slate-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto space-y-16 py-12 px-6">
      
      {/* Cabecera del Form */}
      <div className="space-y-4 mb-20 text-center md:text-left">
        <h2 className="font-serif text-5xl text-slate-900 tracking-tight">Postular Colección</h2>
        <p className="font-sans text-sm text-slate-500 max-w-xl leading-relaxed">
          Añade la información curada de tu negocio. Todos los perfiles operan asíncronamente bajo moderación para preservar la integridad visual de la marca.
        </p>
      </div>

      {/* Bloque: Identidad General */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
        <div className="col-span-1 md:col-span-2">
          <label className={labelUi}>Nombre de la Marca</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputUi} placeholder="Ej. L'Atelier Minimal" />
        </div>

        <div>
          <label className={labelUi}>Categoría Principal</label>
          <input required type="text" name="category" value={formData.category} onChange={handleChange} className={inputUi} placeholder="Ej. Gastronomía, Bienestar..." />
        </div>

        <div>
          <label className={labelUi}>Teléfono Contacto / Reservas</label>
          <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputUi} placeholder="+52 ..." />
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className={labelUi}>Filosofía / Descripción</label>
          <textarea required name="description" rows={3} value={formData.description} onChange={handleChange} className={`${inputUi} resize-none`} placeholder="Expresa el aura y misión del espacio..." />
        </div>
      </div>

      {/* Bloque: Social Media */}
      <div className="pt-12 border-t border-slate-200">
        <h3 className="font-sans text-[0.65rem] uppercase tracking-widest text-slate-900 mb-10 font-semibold">Huella Digital</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <label className={labelUi}>Web Oficial</label>
            <input type="url" name="web" value={formData.web} onChange={handleChange} className={inputUi} placeholder="https://" />
          </div>
          <div>
            <label className={labelUi}>Instagram / Facebook</label>
            <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} className={inputUi} placeholder="URL del perfil" />
          </div>
          <div>
            <label className={labelUi}>TikTok</label>
            <input type="url" name="tiktok" value={formData.tiktok} onChange={handleChange} className={inputUi} placeholder="URL del perfil" />
          </div>
        </div>
      </div>

      {/* Bloque: Sistema Global de Geolocalización */}
      <div className="pt-12 border-t border-slate-200">
        <h3 className="font-sans text-[0.65rem] uppercase tracking-widest text-slate-900 mb-10 font-semibold">Cartografía General</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <label className={labelUi}>Latitud</label>
            <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className={inputUi} placeholder="25.6866" />
          </div>
          <div>
            <label className={labelUi}>Longitud</label>
            <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className={inputUi} placeholder="-100.3161" />
          </div>
        </div>
      </div>

      {/* Acción */}
      <div className="pt-8 flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="relative overflow-hidden group/submit rounded-[3rem] border border-transparent px-10 py-5 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-[1.03] w-full md:w-auto bg-slate-900 disabled:opacity-50 disabled:hover:scale-100"
        >
          <span className="relative z-10 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors duration-500 font-semibold flex items-center justify-center">
            {loading ? 'Procesando inserción...' : 'Transmitir al Directorio'}
          </span>
          <span className="absolute inset-0 z-0 bg-google-blue translate-y-[101%] group-hover/submit:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] rounded-[3rem]" />
        </button>
      </div>

    </form>
  );
};
