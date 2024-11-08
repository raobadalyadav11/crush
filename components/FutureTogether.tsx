'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'
import {
  Plane,
  Home,
  Heart,
  Baby,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const futureEvents = [
  {
    title: 'Travel the World',
    description: 'Exploring new places, hand in hand',
    icon: Plane,
    color: 'bg-blue-400',
  },
  {
    title: 'Build Our Home',
    description: 'Creating our perfect sanctuary',
    icon: Home,
    color: 'bg-green-400',
  },
  {
    title: 'Grow Together',
    description: 'Supporting each other\'s dreams',
    icon: Heart,
    color: 'bg-pink-400',
  },
  {
    title: 'Start a Family',
    description: 'Building our own little world',
    icon: Baby,
    color: 'bg-purple-400',
  },
]

export default function FutureTogether() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()

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
        staggerChildren: 0.2,
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
      className="min-h-screen py-20 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100 dark:from-pink-900 dark:to-purple-950"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
          Our Magical Future
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Dreams we&apos;ll turn into beautiful realities
        </p>
        <motion.div
          className="absolute -top-10 -left-10 text-pink-400"
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <Sparkles size={40} />
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
        className="grid md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10"
      >
        {futureEvents.map((event, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <motion.div
                  className="flex items-center gap-4 mb-4"
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                >
                  <motion.div
                    className={`p-3 ${event.color} rounded-full`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <event.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {event.title}
                  </h3>
                </motion.div>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Animated background elements */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {i % 2 === 0 ? (
            <Heart
              className="text-pink-200 dark:text-pink-800"
              style={{
                width: 8 + Math.random() * 16,
                height: 8 + Math.random() * 16,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            />
          ) : (
            <Sparkles
              className="text-purple-200 dark:text-purple-800"
              style={{
                width: 8 + Math.random() * 16,
                height: 8 + Math.random() * 16,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            />
          )}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-16 text-center relative z-10"
      >
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Our love story is just beginning...
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