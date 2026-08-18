import React from 'react';
import { CATEGORIES } from '../data/categories';
import { SubcategoryId, WaterCategoryId } from '../types';
import { AlertOctagon, AlertTriangle, CheckCircle2, FileText, Sparkles, Waves } from 'lucide-react';

interface CategorySelectorProps {
  selectedCategory: WaterCategoryId;
  selectedSubcategory: SubcategoryId;
  onSelectCategory: (catId: WaterCategoryId) => void;
  onSelectSubcategory: (subId: SubcategoryId) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  selectedSubcategory,
  onSelectCategory,
  onSelectSubcategory,
}) => {
  const isCategoryConfigured = Boolean(selectedCategory && selectedCategory.trim() !== '');
  const isSubcategoryConfigured = Boolean(selectedSubcategory && selectedSubcategory.trim() !== '');
  const isFullyConfigured = isCategoryConfigured && isSubcategoryConfigured;

  const currentCatObj = CATEGORIES.find(c => c.id === selectedCategory);
  const currentSubObj = currentCatObj?.subcategories.find(s => s.id === selectedSubcategory);

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient water glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Title & Anexo Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 text-white items-center justify-center text-xs font-extrabold shadow-lg shadow-blue-500/30 border border-cyan-300/40">
            1
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Categoría & Subcategoría del Agua</span>
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            </h2>
            <p className="text-xs text-slate-300">
              Uso o cuerpo receptor según el Anexo oficial del D.S. N° 004-2017-MINAM
            </p>
          </div>
        </div>
        {currentCatObj && (
          <div className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 bg-cyan-950/50 text-cyan-300 rounded-full border border-cyan-500/30 backdrop-blur-md self-start sm:self-auto font-mono">
            <Waves className="h-3 w-3 text-cyan-400" />
            <span>Anexo: Págs. {currentCatObj.anexoPages.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Unconfigured Warning Alert Banner */}
      {!isFullyConfigured && (
        <div className="mb-5 bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3 text-rose-200 text-xs backdrop-blur-md animate-in fade-in-50 duration-300">
          <AlertOctagon className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white font-bold block text-sm">
              No se puede realizar el análisis de calidad ambiental
            </strong>
            <p className="text-rose-200/90 leading-relaxed">
              No se ha configurado una <strong>Categoría</strong> o <strong>Subcategoría</strong> de agua aplicable. Debe seleccionar a continuación la clasificación normativa oficial según el D.S. N° 004-2017-MINAM para determinar los límites de comparación.
            </p>
          </div>
        </div>
      )}

      {/* 4 Main Categories - Minimalist Animated Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 relative z-10">
        {CATEGORIES.map(cat => {
          const isSelected = cat.id === selectedCategory;
          return (
            <button
              key={cat.id}
              id={`cat-button-${cat.id}`}
              onClick={() => {
                onSelectCategory(cat.id);
                if (cat.subcategories.length > 0) {
                  onSelectSubcategory(cat.subcategories[0].id);
                }
              }}
              className={`group p-4 rounded-xl text-left transition-all duration-300 relative border flex flex-col justify-between backdrop-blur-xl cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-b from-blue-500/25 to-cyan-500/15 border-cyan-400/70 shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50 text-white scale-[1.01]'
                  : 'bg-white/[0.03] hover:bg-white/[0.07] border-white/10 hover:border-white/20 text-slate-300 hover:scale-[1.005]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wide uppercase transition-colors ${
                      isSelected
                        ? 'bg-cyan-400 text-slate-950 shadow-sm shadow-cyan-400/50 font-bold'
                        : 'bg-white/10 text-slate-300 border border-white/10'
                    }`}
                  >
                    {cat.id.replace('CAT', 'Cat. ')}
                  </span>
                  {isSelected && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-sm animate-in zoom-in-50 duration-200">
                      <CheckCircle2 className="h-3.5 w-3.5 fill-current" />
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-white text-xs leading-snug line-clamp-2 group-hover:text-cyan-200 transition-colors">
                  {cat.name}
                </h3>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Subcategories Grid for Active Category */}
      {currentCatObj ? (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-xl p-4 border border-white/10 relative z-10">
          <label className="block text-xs font-bold text-slate-200 mb-3 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <span>Subcategoría específica a evaluar:</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {currentCatObj.subcategories.map(sub => {
              const isSubSelected = sub.id === selectedSubcategory;
              return (
                <button
                  key={sub.id}
                  id={`subcat-button-${sub.id}`}
                  onClick={() => onSelectSubcategory(sub.id)}
                  className={`p-3 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between backdrop-blur-md cursor-pointer ${
                    isSubSelected
                      ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border-cyan-400/60 shadow-md ring-1 ring-cyan-400/40 text-white scale-[1.01]'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] border-white/10 hover:border-white/20 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          isSubSelected
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm'
                            : 'bg-white/10 text-cyan-300 border border-white/10'
                        }`}
                      >
                        {sub.code}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Pág. {sub.anexoPage}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-white line-clamp-2 mt-1">
                      {sub.name}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {sub.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected Category/Subcategory Info Banner */}
          {currentSubObj && (
            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-start gap-2.5 text-xs text-slate-300">
              <FileText className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">{currentSubObj.code} ({currentSubObj.name}): </span>
                <span className="text-slate-300">Límites aplicados según la Página {currentSubObj.anexoPage} del Anexo D.S. N° 004-2017-MINAM.</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/[0.02] backdrop-blur-md rounded-xl p-4 border border-dashed border-white/15 text-center text-xs text-slate-400">
          Seleccione una categoría principal arriba para desplegar las subcategorías correspondientes.
        </div>
      )}
    </div>
  );
};
