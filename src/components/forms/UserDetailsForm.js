'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Target, MapPin, Utensils, Activity, AlertCircle } from 'lucide-react'

export default function UserDetailsForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    fitnessLevel: '',
    workoutLocation: '',
    dietaryPreference: '',
    medicalHistory: '',
    injuries: '',
    stressLevel: '',
    sleepQuality: ''
  })

  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    {
      title: 'Personal Info',
      icon: User,
      fields: ['name', 'age', 'gender', 'height', 'weight']
    },
    {
      title: 'Fitness Goals',
      icon: Target,
      fields: ['fitnessGoal', 'fitnessLevel', 'workoutLocation']
    },
    {
      title: 'Lifestyle',
      icon: Utensils,
      fields: ['dietaryPreference', 'stressLevel', 'sleepQuality']
    },
    {
      title: 'Health Info',
      icon: AlertCircle,
      fields: ['medicalHistory', 'injuries']
    }
  ]

  const fieldConfig = {
    name: { label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your name' },
    age: { label: 'Age', type: 'number', required: true, placeholder: '25' },
    gender: { 
      label: 'Gender', 
      type: 'select', 
      required: true,
      options: [
        { value: '', label: 'Select gender' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' },
        { value: 'other', label: 'Other' }
      ]
    },
    height: { label: 'Height (cm)', type: 'number', required: true, placeholder: '170' },
    weight: { label: 'Weight (kg)', type: 'number', required: true, placeholder: '70' },
    fitnessGoal: {
      label: 'Fitness Goal',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select your goal' },
        { value: 'fat_loss', label: 'Fat Loss' },
        { value: 'muscle_gain', label: 'Muscle Gain' },
        { value: 'strength', label: 'Build Strength' },
        { value: 'flexibility', label: 'Improve Flexibility' },
        { value: 'general_fitness', label: 'General Fitness' }
      ]
    },
    fitnessLevel: {
      label: 'Current Fitness Level',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select your level' },
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' }
      ]
    },
    workoutLocation: {
      label: 'Preferred Workout Location',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select location' },
        { value: 'home', label: 'Home' },
        { value: 'gym', label: 'Gym' },
        { value: 'outdoor', label: 'Outdoor' }
      ]
    },
    dietaryPreference: {
      label: 'Dietary Preference',
      type: 'select',
      required: true,
      options: [
        { value: '', label: 'Select preference' },
        { value: 'vegetarian', label: 'Vegetarian' },
        { value: 'non_vegetarian', label: 'Non-Vegetarian' },
        { value: 'vegan', label: 'Vegan' },
        { value: 'keto', label: 'Keto' }
      ]
    },
    stressLevel: {
      label: 'Stress Level (1-5)',
      type: 'select',
      options: [
        { value: '', label: 'Select level' },
        { value: '1', label: '1 - Very Low' },
        { value: '2', label: '2 - Low' },
        { value: '3', label: '3 - Moderate' },
        { value: '4', label: '4 - High' },
        { value: '5', label: '5 - Very High' }
      ]
    },
    sleepQuality: {
      label: 'Sleep Quality (1-5)',
      type: 'select',
      options: [
        { value: '', label: 'Select quality' },
        { value: '1', label: '1 - Very Poor' },
        { value: '2', label: '2 - Poor' },
        { value: '3', label: '3 - Average' },
        { value: '4', label: '4 - Good' },
        { value: '5', label: '5 - Excellent' }
      ]
    },
    medicalHistory: { 
      label: 'Medical History (Optional)', 
      type: 'textarea', 
      placeholder: 'Any medical conditions, medications, or health concerns...' 
    },
    injuries: { 
      label: 'Current Injuries (Optional)', 
      type: 'textarea', 
      placeholder: 'Any current injuries or physical limitations...' 
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isCurrentSectionValid = () => {
    const currentFields = sections[currentSection].fields
    return currentFields.every(field => {
      const config = fieldConfig[field]
      if (config.required) {
        return formData[field] && formData[field].trim() !== ''
      }
      return true // Optional fields don't block progression
    })
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'fitnessGoal', 'fitnessLevel', 'workoutLocation', 'dietaryPreference']
    const isValid = requiredFields.every(field => formData[field] && formData[field].trim() !== '')
    
    if (!isValid) {
      alert('Please fill in all required fields')
      return
    }
    
    onSubmit(formData)
  }

  const renderField = (fieldName) => {
    const config = fieldConfig[fieldName]
    const value = formData[fieldName]

    if (config.type === 'select') {
      return (
        <select
          value={value}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          className="input-field"
          required={config.required}
        >
          {config.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )
    }

    if (config.type === 'textarea') {
      return (
        <textarea
          value={value}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          placeholder={config.placeholder}
          className="input-field min-h-[100px] resize-none"
          rows={3}
        />
      )
    }

    return (
      <input
        type={config.type}
        value={value}
        onChange={(e) => handleInputChange(fieldName, e.target.value)}
        placeholder={config.placeholder}
        className="input-field"
        required={config.required}
      />
    )
  }

  const currentSectionData = sections[currentSection]

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <currentSectionData.icon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentSectionData.title}
              </h2>
              <p className="text-gray-600">
                Step {currentSection + 1} of {sections.length}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <motion.div
            className="bg-primary-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {currentSectionData.fields.map(fieldName => {
            const config = fieldConfig[fieldName]
            return (
              <div key={fieldName}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {config.label}
                  {config.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(fieldName)}
              </div>
            )
          })}
        </motion.div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {currentSection === 2 && (
              <button
                type="button"
                onClick={handleNext}
                className="btn-secondary"
              >
                Skip Optional
              </button>
            )}
            
            {currentSection === sections.length - 1 ? (
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Activity className="w-4 h-4" />
                    Generate My Plan
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isCurrentSectionValid()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next {currentSection === 2 ? '(Optional fields can be skipped)' : ''}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}