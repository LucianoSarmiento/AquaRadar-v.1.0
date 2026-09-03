import React from 'react';
import { Droplet, BookOpen, History, User } from 'lucide-react';

interface HeaderProps {
  onOpenNormative: () => void;
  onOpenHistory: () => void;
  onOpenDeveloper: () => void;
  historyCount: number;
  onLogoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNormative,
  onOpenHistory,
  onOpenDeveloper,
  historyCount,
  onLogoClick,
}) => {
  return (
    <header className="bg-slate-950/70 backdrop-blur-2xl border-b border-white/10 text-white sticky top-0 z-30 shadow-2xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 py-2.5 sm:py-0">
          {/* Logo & Brand with Water Glow */}
          <button
            id="btn-header-logo"
            type="button"
            onClick={onLogoClick}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl transition-all shrink-0"
            title="Ir a la pantalla de bienvenida"
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/25 border border-cyan-300/40 transition-transform group-hover:scale-105 shrink-0">
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-cyan-400/20 blur-sm pointer-events-none" />
              <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white/20 relative z-10 transition-transform group-hover:scale-110" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white font-sans flex items-center group-hover:text-cyan-200 transition-colors">
                  Aqua<span className="text-cyan-400">Radar</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 tracking-wider">
                  D.S. 004-2017-MINAM
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block group-hover:text-slate-300 transition-colors">
                Evaluador Oficial de Estándares de Calidad Ambiental para Agua (ECA)
              </p>
            </div>
          </button>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Developer Profile Trigger Button (Left of Guia ECA) */}
            <button
              id="btn-open-developer"
              onClick={onOpenDeveloper}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400/60 backdrop-blur-md transition-all shadow-sm active:scale-95 cursor-pointer group"
              title="Conoce al desarrollador de AquaRadar Perú"
            >
              <User className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="hidden sm:inline">Conoce al desarrollador</span>
              <span className="sm:hidden">Autor</span>
            </button>

            <button
              id="btn-normative-guide"
              onClick={onOpenNormative}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all shadow-sm active:scale-95 cursor-pointer"
              title="Consultar texto oficial y tabla del Anexo D.S. 004-2017-MINAM"
            >
              <BookOpen className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">Guía ECA</span>
              <span className="xs:hidden">Guía</span>
            </button>

            <button
              id="btn-history"
              onClick={onOpenHistory}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all shadow-sm relative active:scale-95 cursor-pointer"
              title="Historial de evaluaciones guardadas"
            >
              <History className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="hidden xs:inline sm:inline">Historial</span>
              {historyCount > 0 && (
                <span className="ml-0.5 sm:ml-1 px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-500/40">
                  {historyCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

