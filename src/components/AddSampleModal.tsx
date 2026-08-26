import React, { useState, useEffect, useRef } from 'react';
import { Layers, Plus, X, Tag } from 'lucide-react';

interface AddSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (sampleName: string) => void;
  defaultSampleName: string;
  currentCount: number;
  maxSamples: number;
}

export const AddSampleModal: React.FC<AddSampleModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  defaultSampleName,
  currentCount,
  maxSamples,
}) => {
  const [name, setName] = useState(defaultSampleName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setName(defaultSampleName);
      // Auto focus and select input text on open
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
    }
  }, [isOpen, defaultSampleName]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || defaultSampleName || `Muestra ${currentCount + 1}`;
    onConfirm(finalName);
  };

  return (
    <div
      id="modal-add-sample-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in-50 duration-200"
      onClick={onClose}
    >
      <div
        id="modal-add-sample-card"
        onClick={e => e.stopPropagation()}
        className="bg-slate-900/95 border border-cyan-500/40 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl shadow-cyan-950/60 relative overflow-hidden text-left animate-in zoom-in-95 duration-200"
      >
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Layers className="h-5 w-5 stroke-[2.2]" />
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">
                Nueva Muestra Ambiental
              </h2>
              <span className="text-[11px] text-cyan-300 font-medium">
                Muestra #{currentCount + 1} de {maxSamples}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition cursor-pointer"
            title="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300/90 leading-relaxed mb-5 relative z-10">
          Asigne un nombre identificador para este punto de monitoreo o muestra de agua. Podrá editarlo o complementarlo más adelante.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label
              htmlFor="input-new-sample-name"
              className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center gap-1.5"
            >
              <Tag className="h-3 w-3 text-cyan-400" />
              <span>Nombre de la Muestra</span>
            </label>
            <input
              ref={inputRef}
              id="input-new-sample-name"
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej. Muestra 1, Río Rímac PM-01, Efluente A..."
              className="w-full text-xs sm:text-sm px-4 py-3 bg-slate-950/80 border border-cyan-500/40 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition shadow-inner font-medium"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              id="btn-confirm-add-sample"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-4 w-4 stroke-[2.5]" />
              <span>Crear Muestra</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
