import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ParameterDefinition,
  ParameterGroup,
  SubcategoryId,
  UnitType,
  WaterCategoryId,
} from '../types';
import { getParametersForCategory } from '../data/parametersIndex';
import { evaluateParameter } from '../utils/evaluationEngine';
import {
  Search,
  RotateCcw,
  Sparkles,
  Thermometer,
  Activity,
  Droplet,
  Info,
  CheckCircle2,
  XCircle,
  SlidersHorizontal,
  ChevronRight,
  FlaskConical,
  AlertTriangle,
  AlertOctagon,
  ArrowDown,
} from 'lucide-react';

interface ParameterInputTableProps {
  categoryId: WaterCategoryId;
  subcategoryId: SubcategoryId;
  inputs: Record<string, { value: string | number; unit: UnitType }>;
  fieldMeasurements: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  };
  onInputChange: (paramId: string, value: string | number, unit: UnitType) => void;
  onClearAll: () => void;
  onLoadPreset: (presetId: string) => void;
  onFieldMeasurementsChange: (measurements: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  }) => void;
  onEvaluate: () => void;
}

const GROUP_LABELS: Record<string, string> = {
  ALL: 'Todos',
  FISICO_QUIMICO: 'Físico-Químicos',
  INORGANICO: 'Inorgánicos',
  ORGANICO: 'Orgánicos',
};

export const ParameterInputTable: React.FC<ParameterInputTableProps> = ({
  categoryId,
  subcategoryId,
  inputs,
  fieldMeasurements,
  onInputChange,
  onClearAll,
  onLoadPreset,
  onFieldMeasurementsChange,
  onEvaluate,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFieldDetails, setShowFieldDetails] = useState<boolean>(true);

  const parameters = getParametersForCategory(categoryId);
  const availableGroups = Array.from(new Set(parameters.map(p => p.group)));

  // Filtered parameters
  const filteredParameters = parameters.filter(param => {
    const matchesGroup = selectedGroup === 'ALL' || param.group === selectedGroup;
    const matchesSearch =
      param.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      param.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const filledCount = Object.values(inputs).filter(
    (v: { value: string | number; unit: UnitType } | undefined) =>
      v && v.value !== '' && v.value !== undefined
  ).length;

  // Real-time live stats calculation
  let compliantCount = 0;
  let transgressionCount = 0;

  Object.entries(inputs).forEach(([paramId, rawItem]) => {
    const item = rawItem as { value: string | number; unit: UnitType } | undefined;
    if (item && item.value !== '' && item.value !== undefined) {
      const param = parameters.find(p => p.id === paramId);
      if (param) {
        const evalRes = evaluateParameter(
          param,
          subcategoryId,
          item.value,
          item.unit,
          fieldMeasurements
        );
        if (evalRes.status === 'CUMPLE' || evalRes.status === 'LOD_BELOW') {
          compliantCount++;
        } else if (evalRes.status === 'TRANSGREDE') {
          transgressionCount++;
        }
      }
    }
  });

  const isCategoryConfigured = Boolean(categoryId && categoryId.trim() !== '');
  const isSubcategoryConfigured = Boolean(subcategoryId && subcategoryId.trim() !== '');
  const isFullyConfigured = isCategoryConfigured && isSubcategoryConfigured;
  const canEvaluate = isFullyConfigured && filledCount > 0;

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
      {/* Decorative fluid glow */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Unconfigured Category Warning */}
      {!isFullyConfigured && (
        <div className="mb-5 bg-rose-950/40 border border-rose-500/40 rounded-xl p-4 flex items-start gap-3 text-rose-200 text-xs backdrop-blur-md animate-in fade-in-50 duration-300">
          <AlertOctagon className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-white font-bold block text-sm">
              No se puede realizar el análisis de calidad ambiental
            </strong>
            <p className="text-rose-200/90 leading-relaxed">
              No se ha configurado una <strong>Categoría</strong> o <strong>Subcategoría</strong> de agua aplicable. Configure el Paso 1 para determinar los límites normativos del D.S. N° 004-2017-MINAM y habilitar el análisis.
            </p>
          </div>
        </div>
      )}

      {/* Header & Quick Action Presets */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex h-8 w-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white items-center justify-center text-xs font-extrabold shadow-lg shadow-cyan-500/30 border border-cyan-300/40 shrink-0">
            2
          </div>
          <div className="shrink-0">
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Matriz de Resultados & Medición Analítica</span>
              <FlaskConical className="h-4 w-4 text-cyan-400" />
            </h2>
            <p className="text-xs text-slate-300">
              Valores numéricos, límites de detección (&lt; LOD) o No Detectable (ND)
            </p>
          </div>
        </div>

        {/* Actions & Interactive Yellow Scroll Notice */}
        <div className="flex items-center flex-wrap gap-2.5">
          <AnimatePresence>
            {filledCount > 0 && (
              <motion.button
                type="button"
                id="btn-scroll-to-evaluate"
                key="btn-scroll-to-evaluate"
                initial={{ opacity: 0, scale: 0.95, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -4 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  const evalBtn = document.getElementById('btn-evaluate-sample');
                  if (evalBtn) {
                    const headerOffset = 120;
                    const elementPosition = evalBtn.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                      top: Math.max(0, offsetPosition),
                      left: 0,
                      behavior: 'smooth',
                    });

                    // Provide a brief high-energy pulse effect
                    evalBtn.classList.add('ring-4', 'ring-cyan-300/80');
                    setTimeout(() => {
                      evalBtn.classList.remove('ring-4', 'ring-cyan-300/80');
                    }, 1600);
                  }
                }}
                className="group relative px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 hover:from-amber-500/30 hover:via-amber-400/35 hover:to-yellow-500/30 border border-amber-400/60 hover:border-amber-300 text-amber-200 hover:text-amber-100 text-xs font-semibold shadow-lg shadow-amber-950/40 hover:shadow-amber-500/20 backdrop-blur-md transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 overflow-hidden"
                title="Haga clic para desplazarse directamente al botón de evaluación"
              >
                {/* Shimmer light beam animation */}
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-amber-200/25 to-transparent pointer-events-none" />

                {/* Pulsing amber indicator beacon */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
                </span>

                <span className="text-amber-100 font-bold">
                  Para iniciar el análisis desplácese hacia el fondo de la página
                </span>

                <div className="flex items-center gap-1 pl-1 border-l border-amber-400/30 text-amber-300 group-hover:text-white font-extrabold text-[11px]">
                  <span>Evaluar</span>
                  <ArrowDown className="h-3.5 w-3.5 animate-bounce text-amber-300 group-hover:text-amber-100 shrink-0" />
                </div>
              </motion.button>
            )}
          </AnimatePresence>

          <button
            id="btn-clear-all-inputs"
            onClick={onClearAll}
            className="text-xs px-3 py-1.5 text-slate-300 bg-white/5 hover:bg-rose-500/20 hover:text-rose-200 rounded-xl border border-white/10 hover:border-rose-400/30 backdrop-blur-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title="Limpiar datos ingresados"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>

      {/* Zero parameters warning - Placed between Header/Limpiar and Field Conditions */}
      {isFullyConfigured && filledCount === 0 && (
        <div className="mb-5 bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 flex items-start gap-3 text-amber-200 text-xs backdrop-blur-md animate-in fade-in-50 duration-300">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-white font-bold block text-sm">
              No se puede realizar el análisis de calidad ambiental
            </strong>
            <p className="text-amber-200/90 leading-relaxed">
              Debe ingresar como mínimo <strong>un (1) punto o parámetro a evaluar</strong> con su respectiva medición analítica en la matriz de resultados para habilitar el análisis y la generación del informe técnico.
            </p>
          </div>
        </div>
      )}

      {/* Field Conditions Panel (Temperature, pH, Salinity) */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-900/50 to-cyan-950/40 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/25 mb-5 relative z-10">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-cyan-400" />
            <span className="text-xs font-bold text-white">
              Condiciones de Campo para Cálculos Dinámicos
            </span>
            <span className="text-[10px] text-cyan-300/80 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Amoniaco & Δ T°
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowFieldDetails(!showFieldDetails)}
            className="text-[11px] text-slate-400 hover:text-cyan-300 transition"
          >
            {showFieldDetails ? 'Compactar' : 'Expandir'}
          </button>
        </div>

        {showFieldDetails && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/10">
              <label className="block text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>pH de Campo</span>
                <span className="text-cyan-400 font-mono text-[9px]">0 - 14</span>
              </label>
              <input
                id="field-ph-input"
                type="number"
                step="0.01"
                min="0"
                max="14"
                placeholder="Ej. 7.8"
                value={fieldMeasurements.pH !== undefined ? fieldMeasurements.pH : ''}
                onChange={e => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onFieldMeasurementsChange({ ...fieldMeasurements, pH: val });
                  const phParam = parameters.find(p => p.id.includes('ph'));
                  if (phParam && val !== undefined) {
                    onInputChange(phParam.id, val, phParam.defaultUnit);
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/10">
              <label className="block text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Temperatura (°C)</span>
                <span className="text-cyan-400 font-mono text-[9px]">Agua</span>
              </label>
              <input
                id="field-temp-input"
                type="number"
                step="0.1"
                placeholder="Ej. 18.5"
                value={fieldMeasurements.temperature !== undefined ? fieldMeasurements.temperature : ''}
                onChange={e => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onFieldMeasurementsChange({ ...fieldMeasurements, temperature: val });
                  const tempParam = parameters.find(p => p.id.includes('temperatura'));
                  if (tempParam && val !== undefined) {
                    onInputChange(tempParam.id, val, tempParam.defaultUnit);
                  }
                }}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/10">
              <label className="block text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Salinidad (g/kg o PSU)</span>
                <span className="text-cyan-400 font-mono text-[9px]">Mar/Est.</span>
              </label>
              <input
                id="field-salinity-input"
                type="number"
                step="0.1"
                placeholder="Ej. 30 (Marino)"
                value={fieldMeasurements.salinity !== undefined ? fieldMeasurements.salinity : ''}
                onChange={e => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onFieldMeasurementsChange({ ...fieldMeasurements, salinity: val });
                }}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>

            <div className="bg-slate-950/50 p-2.5 rounded-xl border border-white/10">
              <label className="block text-[10px] font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>T° Histórica / Base (°C)</span>
                <span className="text-cyan-400 font-mono text-[9px]">Δ T°</span>
              </label>
              <input
                id="field-baseline-temp-input"
                type="number"
                step="0.1"
                placeholder="Ej. 18.0"
                value={fieldMeasurements.baselineTemp !== undefined ? fieldMeasurements.baselineTemp : ''}
                onChange={e => {
                  const val = e.target.value ? parseFloat(e.target.value) : undefined;
                  onFieldMeasurementsChange({ ...fieldMeasurements, baselineTemp: val });
                }}
                className="w-full text-xs px-2.5 py-1.5 bg-slate-900 border border-white/15 rounded-lg text-white font-mono focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
              />
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 relative z-10">
        {/* Animated Group Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs scrollbar-none">
          <button
            type="button"
            onClick={() => setSelectedGroup('ALL')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
              selectedGroup === 'ALL'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50 scale-[1.02]'
                : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
            }`}
          >
            Todos ({parameters.length})
          </button>
          {availableGroups.map(grp => (
            <button
              key={grp}
              type="button"
              onClick={() => setSelectedGroup(grp)}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedGroup === grp
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30 border border-cyan-400/50 scale-[1.02]'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10'
              }`}
            >
              {GROUP_LABELS[grp] || grp}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="h-3.5 w-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            id="search-parameters-input"
            type="text"
            placeholder="Buscar parámetro (ej. Cadmio, DBO)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 bg-slate-950/60 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
          />
        </div>
      </div>

      {/* Parameters Table with Live Feedback */}
      <div className="overflow-x-auto border border-white/15 rounded-xl bg-slate-950/50 backdrop-blur-xl shadow-xl relative z-10">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-white/[0.04] text-slate-300 border-b border-white/10 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 w-1/3">Parámetro Normado</th>
              <th className="py-3 px-4 w-1/4">Valor de Laboratorio</th>
              <th className="py-3 px-4 w-1/6">Unidad</th>
              <th className="py-3 px-4 w-1/4">Límite ECA (D.S. 004-2017)</th>
              <th className="py-3 px-4 w-28 text-center">Estado Previo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredParameters.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400 text-xs">
                  No se encontraron parámetros con el término de búsqueda ingresado.
                </td>
              </tr>
            ) : (
              filteredParameters.map((param, idx) => {
                const limit = param.limitsBySubcategory[subcategoryId];
                const isApplicable = limit && limit.operator !== 'NOT_APPLICABLE';
                const inputItem = inputs[param.id] || { value: '', unit: param.defaultUnit };
                const hasValue = inputItem.value !== '' && inputItem.value !== undefined;

                let liveStatus: 'CUMPLE' | 'TRANSGREDE' | 'NO_EVALUABLE' | 'EMPTY' = 'EMPTY';
                let statusDetails = '';
                if (hasValue && isApplicable) {
                  const evalRes = evaluateParameter(
                    param,
                    subcategoryId,
                    inputItem.value,
                    inputItem.unit,
                    fieldMeasurements
                  );
                  liveStatus = evalRes.status === 'LOD_BELOW' ? 'CUMPLE' : evalRes.status;
                  statusDetails = evalRes.details;
                } else if (!isApplicable) {
                  liveStatus = 'NO_EVALUABLE';
                  statusDetails = 'Parámetro no normado en esta subcategoría';
                }

                return (
                  <tr
                    key={param.id}
                    className={`transition-colors duration-150 ${
                      liveStatus === 'TRANSGREDE'
                        ? 'bg-rose-950/20 hover:bg-rose-950/30'
                        : liveStatus === 'CUMPLE'
                        ? 'bg-emerald-950/15 hover:bg-emerald-950/25'
                        : idx % 2 === 0
                        ? 'bg-transparent hover:bg-white/[0.04]'
                        : 'bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    {/* Parameter name */}
                    <td className="py-2.5 px-4 align-middle">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <span>{param.name}</span>
                        {hasValue && liveStatus === 'CUMPLE' && (
                          <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                        )}
                        {hasValue && liveStatus === 'TRANSGREDE' && (
                          <XCircle className="h-3 w-3 text-rose-400 shrink-0 animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        {param.subgroup && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950/60 text-cyan-300/90 border border-cyan-500/20">
                            {param.subgroup}
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-mono">
                          Pág. {param.anexoPage}
                        </span>
                        {limit?.footnote && (
                          <span
                            className="text-[10px] text-cyan-300/70 truncate max-w-xs cursor-help"
                            title={limit.footnote}
                          >
                            ℹ {limit.footnote.substring(0, 35)}...
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Value Input */}
                    <td className="py-2.5 px-4 align-middle">
                      {isApplicable ? (
                        param.defaultUnit === 'Cualitativo' ? (
                          <select
                            id={`input-${param.id}`}
                            value={inputItem.value}
                            onChange={e => onInputChange(param.id, e.target.value, 'Cualitativo')}
                            className="w-full text-xs px-3 py-1.5 border border-white/15 rounded-lg bg-slate-900 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40"
                          >
                            <option value="" className="bg-slate-900 text-slate-400">-- Seleccione --</option>
                            <option value="Ausencia de material flotante" className="bg-slate-900 text-white">Ausencia de material flotante</option>
                            <option value="Presencia de material flotante" className="bg-slate-900 text-white">Presencia de material flotante</option>
                            <option value="No visible" className="bg-slate-900 text-white">No visible</option>
                            <option value="Visible" className="bg-slate-900 text-white">Visible</option>
                            <option value="Incoloro" className="bg-slate-900 text-white">Incoloro</option>
                            <option value="Sin olor" className="bg-slate-900 text-white">Sin olor</option>
                          </select>
                        ) : (
                          <input
                            id={`input-${param.id}`}
                            type="text"
                            placeholder="Ej. 0.045 / < 0.01 / ND"
                            value={inputItem.value}
                            onChange={e => onInputChange(param.id, e.target.value, inputItem.unit)}
                            className={`w-full text-xs px-3 py-1.5 border rounded-lg bg-slate-900/90 text-white placeholder-slate-500 focus:outline-none font-mono transition ${
                              liveStatus === 'TRANSGREDE'
                                ? 'border-rose-500/60 focus:border-rose-400 focus:ring-1 focus:ring-rose-400/40'
                                : liveStatus === 'CUMPLE'
                                ? 'border-emerald-500/50 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/40'
                                : 'border-white/15 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40'
                            }`}
                          />
                        )
                      ) : (
                        <span className="text-[11px] text-slate-500 italic">
                          No normado en {subcategoryId}
                        </span>
                      )}
                    </td>

                    {/* Unit Select */}
                    <td className="py-2.5 px-4 align-middle">
                      {isApplicable && param.supportedUnits.length > 1 ? (
                        <select
                          id={`unit-${param.id}`}
                          value={inputItem.unit}
                          onChange={e => onInputChange(param.id, inputItem.value, e.target.value as UnitType)}
                          className="text-xs py-1 px-2 border border-white/15 rounded-lg bg-slate-900 text-cyan-300 focus:outline-none focus:border-cyan-400"
                        >
                          {param.supportedUnits.map(u => (
                            <option key={u} value={u} className="bg-slate-900 text-white">
                              {u}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-slate-300 font-mono">
                          {param.defaultUnit}
                        </span>
                      )}
                    </td>

                    {/* Normative Limit */}
                    <td className="py-2.5 px-4 align-middle">
                      <span className="font-mono text-xs font-semibold text-cyan-300">
                        {limit?.displayText || 'No normado (**)'}
                      </span>
                    </td>

                    {/* Inline Status */}
                    <td className="py-2.5 px-4 align-middle text-center">
                      {liveStatus === 'CUMPLE' && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs animate-in zoom-in-50 duration-200"
                          title={statusDetails}
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Cumple
                        </span>
                      )}
                      {liveStatus === 'TRANSGREDE' && (
                        <span
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-xs animate-in zoom-in-50 duration-200"
                          title={statusDetails}
                        >
                          <XCircle className="h-3 w-3" />
                          Transgrede
                        </span>
                      )}
                      {liveStatus === 'NO_EVALUABLE' && (
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] text-slate-500 bg-white/5 border border-white/10"
                          title={statusDetails}
                        >
                          —
                        </span>
                      )}
                      {liveStatus === 'EMPTY' && (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Floating / Sticky Living Action Bar for Evaluation */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {filledCount}
            </span>
            <span>parámetros cargados</span>
          </div>

          {filledCount > 0 && (
            <div className="flex items-center gap-2 pl-2 border-l border-white/15">
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {compliantCount} Conformes
              </span>
              {transgressionCount > 0 && (
                <span className="text-rose-400 font-bold flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5" />
                  {transgressionCount} Transgresiones
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <button
            type="button"
            id="btn-evaluate-sample"
            onClick={onEvaluate}
            disabled={!canEvaluate}
            className={`px-8 py-3.5 rounded-xl font-extrabold text-xs tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
              canEvaluate
                ? 'bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:to-cyan-400 text-slate-950 font-black shadow-xl shadow-cyan-500/40 border border-cyan-300/60 scale-100 hover:scale-[1.02] active:scale-98 cursor-pointer animate-water-pulse'
                : 'bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed shadow-none'
            }`}
            title={
              !isFullyConfigured
                ? 'No se puede realizar el análisis: Falta configurar la Categoría o Subcategoría'
                : filledCount === 0
                ? 'No se puede realizar el análisis: Debe ingresar como mínimo un parámetro en la matriz'
                : 'Evaluar muestra contra los límites normativos del D.S. N° 004-2017-MINAM'
            }
          >
            <Sparkles className="h-4 w-4 fill-current" />
            <span>EVALUAR & GENERAR INFORME ECA</span>
            <ChevronRight className="h-4 w-4" />
          </button>
          {!canEvaluate && (
            <span className="text-[11px] text-amber-400/90 font-medium">
              {!isFullyConfigured
                ? '⚠️ Requiere configurar Categoría y Subcategoría'
                : '⚠️ Requiere al menos 1 parámetro con valor'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
