import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  SampleItem,
  SampleEvaluationSummary,
  SampleMetadata,
  SavedEvaluation,
  SubcategoryId,
  UnitType,
  WaterCategoryId,
} from './types';
import { evaluateSampleSet } from './utils/evaluationEngine';
import { SAMPLE_PRESETS } from './data/presets';
import { CATEGORIES } from './data/categories';
import { exportMultiSampleExcel, exportMultiSamplePDF } from './utils/exportUtils';
import { Header } from './components/Header';
import { MultiSampleSummary } from './components/MultiSampleSummary';
import { SampleCard } from './components/SampleCard';
import { CategorySelector } from './components/CategorySelector';
import { SampleMetadataForm } from './components/SampleMetadataForm';
import { ParameterInputTable } from './components/ParameterInputTable';
import { ResultsDashboard } from './components/ResultsDashboard';
import { NormativeViewerModal } from './components/NormativeViewerModal';
import { HistoryModal } from './components/HistoryModal';
import { AddSampleModal } from './components/AddSampleModal';
import { DeveloperModal } from './components/DeveloperModal';
import { WaterWelcomeIntro } from './components/WaterWelcomeIntro';
import { LiveWaterBackdrop } from './components/LiveWaterBackdrop';
import { AltairEmblem } from './components/AltairEmblem';
import {
  Droplet,
  Sparkles,
  FileSpreadsheet,
  FileText,
  Plus,
  Play,
  ArrowLeft,
  Layers,
  ChevronRight,
  ShieldCheck,
  AlertOctagon,
  AlertTriangle,
  Eye,
  CheckCircle2,
} from 'lucide-react';

const STORAGE_KEY = 'aquaradar_saved_evaluations';
const MAX_SAMPLES = 10;

// Helper to generate a unique sample ID
const generateSampleId = () => 'sample_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);

export const App: React.FC = () => {
  // Intro splash screen state
  const [showIntro, setShowIntro] = useState(true);

  // Prevent scrollbar on the welcome intro screen and restore it when entering the app
  useEffect(() => {
    if (showIntro) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  // Multi-Sample State Array (0 to 10 samples) - Initialized empty
  const [samples, setSamples] = useState<SampleItem[]>([]);

  const [activeSampleId, setActiveSampleId] = useState<string>('');

  // Set default active sample ID on mount or when samples array changes
  useEffect(() => {
    if (samples.length > 0) {
      if (!activeSampleId || !samples.some(s => s.id === activeSampleId)) {
        setActiveSampleId(samples[0].id);
      }
    } else {
      setActiveSampleId('');
    }
  }, [samples, activeSampleId]);

  const [viewMode, setViewMode] = useState<'INPUT' | 'RESULTS'>('INPUT');
  const [validationAlert, setValidationAlert] = useState<{
    title: string;
    message: string;
    type?: 'error' | 'warning' | 'info';
  } | null>(null);

  // Modals state
  const [isNormativeOpen, setIsNormativeOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);
  const [isAddSampleModalOpen, setIsAddSampleModalOpen] = useState(false);
  const [isCurrentSaved, setIsCurrentSaved] = useState(false);
  const [shakeResultsTab, setShakeResultsTab] = useState(false);
  const [resultsErrorMessage, setResultsErrorMessage] = useState<string | null>(null);
  const resultsErrorTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Saved Evaluations in localStorage
  const [savedEvaluations, setSavedEvaluations] = useState<SavedEvaluation[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEvaluations));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedEvaluations]);

  // Current active sample object
  const activeSampleIndex = samples.findIndex(s => s.id === activeSampleId);
  const activeSample = activeSampleIndex >= 0 ? samples[activeSampleIndex] : (samples.length > 0 ? samples[0] : null);

  // ----------------------------------------------------
  // Sample Management Functions (Add, Delete, Duplicate, Edit)
  // ----------------------------------------------------

  const handleOpenAddSampleModal = () => {
    if (samples.length >= MAX_SAMPLES) {
      setValidationAlert({
        title: 'Límite máximo alcanzado',
        message: `El sistema permite registrar hasta un máximo de ${MAX_SAMPLES} muestras en paralelo.`,
        type: 'info',
      });
      return;
    }
    setIsAddSampleModalOpen(true);
  };

  const handleConfirmAddSample = (sampleName: string) => {
    const nextIndex = samples.length + 1;
    const finalName = sampleName.trim() || `Muestra ${nextIndex}`;

    const newSample: SampleItem = {
      id: generateSampleId(),
      name: finalName,
      categoryId: '' as WaterCategoryId,
      subcategoryId: '' as SubcategoryId,
      metadata: {
        sampleCode: '',
        waterBody: '',
        location: '',
        samplingDate: '',
        samplerName: '',
        coordinates: '',
        projectName: '',
        laboratory: '',
        notes: '',
      },
      inputs: {},
      fieldMeasurements: {},
      isEvaluated: false,
      summary: null,
    };

    setSamples(prev => [...prev, newSample]);
    setActiveSampleId(newSample.id);
    setViewMode('INPUT');
    setIsAddSampleModalOpen(false);
  };

  const handleDeleteSample = (idToDelete: string) => {
    setSamples(prev => {
      const filtered = prev.filter(s => s.id !== idToDelete);
      if (activeSampleId === idToDelete) {
        setActiveSampleId(filtered.length > 0 ? filtered[0].id : '');
      }
      return filtered;
    });
  };

  const handleDuplicateSample = (sampleToDuplicate: SampleItem) => {
    if (samples.length >= MAX_SAMPLES) return;

    const clonedSample: SampleItem = {
      ...sampleToDuplicate,
      id: generateSampleId(),
      name: `${sampleToDuplicate.name} (Copia)`,
      metadata: {
        ...sampleToDuplicate.metadata,
        sampleCode: `${sampleToDuplicate.metadata.sampleCode || 'M'}-CLON`,
      },
      inputs: { ...sampleToDuplicate.inputs },
      fieldMeasurements: { ...sampleToDuplicate.fieldMeasurements },
      isEvaluated: false,
      summary: null,
    };

    setSamples(prev => [...prev, clonedSample]);
    setActiveSampleId(clonedSample.id);
  };

  const handleUpdateSampleName = (sampleId: string, newName: string) => {
    setSamples(prev =>
      prev.map(s => (s.id === sampleId ? { ...s, name: newName } : s))
    );
  };

  // ----------------------------------------------------
  // Active Sample Update Handlers
  // ----------------------------------------------------

  const handleCategoryChange = (categoryId: WaterCategoryId) => {
    if (!activeSample) return;
    const catObj = CATEGORIES.find(
      c => c.id.toLowerCase() === categoryId.toLowerCase()
    );
    const defaultSub = catObj?.subcategories[0]?.id || ('' as SubcategoryId);
    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? {
              ...s,
              categoryId,
              subcategoryId: defaultSub,
              isEvaluated: false,
              summary: null,
            }
          : s
      )
    );
  };

  const handleSubcategoryChange = (subcategoryId: SubcategoryId) => {
    if (!activeSample) return;
    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? { ...s, subcategoryId, isEvaluated: false, summary: null }
          : s
      )
    );
  };

  const handleMetadataChange = (metadata: SampleMetadata) => {
    if (!activeSample) return;
    setSamples(prev =>
      prev.map(s => (s.id === activeSample.id ? { ...s, metadata } : s))
    );
  };

  const handleInputChange = (
    paramId: string,
    value: string | number,
    unit: UnitType
  ) => {
    if (!activeSample) return;
    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? {
              ...s,
              inputs: { ...s.inputs, [paramId]: { value, unit } },
              isEvaluated: false,
              summary: null,
            }
          : s
      )
    );
    setIsCurrentSaved(false);
  };

  const handleClearInputs = () => {
    if (!activeSample) return;
    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? { ...s, inputs: {}, isEvaluated: false, summary: null }
          : s
      )
    );
    setIsCurrentSaved(false);
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find(p => p.id === presetId);
    if (!preset || !activeSample) return;

    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? {
              ...s,
              categoryId: preset.categoryId,
              subcategoryId: preset.subcategoryId,
              metadata: {
                ...s.metadata,
                sampleCode: `PRESET-${preset.id.toUpperCase()}`,
                waterBody: preset.waterBody,
                location: preset.location,
              },
              fieldMeasurements: { ...preset.fieldMeasurements },
              inputs: { ...preset.inputs },
              isEvaluated: false,
              summary: null,
            }
          : s
      )
    );
    setIsCurrentSaved(false);
  };

  const handleFieldMeasurementsChange = (measurements: {
    temperature?: number;
    pH?: number;
    salinity?: number;
    baselineTemp?: number;
  }) => {
    if (!activeSample) return;
    setSamples(prev =>
      prev.map(s =>
        s.id === activeSample.id
          ? { ...s, fieldMeasurements: measurements, isEvaluated: false, summary: null }
          : s
      )
    );
  };

  // ----------------------------------------------------
  // Evaluation Handlers (Single Sample and Batch All)
  // ----------------------------------------------------

  const scrollToResultsView = () => {
    setTimeout(() => {
      const el = document.getElementById('navigation-view-switcher');
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
    }, 60);
  };

  const scrollToGeneralPanel = () => {
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
  };

  const handleEvaluateSingle = (sampleToEval: SampleItem) => {
    // 1. Validate Category and Subcategory
    if (!sampleToEval.categoryId || !sampleToEval.subcategoryId) {
      setShakeResultsTab(true);
      setTimeout(() => setShakeResultsTab(false), 600);
      setValidationAlert({
        title: 'Primero debe ingresar la información en la matriz de ingreso para proseguir',
        message:
          'No se ha configurado la Categoría o Subcategoría de agua según el D.S. N° 004-2017-MINAM (Paso 1). Seleccione la clasificación correspondiente y registre sus parámetros para continuar.',
        type: 'error',
      });
      return;
    }

    // 2. Validate at least one parameter entered with value
    const filledCount = Object.values(sampleToEval.inputs).filter(
      (v: any) => v && v.value !== '' && v.value !== undefined
    ).length;

    if (filledCount === 0) {
      setShakeResultsTab(true);
      setTimeout(() => setShakeResultsTab(false), 600);
      setValidationAlert({
        title: 'Primero debe ingresar la información en la matriz de ingreso para proseguir',
        message:
          'Debe ingresar como mínimo un (1) parámetro a evaluar con su respectiva medición analítica en la Matriz de Ingreso (Paso 2) antes de generar el informe y gráficos.',
        type: 'error',
      });
      return;
    }

    // Clear previous validation alerts if any
    setValidationAlert(null);

    const summary = evaluateSampleSet(
      sampleToEval.categoryId,
      sampleToEval.subcategoryId,
      sampleToEval.inputs,
      sampleToEval.fieldMeasurements
    );

    setSamples(prev =>
      prev.map(s =>
        s.id === sampleToEval.id
          ? { ...s, isEvaluated: true, summary }
          : s
      )
    );

    if (activeSampleId === sampleToEval.id) {
      setViewMode('RESULTS');
      scrollToResultsView();
    }
  };

  const triggerResultsError = (msg: string) => {
    setShakeResultsTab(true);
    setTimeout(() => setShakeResultsTab(false), 600);
    setResultsErrorMessage(msg);
    if (resultsErrorTimerRef.current) {
      clearTimeout(resultsErrorTimerRef.current);
    }
    resultsErrorTimerRef.current = setTimeout(() => {
      setResultsErrorMessage(null);
    }, 3500);
  };

  const handleSwitchToResults = () => {
    if (!activeSample) return;

    if (!activeSample.categoryId || !activeSample.subcategoryId) {
      triggerResultsError('Primero complete la Matriz de Ingreso');
      return;
    }

    const filledCount = Object.values(activeSample.inputs).filter(
      (v: any) => v && v.value !== '' && v.value !== undefined
    ).length;

    if (filledCount === 0) {
      triggerResultsError('Primero complete la Matriz de Ingreso');
      return;
    }

    setResultsErrorMessage(null);
    if (activeSample.summary) {
      setViewMode('RESULTS');
    } else {
      handleEvaluateSingle(activeSample);
    }
  };

  const handleEvaluateAll = () => {
    if (samples.length === 0) {
      setValidationAlert({
        title: 'No hay muestras registradas',
        message: 'Agregue una nueva muestra para continuar con la evaluación ambiental.',
        type: 'info',
      });
      return;
    }

    let evaluatedCount = 0;
    let unconfiguredCount = 0;
    let zeroParamsCount = 0;

    const updatedSamples = samples.map(s => {
      const isConfigured = Boolean(s.categoryId && s.subcategoryId);
      if (!isConfigured) {
        unconfiguredCount++;
        return s;
      }

      const filledCount = Object.values(s.inputs).filter(
        (v: any) => v && v.value !== '' && v.value !== undefined
      ).length;

      if (filledCount === 0) {
        zeroParamsCount++;
        return s;
      }

      evaluatedCount++;
      const summary = evaluateSampleSet(
        s.categoryId,
        s.subcategoryId,
        s.inputs,
        s.fieldMeasurements
      );
      return { ...s, isEvaluated: true, summary };
    });

    setSamples(updatedSamples);

    if (evaluatedCount === 0) {
      setValidationAlert({
        title: 'No se puede realizar el análisis',
        message:
          'Ninguna de las muestras registradas cumple con los requisitos mínimos: se requiere tener configurada la Categoría/Subcategoría y contar con al menos un (1) parámetro con medición analítica.',
        type: 'error',
      });
    } else if (unconfiguredCount > 0 || zeroParamsCount > 0) {
      setValidationAlert({
        title: 'Evaluación Multimuestra Completada con Observaciones',
        message: `Se evaluaron exitosamente ${evaluatedCount} muestra(s). ${
          unconfiguredCount > 0 ? `${unconfiguredCount} muestra(s) no tienen categoría configurada. ` : ''
        }${
          zeroParamsCount > 0 ? `${zeroParamsCount} muestra(s) no registran ningún parámetro con valor.` : ''
        }`,
        type: 'warning',
      });
    } else {
      setValidationAlert(null);
    }
  };

  // ----------------------------------------------------
  // History & Save Handlers
  // ----------------------------------------------------

  const handleSaveToHistory = () => {
    if (!activeSample || !activeSample.summary) return;

    const newEntry: SavedEvaluation = {
      id: 'eval_' + Date.now(),
      savedAt: new Date().toISOString(),
      metadata: activeSample.metadata,
      summary: activeSample.summary,
      rawInputs: activeSample.inputs,
      fieldMeasurements: activeSample.fieldMeasurements,
    };

    setSavedEvaluations(prev => [newEntry, ...prev]);
    setIsCurrentSaved(true);
  };

  const handleRestoreFromHistory = (item: SavedEvaluation) => {
    if (samples.length >= MAX_SAMPLES) {
      // Replace active sample with restored item
      setSamples(prev =>
        prev.map(s =>
          s.id === activeSampleId
            ? {
                ...s,
                categoryId: item.summary.categoryId as WaterCategoryId,
                subcategoryId: item.summary.subcategoryId as SubcategoryId,
                metadata: item.metadata,
                inputs: item.rawInputs,
                fieldMeasurements: item.fieldMeasurements || {},
                isEvaluated: true,
                summary: item.summary,
              }
            : s
        )
      );
    } else {
      // Add as new restored sample
      const newSample: SampleItem = {
        id: generateSampleId(),
        name: `Restaurada: ${item.metadata.sampleCode || 'Muestra'}`,
        categoryId: item.summary.categoryId as WaterCategoryId,
        subcategoryId: item.summary.subcategoryId as SubcategoryId,
        metadata: item.metadata,
        inputs: item.rawInputs,
        fieldMeasurements: item.fieldMeasurements || {},
        isEvaluated: true,
        summary: item.summary,
      };
      setSamples(prev => [newSample, ...prev]);
      setActiveSampleId(newSample.id);
    }

    setIsCurrentSaved(true);
    setViewMode('RESULTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white relative overflow-x-hidden">
      {/* Animated Water Welcome Intro Overlay */}
      {showIntro && (
        <WaterWelcomeIntro onEnterApp={() => setShowIntro(false)} />
      )}

      {/* Interactive Living Water Backdrop */}
      <LiveWaterBackdrop />

      {/* Top Header */}
      <Header
        onOpenNormative={() => setIsNormativeOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenDeveloper={() => setIsDeveloperOpen(true)}
        historyCount={savedEvaluations.length}
        onLogoClick={() => setShowIntro(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 space-y-6">
        {/* Validation Alert Notification Banner */}
        {validationAlert && (
          <div
            id="validation-alert-banner"
            className={`p-4 rounded-2xl border backdrop-blur-xl flex items-start justify-between gap-3 shadow-2xl transition-all duration-300 animate-in slide-in-from-top-4 ${
              validationAlert.type === 'error'
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 shadow-rose-950/50 animate-error-shake'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-200 shadow-amber-950/50'
            }`}
          >
            <div className="flex items-start gap-3">
              {validationAlert.type === 'error' ? (
                <AlertOctagon className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
              ) : (
                <AlertOctagon className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
              )}
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                  {validationAlert.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-90">
                  {validationAlert.message}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setValidationAlert(null)}
              className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 text-xs font-bold transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}

        {/* 1. Global Multi-Sample Aggregated Summary Dashboard */}
        <div id="panel-general-muestras" className="scroll-mt-20">
          <MultiSampleSummary
            samples={samples}
            activeSampleId={activeSampleId}
            onSelectSample={id => {
              setActiveSampleId(id);
              const targetSample = samples.find(s => s.id === id);
              if (targetSample && targetSample.summary) {
                setViewMode('RESULTS');
              } else {
                setViewMode('INPUT');
              }
            }}
            onAddSample={handleOpenAddSampleModal}
            onEvaluateAll={handleEvaluateAll}
            onExportMultiExcel={() => {
              if (samples.length === 0) {
                setValidationAlert({
                  title: 'Sin muestras para exportar',
                  message: 'Agregue una nueva muestra para generar la matriz en Excel.',
                  type: 'info',
                });
                return;
              }
              exportMultiSampleExcel(samples);
            }}
            onExportMultiPDF={() => {
              if (samples.length === 0) {
                setValidationAlert({
                  title: 'Sin muestras para exportar',
                  message: 'Agregue una nueva muestra para generar el reporte en PDF.',
                  type: 'info',
                });
                return;
              }
              exportMultiSamplePDF(samples);
            }}
            maxSamplesReached={samples.length >= MAX_SAMPLES}
          />
        </div>

        {/* 2. Sample Management Carousel / Cards Grid (Up to 10 Samples) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>Muestras en Paralelo ({samples.length} de {MAX_SAMPLES})</span>
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline">
                — Seleccione una tarjeta para editar o ver sus resultados
              </span>
            </div>

            {samples.length < MAX_SAMPLES && (
              <button
                id="btn-add-sample-row"
                type="button"
                onClick={handleOpenAddSampleModal}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/10 hover:bg-cyan-500/20 text-cyan-300 border border-white/15 hover:border-cyan-400/40 transition flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Nueva Muestra</span>
              </button>
            )}
          </div>

          {/* Cards Grid: Adaptive to small screens & desktop */}
          {samples.length === 0 ? (
            <div
              id="card-empty-sample-prompt"
              onClick={handleOpenAddSampleModal}
              className="group relative rounded-2xl p-8 sm:p-12 border border-cyan-500/35 hover:border-cyan-400/70 bg-slate-900/70 hover:bg-slate-900/90 backdrop-blur-2xl transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center space-y-4 max-w-xl mx-auto shadow-2xl shadow-cyan-950/30 animate-in zoom-in-95"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 mx-auto flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/25 transition-all shadow-lg shadow-cyan-500/20">
                <Layers className="h-7 w-7 stroke-[2]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                  No hay muestras registradas
                </h3>
                <p className="text-xs text-slate-300/90 leading-relaxed max-w-md mx-auto">
                  Agregue una nueva muestra para continuar con la selección de categoría ECA (D.S. N° 004-2017-MINAM), ingreso de parámetros analíticos y evaluación de calidad ambiental.
                </p>
              </div>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenAddSampleModal();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 group-hover:from-blue-500 group-hover:via-cyan-400 group-hover:to-teal-300 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="h-4 w-4 stroke-[2.5]" />
                  <span>Agregar Nueva Muestra</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {samples.map((sample, idx) => (
                <SampleCard
                  key={sample.id}
                  sample={sample}
                  index={idx}
                  isActive={sample.id === activeSampleId}
                  canDelete={true}
                  canDuplicate={samples.length < MAX_SAMPLES}
                  onSelect={() => setActiveSampleId(sample.id)}
                  onDelete={() => handleDeleteSample(sample.id)}
                  onDuplicate={() => handleDuplicateSample(sample)}
                  onEvaluate={() => handleEvaluateSingle(sample)}
                  onUpdateName={name => handleUpdateSampleName(sample.id, name)}
                />
              ))}
            </div>
          )}
        </section>

        {/* 3. Sample Metadata & Traceability Form (Placed above Navigation View Switcher) */}
        {samples.length > 0 && activeSample && (
          <div className="pt-2 border-t border-white/10">
            <SampleMetadataForm
              metadata={activeSample.metadata}
              onChangeMetadata={handleMetadataChange}
            />
          </div>
        )}

        {/* 4. Navigation View Switcher (Input Matrix vs Results View) */}
        {samples.length > 0 && (
          <div
            id="navigation-view-switcher"
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 scroll-mt-24"
          >
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setViewMode('INPUT');
                  setResultsErrorMessage(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'INPUT'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25 border border-cyan-400/50'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <span>Matriz de Ingreso</span>
              </button>

              <button
                type="button"
                id="tab-btn-results"
                onClick={handleSwitchToResults}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  shakeResultsTab
                    ? 'animate-error-shake ring-2 ring-rose-500 bg-rose-950/80 text-rose-200 border border-rose-500 shadow-lg shadow-rose-950/70'
                    : viewMode === 'RESULTS'
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 shadow-lg shadow-teal-500/25 border border-teal-300/60 font-black'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Resultados & Gráficos</span>
                {activeSample?.isEvaluated && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping ml-0.5" />
                )}
              </button>

              {/* Inline Error Message right next to the tab button with smooth fade exit */}
              <AnimatePresence>
                {resultsErrorMessage && (
                  <motion.div
                    key="results-tab-error-msg"
                    id="results-tab-error-msg"
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
                      scale: 0.96,
                      transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-950/95 border border-rose-500/70 text-rose-200 text-xs font-bold shadow-lg shadow-rose-950/70 whitespace-nowrap backdrop-blur-md"
                  >
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400 shrink-0 animate-pulse" />
                    <span>{resultsErrorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="text-xs text-slate-400 hidden sm:flex items-center gap-2">
              <span>Editando:</span>
              <span className="text-cyan-300 font-bold px-2 py-0.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                {activeSample?.name}
              </span>
            </div>
          </div>
        )}

        {/* 5. Active Sample Workspace (Inputs or Results) */}
        {samples.length > 0 && (
          <>
            {viewMode === 'INPUT' && activeSample && (
              <div className="space-y-6 animate-in fade-in-50 duration-300">
                {/* Step 1: Category & Subcategory Selector */}
                <CategorySelector
                  selectedCategory={activeSample.categoryId}
                  selectedSubcategory={activeSample.subcategoryId}
                  onSelectCategory={handleCategoryChange}
                  onSelectSubcategory={handleSubcategoryChange}
                />

                {/* Step 2: Dynamic Parameter Input Table (Visualized only after Category & Subcategory are selected) */}
                {Boolean(activeSample.categoryId && activeSample.subcategoryId) && (
                  <ParameterInputTable
                    categoryId={activeSample.categoryId}
                    subcategoryId={activeSample.subcategoryId}
                    inputs={activeSample.inputs}
                    fieldMeasurements={activeSample.fieldMeasurements}
                    onInputChange={handleInputChange}
                    onClearAll={handleClearInputs}
                    onLoadPreset={handleLoadPreset}
                    onFieldMeasurementsChange={handleFieldMeasurementsChange}
                    onEvaluate={() => handleEvaluateSingle(activeSample)}
                  />
                )}
              </div>
            )}

            {viewMode === 'RESULTS' && activeSample && (
              <div>
                {activeSample.summary && activeSample.summary.totalEvaluated > 0 ? (
                  <ResultsDashboard
                    summary={activeSample.summary}
                    metadata={activeSample.metadata}
                    allSamples={samples}
                    activeSampleName={activeSample.name}
                    onModifyInputs={() => setViewMode('INPUT')}
                    onSaveToHistory={handleSaveToHistory}
                    onScrollToGeneralPanel={scrollToGeneralPanel}
                    isSaved={isCurrentSaved}
                  />
                ) : !activeSample.categoryId || !activeSample.subcategoryId ? (
                  <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-8 sm:p-10 text-center space-y-4 max-w-xl mx-auto shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 mx-auto flex items-center justify-center border border-amber-500/30">
                      <AlertOctagon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-black text-white tracking-tight">
                        No se puede realizar el análisis de calidad ambiental
                      </h3>
                      <p className="text-xs text-amber-200/90 leading-relaxed max-w-md mx-auto">
                        No se ha configurado una <strong>Categoría</strong> o <strong>Subcategoría</strong> de agua para esta muestra. Seleccione la clasificación oficial correspondiente según el D.S. N° 004-2017-MINAM en el Paso 2 para habilitar la evaluación.
                      </p>
                    </div>
                    <button
                      onClick={() => setViewMode('INPUT')}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer transition-all"
                    >
                      Ir a Seleccionar Categoría (Paso 2)
                    </button>
                  </div>
                ) : Object.values(activeSample.inputs).filter((v: any) => v && v.value !== '' && v.value !== undefined).length === 0 ? (
                  <div className="bg-slate-900/80 border border-amber-500/40 rounded-2xl p-8 sm:p-10 text-center space-y-4 max-w-xl mx-auto shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-300 mx-auto flex items-center justify-center border border-amber-500/30">
                      <AlertOctagon className="h-7 w-7" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="text-base font-black text-white tracking-tight">
                        No se puede realizar el análisis de calidad ambiental
                      </h3>
                      <p className="text-xs text-amber-200/90 leading-relaxed max-w-md mx-auto">
                        No se ha ingresado ninguna determinación analítica. Debe ingresar como mínimo <strong>un (1) punto o parámetro a evaluar</strong> con su respectiva medición en la matriz de resultados.
                      </p>
                    </div>
                    <button
                      onClick={() => setViewMode('INPUT')}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer transition-all"
                    >
                      Ir a Matriz de Ingreso (Paso 3)
                    </button>
                  </div>
                ) : (
                  <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-300 mx-auto flex items-center justify-center">
                      <Play className="h-6 w-6 ml-0.5" />
                    </div>
                    <h3 className="text-base font-bold text-white">
                      Esta muestra aún no ha sido evaluada
                    </h3>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      Presione el botón a continuación para procesar los parámetros ingresados contra los límites del ECA (D.S. 004-2017-MINAM).
                    </p>
                    <button
                      onClick={() => handleEvaluateSingle(activeSample)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer"
                    >
                      Evaluar Muestra Ahora
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950/80 backdrop-blur-2xl border-t border-white/10 py-6 text-center text-xs text-slate-400 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setShowIntro(true)}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none"
            title="Ir a la pantalla de bienvenida"
          >
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center transition-transform group-hover:scale-110">
              <Droplet className="h-3 w-3 text-cyan-300" />
            </div>
            <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">AquaRadar Perú</span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 text-[10px] font-mono border border-cyan-500/20 font-medium">v2.0</span>
            <span className="text-slate-400 font-normal">© 2026</span>
            <span className="text-slate-400">
              — Sistema Multimuestra de Verificación de Calidad Ambiental del Agua (D.S. N° 004-2017-MINAM)
            </span>
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 select-none opacity-80" aria-label="Casa Altair">
            <span>Casa Altair</span>
            <AltairEmblem size={16} className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AddSampleModal
        isOpen={isAddSampleModalOpen}
        onClose={() => setIsAddSampleModalOpen(false)}
        onConfirm={handleConfirmAddSample}
        defaultSampleName={`Muestra ${samples.length + 1}`}
        currentCount={samples.length}
        maxSamples={MAX_SAMPLES}
      />

      <NormativeViewerModal
        isOpen={isNormativeOpen}
        onClose={() => setIsNormativeOpen(false)}
      />

      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedEvaluations={savedEvaluations}
        onRestore={handleRestoreFromHistory}
        onDelete={id => setSavedEvaluations(prev => prev.filter(e => e.id !== id))}
        onClearHistory={() => setSavedEvaluations([])}
      />

      <DeveloperModal
        isOpen={isDeveloperOpen}
        onClose={() => setIsDeveloperOpen(false)}
      />
    </div>
  );
};

export default App;
