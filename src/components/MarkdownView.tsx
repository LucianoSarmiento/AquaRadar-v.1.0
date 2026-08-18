import React, { useState } from 'react';
import {
  SampleEvaluationSummary,
  SampleItem,
  SampleMetadata,
} from '../types';
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
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Waves, Layers } from 'lucide-react';

interface MarkdownViewProps {
  content: string;
  summary?: SampleEvaluationSummary;
  samples?: SampleItem[];
  metadata?: SampleMetadata;
  scope?: 'SINGLE' | 'ALL';
}

export const MarkdownView: React.FC<MarkdownViewProps> = ({
  content,
  summary,
  samples,
  metadata,
  scope = 'SINGLE',
}) => {
  const [selectedChartSampleIdx, setSelectedChartSampleIdx] = useState(0);
  const lines = content.split('\n');

  // Prepare chart data from active summary or samples
  const activeSamplesList = samples && samples.length > 0 ? samples : (summary ? [{
    id: '1',
    name: metadata?.sampleCode || 'Muestra 01',
    categoryId: summary.categoryId,
    subcategoryId: summary.subcategoryCode,
    metadata: metadata || { location: '', waterBody: '', sampleCode: 'Muestra 01' },
    inputs: {},
    summary,
    createdAt: new Date().toISOString(),
  }] : []);

  const currentChartSample = activeSamplesList[selectedChartSampleIdx] || activeSamplesList[0];
  const chartData = currentChartSample?.summary?.results
    ?.filter((r) => r.percentageOfLimit !== undefined && r.percentageOfLimit !== null)
    ?.map((r) => ({
      name: r.parameterName.length > 14 ? `${r.parameterName.slice(0, 13)}…` : r.parameterName,
      fullName: r.parameterName,
      percentage: Number(r.percentageOfLimit!.toFixed(1)),
      value: r.inputValue,
      unit: r.inputUnit,
      limit: r.normativeText,
      status: r.status,
      isTransgression: r.status === 'TRANSGREDE',
    })) || [];

  const renderFormattedText = (text: string) => {
    // Check if text is an informational notice [INFORMACIÓN A COMPLETAR ...]
    if (text.includes('[INFORMACIÓN A COMPLETAR') || text.includes('[A completar')) {
      const parts = text.split(/(\[INFORMACIÓN A COMPLETAR[^\]]*\]|\[A completar[^\]]*\])/g);
      return parts.map((part, pIdx) => {
        if (part.startsWith('[INFORMACIÓN A COMPLETAR') || part.startsWith('[A completar')) {
          return (
            <span
              key={pIdx}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 my-0.5 rounded text-[11px] font-medium bg-amber-950/60 border border-amber-500/50 text-amber-300 tracking-tight"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              {part.replace(/^[\[]|\]$/g, '')}
            </span>
          );
        }
        return <span key={pIdx}>{renderInlineSegments(part)}</span>;
      });
    }

    // Check for Condition tags in table cells
    const cleanLower = text.toLowerCase().trim();
    if (cleanLower === 'transgrede' || cleanLower === '**transgrede**' || cleanLower.includes('transgrede (>100%)')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
          <AlertTriangle className="h-3 w-3 text-rose-400 shrink-0" />
          <span>Transgrede</span>
        </span>
      );
    }
    if (cleanLower.includes('no transgrede') || cleanLower === 'cumple' || cleanLower.includes('no transgrede (cumple)')) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
          <span>No transgrede (Cumple)</span>
        </span>
      );
    }

    return renderInlineSegments(text);
  };

  const renderInlineSegments = (text: string) => {
    // Replace **bold**, `code`, and *italic*
    const parts = text.split(/(\*\*.*?\*\*|`.*?`|\*[^*]+?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const inner = part.slice(2, -2);
        return (
          <strong key={index} className="font-semibold text-white">
            {inner}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
        const inner = part.slice(1, -1);
        const isGuidance = inner.startsWith('[') && inner.endsWith(']');
        return (
          <em
            key={index}
            className={
              isGuidance
                ? 'text-cyan-200/90 font-medium not-italic bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded text-[11px] inline-block my-0.5'
                : 'text-slate-300 italic'
            }
          >
            {inner}
          </em>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        const codeText = part.slice(1, -1);
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[11px] border border-slate-700 font-semibold"
          >
            {codeText}
          </code>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Group elements together
  const renderedElements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check for Markdown table block
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length > 0) {
        const headerRow = tableLines[0]
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

        const hasDivider = tableLines.length > 1 && tableLines[1].includes('---');
        const bodyRows = (hasDivider ? tableLines.slice(2) : tableLines.slice(1)).map((row) =>
          row
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())
        );

        renderedElements.push(
          <div
            key={`table-${i}`}
            className="my-3.5 overflow-x-auto rounded-xl border border-slate-700/80 bg-slate-900/80 shadow-md"
          >
            <table className="w-full text-left text-[11px] text-slate-300 border-collapse">
              <thead className="bg-gradient-to-r from-slate-800 to-slate-900 text-cyan-300 font-bold border-b border-slate-700">
                <tr>
                  {headerRow.map((h, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-3.5 py-2.5 border-r last:border-r-0 border-slate-700/60 font-bold tracking-tight text-slate-100"
                    >
                      {renderFormattedText(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {bodyRows.map((row, rIdx) => {
                  const isTransgressionRow = row.some((cell) =>
                    cell.toLowerCase().includes('transgrede')
                  );
                  return (
                    <tr
                      key={rIdx}
                      className={`transition-colors ${
                        isTransgressionRow
                          ? 'bg-rose-950/20 hover:bg-rose-950/30'
                          : 'hover:bg-slate-800/40'
                      }`}
                    >
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-3.5 py-2 border-r last:border-r-0 border-slate-800/70 align-top"
                        >
                          {renderFormattedText(cell)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    if (!trimmed) {
      renderedElements.push(<div key={`space-${i}`} className="h-1.5" />);
      i++;
      continue;
    }

    if (trimmed.startsWith('# ')) {
      renderedElements.push(
        <h1
          key={`h1-${i}`}
          className="text-base sm:text-lg font-black text-cyan-200 border-b-2 border-cyan-500/50 pb-2.5 mt-7 mb-3.5 tracking-wide uppercase flex items-center gap-2"
        >
          <span className="h-3.5 w-1.5 bg-cyan-400 inline-block rounded-full" />
          {trimmed.replace('# ', '')}
        </h1>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('## ')) {
      renderedElements.push(
        <h2
          key={`h2-${i}`}
          className="text-sm sm:text-base font-bold text-cyan-300 border-b border-cyan-500/30 pb-1.5 mt-6 mb-3 tracking-wide uppercase flex items-center gap-2"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 inline-block" />
          {trimmed.replace('## ', '')}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('### ')) {
      const headingText = trimmed.replace('### ', '');
      const isChartSection = headingText.toLowerCase().includes('7.3') || headingText.toLowerCase().includes('gráficos');

      renderedElements.push(
        <div key={`h3-block-${i}`} className="space-y-3">
          <h3 className="text-xs sm:text-sm font-bold text-teal-300 mt-5 mb-1.5 tracking-wide uppercase flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-teal-400" />
            <span>{headingText}</span>
          </h3>

          {/* Embedded Interactive Recharts Bar Chart in Section 7.3 */}
          {isChartSection && chartData.length > 0 && (
            <div className="my-4 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Gráfico Porcentual de Cumplimiento frente al 100% del ECA
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Comparativa porcentual directa de parámetros respecto al límite máximo normativo (D.S. N° 004-2017-MINAM).
                    </p>
                  </div>
                </div>

                {/* Multiple Samples Selector for Chart */}
                {activeSamplesList.length > 1 && (
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-white/10 overflow-x-auto">
                    {activeSamplesList.map((s, sIdx) => (
                      <button
                        key={s.id || sIdx}
                        type="button"
                        onClick={() => setSelectedChartSampleIdx(sIdx)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                          selectedChartSampleIdx === sIdx
                            ? 'bg-cyan-500 text-slate-950 shadow font-black'
                            : 'text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Waves className="h-3 w-3" />
                        <span>{s.metadata?.sampleCode || s.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Responsive BarChart */}
              <div className="h-64 sm:h-72 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 15, left: -15, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                    <XAxis
                      dataKey="name"
                      stroke="#94a3b8"
                      fontSize={10}
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      tick={{ fill: '#cbd5e1' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={10}
                      domain={[0, (dataMax: number) => Math.max(120, Math.ceil(dataMax * 1.15))]}
                      tickFormatter={(val) => `${val}%`}
                      tick={{ fill: '#94a3b8' }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900/95 border border-cyan-500/40 p-2.5 rounded-xl shadow-xl text-xs backdrop-blur-md">
                              <p className="font-bold text-white text-xs">{data.fullName}</p>
                              <div className="mt-1 space-y-0.5 text-[11px]">
                                <p className="text-slate-300">
                                  Medido: <span className="font-mono text-cyan-300 font-bold">{data.value} {data.unit}</span>
                                </p>
                                <p className="text-slate-400">
                                  Límite ECA: <span className="font-mono text-slate-200">{data.limit}</span>
                                </p>
                                <p className={data.isTransgression ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                                  % ECA: {data.percentage}% ({data.isTransgression ? 'Transgrede' : 'Cumple'})
                                </p>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={100}
                      stroke="#ef4444"
                      strokeDasharray="4 4"
                      strokeWidth={2}
                      label={{
                        value: 'Umbral 100% ECA',
                        position: 'insideTopRight',
                        fill: '#ef4444',
                        fontSize: 10,
                        fontWeight: 'bold',
                      }}
                    />
                    <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.percentage > 100 ? '#f43f5e' : '#06b6d4'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend & Guidance */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-[11px] text-slate-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-cyan-500 inline-block" />
                    <span>Cumple con ECA (≤100%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
                    <span>Transgrede ECA (&gt;100%)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 bg-rose-500 border-t border-dashed border-rose-400 inline-block" />
                    <span>Línea umbral legal (100%)</span>
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 italic">
                  Fuente: D.S. N° 004-2017-MINAM
                </span>
              </div>
            </div>
          )}
        </div>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      renderedElements.push(
        <h4
          key={`h4-${i}`}
          className="text-xs font-semibold text-sky-200 mt-3.5 mb-1 flex items-center gap-1.5"
        >
          <span className="text-cyan-400 text-[10px]">▶</span>
          <span>{trimmed.replace('#### ', '')}</span>
        </h4>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith('---')) {
      renderedElements.push(<hr key={`hr-${i}`} className="border-slate-800 my-4" />);
      i++;
      continue;
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      const itemText = trimmed.replace(/^[-•]\s*/, '');
      renderedElements.push(
        <div key={`li-${i}`} className="flex items-start gap-2 pl-2 text-slate-300 my-1">
          <span className="text-cyan-400 text-[10px] mt-1 shrink-0">■</span>
          <div className="flex-1 leading-relaxed">{renderFormattedText(itemText)}</div>
        </div>
      );
      i++;
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const match = trimmed.match(/^(\d+\.)\s*(.*)$/);
      if (match) {
        renderedElements.push(
          <div key={`num-${i}`} className="flex items-start gap-2 pl-2 text-slate-300 my-1">
            <span className="text-teal-400 font-bold shrink-0">{match[1]}</span>
            <div className="flex-1 leading-relaxed">{renderFormattedText(match[2])}</div>
          </div>
        );
        i++;
        continue;
      }
    }

    // Callout box if whole paragraph is info notice
    if (trimmed.startsWith('[INFORMACIÓN A COMPLETAR') || trimmed.startsWith('*[INFORMACIÓN A COMPLETAR')) {
      renderedElements.push(
        <div
          key={`notice-${i}`}
          className="p-3.5 my-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5 shadow-sm"
        >
          <span className="text-amber-400 font-bold shrink-0 text-sm mt-0.5">⚠️</span>
          <div className="flex-1 leading-relaxed font-medium">
            {trimmed.replace(/^[*\[]|\][*]?$/g, '')}
          </div>
        </div>
      );
      i++;
      continue;
    }

    renderedElements.push(
      <p key={`p-${i}`} className="text-slate-300 leading-relaxed my-1">
        {renderFormattedText(trimmed)}
      </p>
    );
    i++;
  }

  return (
    <div className="space-y-1.5 text-slate-200 text-xs leading-relaxed font-sans select-text">
      {renderedElements}
    </div>
  );
};
