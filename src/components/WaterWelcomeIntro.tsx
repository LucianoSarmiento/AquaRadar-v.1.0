import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Droplet, ArrowRight, ShieldCheck, MousePointerClick, ChevronRight } from 'lucide-react';

interface WaterWelcomeIntroProps {
  onEnterApp: () => void;
}

export const WaterWelcomeIntro: React.FC<WaterWelcomeIntroProps> = ({ onEnterApp }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [step, setStep] = useState<number>(0); // 0: Welcome, 1: Helper, 2: Button
  const [isDissolving, setIsDissolving] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const isTransitioningRef = useRef<boolean>(false);

  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: 0,
    y: 0,
    active: false,
    radius: 0,
  });

  // Ripple creator reference from canvas
  const triggerRippleRef = useRef<((x: number, y: number) => void) | null>(null);

  // Lock scrollbars on root and body while the welcome screen is open
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  // Smooth step advancement with blur and fade dissolve
  const advanceStep = useCallback(() => {
    if (isTransitioningRef.current || isExiting) return;

    if (step === 0) {
      isTransitioningRef.current = true;
      setIsDissolving(true);
      setTimeout(() => {
        setStep(1);
        setTimeout(() => {
          setIsDissolving(false);
          isTransitioningRef.current = false;
        }, 60);
      }, 500);
    } else if (step === 1) {
      isTransitioningRef.current = true;
      setIsDissolving(true);
      setTimeout(() => {
        setStep(2);
        setTimeout(() => {
          setIsDissolving(false);
          isTransitioningRef.current = false;
        }, 60);
      }, 500);
    }
  }, [step, isExiting]);

  // Handle final app entrance
  const handleStart = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onEnterApp();
    }, 700);
  }, [isExiting, onEnterApp]);

  // Handle screen click to advance or trigger ripple
  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking directly on a button with its own handler, don't trigger parent screen click
    const target = e.target as HTMLElement;
    if (target.closest('#btn-skip-intro') || target.closest('#btn-start-aquaradar')) {
      return;
    }

    if (triggerRippleRef.current) {
      triggerRippleRef.current(e.clientX, e.clientY);
    }

    if (step < 2) {
      advanceStep();
    }
  };

  // High-performance Realistic 3D-shaded Fluid Water Simulation on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Interactive ripples list
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      intensity: number;
      speed: number;
    }
    const ripples: Ripple[] = [];

    const addRipple = (x: number, y: number) => {
      if (ripples.length > 12) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.5,
        intensity: 1.0,
        speed: 3.6,
      });
    };

    triggerRippleRef.current = addRipple;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mouseRef.current = {
        x: clientX,
        y: clientY,
        active: true,
        radius: 80,
      };

      if (Math.random() < 0.1) {
        addRipple(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    // Add initial atmospheric center ripples
    addRipple(width * 0.5, height * 0.5);
    setTimeout(() => addRipple(width * 0.35, height * 0.4), 600);
    setTimeout(() => addRipple(width * 0.65, height * 0.6), 1200);

    let time = 0;

    const render = () => {
      time += 0.018;

      // Base deep oceanic gradient (Dark Abyss to Cyan-Navy depths)
      const bgGrad = ctx.createLinearGradient(0, 0, width, height * 0.95);
      bgGrad.addColorStop(0, '#02131d');
      bgGrad.addColorStop(0.35, '#042431');
      bgGrad.addColorStop(0.7, '#073949');
      bgGrad.addColorStop(1, '#020e16');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render multi-layer fluid harmonic water waves with specular crest highlights
      const numWaves = 7;
      const stepX = 8;

      for (let w = 0; w < numWaves; w++) {
        const waveProgress = w / numWaves;
        const baseY = height * (0.32 + waveProgress * 0.7);
        const waveSpeed = 0.8 + w * 0.3;
        const waveAmp = 18 + (numWaves - w) * 9;
        const waveFreq1 = 0.0035 + w * 0.0008;
        const waveFreq2 = 0.007 + w * 0.0012;

        // Collect wave points from beyond the left edge to beyond the right edge
        const points: { x: number; y: number }[] = [];
        for (let x = -stepX * 2; x <= width + stepX * 2; x += stepX) {
          let y =
            baseY +
            Math.sin(x * waveFreq1 + time * waveSpeed + w * 1.5) * waveAmp +
            Math.cos(x * waveFreq2 - time * (waveSpeed * 0.7) + w) * (waveAmp * 0.55) +
            Math.sin((x + time * 30) * 0.015) * 5;

          // Apply mouse cursor deformation
          if (mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const push = (1 - dist / 180) * 22;
              y += Math.sin(dist * 0.1 - time * 6) * push;
            }
          }

          // Apply user ripples
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const dx = x - rip.x;
            const dy = y - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(dist - rip.radius);
            if (ringDist < 60 && rip.intensity > 0.01) {
              const factor = (1 - ringDist / 60) * Math.sin(ringDist * 0.2 - time * 5);
              y += factor * 14 * rip.intensity;
            }
          }

          points.push({ x, y });
        }

        if (points.length === 0) continue;

        // 1. Fill wave body polygon down to bottom (no borders/side strokes)
        ctx.beginPath();
        ctx.moveTo(points[0].x, height + 20);
        ctx.lineTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineTo(points[points.length - 1].x, height + 20);
        ctx.closePath();

        // Layer color with transparency & depth
        const waveAlpha = 0.22 + (1 - waveProgress) * 0.45;
        const waveGrad = ctx.createLinearGradient(0, baseY - waveAmp, 0, height);

        if (w === 0) {
          waveGrad.addColorStop(0, `rgba(8, 76, 97, ${waveAlpha})`);
          waveGrad.addColorStop(1, 'rgba(2, 20, 29, 0.95)');
        } else if (w % 2 === 1) {
          waveGrad.addColorStop(0, `rgba(13, 148, 136, ${waveAlpha * 0.7})`);
          waveGrad.addColorStop(0.3, `rgba(6, 95, 110, ${waveAlpha})`);
          waveGrad.addColorStop(1, 'rgba(3, 27, 38, 0.9)');
        } else {
          waveGrad.addColorStop(0, `rgba(34, 211, 238, ${waveAlpha * 0.4})`);
          waveGrad.addColorStop(0.25, `rgba(14, 116, 144, ${waveAlpha})`);
          waveGrad.addColorStop(1, 'rgba(2, 18, 26, 0.9)');
        }

        ctx.fillStyle = waveGrad;
        ctx.fill();

        // 2. Specular sunlight highlight crest - stroke ONLY along the wavy top surface
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = `rgba(186, 240, 255, ${0.12 + (1 - waveProgress) * 0.45})`;
        ctx.stroke();
      }

      // Specular sun glint & caustic lights
      const sunCenter = { x: width * 0.58, y: height * 0.42 };
      const sunGlow = ctx.createRadialGradient(
        sunCenter.x,
        sunCenter.y,
        5,
        sunCenter.x,
        sunCenter.y,
        width * 0.45
      );
      sunGlow.addColorStop(0, 'rgba(215, 249, 255, 0.25)');
      sunGlow.addColorStop(0.2, 'rgba(56, 189, 248, 0.12)');
      sunGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.04)');
      sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, width, height);

      // Expanding ripples animation
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.intensity *= 0.985;

        if (rip.radius < rip.maxRadius && rip.intensity > 0.02) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(
            rip.x,
            rip.y,
            rip.radius,
            rip.radius * 0.42,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(165, 243, 252, ${rip.intensity * 0.4})`;
          ctx.lineWidth = 2.5 * rip.intensity;
          ctx.stroke();
          ctx.restore();
        } else {
          ripples.splice(r, 1);
        }
      }

      // Floating water sparkles
      const particleCount = 28;
      for (let p = 0; p < particleCount; p++) {
        const px = (Math.sin(p * 99 + time * 0.5) * 0.4 + 0.5) * width;
        const py = (Math.cos(p * 33 + time * 0.4) * 0.3 + 0.55) * height;
        const sparkAlpha =
          (Math.sin(p * 12 + time * 3.5) * 0.5 + 0.5) * (0.35 + Math.sin(time + p) * 0.3);
        const radius = 1 + (p % 3) * 1.2;

        if (sparkAlpha > 0.1) {
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 247, 255, ${sparkAlpha})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div
      onClick={handleScreenClick}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 select-none cursor-pointer ${
        isExiting
          ? 'opacity-0 scale-105 blur-md pointer-events-none'
          : 'opacity-100 scale-100 blur-none'
      }`}
      style={{ backgroundColor: '#020b12' }}
    >
      {/* Dynamic Interactive Water Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Atmospheric Vignette & Soft Ambient Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-slate-950/60 pointer-events-none" />

      {/* Top Bar Quick Skip Action */}
      <div className="absolute top-6 right-6 z-20">
        <button
          id="btn-skip-intro"
          onClick={e => {
            e.stopPropagation();
            handleStart();
          }}
          className="group px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-xs font-semibold backdrop-blur-xl border border-white/20 transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
        >
          <span>Saltar</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Main Center Content Container with Smooth Blur & Opacity Dissolve Transitions */}
      <div className="relative z-10 max-w-4xl w-full px-6 text-center flex flex-col items-center justify-center min-h-[420px]">
        {/* MESSAGE CONTAINER WITH SMOOTH DISSOLVE EFFECT */}
        <div
          className={`transform transition-all duration-500 ease-out flex flex-col items-center ${
            isDissolving
              ? 'opacity-0 scale-95 blur-md -translate-y-3 pointer-events-none'
              : 'opacity-100 scale-100 blur-0 translate-y-0'
          }`}
        >
          {/* STEP 0: BIENVENIDO A AQUARADAR */}
          {step === 0 && (
            <div className="flex flex-col items-center space-y-6">
              {/* Liquid Droplet Emblem */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative h-20 w-20 rounded-2xl bg-slate-900/80 border border-cyan-400/50 backdrop-blur-2xl flex items-center justify-center text-cyan-300 shadow-2xl shadow-cyan-500/40">
                  <Droplet className="h-10 w-10 fill-cyan-400/20 text-cyan-300 stroke-[1.75]" />
                </div>
              </div>

              {/* Main Welcome Headline */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                  <span>Monitoreo & Estándares Ambientales</span>
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-300 tracking-tight leading-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  BIENVENIDO A AQUARADAR
                </h1>
                <p className="text-sm sm:text-lg text-slate-200/90 font-medium max-w-xl mx-auto drop-shadow-md leading-relaxed">
                  Plataforma técnica inteligente de evaluación hidrológica y verificación ambiental del agua en el Perú.
                </p>
              </div>
            </div>
          )}

          {/* STEP 1: TE AYUDO A EVALUAR LA CALIDAD AMBIENTAL DEL AGUA */}
          {step === 1 && (
            <div className="flex flex-col items-center space-y-6">
              {/* Sparkles / Normative Shield Emblem */}
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full blur-xl opacity-60 animate-pulse" />
                <div className="relative h-20 w-20 rounded-2xl bg-slate-900/80 border border-emerald-400/50 backdrop-blur-2xl flex items-center justify-center text-emerald-300 shadow-2xl shadow-emerald-500/40">
                  <ShieldCheck className="h-10 w-10 text-emerald-300 stroke-[1.75]" />
                </div>
              </div>

              {/* Helper Message Headline */}
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm">
                  <span>Normativa Oficial D.S. N° 004-2017-MINAM - ECA para agua</span>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-emerald-100 to-cyan-200 tracking-tight leading-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  TE AYUDO A EVALUAR LA CALIDAD AMBIENTAL DEL AGUA
                </h2>
                <p className="text-sm sm:text-lg text-slate-200/90 font-medium max-w-2xl mx-auto drop-shadow-md leading-relaxed">
                  Calcula instantáneamente el cumplimiento de parámetros fisicoquímicos, inorgánicos, orgánicos y microbiológicos frente a los límites normativos oficiales.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: ¿COMENZAMOS? BUTTON */}
          {step === 2 && (
            <div className="flex flex-col items-center space-y-7">
              {/* Interactive Pulse Rings */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full blur-2xl opacity-75 animate-pulse" />
                <div className="relative h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 border border-white/40 backdrop-blur-2xl flex items-center justify-center text-white shadow-2xl shadow-cyan-500/50 animate-bounce duration-1000">
                  <Droplet className="h-10 w-10 fill-white/20 text-white stroke-[2]" />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-cyan-300 tracking-widest uppercase">
                  Todo listo para tu evaluación
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-md">
                  Comienza el análisis de tus muestras
                </h3>
              </div>

              {/* Giant Glowing CTA Button */}
              <button
                id="btn-start-aquaradar"
                onClick={e => {
                  e.stopPropagation();
                  handleStart();
                }}
                className="group relative px-10 py-5 sm:px-14 sm:py-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-500 hover:via-cyan-400 hover:to-teal-300 text-white font-extrabold text-xl sm:text-2xl tracking-wide shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:shadow-[0_0_60px_rgba(6,182,212,0.9)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-white/40 backdrop-blur-xl flex items-center gap-3 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-3 drop-shadow-sm">
                  ¿COMENZAMOS?
                  <ArrowRight className="h-6 w-6 sm:h-7 sm:w-7 group-hover:translate-x-1.5 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <p className="text-xs text-slate-300/80 font-medium">
                Haz clic en el botón para ingresar a la matriz técnica de AquaRadar
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Subtle Interaction Indicator with Step Progress */}
      <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center pointer-events-none z-20 space-y-2">
        {step < 2 ? (
          <div className="animate-pulse inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/15 text-slate-300/90 text-xs font-medium backdrop-blur-md shadow-lg">
            <MousePointerClick className="h-3.5 w-3.5 text-cyan-400 animate-bounce" />
            <span>Haga clic para continuar</span>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-slate-900/40 border border-white/10 text-cyan-300/80 text-[11px] font-medium backdrop-blur-sm">
            <span>Fondo de agua interactivo</span>
          </div>
        )}

        {/* Step Progress Dots */}
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step === 0 ? 'w-6 bg-cyan-400 shadow-sm shadow-cyan-400/80' : 'w-1.5 bg-white/30'
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step === 1 ? 'w-6 bg-emerald-400 shadow-sm shadow-emerald-400/80' : 'w-1.5 bg-white/30'
            }`}
          />
          <span
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step === 2 ? 'w-6 bg-blue-400 shadow-sm shadow-blue-400/80' : 'w-1.5 bg-white/30'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
