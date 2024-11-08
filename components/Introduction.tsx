'use client'

import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Dancing_Script, Roboto } from 'next/font/google'
import { Heart, Sparkles, Music, CirclePause } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const dancing = Dancing_Script({ subsets: ['latin'] })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

const loveWords = [
  'I Love You',
  'हम तोहरे से बहुत प्यार करऽतानी',
  'तुमसे बहुत प्यार करता हूँ',
  'हम अहाँ से बहुत प्रेम करैत छी',
  'हम तोहरे बिना जी नइ सकऽतानी',
  'तुम बिना सब कुछ अधूरा बा',
  'तुम हमर जिनगी हो',
  'तुम बिन हमरा किछु ना चहिं',
  'हमरे दिल के राजा तुम हो',
  'हमरा से ज्यादा तुम कुछ ना चाही',
  'हम तोहरे संग हमेशा रहना चाहऽतानी',
  'तुम हमरा खातिर सब कुछ हो',
  'तुम बिन हमरा दिल ना लगता',
  'तुमरे बिना हमर जिनगी अधूरी बा',
  'हमरा दिल में केवल तुम हो',
  'तुम हमरा सबसे प्यारी हो',
  'तुम तोहार मुस्कान से हमार दिल जित लेलअ',
  'तुम बिन कुछ भी अच्छा ना लागत',
  'तुम बिना जीना मुश्किल बा',
  'हम तोहरे बिना ना रह सकऽतानी',
  'तुमरे साथ हम खुश रहित छी',
  'तुमरे बिना हमरा जिनगी बेरंग बा',
  'तुमरे संग हर पल खास बा',
  'तुम सबसे प्यारा हो',
  'हम तोहरे बिना कुछ भी ना चाहऽतानी',
  'तुम हमर दिल में हो',
  'हम तोहरे संग हमेशा रहना चाहऽतानी',
  'तुम बिना हमर जिनगी सुनसान बा',
  'तुम सबकुछ हो हमरा लेल',
  'तुम हमरा खातिर खास बा',
  'तुम सासों में बसल बाड़ऽ',
  'तुम हमर खुशियाँ हो',
  'हमरे दिल में सिर्फ तुम हो',
  'तुमरे बिना हमरा जिनगी अधूरी बा',
  'हमरा दिल के धड़कन सिर्फ तुम हो',
  'तुम हमरे जीवन के सबसे बड़ा तोहफा हो',
]

const floatingHearts = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 2,
  size: 8 + Math.random() * 20,
}))

export default function Introduction() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })
  const controls = useAnimation()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % loveWords.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])


  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            duration: 2,
            staggerChildren: 0.2,
          },
        },
      }}
      className={`${roboto.className} min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900 dark:to-purple-950`}
    >
      <div className="text-center relative z-10 px-4">
        <motion.div
          variants={{
            hidden: { scale: 0, rotate: -180 },
            visible: { scale: 1, rotate: 0 },
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="mb-8 relative"
        >
          <Heart className="w-20 h-20 md:w-24 md:h-24 mx-auto text-pink-500 dark:text-pink-400" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-28 h-28 md:w-32 md:h-32 text-pink-300/50 dark:text-pink-500/50" />
          </motion.div>
        </motion.div>

        <div className="h-32 md:h-40 relative">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentWordIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`${dancing.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pink-600 dark:text-pink-400 absolute left-1/2 -translate-x-1/2 w-full`}
            >
              {loveWords[currentWordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.p
          variants={{
            hidden: { y: 50, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-16"
        >
          Every moment with you is a gift
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mt-12"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 animate-bounce">
            Scroll to begin our journey
          </p>
        </motion.div>

       
      </div>

      {/* Floating hearts background */}
      {floatingHearts.map(({ id, delay, duration, size }) => (
        <motion.div
          key={id}
          className="absolute pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
          }}
        >
          <Heart
            className="text-pink-300 dark:text-pink-700"
            style={{
              width: size,
              height: size,
              opacity: 0.2 + Math.random() * 0.3,
            }}
          />
        </motion.div>
      ))}

      {/* Sparkle effects */}
      {inView && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 pointer-events-none"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              <Sparkles
                className="text-yellow-300/30 dark:text-yellow-700/30"
                size={12 + Math.random() * 8}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <audio ref={audioRef} loop>
        <source src="/sounds/romantic-background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </motion.section>
  )
}