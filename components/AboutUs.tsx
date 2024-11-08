'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'
import {
  Heart,
  Coffee,
  Pizza,
  Film,
  Plane,
  Book,
  Camera,
  Sparkles,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const interests = [
  {
    category: 'Favorite Food',
    yours: 'Pizza',
    mine: 'Sushi',
    icon: Pizza,
    color: 'bg-yellow-400',
  },
  {
    category: 'Favorite Movie',
    yours: 'Romance',
    mine: 'Adventure',
    icon: Film,
    color: 'bg-blue-400',
  },
  {
    category: 'Hobby',
    yours: 'Photography',
    mine: 'Reading',
    icon: Camera,
    color: 'bg-green-400',
  },
  {
    category: 'Dream Destination',
    yours: 'Paris',
    mine: 'Tokyo',
    icon: Plane,
    color: 'bg-purple-400',
  },
]

export default function AboutUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
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
      },
    },
  }

  return (
    <section
      ref={ref}
      className="min-h-screen py-20 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900 dark:to-purple-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
          Our Love Story
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          The little things that make us unique and perfect together
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
        className="grid md:grid-cols-2 gap-8 w-full max-w-4xl"
      >
        {interests.map((interest, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
              <CardContent className="p-6 relative">
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 ${interest.color}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    className={`p-3 ${interest.color} rounded-full`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <interest.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    {interest.category}
                  </h3>
                </div>
                <div className="space-y-4">
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="font-semibold text-pink-500">You:</span> {interest.yours}
                  </motion.p>
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <span className="font-semibold text-purple-500">Me:</span> {interest.mine}
                  </motion.p>
                </div>
                <motion.div
                  className="absolute bottom-2 right-2 text-pink-300 dark:text-pink-600"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart size={24} fill="currentColor" />
                </motion.div>
              </CardContent>
            </Card>
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
          Our differences make us stronger, our similarities make us closer.
        </p>
        <motion.div
          className="mt-4 inline-block"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-3xl">❤️</span>
        </motion.div>
      </motion.div>
    </section>
  )
}