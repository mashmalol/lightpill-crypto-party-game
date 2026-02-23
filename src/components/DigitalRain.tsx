import { useEffect, useRef } from 'react';

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    char: string;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Characters to use for the rain
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = characters.split('');

    // Initialize particles
    const initializeParticles = () => {
      particlesRef.current = [];
      const columns = Math.floor(canvas.width / 20);
      
      for (let i = 0; i < columns; i++) {
        particlesRef.current.push({
          x: i * 20,
          y: Math.random() * canvas.height,
          vx: 0,
          vy: 1 + Math.random() * 2,
          char: charArray[Math.floor(Math.random() * charArray.length)],
          opacity: 1,
        });
      }
    };

    initializeParticles();

    const draw = () => {
      // Semi-transparent black background for fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const repelRadius = 150;
      const repelStrength = 0.5;

      for (const particle of particlesRef.current) {
        // Calculate distance to mouse
        const dx = particle.x - mouse.x;
        const dy = particle.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Repel particles from mouse
        if (distance < repelRadius && distance > 0) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / repelRadius) * repelStrength;
          particle.vx += Math.cos(angle) * force;
          particle.vy += Math.sin(angle) * force;
        }

        // Apply damping for smooth motion
        particle.vx *= 0.95;
        particle.vy = Math.min(particle.vy, 3);
        particle.vy *= 0.98;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reset if off screen
        if (particle.y > canvas.height) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
          particle.vx = 0;
          particle.vy = 1 + Math.random() * 2;
        }

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        // Calculate opacity based on distance to mouse
        if (distance < repelRadius) {
          particle.opacity = 0.2 + (distance / repelRadius) * 0.8;
        } else {
          particle.opacity = 1;
        }

        // Draw the character
        ctx.fillStyle = `rgba(0, 255, 0, ${particle.opacity})`;
        ctx.font = '16px monospace';
        ctx.fillText(particle.char, particle.x, particle.y);

        // Randomly change character
        if (Math.random() > 0.98) {
          particle.char = charArray[Math.floor(Math.random() * charArray.length)];
        }
      }

      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
