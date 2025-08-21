'use client'

import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  ShieldCheckIcon, 
  BoltIcon, 
  PhotoIcon,
  StarIcon,
  ClockIcon 
} from '@heroicons/react/24/outline'

export default function Features() {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Enhancement',
      description: 'Advanced AI algorithms transform your photos into luxury lifestyle moments with professional quality results.'
    },
    {
      icon: BoltIcon,
      title: 'Instant Processing',
      description: 'Get your transformed photos in seconds. No waiting, no delays - just instant luxury transformations.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Privacy First',
      description: 'Your photos are processed securely and automatically deleted after 1 hour. Complete privacy guaranteed.'
    },
    {
      icon: PhotoIcon,
      title: 'Multiple Styles',
      description: 'Choose from various luxury themes and styles to match your vision and aesthetic preferences.'
    },
    {
      icon: StarIcon,
      title: 'Premium Quality',
      description: 'Professional-grade results that rival expensive photo shoots and luxury lifestyle photography.'
    },
    {
      icon: ClockIcon,
      title: '24/7 Available',
      description: 'Transform your photos anytime, anywhere. Our AI never sleeps and is always ready to create magic.'
    }
  ]

  return (
    <section id="features" className="py-24 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="gradient-text">Camyvex</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of photo enhancement with our cutting-edge AI technology 
            designed specifically for luxury lifestyle transformations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-dark border border-gray-800 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}