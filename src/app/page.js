'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dumbbell, Heart, Target, Zap } from 'lucide-react'
import UserDetailsForm from '../components/forms/UserDetailsForm'
import FitnessPlans from '../components/plans/FitnessPlans'

export default function Home() {
  const [currentStep, setCurrentStep] = useState('form') // 'form' | 'plans'
  const [fitnessData, setFitnessData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check for saved data on component mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('fitness-plan')
    if (savedPlan) {
      try {
        const parsedData = JSON.parse(savedPlan)
        setFitnessData(parsedData)
        setCurrentStep('plans')
      } catch (error) {
        console.error('Error loading saved plan:', error)
        localStorage.removeItem('fitness-plan')
      }
    }
  }, [])

  const handleFormSubmit = async (userProfile) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userProfile)
      })
      
      const data = await response.json()
      setFitnessData({ userProfile, ...data })
      setCurrentStep('plans')
    } catch (error) {
      console.error('Error generating plan:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStartOver = () => {
    localStorage.removeItem('fitness-plan')
    setCurrentStep('form')
    setFitnessData(null)
  }

  const handleContinueWithSaved = () => {
    setCurrentStep('plans')
  }

  if (currentStep === 'plans' && fitnessData) {
    return <FitnessPlans data={fitnessData} onStartOver={handleStartOver} />
  }

  return (
    <div className="min-h-screen">
      {/* Saved Plan Banner */}
      {fitnessData && currentStep === 'form' && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border-b border-green-200 py-4 px-4"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">
                  Welcome back, {fitnessData.userProfile?.name}!
                </p>
                <p className="text-sm text-green-700">
                  You have a saved fitness plan from {new Date(fitnessData.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleContinueWithSaved}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Continue Plan
              </button>
              <button
                onClick={handleStartOver}
                className="bg-white hover:bg-gray-50 text-green-700 border border-green-300 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Start New
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-4 rounded-full">
                <Dumbbell className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your AI
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {' '}Fitness Coach
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Get personalized workout and diet plans tailored just for you. 
              Powered by advanced AI that understands your goals, limitations, and preferences.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {[
                { icon: Target, text: 'Personalized Plans' },
                { icon: Heart, text: 'Health Focused' },
                { icon: Zap, text: 'AI Powered' }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                >
                  <feature.icon className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <UserDetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </motion.div>
        </div>
      </section>
    </div>
  )
}