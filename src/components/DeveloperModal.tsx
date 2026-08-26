import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, Sparkles, ExternalLink, Award, Leaf } from 'lucide-react';
import developerPhoto from '../assets/developer_photo.png';

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperModal: React.FC<DeveloperModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const whatsappNumber = '51989651011';
  const defaultMessage = encodeURIComponent(
    'Hola Luciano, te contacto desde la plataforma AquaRadar Perú.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 overflow-hidden z-10"
        >
          {/* Subtle Ambient Glow FX */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            id="btn-close-developer-modal"
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-2xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-all active:scale-95 cursor-pointer border border-white/10"
            aria-label="Cerrar modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Header Tag */}
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>Desarrollador & Creador</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <Leaf className="h-3.5 w-3.5 text-emerald-400" />
              <span>Ingeniería Ambiental + IA</span>
            </div>
          </div>

          {/* Main Layout: Circular Photo + Content */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
            {/* Left Column: Circular Profile Photo + 'Más sobre mí' button below it */}
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative group">
                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-emerald-400 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1 bg-slate-900 border-2 border-cyan-400/60 shadow-xl overflow-hidden">
                  <img
                    src={developerPhoto}
                    alt="Luciano Julián Sarmiento Ramos"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('/developer_photo.png')) {
                        target.src = '/developer_photo.png';
                      }
                    }}
                    className="w-full h-full object-cover object-center rounded-full transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Interactive 'Más sobre mí' button below the photo */}
              <a
                id="btn-more-about-me"
                href="https://drive.google.com/file/d/1BS54Q2OE7c1T8HovjcgdYhbRg-oidBRM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 hover:border-cyan-400/80 shadow-md shadow-cyan-950/50 hover:text-white transition-all active:scale-95 cursor-pointer group"
              >
                <span>Más sobre mí</span>
                <ExternalLink className="h-3.5 w-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Information Column */}
            <div className="flex-1 text-center sm:text-left space-y-3.5">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-sans">
                  Luciano Julián Sarmiento Ramos
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-cyan-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Award className="h-4 w-4 shrink-0 text-cyan-300" />
                  <span>Bachiller en Ingeniería Ambiental</span>
                </p>
              </div>

              {/* Exact Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.03] p-4 rounded-2xl border border-white/5 font-normal">
                Bachiller en Ingeniería Ambiental con especial interés en la aplicación de inteligencia artificial para el desarrollo de herramientas digitales funcionales, orientadas a optimizar procesos y facilitar la toma de decisiones en materia ambiental.
              </p>

              {/* WhatsApp Contact Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <a
                  id="btn-whatsapp-contact"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 border border-emerald-300/40 transition-all active:scale-95 cursor-pointer group"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg
                    className="w-5 h-5 fill-current text-white transition-transform group-hover:scale-110"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Ponte en contacto</span>
                  <ExternalLink className="h-3.5 w-3.5 text-emerald-200" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

