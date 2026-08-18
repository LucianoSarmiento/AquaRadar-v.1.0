import React, { useEffect, useRef } from 'react';

export const LiveWaterBackdrop: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

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

    // Interactive ripples
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
      if (ripples.length > 6) ripples.shift();
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.min(width, height) * 0.4,
        intensity: 0.6,
        speed: 2.5,
      });
    };

    const handlePointer = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      mouseRef.current = { x: clientX, y: clientY, active: true };

      if (Math.random() < 0.08) {
        addRipple(clientX, clientY);
      }
    };

    window.addEventListener('mousemove', handlePointer);
    window.addEventListener('click', handlePointer);

    let time = 0;

    const render = () => {
      time += 0.012;

      // Deep dark canvas background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Atmospheric deep ocean gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#031726');
      grad.addColorStop(0.4, '#04222f');
      grad.addColorStop(0.8, '#06303d');
      grad.addColorStop(1, '#020b12');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient light caustic pools
      const numCaustics = 3;
      for (let i = 0; i < numCaustics; i++) {
        const cx = width * (0.25 + 0.35 * i) + Math.sin(time * 0.7 + i * 2) * 80;
        const cy = height * (0.3 + 0.3 * (i % 2)) + Math.cos(time * 0.5 + i) * 60;
        const radius = Math.min(width, height) * (0.3 + i * 0.1);

        const radGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
        radGrad.addColorStop(0, 'rgba(6, 182, 212, 0.09)');
        radGrad.addColorStop(0.5, 'rgba(14, 116, 144, 0.04)');
        radGrad.addColorStop(1, 'rgba(2, 6, 23, 0)');

        ctx.fillStyle = radGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Smooth flowing harmonic waves
      const numWaves = 4;
      const stepX = 16;
      for (let w = 0; w < numWaves; w++) {
        const baseY = height * (0.45 + w * 0.15);
        const waveSpeed = 0.6 + w * 0.2;
        const waveAmp = 12 + w * 6;
        const waveFreq = 0.002 + w * 0.0006;

        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, baseY);

        for (let x = 0; x <= width + stepX; x += stepX) {
          let y =
            baseY +
            Math.sin(x * waveFreq + time * waveSpeed + w) * waveAmp +
            Math.cos(x * (waveFreq * 1.6) - time * 0.4) * (waveAmp * 0.4);

          // Apply ripples
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const dx = x - rip.x;
            const dy = y - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const ringDist = Math.abs(dist - rip.radius);
            if (ringDist < 50 && rip.intensity > 0.01) {
              const factor = (1 - ringDist / 50) * Math.sin(ringDist * 0.2 - time * 4);
              y += factor * 8 * rip.intensity;
            }
          }

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        const waveAlpha = 0.08 + w * 0.04;
        ctx.fillStyle = `rgba(6, 182, 212, ${waveAlpha})`;
        ctx.fill();

        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(103, 232, 249, ${waveAlpha * 1.5})`;
        ctx.stroke();
      }

      // Expanding ripples
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rip = ripples[r];
        rip.radius += rip.speed;
        rip.intensity *= 0.98;

        if (rip.radius < rip.maxRadius && rip.intensity > 0.02) {
          ctx.save();
          ctx.beginPath();
          ctx.ellipse(
            rip.x,
            rip.y,
            rip.radius,
            rip.radius * 0.4,
            0,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(103, 232, 249, ${rip.intensity * 0.25})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        } else {
          ripples.splice(r, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointer);
      window.removeEventListener('click', handlePointer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
};
