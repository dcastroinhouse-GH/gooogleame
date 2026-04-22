import React, { useState } from 'react';

interface BusinessCardProps {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
  phone?: string;
  web_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  latitude?: string;
  longitude?: string;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  category,
  description,
  imageUrl,
  rating,
  phone,
  web_url,
  facebook_url,
  tiktok_url,
  latitude,
  longitude
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Función auxiliar para colorear la categoría dinámicamente con la paleta de Google
  const getCategoryColor = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('farmacia') || lower.includes('salud')) return 'text-google-green border-google-green';
    if (lower.includes('panadería') || lower.includes('comida') || lower.includes('alimento')) return 'text-google-yellow border-google-yellow';
    if (lower.includes('zapater') || lower.includes('oficio') || lower.includes('ferretería')) return 'text-google-red border-google-red';
    return 'text-google-blue border-google-blue'; // Default
  };

  const accentClass = getCategoryColor(category);

  return (
    <article className="group flex flex-col bg-white rounded-[2rem] border border-slate-200 overflow-hidden transition-all duration-500 hover:border-google-blue/50 hover:shadow-[0_8px_30px_rgb(91,124,153,0.12)]">
      
      {/* Portada Visual */}
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[2rem] bg-canvas">
        <img 
          src={imageUrl} 
          alt={`Imagen ilustrativa de ${name}`} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
        />
        {/* Rating Badge acentuado con Google Yellow */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-[1rem] text-sm font-sans font-bold flex items-center space-x-1.5 text-google-blue shadow-sm">
          <span className="text-google-yellow text-lg leading-none mt-[-2px]">★</span>
          <span>{rating > 0 ? rating.toFixed(1) : 'Nuevo'}</span>
        </div>
      </div>
      
      {/* Cuerpo Principal */}
      <div className="p-8 flex flex-col flex-grow bg-white">
        <div className="mb-4">
          <span className={`text-[0.65rem] uppercase tracking-[0.2em] font-sans font-bold px-3 py-1 rounded-full border ${accentClass} bg-opacity-5`}>
            {category}
          </span>
        </div>
        
        {/* Título usando la serifa pero con color Google Blue */}
        <h3 className="font-serif text-3xl text-google-blue font-bold mb-3 leading-tight tracking-tight">
          {name}
        </h3>
        
        <p className={`font-sans text-sm text-slate-600 mb-8 flex-grow leading-relaxed transition-all duration-300 ${!isExpanded ? 'line-clamp-3' : 'line-clamp-none'}`}>
          {description}
        </p>

        {/* Información Desplegada (Teléfono, Mapas, Redes) */}
        <div className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isExpanded ? 'max-h-[500px] opacity-100 mb-8 border-t border-slate-100 pt-6' : 'max-h-0 opacity-0 mb-0'}`}>
          <div className="space-y-4">
            {phone && (
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-google-green text-xl">✆</span>
                <a href={`tel:${phone}`} className="font-mono text-slate-700 hover:text-google-green transition-colors">{phone}</a>
              </div>
            )}
            
            {(latitude && longitude) && (
              <div className="flex items-center space-x-3 text-sm">
                <span className="text-google-red text-xl">⚑</span>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="font-sans font-medium text-slate-700 hover:text-google-red transition-colors underline decoration-slate-200 underline-offset-4"
                >
                  Abrir Mapa
                </a>
              </div>
            )}

            {(web_url || facebook_url || tiktok_url) && (
              <div className="flex items-center space-x-4 pt-2">
                {web_url && <a href={web_url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-google-blue hover:text-google-red transition-colors">Web</a>}
                {facebook_url && <a href={facebook_url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-google-blue hover:text-google-red transition-colors">Facebook</a>}
                {tiktok_url && <a href={tiktok_url} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-google-blue hover:text-google-red transition-colors">TikTok</a>}
              </div>
            )}
            
            {!phone && !web_url && !latitude && (
               <p className="text-xs text-slate-400 italic">Visítalos directamente en el vecindario. Espacio de trato directo.</p>
            )}
          </div>
        </div>
        
        {/* Botón de Acción integrado al esquema Quiet Luxury pero activado por color */}
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative overflow-hidden group/btn rounded-[2rem] border border-google-blue/20 px-6 py-3 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-[1.02] w-full bg-canvas text-center"
        >
          <span className="relative z-10 font-sans text-[0.65rem] uppercase tracking-widest text-google-blue group-hover/btn:text-white transition-colors duration-500 font-bold">
            {isExpanded ? 'Ocultar Detalles' : 'Ver Detalles'}
          </span>
          <span className="absolute inset-0 z-0 bg-google-blue translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] rounded-[2rem]" />
        </button>
      </div>
    </article>
  );
};
