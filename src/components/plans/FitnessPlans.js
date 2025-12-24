'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Dumbbell, 
  Utensils, 
  Heart, 
  Clock, 
  Target, 
  Volume2, 
  Download,
  RotateCcw,
  Calendar,
  Zap,
  Info
} from 'lucide-react'
import WorkoutPlan from './WorkoutPlan'
import DietPlan from './DietPlan'

export default function FitnessPlans({ data, onStartOver }) {
  const [activeTab, setActiveTab] = useState('workout')
  const [isPlaying, setIsPlaying] = useState(false)

  // Save to localStorage
  useEffect(() => {
    if (data) {
      localStorage.setItem('fitness-plan', JSON.stringify(data))
    }
  }, [data])

  const handlePlayAudio = async (content, section) => {
    setIsPlaying(true)
    
    try {
      // Use browser's built-in speech synthesis
      if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel()
        
        const utterance = new SpeechSynthesisUtterance(content)
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 1
        
        utterance.onend = () => {
          setIsPlaying(false)
        }
        
        utterance.onerror = () => {
          setIsPlaying(false)
        }
        
        window.speechSynthesis.speak(utterance)
      } else {
        alert('Speech synthesis not supported in your browser')
        setIsPlaying(false)
      }
    } catch (error) {
      console.error('Error playing audio:', error)
      setIsPlaying(false)
    }
  }

  const handleExportPDF = () => {
    try {
      // Create a simple HTML content for PDF
      const content = `
        <html>
          <head>
            <title>Fitness Plan - ${userProfile.name}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1, h2, h3 { color: #2563eb; }
              .section { margin-bottom: 30px; }
              .exercise { margin-bottom: 15px; padding: 10px; border-left: 3px solid #2563eb; }
            </style>
          </head>
          <body>
            <h1>Fitness Plan for ${userProfile.name}</h1>
            <div class="section">
              <h2>Profile</h2>
              <p>Age: ${userProfile.age} | Goal: ${userProfile.fitnessGoal} | Level: ${userProfile.fitnessLevel}</p>
            </div>
            <div class="section">
              <h2>Workout Plan</h2>
              ${workoutPlan?.days?.map(day => `
                <h3>Day ${day.day}: ${day.focus}</h3>
                ${day.exercises?.map(ex => `
                  <div class="exercise">
                    <strong>${ex.name}</strong><br>
                    Sets: ${ex.sets} | Reps: ${ex.reps} | Rest: ${ex.rest}<br>
                    Tips: ${ex.tips}
                  </div>
                `).join('') || ''}
              `).join('') || ''}
            </div>
            <div class="section">
              <h2>Diet Plan</h2>
              <p>Daily Calories: ${dietPlan?.dailyCalories || 'N/A'}</p>
              <p>Hydration: ${dietPlan?.hydration || 'N/A'}</p>
            </div>
          </body>
        </html>
      `
      
      // Open in new window for printing
      const printWindow = window.open('', '_blank')
      printWindow.document.write(content)
      printWindow.document.close()
      printWindow.print()
    } catch (error) {
      console.error('PDF export error:', error)
      alert('PDF export failed. Please try again.')
    }
  }

  const tabs = [
    { id: 'workout', label: 'Workout Plan', icon: Dumbbell },
    { id: 'diet', label: 'Diet Plan', icon: Utensils },
    { id: 'motivation', label: 'Coaching', icon: Heart }
  ]

  const { userProfile, workoutPlan, dietPlan, motivation, coachingTips, safetyNotes } = data

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {userProfile.name}! 👋
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Your personalized fitness journey starts here
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Goal</p>
                  <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">{userProfile.fitnessGoal.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Level</p>
                  <p className="font-semibold text-sm sm:text-base text-gray-900 truncate">{userProfile.fitnessLevel}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">Duration</p>
                  <p className="font-semibold text-sm sm:text-base text-gray-900">7-Day Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3 px-4">
            <button
              onClick={() => {
                const workoutContent = `Your 7-day workout plan includes: ${workoutPlan?.days?.map(d => `Day ${d.day} focuses on ${d.focus}`).join(', ') || 'various exercises'}`
                const dietContent = `Your daily nutrition plan includes ${dietPlan?.dailyCalories || 2000} calories with balanced meals for breakfast, lunch, dinner and snacks`
                const content = activeTab === 'workout' ? workoutContent : dietContent
                handlePlayAudio(content, activeTab)
              }}
              disabled={isPlaying}
              className="btn-primary flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium w-full sm:w-auto sm:min-w-[160px]"
            >
              <Volume2 className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {isPlaying ? 'Playing...' : (
                  <>
                    <span className="sm:hidden">Read Plan</span>
                    <span className="hidden sm:inline">Read {activeTab === 'workout' ? 'Workout' : 'Diet'} Plan</span>
                  </>
                )}
              </span>
            </button>
            
            <button
              onClick={handleExportPDF}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium w-full sm:w-auto sm:min-w-[120px]"
            >
              <Download className="w-4 h-4 flex-shrink-0" />
              <span>Export PDF</span>
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('fitness-plan')
                onStartOver()
              }}
              className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium w-full sm:w-auto sm:min-w-[120px]"
            >
              <RotateCcw className="w-4 h-4 flex-shrink-0" />
              <span>Start Over</span>
            </button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center px-4">
            <div className="bg-white rounded-lg p-1 shadow-lg w-full max-w-md overflow-x-auto">
              <div className="flex min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 rounded-md font-medium transition-all duration-200 text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-primary-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="hidden xs:inline">{tab.label}</span>
                    <span className="xs:hidden">{tab.label.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'workout' && (
            <WorkoutPlan 
              workoutPlan={workoutPlan} 
              userProfile={userProfile}
            />
          )}
          
          {activeTab === 'diet' && (
            <DietPlan 
              dietPlan={dietPlan} 
              userProfile={userProfile}
            />
          )}
          
          {activeTab === 'motivation' && (
            <div className="space-y-6">
              {/* Motivation Message */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-r from-primary-500 to-purple-500 p-3 rounded-full">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Personal Message
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {motivation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Coaching Tips */}
              <div className="card">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary-600" />
                  Coaching Tips
                </h3>
                <div className="space-y-3">
                  {coachingTips?.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-primary-100 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Notes */}
              {safetyNotes && (
                <div className="card border-l-4 border-yellow-500">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-yellow-600" />
                    Safety First
                  </h3>
                  <div className="space-y-3">
                    {safetyNotes.map((note, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-yellow-100 rounded-full p-1 mt-1">
                          <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                        </div>
                        <p className="text-gray-700">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}