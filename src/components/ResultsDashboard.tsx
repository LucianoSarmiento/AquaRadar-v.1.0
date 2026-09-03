import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { MarkdownView } from './MarkdownView';
import {
  EvaluatedParamResult,
  SampleEvaluationSummary,
  SampleMetadata,
  SampleItem,
} from '../types';
import {
  exportToExcel,
  exportToPDF,
  exportReportToWord,
  exportTechnicalReportPDF,
} from '../utils/exportUtils';
import { generateStandardizedTechnicalReport } from '../utils/reportGenerator';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileSpreadsheet,
  FileText,
  Bookmark,
  Sparkles,
  RefreshCw,
  Info,
  Filter,
  Check,
  Copy,
  ChevronRight,
  ShieldCheck,
  AlertOctagon,
  TrendingUp,
  Percent,
  Waves,
  Layers,
  ArrowUp,
  FileDown,
  Download,
  FileCheck,
  Clock,
  Activity,
} from 'lucide-react';

const REPORT_GENERATION_STAGES = [
  {
    phase: 1,
    title: 'Recopilación de Matriz y Metadatos Analíticos',
    desc: 'Extrayendo mediciones de laboratorio, unidades estandarizadas y condiciones de campo...',
  },
  {
    phase: 2,
    title: 'Cotejo Normativo D.S. N° 004-2017-MINAM',
    desc: 'Verificando límites permisibles por Categoría y Subcategoría aplicable...',
  },
  {
    phase: 3,
    title: 'Redacción Técnico-Legal de las 12 Secciones',
    desc: 'Formulando dictamen técnico, análisis de transgresiones, conclusiones y recomendaciones...',
  },
  {
    phase: 4,
    title: 'Compilación y Formateo Final del Documento',
    desc: 'Estructurando tablas comparativas oficiales y formateo para exportación PDF y Word...',
  },
];

interface ResultsDashboardProps {
  summary: SampleEvaluationSummary;
  metadata: SampleMetadata;
  allSamples?: SampleItem[];
  activeSampleName?: string;
  onModifyInputs: () => void;
  onSaveToHistory: () => void;
  onScrollToGeneralPanel?: () => void;
  isSaved: boolean;
  initialTab?: 'OVERVIEW' | 'TABLE' | 'AI';
  initialStatusFilter?: 'ALL' | 'CUMPLE' | 'TRANSGREDE';
  highlightParamName?: string;
  navigationTrigger?: number;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  summary,
  metadata,
  allSamples,
  activeSampleName,
  onModifyInputs,
  onSaveToHistory,
  onScrollToGeneralPanel,
  isSaved,
  initialTab,
  initialStatusFilter,
  highlightParamName,
  navigationTrigger,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TABLE' | 'AI'>(initialTab || 'OVERVIEW');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CUMPLE' | 'TRANSGREDE'>(initialStatusFilter || 'ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightParam, setHighlightParam] = useState<string | undefined>(highlightParamName);

  // Sync tab if initialTab prop changes
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Sync status filter if initialStatusFilter prop changes
  useEffect(() => {
    if (initialStatusFilter) {
      setStatusFilter(initialStatusFilter);
    }
  }, [initialStatusFilter]);

  // When a direct navigation occurs, ensure table view, filter transgresiones, highlight and scroll
  useEffect(() => {
    if (navigationTrigger) {
      if (initialTab) setActiveTab(initialTab);
      if (initialStatusFilter) setStatusFilter(initialStatusFilter);
      if (highlightParamName) {
        setHighlightParam(highlightParamName);
        const timer = setTimeout(() => {
          setHighlightParam(undefined);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [navigationTrigger, initialTab, initialStatusFilter, highlightParamName]);

  // AI Interpretation & Technical Report state
  const [reportScope, setReportScope] = useState<'SINGLE' | 'ALL' | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [copiedAi, setCopiedAi] = useState(false);

  const isCompliant = summary.overallStatus === 'GLOBAL_COMPLIANT';
  const totalConfiguredSamples = allSamples?.length || 1;

  // Filtered results for the table
  const filteredResults = summary.results.filter(r => {
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    const matchesSearch =
      r.parameterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.group.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Chart data: params with numeric % of limit
  const chartData = summary.results
    .filter(r => r.percentageOfLimit !== undefined && r.percentageOfLimit > 0)
    .map(r => ({
      name:
        r.parameterName.length > 18
          ? r.parameterName.substring(0, 16) + '...'
          : r.parameterName,
      fullName: r.parameterName,
      percent: parseFloat((r.percentageOfLimit || 0).toFixed(1)),
      status: r.status,
      valueText: `${r.inputValue} ${r.inputUnit}`,
      limitText: r.normativeText,
    }))
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 12); // Top 12 for clean chart view

  // Handle AI analysis generation
  const handleGenerateAi = async (overrideScope?: 'SINGLE' | 'ALL') => {
    const targetScope = overrideScope || reportScope;
    setIsGeneratingAi(true);
    setAiError(null);
    setGenerationProgress(8);
    setCurrentStageIdx(0);

    // Validate single mode
    if (targetScope === 'SINGLE') {
      if (!summary?.categoryId || !summary?.subcategoryId) {
        setIsGeneratingAi(false);
        setAiError(
          'No se puede realizar el análisis: No se ha configurado una Categoría o Subcategoría de agua según el D.S. N° 004-2017-MINAM.'
        );
        return;
      }
      if (!summary?.results || summary.results.length === 0 || summary.totalEvaluated === 0) {
        setIsGeneratingAi(false);
        setAiError(
          'No se puede realizar el análisis: Debe ingresar como mínimo un (1) parámetro a evaluar en la matriz de resultados y medición analítica.'
        );
        return;
      }
    } else if (targetScope === 'ALL') {
      const validSamples = (allSamples || []).filter(
        s => s.categoryId && s.subcategoryId && s.summary && s.summary.totalEvaluated > 0
      );
      if (validSamples.length === 0) {
        setIsGeneratingAi(false);
        setAiError(
          'No se puede realizar el análisis multimuestra: Ninguna de las muestras cuenta con Categoría configurada y al menos un parámetro analítico evaluado.'
        );
        return;
      }
    }

    // Start animated progress interval
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        const next = Math.min(94, prev + Math.floor(Math.random() * 6) + 3);
        if (next < 25) setCurrentStageIdx(0);
        else if (next < 55) setCurrentStageIdx(1);
        else if (next < 85) setCurrentStageIdx(2);
        else setCurrentStageIdx(3);
        return next;
      });
    }, 280);

    try {
      let analysisText: string | null = null;

      try {
        const response = await fetch('/api/ai-interpretation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            summary,
            metadata,
            mode: targetScope === 'ALL' ? 'all' : 'single',
            samples: allSamples || [],
          }),
        });

        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json();
          if (data && data.analysis) {
            analysisText = data.analysis;
          }
        }
      } catch (networkOrApiErr) {
        console.warn('Backend API endpoint not available or returned non-JSON. Utilizing standardized regulatory engine fallback.', networkOrApiErr);
      }

      // If serverless/backend API didn't return text (e.g. static hosting or missing endpoint), run client-side generator
      if (!analysisText) {
        analysisText = generateStandardizedTechnicalReport({
          mode: targetScope === 'ALL' ? 'all' : 'single',
          summary,
          metadata,
          samples: allSamples || [],
        });
      }

      // Smooth completion
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setCurrentStageIdx(3);
      await new Promise(resolve => setTimeout(resolve, 600));

      setAiAnalysis(analysisText);
      setActiveTab('AI');
    } catch (err: any) {
      clearInterval(progressInterval);
      setAiError(err.message || 'No se pudo generar el informe técnico asistido.');
    } finally {
      clearInterval(progressInterval);
      setIsGeneratingAi(false);
    }
  };

  const handleCopyAi = () => {
    if (aiAnalysis) {
      navigator.clipboard.writeText(aiAnalysis);
      setCopiedAi(true);
      setTimeout(() => setCopiedAi(false), 2000);
    }
  };

  const handleExportWord = () => {
    if (!aiAnalysis) return;
    const code = metadata.sampleCode || activeSampleName || 'General';
    const scopeLabel = reportScope === 'ALL' ? 'Multimuestra' : 'Muestra';
    const fileName = `Informe_Tecnico_ECA_Agua_${scopeLabel}_${code.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.doc`;
    exportReportToWord(aiAnalysis, fileName);
  };

  const handleExportPdfReport = () => {
    if (!aiAnalysis) return;
    const code = metadata.sampleCode || activeSampleName || 'General';
    const scopeLabel = reportScope === 'ALL' ? 'Multimuestra' : 'Muestra';
    const fileName = `Informe_Tecnico_ECA_Agua_${scopeLabel}_${code.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`;
    exportTechnicalReportPDF(aiAnalysis, fileName);
  };


  return (
    <div id="panel-resultados-muestra" className="space-y-6 animate-in fade-in-50 duration-300 scroll-mt-24">
      {/* Top Banner Status - Clean, animated & atmospheric */}
      <div
        className={`rounded-2xl p-4 sm:p-6 border shadow-2xl backdrop-blur-2xl transition-all relative overflow-hidden ${
          isCompliant
            ? 'bg-slate-900/80 text-white border-emerald-500/50 shadow-emerald-950/40'
            : 'bg-slate-900/80 text-white border-rose-500/50 shadow-rose-950/40'
        }`}
      >
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 sm:gap-5 relative z-10">
          <div className="flex items-start gap-3 sm:gap-4">
            <div
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg shrink-0 transition-transform ${
                isCompliant
                  ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-emerald-500/30 animate-pulse'
                  : 'bg-rose-500/20 border border-rose-400/40 text-rose-300 shadow-rose-500/30 animate-pulse'
              }`}
            >
              {isCompliant ? (
                <ShieldCheck className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-400" />
              ) : (
                <AlertOctagon className="h-6 w-6 sm:h-8 sm:w-8 text-rose-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span
                  className={`px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase ${
                    isCompliant
                      ? 'bg-emerald-400 text-slate-950 shadow-sm'
                      : 'bg-rose-500 text-white shadow-sm'
                  }`}
                >
                  {isCompliant ? 'CONFORME CON EL ECA' : 'TRANSGREDE EL ECA'}
                </span>
                <span className="text-[11px] sm:text-xs text-cyan-300 font-mono font-semibold">
                  • {summary.subcategoryCode} ({summary.categoryName})
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-bold mt-1 text-white leading-snug">
                {isCompliant
                  ? 'Todos los parámetros cumplen con los Estándares de Calidad Ambiental evaluados.'
                  : `Se identificaron ${summary.transgresionCount} parámetro(s) que superan los límites del D.S. N° 004-2017-MINAM.`}
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Evaluado para: <strong className="text-cyan-300">{summary.subcategoryName}</strong>.
                {metadata.sampleCode && ` Muestra: ${metadata.sampleCode}.`}
                {metadata.waterBody && ` Cuerpo: ${metadata.waterBody}.`}
              </p>
            </div>
          </div>

          {/* Quick Action Export Buttons & Interactive Yellow Banner */}
          <div className="flex flex-col items-start xl:items-end gap-2.5 self-start xl:self-center shrink-0 w-full sm:w-auto">
            <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
              <button
                id="btn-export-pdf"
                onClick={() => exportToPDF(summary, metadata, aiAnalysis || undefined)}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-bold border border-white/20 transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
                title="Descargar informe oficial en formato PDF"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-300 shrink-0" />
                <span className="hidden sm:inline">Reporte PDF</span>
                <span className="sm:hidden">PDF</span>
              </button>

              <button
                id="btn-export-excel"
                onClick={() => exportToExcel(summary, metadata)}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-bold border border-white/20 transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
                title="Exportar matriz de datos a Excel"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                <span className="hidden sm:inline">Excel XLSX</span>
                <span className="sm:hidden">Excel</span>
              </button>

              <button
                id="btn-save-history"
                onClick={onSaveToHistory}
                disabled={isSaved}
                className={`px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-bold border transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 ${
                  isSaved
                    ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40 cursor-default'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-pointer'
                }`}
                title="Guardar en historial"
              >
                <Bookmark className="h-3.5 w-3.5 shrink-0" />
                <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
              </button>

              <button
                id="btn-modify-inputs"
                onClick={onModifyInputs}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-[11px] sm:text-xs transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 border border-cyan-300/40 active:scale-95 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 shrink-0" />
                <span>Modificar Datos</span>
              </button>
            </div>

            {/* Interactive Yellow Banner: Redirect to General Multi-Sample Panel */}
            <button
              type="button"
              id="btn-scroll-to-general-panel"
              onClick={() => {
                if (onScrollToGeneralPanel) {
                  onScrollToGeneralPanel();
                } else {
                  const el = document.getElementById('panel-general-muestras');
                  if (el) {
                    const headerOffset = 76;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: Math.max(0, offsetPosition),
                      behavior: 'smooth',
                    });
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }
              }}
              className="group/hint inline-flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/50 hover:border-amber-300 text-amber-200 hover:text-amber-100 text-[11px] sm:text-xs font-medium backdrop-blur-md transition-all shadow-md shadow-amber-950/40 active:scale-95 cursor-pointer text-left leading-snug"
              title="Desplazarse a la vista del Panel General de Muestras Ambientales"
            >
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping shrink-0" />
              <Layers className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span>
                Para reportes generales de todas las muestras, desplácese a la vista del{' '}
                <strong className="text-amber-300 underline underline-offset-2 decoration-amber-400/60 font-bold group-hover/hint:text-white">
                  Panel General de Muestras Ambientales
                </strong>
              </span>
              <ArrowUp className="h-3.5 w-3.5 text-amber-300 shrink-0 transition-transform group-hover/hint:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Sleek Living Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-5 border border-white/15 shadow-xl">
          <div className="text-[11px] sm:text-xs font-medium text-slate-300 mb-1 truncate">Parámetros Evaluados</div>
          <div className="text-xl sm:text-2xl font-black text-white">{summary.totalEvaluated}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">Con valor registrado</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-5 border border-emerald-500/30 shadow-xl">
          <div className="text-[11px] sm:text-xs font-medium text-emerald-400 mb-1 flex items-center gap-1.5 truncate">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Conformes con ECA</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400">{summary.compliantCount}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">Dentro del límite legal</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-5 border border-rose-500/30 shadow-xl">
          <div className="text-[11px] sm:text-xs font-medium text-rose-400 mb-1 flex items-center gap-1.5 truncate">
            <XCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Transgresiones</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-400">{summary.transgresionCount}</div>
          <div className="text-[10px] sm:text-[11px] text-slate-400 mt-1">Superan o incumplen</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-3.5 sm:p-5 border border-cyan-500/30 shadow-xl">
          <div className="text-[11px] sm:text-xs font-medium text-cyan-300 mb-1 flex items-center gap-1.5 truncate">
            <Percent className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Tasa Cumplimiento</span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-cyan-300">
            {summary.compliancePercentage.toFixed(1)}%
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                summary.compliancePercentage === 100
                  ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50'
                  : summary.compliancePercentage >= 75
                  ? 'bg-amber-400'
                  : 'bg-rose-400 shadow-sm shadow-rose-500/50'
              }`}
              style={{ width: `${summary.compliancePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Tabs: Overview & Visualizer / Matriz Detallada / Asistente IA */}
      <div className="flex items-center gap-1.5 sm:gap-2 border-b border-white/10 pb-2.5 overflow-x-auto scrollbar-none max-w-full">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'OVERVIEW'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Gráfico Porcentual ECA</span>
          <span className="sm:hidden">Gráfico ECA</span>
        </button>

        <button
          onClick={() => setActiveTab('TABLE')}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
            activeTab === 'TABLE'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" />
          <span className="hidden sm:inline">Matriz Completa ({summary.results.length})</span>
          <span className="sm:hidden">Matriz ({summary.results.length})</span>
        </button>

        <button
          id="tab-btn-ai-assistant"
          onClick={() => setActiveTab('AI')}
          className={`relative group px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer overflow-hidden whitespace-nowrap shrink-0 ${
            activeTab === 'AI'
              ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 text-slate-950 shadow-lg shadow-cyan-500/40 border border-cyan-200 font-extrabold scale-[1.01]'
              : 'bg-gradient-to-r from-cyan-950/70 via-slate-900/90 to-blue-950/70 hover:from-cyan-900/80 hover:via-slate-800/90 hover:to-blue-900/80 text-cyan-200 hover:text-white border border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.22)] hover:shadow-[0_0_24px_rgba(6,182,212,0.45)] active:scale-95'
          }`}
        >
          {/* Shimmer light beam animation when inactive */}
          {activeTab !== 'AI' && (
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent pointer-events-none" />
          )}

          {/* Pulsing indicator beacon */}
          {activeTab !== 'AI' ? (
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
            </span>
          ) : null}

          <Sparkles
            className={`h-3.5 w-3.5 transition-all duration-300 shrink-0 ${
              activeTab === 'AI'
                ? 'text-slate-950 animate-bounce'
                : 'text-cyan-300 animate-pulse group-hover:rotate-12 group-hover:scale-125'
            }`}
          />
          <span className="tracking-wide hidden sm:inline">Interpretación Asistida</span>
          <span className="tracking-wide sm:hidden">Informe IA</span>

          {/* Highlight Mini-Badge */}
          <span
            className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider transition-all duration-300 shrink-0 ${
              activeTab === 'AI'
                ? 'bg-slate-950/80 text-cyan-300 border border-slate-950/20'
                : 'bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 shadow-xs shadow-cyan-400/50 group-hover:shadow-cyan-300/70'
            }`}
          >
            IA
          </span>
        </button>
      </div>

      {/* Tab 1: Chart View */}
      {activeTab === 'OVERVIEW' && chartData.length > 0 && (
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/15 shadow-xl animate-in fade-in-50 duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                Comparación Porcentual respecto al Límite ECA (100% = Límite Máximo)
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Valores &gt; 100% indican transgresión del estándar normativo.
              </p>
            </div>
            <div className="flex items-center gap-3.5 text-xs">
              <span className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-3 h-3 rounded-xs bg-emerald-500 inline-block shadow-sm"></span> ≤ 100% Conforme
              </span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block shadow-sm"></span> &gt; 100% Transgrede
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.08)" />
                <XAxis
                  dataKey="name"
                  angle={-30}
                  textAnchor="end"
                  interval={0}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <YAxis
                  unit="%"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-950/95 backdrop-blur-xl text-white p-3.5 rounded-xl border border-white/20 shadow-2xl text-xs space-y-1.5">
                          <p className="font-bold text-cyan-300">{data.fullName}</p>
                          <p className="text-slate-200">
                            Valor Medido: <span className="font-semibold text-white">{data.valueText}</span>
                          </p>
                          <p className="text-slate-200">
                            Límite ECA: <span className="font-semibold text-white">{data.limitText}</span>
                          </p>
                          <p className="text-slate-200">
                            Porcentaje del Límite:{' '}
                            <strong className={data.percent > 100 ? 'text-rose-400' : 'text-emerald-400'}>
                              {data.percent}%
                            </strong>
                          </p>
                          <p
                            className={`font-bold ${
                              data.status === 'CUMPLE' ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {data.status === 'CUMPLE' ? '✓ CUMPLE CON EL ECA' : '✗ TRANSGREDE EL ECA'}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={100}
                  stroke="#f43f5e"
                  strokeDasharray="3 3"
                  strokeWidth={2}
                  label={{ value: 'Límite ECA 100%', fill: '#f43f5e', fontSize: 10, position: 'top' }}
                />
                <Bar dataKey="percent" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.percent > 100 ? '#f43f5e' : '#10b981'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Tab 2: Detailed Technical Table */}
      {activeTab === 'TABLE' && (
        <div id="panel-matriz-detallada" className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 p-5 sm:p-6 animate-in fade-in-50 duration-300 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
            <div>
              <h3 className="text-sm font-bold text-white">
                Matriz Detallada de Parámetros Evaluados
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Trazabilidad legal referenciada con el Anexo D.S. N° 004-2017-MINAM
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center bg-slate-950/70 border border-white/10 p-1 rounded-xl text-xs font-medium backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    statusFilter === 'ALL'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todos ({summary.results.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('TRANSGREDE')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    statusFilter === 'TRANSGREDE'
                      ? 'bg-rose-600 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Transgresiones ({summary.transgresionCount})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('CUMPLE')}
                  className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                    statusFilter === 'CUMPLE'
                      ? 'bg-emerald-600 text-white shadow-sm font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Conformes ({summary.compliantCount})
                </button>
              </div>

              <input
                type="text"
                placeholder="Filtrar en tabla..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="text-xs px-3 py-1.5 bg-slate-950/60 border border-white/15 rounded-xl text-white placeholder-slate-400 w-36 sm:w-48 focus:outline-none focus:border-cyan-400 backdrop-blur-md"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-white/15 rounded-xl bg-slate-950/40 backdrop-blur-md shadow-xl scrollbar-thin">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-white/[0.06] text-slate-200 font-bold border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3.5 min-w-[150px]">Parámetro</th>
                  <th className="py-3 px-3.5 min-w-[110px]">Valor Medido</th>
                  <th className="py-3 px-3.5 min-w-[110px]">Límite ECA</th>
                  <th className="py-3 px-3.5 text-center min-w-[60px]">Pág.</th>
                  <th className="py-3 px-3.5 text-center min-w-[100px]">Condición</th>
                  <th className="py-3 px-3.5 text-center min-w-[70px]">% Límite</th>
                  <th className="py-3 px-3.5 min-w-[160px]">Detalle Técnico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                      No se encontraron parámetros con el filtro seleccionado.
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((r, idx) => {
                    const isPass = r.status === 'CUMPLE';
                    const isFail = r.status === 'TRANSGREDE';
                    const isHighlighted =
                      highlightParam &&
                      r.parameterName.trim().toLowerCase() === highlightParam.trim().toLowerCase();

                    return (
                      <tr
                        key={r.parameterId}
                        id={`param-row-${r.parameterId}`}
                        className={`transition-all duration-300 ${
                          isHighlighted
                            ? 'bg-rose-950/70 ring-2 ring-rose-500/80 shadow-lg shadow-rose-950/60'
                            : idx % 2 === 0
                            ? 'bg-white/[0.01]'
                            : 'bg-white/[0.03]'
                        } hover:bg-white/[0.08]`}
                      >
                        <td className="py-3 px-3.5 align-top font-semibold text-white">
                          {r.parameterName}
                          <div className="text-[10px] text-cyan-400/90 font-mono mt-0.5">
                            {r.subgroup ? `${r.group} • ${r.subgroup}` : r.group}
                          </div>
                        </td>

                        <td className="py-3 px-3.5 align-top">
                          <span className="font-mono font-semibold text-white">
                            {r.inputValue} {r.inputUnit}
                          </span>
                          {r.convertedValue !== undefined && r.inputUnit !== r.normativeUnit && (
                            <div className="text-[10px] text-cyan-300">
                              ≈ {r.convertedValue} {r.normativeUnit}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3.5 align-top font-mono text-cyan-300">
                          {r.normativeText}
                        </td>

                        <td className="py-3 px-3.5 align-top text-center font-mono text-slate-400">
                          {r.anexoPage ? `Pág. ${r.anexoPage}` : '-'}
                        </td>

                        <td className="py-3 px-3.5 align-top text-center">
                          {isPass && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs">
                              <CheckCircle2 className="h-3 w-3" />
                              CUMPLE
                            </span>
                          )}
                          {isFail && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs animate-pulse">
                              <XCircle className="h-3 w-3" />
                              TRANSGREDE
                            </span>
                          )}
                          {!isPass && !isFail && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-slate-400 bg-white/5 border border-white/10">
                              No evaluable
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-3.5 align-top text-center font-mono">
                          {r.percentageOfLimit !== undefined ? (
                            <span
                              className={`font-semibold ${
                                r.percentageOfLimit > 100
                                  ? 'text-rose-400 font-bold'
                                  : 'text-emerald-400'
                              }`}
                            >
                              {r.percentageOfLimit.toFixed(1)}%
                            </span>
                          ) : (
                            <span className="text-slate-500">—</span>
                          )}
                        </td>

                        <td className="py-3 px-3.5 align-top text-slate-300 text-[11px]">
                          <div>{r.details}</div>
                          {r.footnote && (
                            <div className="text-[10px] text-cyan-300/80 mt-1 italic">
                              Nota: {r.footnote}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: AI Assistant View */}
      {activeTab === 'AI' && (
        <div className="bg-slate-900/70 backdrop-blur-2xl rounded-2xl p-6 text-white border border-cyan-500/30 shadow-2xl shadow-cyan-950/30 animate-in fade-in-50 duration-300 space-y-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 border border-cyan-400/40 flex items-center justify-center text-slate-950 shadow-md shadow-blue-500/30 shrink-0 font-bold">
                <Sparkles className="h-5 w-5 text-slate-950" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Informe Técnico Oficial Asistido por Normativas Peruanas</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Estructura técnico-legal sustentada en la normativa peruana vigente, aplicable y actualizada.
                </p>
              </div>
            </div>

            {/* Scope Selection Controls & Yellow Guidance Alert */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 flex-wrap">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-950/70 p-1 sm:p-1.5 rounded-xl border border-white/10 shrink-0 overflow-x-auto scrollbar-none max-w-full">
                <div className="text-[10px] sm:text-[11px] font-semibold text-slate-400 px-1.5 sm:px-2 flex items-center gap-1 sm:gap-1.5 shrink-0">
                  <Filter className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-cyan-400" />
                  <span>Alcance:</span>
                </div>

                <button
                  type="button"
                  id="btn-scope-single"
                  onClick={() => {
                    setReportScope('SINGLE');
                    if (aiError) setAiError(null);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                    reportScope === 'SINGLE'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 font-black border border-cyan-300/40 scale-[1.01]'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                  title="Generar informe técnico exclusivamente para la muestra seleccionada"
                >
                  <Waves className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Muestra Activa ({metadata.sampleCode || activeSampleName || 'Actual'})</span>
                  <span className="sm:hidden">Muestra Actual ({metadata.sampleCode || activeSampleName || 'Act.'})</span>
                </button>

                <button
                  type="button"
                  id="btn-scope-all"
                  onClick={() => {
                    setReportScope('ALL');
                    if (aiError) setAiError(null);
                  }}
                  className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                    reportScope === 'ALL'
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-md shadow-blue-500/30 font-black border border-blue-400/40 scale-[1.01]'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white border border-transparent'
                  }`}
                  title="Generar informe técnico integral consolidando todas las muestras configuradas"
                >
                  <Layers className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                  <span className="hidden sm:inline">Todas las Muestras ({totalConfiguredSamples})</span>
                  <span className="sm:hidden">Todas ({totalConfiguredSamples})</span>
                </button>
              </div>

              {/* Interactive Yellow Prompt Banner that disappears with slow smooth fade-out once a scope is chosen */}
              <AnimatePresence>
                {!reportScope && (
                  <motion.div
                    key="scope-selection-prompt"
                    id="scope-selection-prompt"
                    initial={{ opacity: 0, x: -8, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0, 
                      scale: 1,
                      transition: { duration: 0.3, ease: 'easeOut' }
                    }}
                    exit={{ 
                      opacity: 0, 
                      x: 10, 
                      scale: 0.95,
                      filter: 'blur(2px)',
                      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-400/60 text-amber-200 text-[11px] sm:text-xs font-medium shadow-lg shadow-amber-950/40 backdrop-blur-md whitespace-normal sm:whitespace-nowrap leading-snug"
                  >
                    <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping shrink-0" />
                    <Info className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                    <span>Seleccione para cuántas muestras se va a realizar el informe</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Scope notice and Action Bar */}
          <div className="p-3 sm:p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] sm:text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-cyan-100/90">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="leading-snug">
                Modo actual:{' '}
                <strong className="text-white">
                  {reportScope === 'SINGLE'
                    ? `Informe individual para la muestra "${metadata.sampleCode || activeSampleName || 'Actual'}" (Subcategoría ${summary.subcategoryCode})`
                    : reportScope === 'ALL'
                    ? `Informe general consolidado integrando las ${totalConfiguredSamples} muestras configuradas en la matriz`
                    : 'Sin alcance seleccionado (elija arriba "Muestra Activa" o "Todas las Muestras")'}
                </strong>
              </span>
            </div>

            <button
              type="button"
              id="btn-generate-ai-analysis"
              onClick={() => {
                if (!reportScope) {
                  setAiError('Por favor seleccione el alcance del informe (Muestra Activa o Todas las Muestras) antes de generar el informe técnico.');
                  return;
                }
                handleGenerateAi();
              }}
              disabled={isGeneratingAi}
              className={`relative group px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl font-extrabold text-[11px] sm:text-xs transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden shrink-0 cursor-pointer active:scale-95 disabled:opacity-50 w-full sm:w-auto ${
                isGeneratingAi
                  ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/40 cursor-wait'
                  : 'bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 hover:from-cyan-900 hover:via-slate-800 hover:to-blue-900 text-cyan-200 hover:text-white border border-cyan-400/60 hover:border-cyan-300 shadow-[0_0_16px_rgba(6,182,212,0.25)] hover:shadow-[0_0_24px_rgba(6,182,212,0.5)]'
              }`}
            >
              {/* Shimmer light beam animation */}
              {!isGeneratingAi && (
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent pointer-events-none" />
              )}

              {/* Pulsing indicator beacon */}
              {!isGeneratingAi && (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                </span>
              )}

              {isGeneratingAi ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-cyan-300 shrink-0" />
                  <span>Generando informe...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5 text-cyan-300 animate-pulse group-hover:rotate-12 group-hover:scale-125 transition-transform shrink-0" />
                  <span className="tracking-wide hidden sm:inline">{aiAnalysis ? 'Regenerar Informe Técnico' : 'Generar Informe Técnico'}</span>
                  <span className="tracking-wide sm:hidden">{aiAnalysis ? 'Regenerar Informe' : 'Generar Informe'}</span>
                  
                  {/* Highlight Micro-Badge */}
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md tracking-wider bg-gradient-to-r from-cyan-400 to-teal-300 text-slate-950 shadow-xs shadow-cyan-400/50 group-hover:shadow-cyan-300/70 transition-all shrink-0">
                    OFICIAL
                  </span>
                </>
              )}
            </button>
          </div>

          {aiError && (
            <div className="p-4 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5">
              <AlertTriangle className="h-4 w-4 shrink-0 text-rose-400" />
              <span>{aiError}</span>
            </div>
          )}

          {isGeneratingAi ? (
            <div className="bg-slate-950/80 backdrop-blur-2xl rounded-2xl p-6 sm:p-10 border border-cyan-500/40 shadow-2xl shadow-cyan-950/50 space-y-6 text-center animate-in fade-in-50 duration-300">
              <div className="max-w-xl mx-auto space-y-6">
                {/* Animated Circular + Radial Progress Meter */}
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-2xl animate-pulse" />
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      className="text-slate-800/80"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 50}
                      strokeDashoffset={2 * Math.PI * 50 * (1 - generationProgress / 100)}
                      strokeLinecap="round"
                      stroke="url(#reportProgressGradient)"
                      fill="transparent"
                      className="transition-all duration-300 ease-out"
                    />
                    <defs>
                      <linearGradient id="reportProgressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Progress Percentage */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-white font-mono tracking-tight">
                      {generationProgress}%
                    </span>
                    <span className="text-[9px] font-black text-cyan-300 uppercase tracking-widest mt-0.5">
                      EN PROCESO
                    </span>
                  </div>
                </div>

                {/* Real-time Stage Description */}
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                    <Activity className="h-3 w-3 animate-pulse text-cyan-400" />
                    <span>Fase {currentStageIdx + 1} de 4</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {REPORT_GENERATION_STAGES[currentStageIdx]?.title}
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    {REPORT_GENERATION_STAGES[currentStageIdx]?.desc}
                  </p>
                </div>

                {/* Progress Bar & 4 Phase Steps */}
                <div className="space-y-3 pt-2">
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 transition-all duration-300"
                      style={{ width: `${generationProgress}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                    {REPORT_GENERATION_STAGES.map((stg, idx) => {
                      const isDone = currentStageIdx > idx || generationProgress >= 100;
                      const isCurrent = currentStageIdx === idx && generationProgress < 100;
                      return (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-xl border text-[11px] transition-all duration-300 ${
                            isDone
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                              : isCurrent
                              ? 'bg-cyan-950/60 border-cyan-400/60 text-cyan-100 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                              : 'bg-white/[0.02] border-white/5 text-slate-400'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            {isDone ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            ) : isCurrent ? (
                              <RefreshCw className="h-3.5 w-3.5 text-cyan-300 animate-spin shrink-0" />
                            ) : (
                              <span className="h-3.5 w-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[9px] font-mono shrink-0">
                                {idx + 1}
                              </span>
                            )}
                            <span className="truncate">Fase {idx + 1}</span>
                          </div>
                          <div className="text-[10px] text-slate-300/80 truncate">
                            {stg.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Note below the meter indicating that it may take a few minutes */}
              <div className="pt-4 border-t border-white/10">
                <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 border border-amber-400/50 text-amber-200 text-xs font-medium max-w-xl mx-auto shadow-lg shadow-amber-950/40 backdrop-blur-md text-left">
                  <Clock className="h-4 w-4 text-amber-300 shrink-0 animate-pulse" />
                  <p className="leading-relaxed">
                    <strong className="text-amber-100 font-bold">Aviso:</strong> La estructuración oficial del informe técnico puede demorar algunos minutos según la cantidad de parámetros y muestras a procesar.
                  </p>
                </div>
              </div>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-6">
              {/* Document Header Bar with Quick Export Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/80 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <FileCheck className="h-4 w-4 text-emerald-400" />
                  <span>
                    Informe generado correctamente para:{' '}
                    <strong className="text-cyan-300">
                      {reportScope === 'SINGLE' ? `Muestra ${metadata.sampleCode || activeSampleName || 'Actual'}` : `Consolidado (${totalConfiguredSamples} muestras)`}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAi}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-slate-200 border border-white/15 transition flex items-center gap-1.5 backdrop-blur-md cursor-pointer"
                  >
                    {copiedAi ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedAi ? 'Copiado' : 'Copiar Texto'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportPdfReport}
                    className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/30 cursor-pointer"
                    title="Exportar informe técnico a PDF con membrete y tablas estructuradas"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportWord}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
                    title="Exportar a Microsoft Word (.doc editable) con estilos y formato oficial"
                  >
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                    <span>Word (.doc)</span>
                  </button>
                </div>
              </div>

              {/* Main 12-Section Rendered Document */}
              <div className="bg-slate-950/90 rounded-2xl p-6 sm:p-8 border border-cyan-500/20 text-xs leading-relaxed text-slate-200 backdrop-blur-md shadow-2xl overflow-x-auto scrollbar-thin">
                <MarkdownView
                  content={aiAnalysis}
                  summary={summary}
                  samples={allSamples}
                  metadata={metadata}
                  scope={reportScope}
                />
              </div>

              {/* End-of-Report Action Footer with Prominent Export Buttons */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Download className="h-4 w-4 text-cyan-400" />
                      <span>Exportación Oficial del Informe Técnico</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Descargue el documento completo estructurado en formato no modificable o editable para revisión institucional.
                    </p>
                  </div>
                  <span className="text-[11px] text-slate-400 italic">
                    Conforme al D.S. N° 004-2017-MINAM
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Export PDF Button */}
                  <button
                    type="button"
                    id="btn-export-technical-pdf"
                    onClick={handleExportPdfReport}
                    className="group p-4 rounded-xl bg-gradient-to-br from-rose-950/70 to-rose-900/40 hover:from-rose-900/80 hover:to-rose-800/60 border border-rose-500/40 hover:border-rose-400 text-white transition-all shadow-lg hover:shadow-rose-950/50 flex items-center justify-between cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-3 rounded-lg bg-rose-600 text-white shadow-md shadow-rose-600/30 group-hover:scale-105 transition-transform">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-rose-200 transition-colors">
                          Exportar en PDF
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Documento formal con membrete y formato de página A4
                        </div>
                      </div>
                    </div>
                    <FileDown className="h-5 w-5 text-rose-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                  </button>

                  {/* Export Word Button */}
                  <button
                    type="button"
                    id="btn-export-technical-word"
                    onClick={handleExportWord}
                    className="group p-4 rounded-xl bg-gradient-to-br from-blue-950/70 to-indigo-900/40 hover:from-blue-900/80 hover:to-indigo-800/60 border border-blue-500/40 hover:border-blue-400 text-white transition-all shadow-lg hover:shadow-blue-950/50 flex items-center justify-between cursor-pointer active:scale-98"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="p-3 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/30 group-hover:scale-105 transition-transform">
                        <FileSpreadsheet className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-blue-200 transition-colors">
                          Exportar en Formato Word Editable (.doc)
                        </div>
                        <div className="text-[11px] text-slate-300">
                          Documento editable compatible con Microsoft Word y LibreOffice
                        </div>
                      </div>
                    </div>
                    <FileDown className="h-5 w-5 text-blue-400 group-hover:translate-y-0.5 transition-transform shrink-0" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/[0.02] backdrop-blur-md rounded-xl p-8 border border-white/10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center">
                <Sparkles className="h-6 w-6" />
              </div>
              <h4 className="text-sm font-bold text-white">
                Elaboración Automatizada de Informe Técnico Ambiental
              </h4>
              <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
                Seleccione el alcance deseado (<strong className="text-cyan-300">Muestra Activa</strong> o <strong className="text-cyan-300">Todas las Muestras</strong>) y presione el botón superior para estructurar el dictamen técnico en sus 12 secciones oficiales, señalando las alertas de información complementaria requerida y permitiendo su exportación inmediata en <strong>PDF</strong> o <strong>Word editable</strong>.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
