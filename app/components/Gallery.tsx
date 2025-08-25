'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [galleryItems, setGalleryItems] = useState([
    {
      id: 1,
      category: 'portrait',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Luxury Portrait'
    },
    {
      id: 2,
      category: 'lifestyle',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Lifestyle Moment'
    },
    {
      id: 3,
      category: 'luxury',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Luxury Scene'
    },
    {
      id: 4,
      category: 'portrait',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Professional Portrait'
    },
    {
      id: 5,
      category: 'lifestyle',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Elegant Lifestyle'
    },
    {
      id: 6,
      category: 'luxury',
      before: '/api/placeholder/300/400',
      after: '/api/placeholder/300/400',
      title: 'Luxury Experience'
    }
  ])

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'portrait', name: 'Portrait' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'luxury', name: 'Luxury' }
  ]

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const response = await fetch('/api/gallery')
        const result = await response.json()
        if (result.data && result.data.length > 0) {
          const formattedItems = result.data.map((item: any, index: number) => ({
            id: item.id,
            category: 'luxury', // Default category
            before: item.before_image_url,
            after: item.after_image_url,
            title: item.title
          }))
          setGalleryItems(formattedItems)
        }
      } catch (error) {
        console.error('Error loading gallery:', error)
      }
    }
    loadGalleryImages()
  }, [])

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  return (
    <section id="gallery" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Before & After</span> Gallery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See the incredible transformations our AI creates. From ordinary photos to luxury lifestyle moments.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-dark-secondary rounded-xl p-2 border border-gray-800">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-primary text-dark'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-dark-secondary rounded-2xl overflow-hidden border border-gray-800 hover:border-primary/30 transition-all duration-300">
                <div className="relative">
                  {/* Before/After Slider - Simplified for demo */}
                  <div className="aspect-[3/4] bg-gray-800 flex items-center justify-center">
                    <div className="text-gray-400 text-center">
                      <div className="text-sm mb-2">BEFORE → AFTER</div>
                      <div className="text-lg font-semibold">{item.title}</div>
                    </div>
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-primary text-dark px-4 py-2 rounded-lg font-medium">
                        View Transformation
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">AI-Enhanced Luxury Transformation</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">Ready to transform your photos?</p>
          <a
            href="#pricing"
            className="bg-primary text-dark px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 inline-block"
          >
            Get Started Now
          </a>
        </motion.div>
      </div>
    </section>
  )
}