'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('camyvexAdminAuth') === 'true'
      setIsAuthenticated(isAuth)
      setIsLoading(false)
      
      if (!isAuth) {
        window.location.href = '/socaf'
      }
    }
    checkAuth()
  }, [])

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
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary rounded-lg mr-3 flex items-center justify-center">
              <span className="text-dark font-bold text-sm">C</span>
            </div>
            <h1 className="text-2xl font-bold text-primary">Camyvex Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-dark-secondary border border-gray-800 rounded-xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Total Users</div>
            <div className="text-3xl font-bold text-primary mb-1">1,247</div>
            <div className="text-green-400 text-sm">+12% this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-dark-secondary border border-gray-800 rounded-xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Photos Processed</div>
            <div className="text-3xl font-bold text-primary mb-1">8,934</div>
            <div className="text-green-400 text-sm">+28% this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-dark-secondary border border-gray-800 rounded-xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Active Subscriptions</div>
            <div className="text-3xl font-bold text-primary mb-1">342</div>
            <div className="text-green-400 text-sm">+15% this month</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-dark-secondary border border-gray-800 rounded-xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2">Monthly Revenue</div>
            <div className="text-3xl font-bold text-primary mb-1">$4,280</div>
            <div className="text-green-400 text-sm">+22% this month</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-dark-secondary border border-gray-800 rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              Supabase Dashboard
            </a>
            <a
              href="https://vercel.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              Vercel Dashboard
            </a>
            <a
              href="https://apps.apple.com/connect"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              App Store Connect
            </a>
            <a
              href="https://play.google.com/console"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              Google Play Console
            </a>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              Google Analytics
            </a>
            <a
              href="mailto:support@camyvex.com"
              className="bg-primary text-dark py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-all text-center block"
            >
              Support Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}