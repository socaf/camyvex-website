'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, SparklesIcon, ShieldCheckIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Header />
      <Hero />
      <Features />
      <Gallery />
      <Pricing />
      <Footer />
    </main>
  )
}