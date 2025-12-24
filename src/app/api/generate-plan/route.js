import { NextResponse } from 'next/server'

const XAI_API_KEY = process.env.XAI_API_KEY
const XAI_API_URL = 'https://api.x.ai/v1/chat/completions'

const generateFitnessPrompt = (userProfile) => {
  const {
    name,
    age,
    gender,
    height,
    weight,
    fitnessGoal,
    fitnessLevel,
    workoutLocation,
    dietaryPreference,
    medicalHistory,
    injuries,
    stressLevel,
    sleepQuality
  } = userProfile

  return `You are an expert personal fitness coach with 15+ years of experience. Create a personalized 7-day fitness plan for:

USER PROFILE:
- Name: ${name}
- Age: ${age}, Gender: ${gender}
- Height: ${height}cm, Weight: ${weight}kg
- Goal: ${fitnessGoal}
- Fitness Level: ${fitnessLevel}
- Workout Location: ${workoutLocation}
- Dietary Preference: ${dietaryPreference}
${medicalHistory ? `- Medical History: ${medicalHistory}` : ''}
${injuries ? `- Current Injuries: ${injuries}` : ''}
${stressLevel ? `- Stress Level: ${stressLevel}/5` : ''}
${sleepQuality ? `- Sleep Quality: ${sleepQuality}/5` : ''}

REQUIREMENTS:
1. Create a 7-day workout plan with specific exercises, sets, reps, rest periods
2. Design a daily nutrition plan with meals, portions, and calories
3. Write encouraging coaching advice in a warm, professional tone
4. Consider their limitations, preferences, and safety
5. Focus on sustainable, achievable practices
6. Include form tips and exercise alternatives

RESPONSE FORMAT (Valid JSON only):
{
  "workoutPlan": {
    "totalDays": 7,
    "restDays": [7],
    "estimatedDuration": "45-60 minutes per session",
    "days": [
      {
        "day": 1,
        "focus": "Upper Body Strength",
        "warmup": "5-10 minutes light cardio + dynamic stretching",
        "exercises": [
          {
            "id": "exercise_1",
            "name": "Push-ups",
            "sets": 3,
            "reps": "8-12",
            "rest": "60 seconds",
            "difficulty": "beginner",
            "tips": "Keep core engaged, full range of motion",
            "alternatives": ["Knee push-ups", "Wall push-ups"]
          }
        ],
        "cooldown": "5-10 minutes stretching"
      }
    ]
  },
  "dietPlan": {
    "dailyCalories": 2000,
    "macros": {
      "protein": "25%",
      "carbs": "45%",
      "fats": "30%"
    },
    "meals": {
      "breakfast": [
        {
          "id": "breakfast_1",
          "item": "Oatmeal with berries and nuts",
          "portion": "1 cup oats + 1/2 cup berries + 1 tbsp nuts",
          "calories": 350,
          "protein": "12g",
          "prepTime": "10 minutes"
        }
      ],
      "lunch": [
        {
          "id": "lunch_1",
          "item": "Grilled chicken salad",
          "portion": "150g chicken + 2 cups mixed greens",
          "calories": 400,
          "protein": "35g",
          "prepTime": "15 minutes"
        }
      ],
      "dinner": [
        {
          "id": "dinner_1",
          "item": "Baked salmon with quinoa",
          "portion": "150g salmon + 1 cup quinoa + vegetables",
          "calories": 500,
          "protein": "40g",
          "prepTime": "25 minutes"
        }
      ],
      "snacks": [
        {
          "id": "snack_1",
          "item": "Greek yogurt with honey",
          "portion": "1 cup yogurt + 1 tbsp honey",
          "calories": 200,
          "protein": "15g",
          "prepTime": "2 minutes"
        }
      ]
    },
    "hydration": "8-10 glasses of water daily",
    "supplements": "Consider multivitamin if needed"
  },
  "motivation": "Personalized encouraging message for ${name}",
  "coachingTips": [
    "Start each workout with proper warm-up",
    "Focus on form over speed",
    "Listen to your body and rest when needed",
    "Stay consistent with your nutrition"
  ],
  "safetyNotes": [
    "Stop if you feel pain or discomfort",
    "Consult healthcare provider before starting",
    "Progress gradually to avoid injury"
  ]
}

Be specific, personal, and avoid generic advice. Write as if you're speaking directly to ${name}. Ensure all JSON is properly formatted and valid.`
}

const generateFallbackPlan = (userProfile) => {
  return {
    workoutPlan: {
      totalDays: 7,
      restDays: [7],
      estimatedDuration: "45-60 minutes per session",
      days: [
        {
          day: 1,
          focus: "Upper Body Strength",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_1_1",
              name: "Push-ups",
              sets: 3,
              reps: "8-12",
              rest: "60 seconds",
              tips: "Keep core engaged, full range of motion",
              alternatives: ["Knee push-ups", "Wall push-ups"]
            },
            {
              id: "exercise_1_2",
              name: "Dumbbell Rows",
              sets: 3,
              reps: "10-12",
              rest: "60 seconds",
              tips: "Keep back straight, squeeze shoulder blades",
              alternatives: ["Resistance band rows", "Bent-over rows"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 2,
          focus: "Lower Body Power",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_2_1",
              name: "Squats",
              sets: 3,
              reps: "10-15",
              rest: "60 seconds",
              tips: "Keep knees behind toes, chest up",
              alternatives: ["Chair squats", "Wall sits"]
            },
            {
              id: "exercise_2_2",
              name: "Lunges",
              sets: 3,
              reps: "8-10 each leg",
              rest: "60 seconds",
              tips: "Step forward, keep front knee over ankle",
              alternatives: ["Stationary lunges", "Step-ups"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 3,
          focus: "Core & Cardio",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_3_1",
              name: "Plank",
              sets: 3,
              reps: "30-60 seconds",
              rest: "60 seconds",
              tips: "Keep body straight, engage core",
              alternatives: ["Knee plank", "Wall plank"]
            },
            {
              id: "exercise_3_2",
              name: "Mountain Climbers",
              sets: 3,
              reps: "20-30",
              rest: "60 seconds",
              tips: "Keep hips level, quick movements",
              alternatives: ["Step-ups", "Marching in place"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 4,
          focus: "Upper Body Endurance",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_4_1",
              name: "Shoulder Press",
              sets: 3,
              reps: "10-12",
              rest: "60 seconds",
              tips: "Press straight up, engage core",
              alternatives: ["Wall push-ups", "Resistance band press"]
            },
            {
              id: "exercise_4_2",
              name: "Tricep Dips",
              sets: 3,
              reps: "8-12",
              rest: "60 seconds",
              tips: "Keep elbows close to body",
              alternatives: ["Chair dips", "Wall push-ups"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 5,
          focus: "Lower Body Strength",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_5_1",
              name: "Deadlifts",
              sets: 3,
              reps: "8-10",
              rest: "90 seconds",
              tips: "Keep back straight, hinge at hips",
              alternatives: ["Romanian deadlifts", "Glute bridges"]
            },
            {
              id: "exercise_5_2",
              name: "Calf Raises",
              sets: 3,
              reps: "15-20",
              rest: "45 seconds",
              tips: "Rise up on toes, slow controlled movement",
              alternatives: ["Single leg calf raises", "Wall calf raises"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 6,
          focus: "Full Body Circuit",
          warmup: "5-10 minutes light cardio + dynamic stretching",
          exercises: [
            {
              id: "exercise_6_1",
              name: "Burpees",
              sets: 3,
              reps: "5-10",
              rest: "90 seconds",
              tips: "Full body movement, pace yourself",
              alternatives: ["Step-back burpees", "Squat to press"]
            },
            {
              id: "exercise_6_2",
              name: "Jumping Jacks",
              sets: 3,
              reps: "20-30",
              rest: "60 seconds",
              tips: "Land softly, keep rhythm",
              alternatives: ["Step touch", "Arm circles"]
            }
          ],
          cooldown: "5-10 minutes stretching"
        },
        {
          day: 7,
          focus: "Rest Day",
          warmup: "Light stretching or yoga",
          exercises: [
            {
              id: "exercise_7_1",
              name: "Gentle Yoga",
              sets: 1,
              reps: "20-30 minutes",
              rest: "As needed",
              tips: "Focus on breathing and flexibility",
              alternatives: ["Walking", "Light stretching"]
            }
          ],
          cooldown: "Meditation or relaxation"
        }
      ]
    },
    dietPlan: {
      dailyCalories: 2000,
      macros: {
        protein: "25%",
        carbs: "45%",
        fats: "30%"
      },
      meals: {
        breakfast: [{
          id: "breakfast_1",
          item: "Oatmeal with berries",
          portion: "1 cup",
          calories: 350,
          protein: "12g",
          prepTime: "10 minutes"
        }],
        lunch: [{
          id: "lunch_1",
          item: "Grilled chicken salad",
          portion: "150g chicken + greens",
          calories: 400,
          protein: "35g",
          prepTime: "15 minutes"
        }],
        dinner: [{
          id: "dinner_1",
          item: "Baked salmon with quinoa",
          portion: "150g salmon + 1 cup quinoa",
          calories: 500,
          protein: "40g",
          prepTime: "25 minutes"
        }],
        snacks: [{
          id: "snack_1",
          item: "Greek yogurt",
          portion: "1 cup",
          calories: 200,
          protein: "15g",
          prepTime: "2 minutes"
        }]
      },
      hydration: "8-10 glasses of water daily"
    },
    motivation: `Hi ${userProfile.name}! This is your personalized fitness plan. Stay consistent and you'll see great results!`,
    coachingTips: [
      "Start each workout with proper warm-up",
      "Focus on form over speed",
      "Listen to your body and rest when needed"
    ],
    safetyNotes: [
      "Stop if you feel pain or discomfort",
      "Consult healthcare provider before starting"
    ]
  }
}

export async function POST(request) {
  try {
    const userProfile = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'age', 'gender', 'height', 'weight', 'fitnessGoal', 'fitnessLevel', 'workoutLocation', 'dietaryPreference']
    const missingFields = requiredFields.filter(field => !userProfile[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    const prompt = generateFitnessPrompt(userProfile)
    
    // Try X.AI first, fallback to mock data if it fails
    let fitnessData
    
    if (XAI_API_KEY) {
      try {
        const response = await fetch(XAI_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${XAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'grok-beta',
            messages: [
              {
                role: 'system',
                content: 'You are an expert fitness coach. Always respond with valid JSON only. No additional text or formatting.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            temperature: 0.7,
            max_tokens: 4000
          })
        })

        if (response.ok) {
          const completion = await response.json()
          const responseContent = completion.choices[0].message.content.trim()
          fitnessData = JSON.parse(responseContent)
        } else {
          throw new Error(`X.AI API error: ${response.status}`)
        }
      } catch (xaiError) {
        console.warn('X.AI API failed, using fallback data:', xaiError.message)
        fitnessData = generateFallbackPlan(userProfile)
      }
    } else {
      console.log('No X.AI API key found, using fallback data')
      fitnessData = generateFallbackPlan(userProfile)
    }

    // Save to localStorage (client-side will handle this)
    const planData = {
      id: Date.now().toString(),
      userProfile,
      ...fitnessData,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(planData)

  } catch (error) {
    console.error('Error generating fitness plan:', error)
    
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'API quota exceeded. Please try again later.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to generate fitness plan. Please try again.' },
      { status: 500 }
    )
  }
}