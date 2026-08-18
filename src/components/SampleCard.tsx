import React from 'react';
import { SampleItem } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertOctagon,
  ShieldCheck,
  Copy,
  Trash2,
  Play,
  Edit2,
  ChevronRight,
  Droplet,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';

interface SampleCardProps {
  sample: SampleItem;
  index: number;
  isActive: boolean;
  canDelete: boolean;
  canDuplicate: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onEvaluate: () => void;
  onUpdateName: (name: string) => void;
}

export const SampleCard: React.FC<SampleCardProps> = ({
  sample,
  index,
  isActive,
  canDelete,
  canDuplicate,
  onSelect,
  onDelete,
  onDuplicate,
  onEvaluate,
  onUpdateName,
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [nameInput, setNameInput] = React.useState(sample.name);

  const filledCount = Object.values(sample.inputs).filter(
    (v: any) => v && v.value !== '' && v.value !== undefined
  ).length;

  const isFullyConfigured = Boolean(sample.categoryId && sample.subcategoryId);
  const isEvaluated = sample.isEvaluated && sample.summary !== null;
  const isCompliant = sample.summary?.overallStatus === 'GLOBAL_COMPLIANT';

  const handleSaveName = () => {
    setIsEditingName(false);
    if (nameInput.trim()) {
      onUpdateName(nameInput.trim());
    } else {
      setNameInput(sample.name);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`group relative rounded-2xl p-4 transition-all duration-200 border cursor-pointer backdrop-blur-xl flex flex-col justify-between ${
        isActive
          ? 'bg-slate-900/90 border-cyan-400/60 shadow-xl shadow-cyan-950/50 ring-2 ring-cyan-400/20'
          : 'bg-slate-950/60 hover:bg-slate-900/60 border-white/10 hover:border-white/20 shadow-md'
      }`}
    >
      {/* Top row: Badge, Editable Title, Actions */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                isActive
                  ? 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-sm'
                  : 'bg-white/10 text-slate-300'
              }`}
            >
              #{index + 1}
            </span>

            {isEditingName ? (
              <input
                type="text"
                value={nameInput}
                autoFocus
                onChange={e => setNameInput(e.target.value)}
                onBlur={handleSaveName}
                onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                onClick={e => e.stopPropagation()}
                className="text-xs font-bold text-white bg-slate-950 border border-cyan-400 rounded-lg px-2 py-0.5 focus:outline-none w-36 sm:w-44"
              />
            ) : (
              <div
                className="flex items-center gap-1 text-xs font-bold text-white group-hover:text-cyan-300 transition-colors"
                title="Haga clic en el lápiz para editar el nombre"
              >
                <span className="truncate max-w-[130px] sm:max-w-[170px]">
                  {sample.name || `Muestra ${index + 1}`}
                </span>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setIsEditingName(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-0.5 transition-opacity"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>

          {/* Quick Actions (Duplicate, Delete) */}
          <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={onDuplicate}
              disabled={!canDuplicate}
              className={`p-1.5 rounded-lg text-xs transition ${
                canDuplicate
                  ? 'text-slate-400 hover:text-cyan-300 hover:bg-white/10'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title={
                canDuplicate
                  ? 'Duplicar muestra y sus parámetros'
                  : 'Límite de 10 muestras alcanzado'
              }
            >
              <Copy className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={onDelete}
              disabled={!canDelete}
              className={`p-1.5 rounded-lg text-xs transition ${
                canDelete
                  ? 'text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                  : 'text-slate-600 cursor-not-allowed'
              }`}
              title={
                canDelete
                  ? 'Eliminar esta muestra'
                  : 'Se requiere al menos 1 muestra activa'
              }
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Subcategory & Metadata tags */}
        <div className="space-y-1 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 text-cyan-300 font-semibold truncate">
            <Layers className="h-3 w-3 shrink-0 text-cyan-400" />
            <span className="truncate">
              {sample.categoryId && sample.subcategoryId
                ? `${sample.subcategoryId} (${sample.categoryId})`
                : '⚠️ Sin categoría configurada'}
            </span>
          </div>

          {sample.metadata.waterBody && (
            <div className="flex items-center gap-1.5 text-slate-400 truncate text-[11px]">
              <Droplet className="h-3 w-3 shrink-0 text-blue-400" />
              <span className="truncate">{sample.metadata.waterBody}</span>
            </div>
          )}

          {sample.metadata.location && (
            <div className="flex items-center gap-1.5 text-slate-400 truncate text-[11px]">
              <MapPin className="h-3 w-3 shrink-0 text-teal-400" />
              <span className="truncate">{sample.metadata.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Status & Evaluation button */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
        <div>
          {isEvaluated && isFullyConfigured && sample.summary && sample.summary.totalEvaluated > 0 ? (
            <div className="flex items-center gap-1.5">
              {isCompliant ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  <ShieldCheck className="h-3 w-3" />
                  CONFORME
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  <AlertOctagon className="h-3 w-3" />
                  {sample.summary?.transgresionCount} NO CONFORME
                </span>
              )}
              <span className="text-[10px] text-slate-400 font-mono">
                {sample.summary?.compliancePercentage.toFixed(0)}%
              </span>
            </div>
          ) : !isFullyConfigured ? (
            <div className="text-[11px] text-rose-400 flex items-center gap-1 font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 inline-block" />
              <span>Sin categoría</span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
              <span>{filledCount > 0 ? `${filledCount} parám. registrados` : '0 parám. (mín. 1)'}</span>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            onEvaluate();
          }}
          disabled={!isFullyConfigured || filledCount === 0}
          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 transition ${
            !isFullyConfigured || filledCount === 0
              ? 'bg-white/5 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-sm shadow-cyan-500/20 active:scale-95'
          }`}
          title={
            !isFullyConfigured
              ? 'No se puede realizar el análisis: Requiere configurar categoría y subcategoría'
              : filledCount === 0
              ? 'No se puede realizar el análisis: Ingrese como mínimo un parámetro en la matriz'
              : 'Evaluar esta muestra contra el ECA'
          }
        >
          <Play className="h-2.5 w-2.5 fill-current" />
          <span>{isEvaluated && isFullyConfigured && filledCount > 0 ? 'Re-evaluar' : 'Evaluar'}</span>
        </button>
      </div>
    </div>
  );
};
