import React from 'react';

interface BusinessCardProps {
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  rating: number;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  name,
  category,
  description,
  imageUrl,
  rating,
}) => {
  return (
    <article className="group flex flex-col bg-white rounded-[2rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:border-slate-200 hover:shadow-sm">
      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-[2rem]">
        {/* Usamos etiqueta img estándar para evitar restricciones de dominios externos en next/image durante prototipado */}
        <img 
          src={imageUrl} 
          alt={`Imagen representativa de ${name}`} 
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-[1rem] text-sm font-sans font-medium flex items-center space-x-1 tracking-wide text-slate-800 shadow-sm border border-slate-100/50">
          <span className="text-google-yellow">★</span>
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow bg-canvas">
        <div className="mb-3">
          <span className="text-xs uppercase tracking-[0.2em] text-google-blue font-sans font-semibold">
            {category}
          </span>
        </div>
        
        <h3 className="font-serif text-3xl text-slate-900 mb-4 leading-tight">
          {name}
        </h3>
        
        <p className="font-sans text-sm text-slate-500 line-clamp-3 mb-10 flex-grow leading-relaxed">
          {description}
        </p>
        
        <button className="relative overflow-hidden group/btn rounded-[2rem] border border-slate-200 px-6 py-3 transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-[1.03] w-max bg-transparent">
          <span className="relative z-10 font-sans text-[0.65rem] uppercase tracking-widest text-slate-600 group-hover/btn:text-white transition-colors duration-500 font-semibold">
            Ver Detalles
          </span>
          <span className="absolute inset-0 z-0 bg-slate-900 translate-y-[101%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] rounded-[2rem]" />
        </button>
      </div>
    </article>
  );
};
