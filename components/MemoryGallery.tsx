'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Sparkles } from 'lucide-react'
import Image from 'next/image'

const memories = [
  {
    image: '/mem0.jpg',
    caption: 'Our first coffee date',
  },
  {
    image: '/mem.jpg',
    caption: 'Walking in the park',
  },
  {
    image: '/mem1.jpg',
    caption: 'Stargazing night',
  },
  {
    image: '/mem2.jpg',
    caption: 'Beach sunset',
  },
  {
    image: '/mem3.jpg',
    caption: 'Movie night',
  },
  {
    image: '/mem4.jpg',
    caption: 'Ice cream date',
  },
]

export default function MemoryGallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-900 dark:to-purple-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
          Our Magical Moments
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Memories we&#39;ll cherish forever in our hearts
        </p>
        <motion.div
          className="absolute -top-10 -left-10 text-pink-400"
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Heart size={40} fill="currentColor" />
        </motion.div>
        <motion.div
          className="absolute -bottom-10 -right-10 text-purple-400"
          animate={{
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles size={40} />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl"
      >
        {memories.map((memory, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="relative group"
          >
            <Card className="overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
              <CardContent className="p-0">
                <div className="relative h-64 w-full">
                  <Image
                    src={memory.image}
                    alt={memory.caption}
                    fill style={{ objectFit: "cover" }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center"
                  >
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: hoveredIndex === index ? 0 : 20, opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white p-4 text-lg font-semibold text-center"
                    >
                      {memory.caption}
                    </motion.p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: hoveredIndex === index ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md"
            >
              <Heart className="w-6 h-6 text-pink-500" fill="currentColor" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 text-center"
      >
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Every moment with you is a treasure to remember
        </p>
        <motion.div
          className="mt-4 inline-block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-4xl">❤️</span>
        </motion.div>
      </motion.div>
    </section>
  )
}