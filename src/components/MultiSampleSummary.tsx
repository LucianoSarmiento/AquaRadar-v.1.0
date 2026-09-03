import React from 'react';
import { SampleItem } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  Plus,
  Play,
  Layers,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Percent,
  Droplets,
  ShieldCheck,
  AlertOctagon,
  Eye,
} from 'lucide-react';

interface MultiSampleSummaryProps {
  samples: SampleItem[];
  activeSampleId: string;
  onSelectSample: (id: string) => void;
  onNavigateToTransgression?: (sampleId: string, paramName: string) => void;
  onAddSample: () => void;
  onEvaluateAll: () => void;
  onExportMultiExcel: () => void;
  onExportMultiPDF: () => void;
  maxSamplesReached: boolean;
}

export const MultiSampleSummary: React.FC<MultiSampleSummaryProps> = ({
  samples,
  activeSampleId,
  onSelectSample,
  onNavigateToTransgression,
  onAddSample,
  onEvaluateAll,
  onExportMultiExcel,
  onExportMultiPDF,
  maxSamplesReached,
}) => {
  const totalSamples = samples.length;
  const evaluatedSamples = samples.filter(s => s.isEvaluated && s.summary !== null);
  const evaluatedCount = evaluatedSamples.length;

  const compliantSamples = evaluatedSamples.filter(
    s => s.summary?.overallStatus === 'GLOBAL_COMPLIANT'
  );
  const transgressedSamples = evaluatedSamples.filter(
    s => s.summary?.overallStatus === 'GLOBAL_TRANSGRESSED'
  );

  const totalParamsEvaluated = evaluatedSamples.reduce(
    (acc, s) => acc + (s.summary?.totalEvaluated || 0),
    0
  );
  const totalCompliantParams = evaluatedSamples.reduce(
    (acc, s) => acc + (s.summary?.compliantCount || 0),
    0
  );
  const totalTransgressionParams = evaluatedSamples.reduce(
    (acc, s) => acc + (s.summary?.transgresionCount || 0),
    0
  );

  const globalComplianceRate =
    totalParamsEvaluated > 0
      ? (totalCompliantParams / totalParamsEvaluated) * 100
      : 100;

  // Extract all critical transgressions across all samples
  const allTransgressions: {
    sampleId: string;
    sampleName: string;
    sampleCode?: string;
    paramName: string;
    valueText: string;
    limitText: string;
    percent?: number;
    details: string;
  }[] = [];

  evaluatedSamples.forEach(s => {
    if (s.summary) {
      s.summary.results
        .filter(r => r.status === 'TRANSGREDE')
        .forEach(r => {
          allTransgressions.push({
            sampleId: s.id,
            sampleName: s.name || s.metadata.sampleCode || 'Muestra',
            sampleCode: s.metadata.sampleCode,
            paramName: r.parameterName,
            valueText: `${r.inputValue} ${r.inputUnit}`,
            limitText: r.normativeText,
            percent: r.percentageOfLimit,
            details: r.details,
          });
        });
    }
  });

  return (
    <section className="bg-slate-900/70 backdrop-blur-2xl rounded-2xl border border-white/15 p-4 sm:p-6 shadow-2xl shadow-black/40 space-y-5 sm:space-y-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of Aggregated Summary */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 relative z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 p-0.5 shadow-lg shadow-cyan-500/25 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
              <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-300 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h2 className="text-sm sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                Panel General de Muestras Ambientales
              </h2>
              <span className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {totalSamples} / 10 Muestras
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 leading-tight sm:leading-normal">
              Gestión simultánea y evaluación comparativa contra los Estándares de Calidad Ambiental (D.S. 004-2017-MINAM)
            </p>
          </div>
        </div>

        {/* Action Controls for Batch Operations */}
        <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 pt-1 lg:pt-0">
          {/* Add Sample Button */}
          <button
            id="btn-add-sample-header"
            onClick={onAddSample}
            disabled={maxSamplesReached}
            className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ${
              maxSamplesReached
                ? 'bg-white/5 text-slate-500 border border-white/10 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-cyan-500/20 border border-cyan-300/40'
            }`}
            title={
              maxSamplesReached
                ? 'Límite máximo de 10 muestras alcanzado'
                : 'Agregar una nueva muestra ambiental (hasta 10)'
            }
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
            <span className="hidden sm:inline">{maxSamplesReached ? 'Máx. 10 Muestras' : 'Agregar Muestra'}</span>
            <span className="sm:hidden">{maxSamplesReached ? 'Máx. 10' : 'Muestra'}</span>
          </button>

          {/* Evaluate All Samples */}
          <button
            id="btn-evaluate-all-samples"
            onClick={onEvaluateAll}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-emerald-500/20 border border-emerald-300/40 transition-all active:scale-95 cursor-pointer"
            title="Evaluar todas las muestras ingresadas en un solo clic"
          >
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-slate-950" />
            <span className="hidden sm:inline">Evaluar Todo</span>
            <span className="sm:hidden">Evaluar</span>
          </button>

          {/* Export Multi Excel */}
          <button
            id="btn-export-multi-excel"
            onClick={onExportMultiExcel}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
            title="Descargar matriz consolidada de todas las muestras en Excel"
          >
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Excel Multimuestra</span>
            <span className="sm:hidden">Excel</span>
          </button>

          {/* Export Multi PDF */}
          <button
            id="btn-export-multi-pdf"
            onClick={onExportMultiPDF}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-semibold border border-white/15 transition-all flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
            title="Descargar informe completo en PDF con todas las muestras"
          >
            <FileText className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="hidden sm:inline">Reporte PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
        </div>
      </div>

      {/* Aggregate KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 relative z-10">
        {/* Card 1: Total Muestras & Estado de Evaluación */}
        <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-white/10 shadow-lg flex flex-col justify-between">
          <div className="text-slate-400 text-[11px] sm:text-xs font-medium flex items-center justify-between">
            <span className="truncate">Muestras Activas</span>
            <Layers className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-white">{totalSamples}</span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              ({evaluatedCount} evaluadas)
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
            Capacidad: {10 - totalSamples} disponibles
          </div>
        </div>

        {/* Card 2: Muestras Conformes */}
        <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-emerald-500/25 shadow-lg flex flex-col justify-between">
          <div className="text-emerald-400 text-[11px] sm:text-xs font-medium flex items-center justify-between">
            <span className="truncate">Conformes</span>
            <ShieldCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-emerald-400">
              {compliantSamples.length}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              de {evaluatedCount || totalSamples}
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-emerald-300/80 mt-1">
            100% de parámetros en norma
          </div>
        </div>

        {/* Card 3: Muestras con Transgresiones */}
        <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-rose-500/25 shadow-lg flex flex-col justify-between">
          <div className="text-rose-400 text-[11px] sm:text-xs font-medium flex items-center justify-between">
            <span className="truncate">Transgresiones</span>
            <AlertOctagon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-rose-400">
              {transgressedSamples.length}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              muestras
            </span>
          </div>
          <div className="text-[10px] sm:text-[11px] text-rose-300/80 mt-1">
            {totalTransgressionParams} parámetro(s) fuera de límite
          </div>
        </div>

        {/* Card 4: Tasa Global de Cumplimiento */}
        <div className="bg-slate-950/60 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border border-cyan-500/25 shadow-lg flex flex-col justify-between">
          <div className="text-cyan-300 text-[11px] sm:text-xs font-medium flex items-center justify-between">
            <span className="truncate">Tasa Cumplimiento</span>
            <Percent className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-400 shrink-0" />
          </div>
          <div className="mt-1.5 sm:mt-2 flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-xl sm:text-2xl font-black text-cyan-300">
              {evaluatedCount > 0 ? `${globalComplianceRate.toFixed(1)}%` : '—'}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-400">
              ({totalCompliantParams}/{totalParamsEvaluated || 0})
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                globalComplianceRate === 100
                  ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50'
                  : globalComplianceRate >= 75
                  ? 'bg-amber-400'
                  : 'bg-rose-400 shadow-sm shadow-rose-500/50'
              }`}
              style={{ width: `${evaluatedCount > 0 ? globalComplianceRate : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Critical Transgressions Alert Box (if any) */}
      {allTransgressions.length > 0 && (
        <div className="bg-rose-950/30 border border-rose-500/30 rounded-2xl p-4 text-xs space-y-2.5 relative z-10 backdrop-blur-md">
          <div className="flex items-center justify-between text-rose-300 font-bold">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
              <span>
                Alerta de Transgresiones Críticas Identificadas ({allTransgressions.length})
              </span>
            </div>
            <span className="text-[10px] text-rose-400 font-mono">D.S. N° 004-2017-MINAM</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
            {allTransgressions.slice(0, 6).map((t, idx) => (
              <button
                key={idx}
                type="button"
                id={`transgression-alert-card-${idx}`}
                onClick={() => {
                  if (onNavigateToTransgression) {
                    onNavigateToTransgression(t.sampleId, t.paramName);
                  } else {
                    onSelectSample(t.sampleId);
                  }
                }}
                className="w-full text-left bg-slate-950/70 hover:bg-slate-900/95 border border-rose-500/30 hover:border-rose-400 rounded-xl p-3 hover:shadow-lg hover:shadow-rose-950/40 transition-all duration-200 cursor-pointer flex flex-col justify-between group active:scale-[0.99] focus:outline-none focus:ring-1 focus:ring-rose-400/50"
                title={`Ver transgresión de ${t.paramName} en el panel detallado de ${t.sampleName}`}
              >
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <span className="font-bold text-white group-hover:text-rose-200 transition-colors truncate max-w-[170px]">
                    {t.paramName}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-bold border border-rose-500/30 shrink-0">
                    {t.percent ? `${t.percent.toFixed(0)}%` : 'Excede'}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 leading-snug">
                  Medido: <span className="font-mono text-white font-semibold">{t.valueText}</span> vs Límite:{' '}
                  <span className="font-mono text-cyan-300">{t.limitText}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between">
                  <span className="text-cyan-300 font-medium truncate max-w-full">
                    {t.sampleName}
                  </span>
                </div>
              </button>
            ))}
          </div>
          {allTransgressions.length > 6 && (
            <p className="text-[11px] text-rose-300/80 text-right italic">
              + {allTransgressions.length - 6} transgresiones adicionales en el reporte consolidado
            </p>
          )}
        </div>
      )}
    </section>
  );
};
