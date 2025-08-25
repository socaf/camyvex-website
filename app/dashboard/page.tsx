'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ContentItem {
  section: string
  key: string
  value: string
  type: string
}

interface GalleryImage {
  id: string
  title: string
  before_image_url: string
  after_image_url: string
  order_index: number
}

interface Feature {
  id: string
  title: string
  description: string
  icon: string
  order_index: number
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [content, setContent] = useState<ContentItem[]>([])
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('camyvexAdminAuth') === 'true'
      setIsAuthenticated(isAuth)
      setIsLoading(false)
      
      if (!isAuth) {
        window.location.href = '/socaf'
      } else {
        // Load data when authenticated
        loadContent()
        loadGalleryImages()
        loadFeatures()
      }
    }
    checkAuth()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/content')
      const result = await response.json()
      if (result.data) {
        setContent(result.data)
      }
    } catch (error) {
      console.error('Error loading content:', error)
    }
  }

  const loadGalleryImages = async () => {
    try {
      const response = await fetch('/api/gallery')
      const result = await response.json()
      if (result.data) {
        setGalleryImages(result.data)
      }
    } catch (error) {
      console.error('Error loading gallery:', error)
    }
  }

  const loadFeatures = async () => {
    try {
      const response = await fetch('/api/features')
      const result = await response.json()
      if (result.data) {
        setFeatures(result.data)
      }
    } catch (error) {
      console.error('Error loading features:', error)
    }
  }

  const updateContent = async (section: string, key: string, value: string, type: string = 'text') => {
    setIsSaving(true)
    try {
      console.log('Updating content:', { section, key, value, type })
      
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, key, value, type }),
      })
      
      const result = await response.json()
      console.log('API Response:', result)
      
      if (response.ok) {
        await loadContent()
        alert('Content updated successfully!')
      } else {
        console.error('API Error:', result)
        alert(`Error updating content: ${result.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Network Error:', error)
      alert(`Network error: ${error}`)
    } finally {
      setIsSaving(false)
    }
  }

  const getContentValue = (section: string, key: string, defaultValue: string = '') => {
    const item = content.find(c => c.section === section && c.key === key)
    return item ? item.value : defaultValue
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      sessionStorage.removeItem('camyvexAdminAuth')
      window.location.href = '/'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-white">Redirecting...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg mr-3 flex items-center justify-center">
              <span className="text-dark font-bold text-sm">C</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Camyvex Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-dark-secondary rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-primary text-dark font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('website-content')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'website-content'
                ? 'bg-primary text-dark font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Website Content
          </button>
          <button
            onClick={() => setActiveTab('quick-actions')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'quick-actions'
                ? 'bg-primary text-dark font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Quick Actions
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-2">Total Users</div>
                <div className="text-3xl font-bold text-primary mb-1">1,247</div>
                <div className="text-green-400 text-sm">+12% this month</div>
              </div>
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-2">Photos Processed</div>
                <div className="text-3xl font-bold text-primary mb-1">8,934</div>
                <div className="text-green-400 text-sm">+28% this month</div>
              </div>
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-2">Gallery Images</div>
                <div className="text-3xl font-bold text-primary mb-1">{galleryImages.length}</div>
                <div className="text-blue-400 text-sm">Active images</div>
              </div>
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <div className="text-gray-400 text-sm mb-2">Features</div>
                <div className="text-3xl font-bold text-primary mb-1">{features.length}</div>
                <div className="text-blue-400 text-sm">Active features</div>
              </div>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="bg-dark border-l-4 border-green-400 p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">Website Status</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-white">Online</span>
                    </div>
                  </div>
                  <div className="bg-dark border-l-4 border-green-400 p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">API Status</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-white">Operational</span>
                    </div>
                  </div>
                  <div className="bg-dark border-l-4 border-green-400 p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">Database Status</div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-white">Connected</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">Content Summary</h3>
                <div className="space-y-4">
                  <div className="bg-dark border-l-4 border-primary p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">Hero Title</div>
                    <div className="text-white text-sm">{getContentValue('hero', 'title', 'Not set')}</div>
                  </div>
                  <div className="bg-dark border-l-4 border-primary p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">Basic Price</div>
                    <div className="text-white">${getContentValue('pricing', 'basic_price', '9.99')}</div>
                  </div>
                  <div className="bg-dark border-l-4 border-primary p-3 rounded">
                    <div className="text-gray-400 text-xs mb-1">Last Updated</div>
                    <div className="text-white">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'website-content' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              {/* Hero Section Management */}
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">🎯 Hero Section</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const title = formData.get('hero_title') as string
                  const subtitle = formData.get('hero_subtitle') as string
                  
                  Promise.all([
                    updateContent('hero', 'title', title),
                    updateContent('hero', 'subtitle', subtitle)
                  ])
                }} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Main Title</label>
                    <input
                      name="hero_title"
                      type="text"
                      defaultValue={getContentValue('hero', 'title', 'Transform Your Photos with AI Magic')}
                      key={getContentValue('hero', 'title')}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Subtitle</label>
                    <textarea
                      name="hero_subtitle"
                      defaultValue={getContentValue('hero', 'subtitle', 'Experience the luxury of professional photo enhancement with our cutting-edge AI technology.')}
                      key={getContentValue('hero', 'subtitle')}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none h-20 resize-none"
                      required
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="bg-primary text-dark py-2 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? 'Updating...' : 'Update Hero Section'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Pricing Management */}
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">💰 Pricing Plans</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target as HTMLFormElement)
                  const basicPrice = formData.get('basic_price') as string
                  const standardPrice = formData.get('standard_price') as string
                  const proPrice = formData.get('pro_price') as string
                  
                  Promise.all([
                    updateContent('pricing', 'basic_price', basicPrice, 'number'),
                    updateContent('pricing', 'standard_price', standardPrice, 'number'),
                    updateContent('pricing', 'pro_price', proPrice, 'number')
                  ])
                }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Basic Plan ($)</label>
                    <input
                      name="basic_price"
                      type="number"
                      step="0.01"
                      defaultValue={getContentValue('pricing', 'basic_price', '9.99')}
                      key={getContentValue('pricing', 'basic_price')}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Standard Plan ($)</label>
                    <input
                      name="standard_price"
                      type="number"
                      step="0.01"
                      defaultValue={getContentValue('pricing', 'standard_price', '19.99')}
                      key={getContentValue('pricing', 'standard_price')}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Pro Plan ($)</label>
                    <input
                      name="pro_price"
                      type="number"
                      step="0.01"
                      defaultValue={getContentValue('pricing', 'pro_price', '49.99')}
                      key={getContentValue('pricing', 'pro_price')}
                      className="w-full bg-dark border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                      required
                    />
                  </div>
                  <div className="md:col-span-3">
                    <button 
                      type="submit"
                      disabled={isSaving}
                      className="bg-primary text-dark py-2 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {isSaving ? 'Updating...' : 'Update Pricing'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Gallery Management */}
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">🖼️ Gallery Management ({galleryImages.length} images)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Current Images</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {galleryImages.length === 0 ? (
                        <div className="text-gray-400 text-sm">No images yet. Add some below!</div>
                      ) : (
                        galleryImages.map((image) => (
                          <div key={image.id} className="bg-dark p-3 rounded-lg flex justify-between items-center">
                            <div>
                              <div className="text-white text-sm font-medium">{image.title}</div>
                              <div className="text-gray-400 text-xs">Order: {image.order_index}</div>
                            </div>
                            <button
                              onClick={async () => {
                                if (confirm('Are you sure you want to remove this image?')) {
                                  try {
                                    const response = await fetch(`/api/gallery?id=${image.id}`, {
                                      method: 'DELETE'
                                    })
                                    if (response.ok) {
                                      await loadGalleryImages()
                                      alert('Image removed successfully!')
                                    }
                                  } catch (error) {
                                    alert('Error removing image')
                                  }
                                }
                              }}
                              className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded"
                            >
                              Remove
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Add New Image</h4>
                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target as HTMLFormElement)
                      const title = formData.get('gallery_title') as string
                      const beforeUrl = formData.get('before_url') as string
                      const afterUrl = formData.get('after_url') as string
                      const orderIndex = parseInt(formData.get('order_index') as string) || 0
                      
                      try {
                        const response = await fetch('/api/gallery', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            title,
                            before_image_url: beforeUrl,
                            after_image_url: afterUrl,
                            order_index: orderIndex
                          })
                        })
                        
                        if (response.ok) {
                          await loadGalleryImages()
                          ;(e.target as HTMLFormElement).reset()
                          alert('Image added successfully!')
                        }
                      } catch (error) {
                        alert('Error adding image')
                      }
                    }} className="space-y-3">
                      <input
                        name="gallery_title"
                        type="text"
                        placeholder="Image title"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        required
                      />
                      <input
                        name="before_url"
                        type="url"
                        placeholder="Before image URL"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        required
                      />
                      <input
                        name="after_url"
                        type="url"
                        placeholder="After image URL"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        required
                      />
                      <input
                        name="order_index"
                        type="number"
                        placeholder="Order (0-100)"
                        min="0"
                        max="100"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-primary text-dark py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                      >
                        Add Image
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Features Management */}
              <div className="bg-dark-secondary border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-primary mb-4">⭐ Features Management ({features.length} features)</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3">Current Features</h4>
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {features.length === 0 ? (
                        <div className="text-gray-400 text-sm">No features yet. Add some below!</div>
                      ) : (
                        features.map((feature) => (
                          <div key={feature.id} className="bg-dark p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div className="text-white text-sm font-medium">{feature.title}</div>
                              <button
                                onClick={async () => {
                                  if (confirm('Are you sure you want to remove this feature?')) {
                                    try {
                                      const response = await fetch(`/api/features?id=${feature.id}`, {
                                        method: 'DELETE'
                                      })
                                      if (response.ok) {
                                        await loadFeatures()
                                        alert('Feature removed successfully!')
                                      }
                                    } catch (error) {
                                      alert('Error removing feature')
                                    }
                                  }
                                }}
                                className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded"
                              >
                                Remove
                              </button>
                            </div>
                            <div className="text-gray-400 text-xs mb-1">{feature.description}</div>
                            <div className="text-gray-500 text-xs">Order: {feature.order_index} | Icon: {feature.icon}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-white font-medium mb-3">Add New Feature</h4>
                    <form onSubmit={async (e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target as HTMLFormElement)
                      const title = formData.get('feature_title') as string
                      const description = formData.get('feature_description') as string
                      const icon = formData.get('feature_icon') as string
                      const orderIndex = parseInt(formData.get('feature_order') as string) || 0
                      
                      try {
                        const response = await fetch('/api/features', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            title,
                            description,
                            icon,
                            order_index: orderIndex
                          })
                        })
                        
                        if (response.ok) {
                          await loadFeatures()
                          ;(e.target as HTMLFormElement).reset()
                          alert('Feature added successfully!')
                        }
                      } catch (error) {
                        alert('Error adding feature')
                      }
                    }} className="space-y-3">
                      <input
                        name="feature_title"
                        type="text"
                        placeholder="Feature title"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        required
                      />
                      <textarea
                        name="feature_description"
                        placeholder="Feature description"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none h-20 resize-none"
                        required
                      />
                      <input
                        name="feature_icon"
                        type="text"
                        placeholder="Icon name (e.g., star, cpu, image)"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                        defaultValue="star"
                      />
                      <input
                        name="feature_order"
                        type="number"
                        placeholder="Order (0-100)"
                        min="0"
                        max="100"
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                      />
                      <button 
                        type="submit"
                        className="w-full bg-primary text-dark py-2 px-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
                      >
                        Add Feature
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'quick-actions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">Supabase Dashboard</div>
                <div className="text-gray-400 text-sm">Manage database, authentication, and backend services</div>
              </a>

              <a
                href="https://vercel.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">Vercel Dashboard</div>
                <div className="text-gray-400 text-sm">Monitor deployments, domains, and website performance</div>
              </a>

              <a
                href="https://apps.apple.com/connect"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">App Store Connect</div>
                <div className="text-gray-400 text-sm">Manage iOS app, reviews, and App Store presence</div>
              </a>

              <a
                href="https://play.google.com/console"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">Google Play Console</div>
                <div className="text-gray-400 text-sm">Manage Android app, analytics, and Play Store</div>
              </a>

              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">Google Analytics</div>
                <div className="text-gray-400 text-sm">Track website traffic, user behavior, and conversions</div>
              </a>

              <a
                href="mailto:support@camyvex.com"
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 hover:border-primary transition-colors block"
              >
                <div className="text-primary font-bold text-lg mb-2">Support Email</div>
                <div className="text-gray-400 text-sm">Direct access to customer support inbox</div>
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}