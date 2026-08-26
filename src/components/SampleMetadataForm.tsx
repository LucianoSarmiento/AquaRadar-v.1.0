import React, { useState } from 'react';
import { SampleMetadata } from '../types';
import { MapPin, Calendar, User, Compass, ChevronDown, ChevronUp, Tag, FileSpreadsheet, ClipboardList } from 'lucide-react';

interface SampleMetadataFormProps {
  metadata: SampleMetadata;
  onChangeMetadata: (meta: SampleMetadata) => void;
}

export const SampleMetadataForm: React.FC<SampleMetadataFormProps> = ({
  metadata,
  onChangeMetadata,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (field: keyof SampleMetadata, value: string) => {
    onChangeMetadata({
      ...metadata,
      [field]: value,
    });
  };

  const hasData = Boolean(metadata.sampleCode || metadata.waterBody || metadata.location);

  return (
    <div className="bg-slate-900/60 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 overflow-hidden transition-all duration-300">
      <button
        type="button"
        id="btn-toggle-metadata"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all duration-200 backdrop-blur-xl cursor-pointer"
      >
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex h-8 w-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 items-center justify-center shadow-lg shadow-cyan-500/20">
            <ClipboardList className="h-4 w-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-sm font-bold text-white block sm:inline">
              Datos de Muestra & Trazabilidad
            </span>
            <span className="text-[11px] text-slate-400 sm:ml-2">
              (Identificación y metadatos de campo)
            </span>
          </div>

          {/* Quick summary chips when collapsed */}
          {!isOpen && hasData && (
            <div className="hidden md:flex items-center gap-2 ml-2">
              {metadata.sampleCode && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono">
                  <Tag className="h-2.5 w-2.5" />
                  {metadata.sampleCode}
                </span>
              )}
              {metadata.waterBody && (
                <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30">
                  <MapPin className="h-2.5 w-2.5" />
                  {metadata.waterBody}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition">
          <span>{isOpen ? 'Ocultar' : 'Editar Metadatos'}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-white/10 bg-slate-950/40 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in-50 duration-300">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Tag className="h-3 w-3 text-cyan-400" />
              <span>Código de Muestra</span>
            </label>
            <input
              id="meta-sample-code"
              type="text"
              placeholder="Ej. MUESTRA-2026-001"
              value={metadata.sampleCode || ''}
              onChange={e => handleChange('sampleCode', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-cyan-400" />
              <span>Cuerpo de Agua / Cuenca</span>
            </label>
            <input
              id="meta-water-body"
              type="text"
              placeholder="Ej. Río Rímac / Cuenca Santa"
              value={metadata.waterBody || ''}
              onChange={e => handleChange('waterBody', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="h-3 w-3 text-cyan-400" />
              <span>Punto de Muestreo / Ubicación</span>
            </label>
            <input
              id="meta-location"
              type="text"
              placeholder="Ej. Bocatoma Chosica km 34"
              value={metadata.location || ''}
              onChange={e => handleChange('location', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="h-3 w-3 text-cyan-400" />
              <span>Coordenadas (UTM o Geográficas)</span>
            </label>
            <input
              id="meta-coordinates"
              type="text"
              placeholder="Ej. 18S 289450 E, 8674200 N"
              value={metadata.coordinates || ''}
              onChange={e => handleChange('coordinates', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="h-3 w-3 text-cyan-400" />
              <span>Fecha y Hora de Muestreo</span>
            </label>
            <input
              id="meta-sampling-date"
              type="datetime-local"
              style={{ colorScheme: 'dark' }}
              value={metadata.samplingDate || ''}
              onChange={e => handleChange('samplingDate', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
              <User className="h-3 w-3 text-cyan-400" />
              <span>Evaluador / Responsable</span>
            </label>
            <input
              id="meta-sampler-name"
              type="text"
              placeholder="Ej. Ing. Especialista / Laboratorio"
              value={metadata.samplerName || ''}
              onChange={e => handleChange('samplerName', e.target.value)}
              className="w-full text-xs px-3.5 py-2.5 bg-slate-900/80 border border-white/15 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 backdrop-blur-md transition"
            />
          </div>
        </div>
      )}
    </div>
  );
};
