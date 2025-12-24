'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Coffee, 
  Sun, 
  Moon, 
  Apple,
  Clock,
  Flame,
  Droplets,
  Image as ImageIcon,
  ChefHat,
  Target
} from 'lucide-react'

export default function DietPlan({ dietPlan, userProfile }) {
  const [loadingImage, setLoadingImage] = useState({})
  const [mealImages, setMealImages] = useState({})

  const handleGenerateImage = async (mealName, mealId) => {
    setLoadingImage(prev => ({ ...prev, [mealId]: true }))
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: mealName, 
          type: 'meal' 
        })
      })
      
      const data = await response.json()
      if (data.imageUrl) {
        setMealImages(prev => ({ 
          ...prev, 
          [mealId]: data.imageUrl 
        }))
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setLoadingImage(prev => ({ ...prev, [mealId]: false }))
    }
  }

  const mealSections = [
    { 
      key: 'breakfast', 
      title: 'Breakfast', 
      icon: Coffee, 
      color: 'orange',
      time: '7:00 - 9:00 AM'
    },
    { 
      key: 'lunch', 
      title: 'Lunch', 
      icon: Sun, 
      color: 'yellow',
      time: '12:00 - 2:00 PM'
    },
    { 
      key: 'dinner', 
      title: 'Dinner', 
      icon: Moon, 
      color: 'purple',
      time: '6:00 - 8:00 PM'
    },
    { 
      key: 'snacks', 
      title: 'Snacks', 
      icon: Apple, 
      color: 'green',
      time: 'Between meals'
    }
  ]

  const getColorClasses = (color) => {
    const colors = {
      orange: 'bg-orange-50 border-orange-200 text-orange-900',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      green: 'bg-green-50 border-green-200 text-green-900'
    }
    return colors[color] || colors.green
  }

  const getIconColorClasses = (color) => {
    const colors = {
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      green: 'bg-green-100 text-green-600'
    }
    return colors[color] || colors.green
  }

  return (
    <div className="space-y-6">
      {/* Diet Overview */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Daily Nutrition Plan
          </h2>
          <div className="text-sm text-gray-600">
            Tailored for {userProfile.dietaryPreference.replace('_', ' ')} diet
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-900">Daily Calories</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {dietPlan.dailyCalories}
            </p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Protein</span>
            </div>
            <p className="text-lg font-bold text-blue-600">
              {dietPlan.macros?.protein || '25%'}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">Carbs</span>
            </div>
            <p className="text-lg font-bold text-green-600">
              {dietPlan.macros?.carbs || '45%'}
            </p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-900">Fats</span>
            </div>
            <p className="text-lg font-bold text-yellow-600">
              {dietPlan.macros?.fats || '30%'}
            </p>
          </div>
        </div>

        {/* Hydration & Supplements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-900">Hydration</span>
            </div>
            <p className="text-blue-800">{dietPlan.hydration}</p>
          </div>
          
          {dietPlan.supplements && (
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ChefHat className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">Supplements</span>
              </div>
              <p className="text-purple-800">{dietPlan.supplements}</p>
            </div>
          )}
        </div>
      </div>

      {/* Meal Sections */}
      <div className="space-y-6">
        {mealSections.map((section, sectionIndex) => {
          const meals = dietPlan.meals?.[section.key] || []
          
          return (
            <motion.div
              key={section.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className={`card border-2 ${getColorClasses(section.color)}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${getIconColorClasses(section.color)}`}>
                    <section.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {section.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm opacity-75">
                      <Clock className="w-4 h-4" />
                      <span>{section.time}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {meals.map((meal, mealIndex) => (
                  <div
                    key={meal.id || mealIndex}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {meal.item}
                        </h4>
                        
                        <div className="flex flex-wrap gap-4 mb-3">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <ChefHat className="w-4 h-4" />
                            <span>{meal.portion}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Flame className="w-4 h-4" />
                            <span>{meal.calories} cal</span>
                          </div>
                          {meal.protein && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Target className="w-4 h-4" />
                              <span>{meal.protein} protein</span>
                            </div>
                          )}
                          {meal.prepTime && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Clock className="w-4 h-4" />
                              <span>{meal.prepTime}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="ml-4">
                        <button
                          onClick={() => handleGenerateImage(meal.item, meal.id || `${section.key}_${mealIndex}`)}
                          disabled={loadingImage[meal.id || `${section.key}_${mealIndex}`]}
                          className="btn-secondary text-sm flex items-center gap-2"
                        >
                          {loadingImage[meal.id || `${section.key}_${mealIndex}`] ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
                              Loading...
                            </>
                          ) : (
                            <>
                              <ImageIcon className="w-4 h-4" />
                              Show Image
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Generated Image */}
                    {mealImages[meal.id || `${section.key}_${mealIndex}`] && (
                      <div className="mt-4">
                        <img
                          src={mealImages[meal.id || `${section.key}_${mealIndex}`]}
                          alt={`${meal.item} image`}
                          className="w-full max-w-md mx-auto rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Nutrition Tips */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-green-100 p-2 rounded-full">
            <ChefHat className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-900">
            Nutrition Tips
          </h3>
        </div>
        <div className="space-y-2 text-green-800">
          <p>• Eat meals at consistent times to regulate your metabolism</p>
          <p>• Drink water 30 minutes before meals to aid digestion</p>
          <p>• Include a variety of colorful vegetables for optimal nutrients</p>
          <p>• Prepare meals in advance to stay consistent with your plan</p>
        </div>
      </div>
    </div>
  )
}