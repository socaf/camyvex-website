'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <SparklesIcon className="h-4 w-4 text-primary mr-2" />
            <span className="text-primary text-sm font-medium">AI-Powered Luxury Transformation</span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Transform Your Photos into{' '}
            <span className="gradient-text">Luxury Lifestyle</span>{' '}
            Moments
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create professional-quality luxury photos instantly with our AI-powered enhancement technology. 
            Turn ordinary moments into extraordinary memories.
          </p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <a
              href="https://apps.apple.com/app/camyvex-luxury-ai-photos/id6737686543"
              className="bg-primary text-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105"
            >
              Download for iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.camyvex.luxuryai"
              className="border border-primary text-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/10 transition-all duration-200"
            >
              Coming Soon for Android
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">10K+</div>
              <div className="text-gray-400 text-sm">Photos Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">4.9★</div>
              <div className="text-gray-400 text-sm">App Store Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold gradient-text">1M+</div>
              <div className="text-gray-400 text-sm">Downloads</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-gray-400 cursor-pointer"
          >
            <ChevronDownIcon className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}