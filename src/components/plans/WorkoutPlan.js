'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Clock, 
  Repeat, 
  Timer, 
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  Flame,
  Target
} from 'lucide-react'

export default function WorkoutPlan({ workoutPlan, userProfile }) {
  const [expandedDay, setExpandedDay] = useState(1)
  const [loadingImage, setLoadingImage] = useState({})
  const [exerciseImages, setExerciseImages] = useState({})

  const handleGenerateImage = async (exerciseName, exerciseId) => {
    setLoadingImage(prev => ({ ...prev, [exerciseId]: true }))
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: exerciseName, 
          type: 'exercise' 
        })
      })
      
      const data = await response.json()
      if (data.imageUrl) {
        setExerciseImages(prev => ({ 
          ...prev, 
          [exerciseId]: data.imageUrl 
        }))
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoadingImage(prev => ({ ...prev, [exerciseId]: false }))
    }
  }

  const toggleDay = (dayNumber) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber)
  }

  return (
    <div className="space-y-6">
      {/* Plan Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your 7-Day Workout Plan
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{workoutPlan?.estimatedDuration || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>{userProfile?.fitnessGoal?.replace('_', ' ') || 'General Fitness'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-primary-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-primary-600" />
              <span className="font-medium text-primary-900">Total Days</span>
            </div>
            <p className="text-2xl font-bold text-primary-600">
              {workoutPlan?.totalDays || 7}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Timer className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Duration</span>
            </div>
            <p className="text-lg font-bold text-green-600">
              {workoutPlan?.estimatedDuration || 'N/A'}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Play className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Rest Days</span>
            </div>
            <p className="text-lg font-bold text-purple-600">
              Day {workoutPlan?.restDays?.join(', Day ') || '7'}
            </p>
          </div>
        </div>
      </div>

      {/* Daily Workouts */}
      <div className="space-y-4">
        {workoutPlan?.days?.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleDay(day.day)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Day {day.day}: {day.focus}
                  </h3>
                  <p className="text-gray-600">
                    {day.exercises?.length || 0} exercises
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  {expandedDay === day.day ? 'Collapse' : 'Expand'}
                </span>
                {expandedDay === day.day ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>

            {expandedDay === day.day && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-gray-200"
              >
                {/* Warm-up */}
                {day.warmup && (
                  <div className="mb-6 p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">
                      🔥 Warm-up
                    </h4>
                    <p className="text-orange-800">{day.warmup}</p>
                  </div>
                )}

                {/* Exercises */}
                <div className="space-y-4 mb-6">
                  {day.exercises?.map((exercise, exerciseIndex) => (
                    <div
                      key={exercise.id || exerciseIndex}
                      className="bg-gray-50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            {exercise.name}
                          </h4>
                          
                          <div className="flex flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Repeat className="w-4 h-4" />
                              <span>{exercise.sets} sets</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Target className="w-4 h-4" />
                              <span>{exercise.reps} reps</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Timer className="w-4 h-4" />
                              <span>{exercise.rest} rest</span>
                            </div>
                          </div>

                          {exercise.tips && (
                            <div className="bg-blue-50 p-3 rounded-md mb-3">
                              <p className="text-sm text-blue-800">
                                💡 <strong>Form Tip:</strong> {exercise.tips}
                              </p>
                            </div>
                          )}

                          {exercise.alternatives && exercise.alternatives.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm text-gray-600 mb-1">
                                <strong>Alternatives:</strong>
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {exercise.alternatives.map((alt, altIndex) => (
                                  <span
                                    key={altIndex}
                                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
                                  >
                                    {alt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="ml-4">
                          <button
                            onClick={() => handleGenerateImage(exercise.name, exercise.id || `${day.day}_${exerciseIndex}`)}
                            disabled={loadingImage[exercise.id || `${day.day}_${exerciseIndex}`]}
                            className="btn-secondary text-sm flex items-center gap-2"
                          >
                            {loadingImage[exercise.id || `${day.day}_${exerciseIndex}`] ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                                Loading...
                              </>
                            ) : (
                              <>
                                <ImageIcon className="w-4 h-4" />
                                Show Form
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Generated Image */}
                      {exerciseImages[exercise.id || `${day.day}_${exerciseIndex}`] && (
                        <div className="mt-4">
                          <img
                            src={exerciseImages[exercise.id || `${day.day}_${exerciseIndex}`]}
                            alt={`${exercise.name} demonstration`}
                            className="w-full max-w-md mx-auto rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cool-down */}
                {day.cooldown && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      ❄️ Cool-down
                    </h4>
                    <p className="text-blue-800">{day.cooldown}</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Rest Day Info */}
      {workoutPlan.restDays && (
        <div className="card bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 p-2 rounded-full">
              <Timer className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">
              Rest Day Guidelines
            </h3>
          </div>
          <p className="text-green-800">
            Day {workoutPlan.restDays.join(' and ')} are your rest days. 
            Use this time for light activities like walking, stretching, or yoga. 
            Proper rest is crucial for muscle recovery and growth.
          </p>
        </div>
      )}
    </div>
  )
}