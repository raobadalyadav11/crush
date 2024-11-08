'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const images = [ 
  {
    url: '/caf.jpg',
    caption: 'The moment I first saw you',
  },
  {
    url: '/caf1.jpg',
    caption: 'Your beautiful smile brightens my day',
  },
  {
    url: '/caf2.jpg',
    caption: 'We had a great time together',
  },
  {
    url: '/caf3.jpg',
    caption: 'Every moment with you is magical',
  },
  {
    url: '/caf4.jpg',
    caption: 'always in my heart',
  },
  {
    url: '/caf5.jpg',
    caption: 'You make my heart complete',
  }
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const controls = useAnimation()
  const x = useMotionValue(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        paginate(1)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isPlaying, currentIndex])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length)
  }


  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-xl bg-gradient-to-br from-pink-100 to-purple-200 dark:from-pink-900 dark:to-purple-950">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1)
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1)
            }
          }}
          className="absolute w-full h-full"
        >
          <div className="relative w-full h-full">
            <Image
              width={1920}
              height={1080}
              src={images[currentIndex].url}
              alt={images[currentIndex].caption}
              className="w-full h-full object-cover"
              
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            >
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute bottom-0 left-0 right-0 p-8"
              >
                <p className="text-white text-3xl font-semibold text-center mb-4">
                  {images[currentIndex].caption}
                </p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="flex justify-center"
                >
                  <Heart className="text-red-500 w-12 h-12" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10 rounded-full"
        onClick={() => paginate(-1)}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white/90 z-10 rounded-full"
        onClick={() => paginate(1)}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-4 right-4 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        
      </motion.div>
    </div>
  )
}