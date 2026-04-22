import React from 'react';
import { Search } from 'lucide-react';

interface FilterBarProps {
  onSearch: (text: string) => void;
  onCategoryChange: (category: string) => void;
  categories: string[];
  activeCategory: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onCategoryChange,
  categories,
  activeCategory,
}) => {
  return (
    <div className="w-full py-8 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
      {/* Search Input Section */}
      <div className="relative group w-full md:w-1/3 shrink-0">
        <label htmlFor="search-input" className="sr-only">
          Buscar
        </label>
        <div className="flex items-center border-b border-slate-300 pb-2 transition-colors duration-500 ease-out focus-within:border-slate-900">
          <Search className="w-4 h-4 text-slate-400 transition-colors duration-500 group-focus-within:text-slate-900" />
          <input
            id="search-input"
            type="text"
            placeholder="Buscar lugares..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent pl-3 text-sm font-sans text-slate-900 placeholder:text-[#A0AAB5] focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      {/* Categories Row */}
      <nav 
        aria-label="Filtro de categorías" 
        className="flex overflow-x-auto w-full gap-8 md:w-auto md:justify-end pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Usamos scrollbarWidth para ocultar la barra nativa temporalmente en navegadores que lo soportan */}
        <style dangerouslySetInnerHTML={{__html: `nav::-webkit-scrollbar { display: none; }`}} />
        
        <button
          onClick={() => onCategoryChange('All')}
          className={`whitespace-nowrap pb-1 border-b text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
            activeCategory === 'All'
              ? 'border-slate-900 text-slate-900'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`whitespace-nowrap pb-1 border-b text-xs font-sans font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
              activeCategory === category
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
};
