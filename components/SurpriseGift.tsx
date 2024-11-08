'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Heart, Gift, Sparkles, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useSound from 'use-sound'
import { toast } from 'sonner'

const floatingHearts = [...Array(20)].map((_, i) => ({
  id: i,
  x: Math.random() * 100 - 50,
  y: -(Math.random() * 50 + 50),
  size: 10 + Math.random() * 20,
  color: ['#FF69B4', '#FF1493', '#C71585'][Math.floor(Math.random() * 3)],
}))

export default function SurpriseGift() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const controls = useAnimation()
 

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const handleGiftClick = () => {
    setIsOpen(true)
    controls.start('shake')
    toast('💝 A special message for you!', {
      description: 'You mean the world to me.',
    })
  }

  const handleYesClick = () => {
    setShowConfetti(true)
    toast('💖 My heart is yours!', {
      description: 'Together forever...',
    })
  }

  return (
    <section ref={ref} className="min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-purple-100 dark:from-gray-900 dark:to-purple-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            A Magical Surprise
          </h2>
        </motion.div>
        <p className="text-xl text-gray-600 dark:text-gray-300">Just for you...</p>
        <Sparkles className="absolute top-0 right-0 text-yellow-400 animate-pulse" />
        <Sparkles className="absolute bottom-0 left-0 text-yellow-400 animate-pulse" />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { scale: 0, rotate: 180 },
          visible: { scale: 1, rotate: 0 },
          shake: { rotate: [0, -10, 10, -10, 10, 0], transition: { duration: 0.5 } },
        }}
        transition={{ type: 'spring', duration: 0.8 }}
        className="relative"
      >
        <Card className="w-96 h-96 flex items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 rounded-3xl shadow-2xl">
          <CardContent className="p-6 text-center">
            {!isOpen ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  onClick={handleGiftClick}
                  className="w-40 h-40 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                >
                  <Gift className="w-20 h-20 text-white" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className="space-y-6">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Heart className="w-24 h-24 text-pink-500 mx-auto" />
                  </motion.div>
                  <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                    Will you be mine forever?
                  </p>
                  <div className="mt-6 space-x-4">
                    <Button
                      onClick={handleYesClick}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      Yes, forever!
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsOpen(false)
                        toast('Try again! 💝', {
                          description: "I'll wait for you...",
                        })
                      }}
                      className="border-2 border-pink-500 text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900 font-bold py-3 px-6 rounded-full transition-all duration-300"
                    >
                      Maybe later
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {isOpen &&
          floatingHearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [1, 0],
                x: [0, heart.x],
                y: [0, heart.y],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className="absolute top-1/2 left-1/2"
            >
              <Heart
                fill={heart.color}
                stroke="none"
                style={{
                  width: heart.size,
                  height: heart.size,
                }}
              />
            </motion.div>
          ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Click the gift to reveal a magical surprise...
        </p>
      </motion.div>

      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
        >
          {[...Array(100)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                top: '0%',
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                top: '100%',
                left: `${Math.random() * 100}%`,
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: ['#FF69B4', '#FF1493', '#C71585', '#FFD700', '#FFA500'][
                  Math.floor(Math.random() * 5)
                ],
                borderRadius: '50%',
              }}
            />
          ))}
        </motion.div>
      )}
    </section>
  )
}