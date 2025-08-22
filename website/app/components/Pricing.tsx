'use client'

import { motion } from 'framer-motion'
import { CheckIcon, StarIcon } from '@heroicons/react/24/outline'

export default function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      description: 'Perfect for trying out Camyvex',
      features: [
        '1 photo per week',
        'All themes except AI Match',
        'Standard quality',
        'Community support'
      ],
      cta: 'Download Free',
      popular: false
    },
    {
      name: 'Basic',
      price: '9.99',
      period: 'month',
      description: '20 photos monthly',
      features: [
        '20 photos per month',
        'All themes including AI Match',
        'Upscale to 2x resolution',
        'Premium quality processing'
      ],
      cta: 'Start Basic',
      popular: false
    },
    {
      name: 'Standard',
      price: '19.99',
      period: 'month',
      description: 'Most popular choice',
      features: [
        '50 photos per month',
        'All themes including AI Match',
        'Upscale to 2x resolution',
        'Premium quality processing',
        'Priority support'
      ],
      cta: 'Start Standard',
      popular: true
    },
    {
      name: 'Pro',
      price: '49.99',
      period: 'month',
      description: 'Best value for power users',
      features: [
        '150 photos per month',
        'All themes including AI Match',
        'Upscale to 2x resolution',
        'Premium quality processing',
        'Priority support'
      ],
      cta: 'Go Pro',
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-24 bg-dark-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free and upgrade when you're ready. All plans include our core AI transformation technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-dark border rounded-2xl p-8 ${
                plan.popular 
                  ? 'border-primary shadow-2xl shadow-primary/20 scale-105' 
                  : 'border-gray-800 hover:border-gray-700'
              } transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-dark px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold gradient-text">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  plan.popular
                    ? 'bg-primary text-dark hover:bg-primary/90 transform hover:scale-105'
                    : 'border border-primary text-primary hover:bg-primary/10'
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold text-white mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-400">Yes, you can cancel your subscription at any time. No questions asked.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Is my data secure?</h4>
              <p className="text-gray-400">Absolutely. All photos are processed securely and deleted after 1 hour.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">What payment methods do you accept?</h4>
              <p className="text-gray-400">We accept all major credit cards and Apple Pay through the App Store.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">How do subscriptions work?</h4>
              <p className="text-gray-400">Subscriptions auto-renew monthly. You can cancel anytime in your App Store settings.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}