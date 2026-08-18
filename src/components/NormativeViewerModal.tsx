import React from 'react';
import { X, BookOpen, ExternalLink, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

interface NormativeViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NormativeViewerModal: React.FC<NormativeViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900/85 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-4xl w-full border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-950/60 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20">
              <Scale className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Marco Normativo: D.S. N° 004-2017-MINAM
              </h3>
              <p className="text-xs text-slate-300">
                Aprobación de los Estándares de Calidad Ambiental (ECA) para Agua en el Perú
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200 leading-relaxed">
          {/* Executive Normative Summary */}
          <div className="bg-white/[0.04] border border-cyan-500/30 rounded-2xl p-5 space-y-2.5 backdrop-blur-md">
            <h4 className="font-bold text-white flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              Estructura Oficial del Anexo
            </h4>
            <p className="text-slate-300">
              El <strong className="text-white">Decreto Supremo N° 004-2017-MINAM</strong> es la norma nacional única y vinculante que establece el nivel de concentración o del grado de elementos, sustancias o parámetros físicos, químicos y biológicos presentes en el agua en su condición de cuerpo receptor.
            </p>
            <p className="text-[11px] text-cyan-300">
              Publicado en el diario oficial <em>El Peruano</em> el 7 de junio de 2017. AquaRadar utiliza con exactitud las asignaciones y tablas de las <strong>Páginas 14 a 19</strong> de dicho Anexo.
            </p>
          </div>

          {/* 4 Categories Card Grid */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">
              Categorías y Subcategorías Normadas:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 space-y-3 backdrop-blur-md hover:border-white/20 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {cat.id.replace('CAT', 'Categoría ')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Anexo Págs. {cat.anexoPages.join(', ')}
                    </span>
                  </div>
                  <h5 className="font-bold text-white text-sm">
                    {cat.name}
                  </h5>
                  <p className="text-[11px] text-slate-300">
                    {cat.description}
                  </p>

                  <div className="pt-3 border-t border-white/10 space-y-1.5">
                    <div className="text-[11px] font-semibold text-slate-200">Subcategorías:</div>
                    {cat.subcategories.map(sub => (
                      <div key={sub.id} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="font-bold text-cyan-300 shrink-0">• {sub.code}:</span>
                        <span>{sub.name} (Pág. {sub.anexoPage})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Methodological Notes */}
          <div className="bg-slate-950/60 rounded-2xl p-5 space-y-3 border border-white/10 backdrop-blur-md">
            <h5 className="font-bold text-white text-sm">
              Reglas Metodológicas del D.S. N° 004-2017-MINAM implementadas en AquaRadar:
            </h5>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px] text-slate-300">
              <li><strong className="text-white">Factores de Conversión:</strong> Se aplica la nota oficial (c) para Nitratos (si el reporte es en NO3-N, se multiplica por 4.43 para comparar con el límite de NO3-).</li>
              <li><strong className="text-white">Amoniaco Total Dinámico:</strong> Se aplican las Tablas N° 1 (Agua Dulce) y N° 2 (Agua Marina/Estuarios) según los valores de pH, Temperatura y Salinidad.</li>
              <li><strong className="text-white">Tratamiento de No Detectables (ND / &lt; LOD):</strong> Se evalúa si el límite de cuantificación del laboratorio es inferior o igual al ECA.</li>
              <li><strong className="text-white">Variación Térmica (Δ T°):</strong> Se calcula la desviación absoluta respecto al promedio multianual del cuerpo de agua receptor.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs transition shadow-md shadow-blue-500/20 active:scale-98"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};
