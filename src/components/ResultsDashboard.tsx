import React, { useState } from 'react';
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
  FileDown,
  Download,
  FileCheck,
} from 'lucide-react';

interface ResultsDashboardProps {
  summary: SampleEvaluationSummary;
  metadata: SampleMetadata;
  allSamples?: SampleItem[];
  activeSampleName?: string;
  onModifyInputs: () => void;
  onSaveToHistory: () => void;
  isSaved: boolean;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  summary,
  metadata,
  allSamples,
  activeSampleName,
  onModifyInputs,
  onSaveToHistory,
  isSaved,
}) => {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'TABLE' | 'AI'>('OVERVIEW');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'CUMPLE' | 'TRANSGREDE'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // AI Interpretation & Technical Report state
  const [reportScope, setReportScope] = useState<'SINGLE' | 'ALL'>('SINGLE');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
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
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Error al comunicarse con el servicio de informe técnico asistido');
      }
      setAiAnalysis(data.analysis);
      setActiveTab('AI');
    } catch (err: any) {
      setAiError(err.message || 'No se pudo generar el informe técnico asistido.');
    } finally {
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
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      {/* Top Banner Status - Clean, animated & atmospheric */}
      <div
        className={`rounded-2xl p-6 border shadow-2xl backdrop-blur-2xl transition-all relative overflow-hidden ${
          isCompliant
            ? 'bg-slate-900/80 text-white border-emerald-500/50 shadow-emerald-950/40'
            : 'bg-slate-900/80 text-white border-rose-500/50 shadow-rose-950/40'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-4">
            <div
              className={`p-4 rounded-2xl shadow-lg shrink-0 transition-transform ${
                isCompliant
                  ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-emerald-500/30 animate-pulse'
                  : 'bg-rose-500/20 border border-rose-400/40 text-rose-300 shadow-rose-500/30 animate-pulse'
              }`}
            >
              {isCompliant ? (
                <ShieldCheck className="h-8 w-8 text-emerald-400" />
              ) : (
                <AlertOctagon className="h-8 w-8 text-rose-400" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`px-3 py-0.5 rounded-full text-[11px] font-black tracking-wider uppercase ${
                    isCompliant
                      ? 'bg-emerald-400 text-slate-950 shadow-sm'
                      : 'bg-rose-500 text-white shadow-sm'
                  }`}
                >
                  {isCompliant ? 'CONFORME CON EL ECA' : 'TRANSGREDE EL ECA'}
                </span>
                <span className="text-xs text-cyan-300 font-mono font-semibold">
                  • {summary.subcategoryCode} ({summary.categoryName})
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold mt-1.5 text-white">
                {isCompliant
                  ? 'Todos los parámetros cumplen con los Estándares de Calidad Ambiental evaluados.'
                  : `Se identificaron ${summary.transgresionCount} parámetro(s) que superan los límites del D.S. N° 004-2017-MINAM.`}
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
                Evaluado para: <strong className="text-cyan-300">{summary.subcategoryName}</strong>.
                {metadata.sampleCode && ` Muestra: ${metadata.sampleCode}.`}
                {metadata.waterBody && ` Cuerpo: ${metadata.waterBody}.`}
              </p>
            </div>
          </div>

          {/* Quick Action Export Buttons */}
          <div className="flex items-center flex-wrap gap-2 self-start md:self-center shrink-0">
            <button
              id="btn-export-pdf"
              onClick={() => exportToPDF(summary, metadata, aiAnalysis || undefined)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
              title="Descargar informe oficial en formato PDF"
            >
              <FileText className="h-3.5 w-3.5 text-cyan-300" />
              <span>Reporte PDF</span>
            </button>

            <button
              id="btn-export-excel"
              onClick={() => exportToExcel(summary, metadata)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 cursor-pointer shadow-sm"
              title="Exportar matriz de datos a Excel"
            >
              <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-300" />
              <span>Excel XLSX</span>
            </button>

            <button
              id="btn-save-history"
              onClick={onSaveToHistory}
              disabled={isSaved}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 backdrop-blur-md active:scale-95 ${
                isSaved
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/40 cursor-default'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 cursor-pointer'
              }`}
              title="Guardar en historial"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>{isSaved ? 'Guardado' : 'Guardar'}</span>
            </button>

            <button
              id="btn-modify-inputs"
              onClick={onModifyInputs}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/30 border border-cyan-300/40 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Modificar Datos</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Sleek Living Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl">
          <div className="text-xs font-medium text-slate-300 mb-1">Parámetros Evaluados</div>
          <div className="text-2xl font-black text-white">{summary.totalEvaluated}</div>
          <div className="text-[11px] text-slate-400 mt-1">Con valor registrado</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-emerald-500/30 shadow-xl">
          <div className="text-xs font-medium text-emerald-400 mb-1 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Conformes con ECA</span>
          </div>
          <div className="text-2xl font-black text-emerald-400">{summary.compliantCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Dentro del límite legal</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-rose-500/30 shadow-xl">
          <div className="text-xs font-medium text-rose-400 mb-1 flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5" />
            <span>Transgresiones</span>
          </div>
          <div className="text-2xl font-black text-rose-400">{summary.transgresionCount}</div>
          <div className="text-[11px] text-slate-400 mt-1">Superan o incumplen</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl p-4 sm:p-5 border border-cyan-500/30 shadow-xl">
          <div className="text-xs font-medium text-cyan-300 mb-1 flex items-center gap-1.5">
            <Percent className="h-3.5 w-3.5" />
            <span>Tasa Cumplimiento</span>
          </div>
          <div className="text-2xl font-black text-cyan-300">
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
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <TrendingUp className="h-3.5 w-3.5" />
          <span>Gráfico Porcentual ECA</span>
        </button>

        <button
          onClick={() => setActiveTab('TABLE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'TABLE'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Matriz Completa ({summary.results.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('AI')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'AI'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/40'
              : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
          <span>Interpretación Asistida</span>
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
        <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 p-5 sm:p-6 animate-in fade-in-50 duration-300">
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

          <div className="overflow-x-auto border border-white/15 rounded-xl bg-slate-950/40 backdrop-blur-md shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/[0.06] text-slate-200 font-bold border-b border-white/10 uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-3.5">Parámetro</th>
                  <th className="py-3 px-3.5">Valor Medido</th>
                  <th className="py-3 px-3.5">Límite ECA</th>
                  <th className="py-3 px-3.5 text-center">Pág.</th>
                  <th className="py-3 px-3.5 text-center">Condición</th>
                  <th className="py-3 px-3.5 text-center">% Límite</th>
                  <th className="py-3 px-3.5">Detalle Técnico</th>
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

                    return (
                      <tr
                        key={r.parameterId}
                        className={`hover:bg-white/[0.08] transition-colors ${
                          idx % 2 === 0 ? 'bg-white/[0.01]' : 'bg-white/[0.03]'
                        }`}
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
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
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

            {/* Scope Selection Controls: Single Sample vs All Samples */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-white/10">
              <div className="text-[11px] font-semibold text-slate-400 px-2 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5 text-cyan-400" />
                <span>Alcance:</span>
              </div>

              <button
                type="button"
                id="btn-scope-single"
                onClick={() => {
                  setReportScope('SINGLE');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  reportScope === 'SINGLE'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-black'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
                title="Generar informe técnico exclusivamente para la muestra seleccionada"
              >
                <Waves className="h-3.5 w-3.5" />
                <span>Muestra Activa ({metadata.sampleCode || activeSampleName || 'Actual'})</span>
              </button>

              <button
                type="button"
                id="btn-scope-all"
                onClick={() => {
                  setReportScope('ALL');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  reportScope === 'ALL'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md font-black'
                    : 'text-slate-300 hover:bg-white/10'
                }`}
                title="Generar informe técnico integral consolidando todas las muestras configuradas"
              >
                <Layers className="h-3.5 w-3.5" />
                <span>Todas las Muestras ({totalConfiguredSamples})</span>
              </button>
            </div>
          </div>

          {/* Scope notice banner */}
          <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-cyan-100/90">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>
                Modo actual:{' '}
                <strong className="text-white">
                  {reportScope === 'SINGLE'
                    ? `Informe individual para la muestra "${metadata.sampleCode || activeSampleName || 'Actual'}" (Subcategoría ${summary.subcategoryCode})`
                    : `Informe general consolidado integrando las ${totalConfiguredSamples} muestras configuradas en la matriz`}
                </strong>
              </span>
            </div>

            <button
              type="button"
              id="btn-generate-ai-analysis"
              onClick={() => handleGenerateAi()}
              disabled={isGeneratingAi}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 border border-cyan-300/50 disabled:opacity-50 active:scale-98 cursor-pointer shrink-0"
            >
              {isGeneratingAi ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  <span>Elaborando 12 secciones...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{aiAnalysis ? 'Regenerar Informe Técnico' : 'Generar Informe Técnico'}</span>
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

          {aiAnalysis ? (
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
              <div className="bg-slate-950/90 rounded-2xl p-6 sm:p-8 border border-cyan-500/20 text-xs leading-relaxed text-slate-200 backdrop-blur-md shadow-2xl overflow-x-auto">
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
