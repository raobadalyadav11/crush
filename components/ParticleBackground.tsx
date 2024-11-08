'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles } from 'lucide-react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]); // Store particles in a ref to preserve state across renders
  const [motionElements, setMotionElements] = useState<any[]>([]); // Store initial positions and animations for motion.div

  // Particle class defined outside of the useEffect hook
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.size = Math.random() * 3 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
      this.color = `hsla(${Math.random() * 60 + 330}, 100%, 75%, ${Math.random() * 0.3 + 0.2})`;
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Reduce the size over time
      if (this.size > 0.2) this.size -= 0.1;

      // Bounce off walls
      if (this.x > canvasWidth || this.x < 0) this.speedX *= -1;
      if (this.y > canvasHeight || this.y < 0) this.speedY *= -1;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Return early if canvas is null

    const ctx = canvas.getContext('2d');
    if (!ctx) return; // Return early if ctx is null

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleCount = 50;
    const particles: Particle[] = [];

    // Initialize particles
    const initParticles = () => {
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
      particlesRef.current = particles; // Store particles in a ref to keep them on re-renders
    };

    // Animate particles
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw each particle
      particlesRef.current.forEach((particle, index) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);

        // Replace particle if it gets too small
        if (particle.size <= 0.2) {
          particlesRef.current.splice(index, 1, new Particle(canvas.width, canvas.height));
        }
      });

      requestAnimationFrame(animateParticles);
    };

    // Handle canvas resizing
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles(); // Re-initialize particles on resize
      }
    };

    initParticles();
    animateParticles();

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial resize to set canvas dimensions

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },);

  useEffect(() => {
    // Check for client side rendering before setting motion elements
    if (typeof window !== 'undefined') {
      const elements = [...Array(15)].map((_, i) => ({
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        transitionDuration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
        iconType: i % 3,
      }));

      setMotionElements(elements);
    }
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'transparent' }}
      />
      {motionElements.map((el, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none"
          initial={{
            x: el.initialX,
            y: el.initialY,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 60 - 30, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: el.transitionDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: el.delay,
          }}
        >
          {el.iconType === 0 ? (
            <Heart className="text-pink-300/30 dark:text-pink-700/30" size={16} />
          ) : el.iconType === 1 ? (
            <Stars className="text-purple-300/30 dark:text-purple-700/30" size={16} />
          ) : (
            <Sparkles className="text-yellow-300/30 dark:text-yellow-700/30" size={16} />
          )}
        </motion.div>
      ))}
    </>
  );
};

export default ParticleBackground;
