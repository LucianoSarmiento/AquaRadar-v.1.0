import React from 'react';
import { SavedEvaluation } from '../types';
import { exportToExcel, exportToPDF } from '../utils/exportUtils';
import { X, Trash2, RotateCcw, FileText, FileSpreadsheet, History, Calendar } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedEvaluations: SavedEvaluation[];
  onRestore: (item: SavedEvaluation) => void;
  onDelete: (id: string) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  savedEvaluations,
  onRestore,
  onDelete,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900/85 backdrop-blur-2xl rounded-2xl shadow-2xl max-w-3xl w-full border border-white/20 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-950/60 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-md shadow-cyan-500/20">
              <History className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Historial de Evaluaciones Guardadas
              </h3>
              <p className="text-xs text-slate-300">
                {savedEvaluations.length} evaluación(es) en almacenamiento local
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {savedEvaluations.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                <History className="h-6 w-6 stroke-1" />
              </div>
              <p className="text-slate-300 font-medium">No tiene evaluaciones guardadas en este navegador.</p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Cuando realice una evaluación, presione el botón "Guardar" para conservarla y consultarla luego.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedEvaluations.map(item => {
                const isPass = item.summary.overallStatus === 'GLOBAL_COMPLIANT';
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            isPass
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          {isPass ? 'CONFORME' : `${item.summary.transgresionCount} TRANSGRESIÓN(ES)`}
                        </span>
                        <span className="font-bold text-white text-xs">
                          {item.metadata.sampleCode || 'Muestra sin código'}
                        </span>
                        <span className="text-[11px] text-cyan-300">
                          • {item.summary.subcategoryCode}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-300">
                        {item.metadata.waterBody ? `${item.metadata.waterBody} — ` : ''}
                        {item.metadata.location || 'Sin punto especificado'}
                      </div>

                      <div className="text-[10px] text-slate-400 flex items-center gap-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-cyan-400" />
                          {new Date(item.savedAt).toLocaleString('es-PE')}
                        </span>
                        <span>• {item.summary.compliantCount}/{item.summary.totalEvaluated} conformes ({item.summary.compliancePercentage.toFixed(0)}%)</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => {
                          onRestore(item);
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-md shadow-blue-500/20 active:scale-98"
                        title="Cargar esta evaluación en la pantalla"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Cargar</span>
                      </button>

                      <button
                        onClick={() => exportToPDF(item.summary, item.metadata)}
                        className="p-2 rounded-xl bg-white/10 border border-white/15 text-cyan-300 hover:bg-white/20 transition backdrop-blur-md active:scale-98"
                        title="Exportar a PDF"
                      >
                        <FileText className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => exportToExcel(item.summary, item.metadata)}
                        className="p-2 rounded-xl bg-white/10 border border-white/15 text-emerald-300 hover:bg-white/20 transition backdrop-blur-md active:scale-98"
                        title="Exportar a Excel"
                      >
                        <FileSpreadsheet className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-2 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 transition backdrop-blur-md active:scale-98"
                        title="Eliminar de historial"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between">
          {savedEvaluations.length > 0 ? (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Vaciar Historial</span>
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/15 transition backdrop-blur-md active:scale-98"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
