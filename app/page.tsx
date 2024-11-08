'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { CirclePauseIcon, Heart, Music2 } from 'lucide-react';
import useSound from 'use-sound';
import { Button } from '@/components/ui/button';
import Introduction from '@/components/Introduction';
import ImageCarousel from '@/components/ImageCarousel';
import OurStory from '@/components/OurStory';
import AboutUs from '@/components/AboutUs';
import MemoryGallery from '@/components/MemoryGallery';
import FutureTogether from '@/components/FutureTogether';
import SurpriseGift from '@/components/SurpriseGift';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollProgress from '@/components/ScrollProgress';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [playMusic, { stop }] = useSound('/sounds/romantic-piano.mp3', {
    volume: 0.4,
    loop: true,
  });

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stop();
    } else {
      playMusic();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <main
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 dark:from-pink-950 dark:via-gray-900 dark:to-pink-950 relative"
    >
      <ScrollProgress />
      <ParticleBackground />

      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 right-4 z-50 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:scale-110"
        onClick={toggleMusic}
      >
        {isMusicPlaying ? (
          <Music2 className="h-4 w-4" />
        ) : (
          <CirclePauseIcon className="h-4 w-4" />
        )}
      </Button>

      <motion.div
        style={{ opacity, scale }}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className="text-pink-500 animate-pulse w-32 h-32 opacity-20" />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <Introduction />
        
        <motion.div
          style={{ y }}
          className="py-20"
        >
          <ImageCarousel />
        </motion.div>

        <OurStory />
        <AboutUs />
        <MemoryGallery />
        <FutureTogether />
        <SurpriseGift />
      </div>
    </main>
  );
}