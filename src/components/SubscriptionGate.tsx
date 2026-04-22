"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface SubscriptionGateProps {
  children: React.ReactNode;
}

export const SubscriptionGate: React.FC<SubscriptionGateProps> = ({ children }) => {
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSubscription() {
      try {
        setLoading(true);
        // Autenticación: Validamos primero el usuario actual en sesión
        const { data: authData } = await supabase.auth.getUser();
        const user = authData?.user;

        if (!user) {
          // Si no hay sesión, se bloquea el acceso en esta capa
          setHasAccess(false);
          setLoading(false);
          return;
        }

        // Validación de Suscripción en base de datos
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status')
          .eq('owner_id', user.id)
          .single();

        if (error || !data) {
          setHasAccess(false);
        } else {
          setHasAccess(data.status === 'active');
        }
      } catch (error) {
        console.error("Error validando capa de seguridad de suscripción:", error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    }

    checkSubscription();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-40 flex justify-center items-center">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-slate-400 animate-pulse">
          Auditando acceso...
        </span>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-24 px-6 border border-slate-200 rounded-[3rem] bg-canvas text-center space-y-10 my-12">
        <div className="space-y-4">
          <h2 className="font-serif text-4xl text-slate-900 tracking-tight">Acceso Reservado</h2>
          <p className="font-sans text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Este instrumento digital es operado bajo modelo de membresía. Activa tu pase para gestionar colecciones.
          </p>
        </div>
        
        {/* Usamos el botón magnético estipulado en las reglas globales */}
        <button className="relative overflow-hidden group/btn rounded-[2rem] border border-slate-300 px-8 py-3 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-[1.03] w-max bg-transparent">
          <span className="relative z-10 font-sans text-[0.65rem] uppercase tracking-widest text-slate-800 group-hover/btn:text-white transition-colors duration-500 font-semibold">
            Activar Suscripción
          </span>
          <span className="absolute inset-0 z-0 bg-slate-900 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] rounded-[2rem]" />
        </button>
      </div>
    );
  }

  // Si hay acceso, renderiza el formulario/vista de creador
  return <>{children}</>;
};
