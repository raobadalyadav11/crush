'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'
import {  MapPin, Coffee, Star, Heart } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'

const timelineEvents = [
  {
    date: 'First Meeting',
    title: 'When Our Eyes Met',
    description: 'That magical moment when we first saw each other...',
    icon: Coffee,
    image: '/sp1.jpg',
    color: 'bg-yellow-400',
  },
  {
    date: 'First Date',
    title: 'Our Perfect Evening',
    description: 'Remember that cozy little café?',
    icon: MapPin,
    image: '/sp2.jpg',
    color: 'bg-pink-400',
  },
  {
    date: 'Special Moment',
    title: 'Under the Stars',
    description: 'When time stood still and it was just us...',
    icon: Star,
    image: '/sp3.jpg',
    color: 'bg-purple-400',
  },
]

export default function OurStory() {
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
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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
          Our Love Story
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Every chapter of our beautiful journey together
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
          <Heart size={40} fill="currentColor" />
        </motion.div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="w-full max-w-4xl space-y-12"
      >
        {timelineEvents.map((event, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="relative">
                <motion.div
                  className={`absolute top-0 left-0 w-full h-1 ${event.color}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
                <div className="flex items-center gap-4">
                  <motion.div
                    className={`p-3 ${event.color} rounded-full`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <event.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{event.title}</CardTitle>
                    <CardDescription className="text-lg">{event.date}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {event.description}
                  </motion.p>
                  <motion.div
                    className="relative h-64 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={event.image}
                      alt={event.title}
                      // layout="fill"
                      fill style={{ objectFit: "cover" }}
                      // objectFit="cover"
                      className="rounded-lg"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Heart className="w-8 h-8" fill="currentColor" />
                    </motion.div>
                  </motion.div>
                </div>
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
          Our story is still being written, with the best chapters yet to come...
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