import { NextResponse } from 'next/server'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request) {
  try {
    const { prompt, type } = await request.json()
    
    // Try to generate image using OpenAI DALL-E API
    if (OPENAI_API_KEY) {
      try {
        const imagePrompt = type === 'meal' 
          ? `Professional food photography: ${prompt} meal, beautifully plated, appetizing presentation, restaurant quality, natural lighting, nutritious healthy food, clean background`
          : `Fitness demonstration photo: Person performing ${prompt} exercise with perfect form, proper technique, gym setting, athletic wear, instructional fitness photography, clear posture`
        
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: imagePrompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard'
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          if (data.data && data.data[0] && data.data[0].url) {
            return NextResponse.json({ 
              imageUrl: data.data[0].url,
              prompt,
              type,
              generated: true
            })
          }
        } else {
          console.warn('OpenAI API error:', response.status, await response.text())
        }
      } catch (apiError) {
        console.warn('OpenAI image generation failed:', apiError.message)
      }
    }
    
    // Fallback to Unsplash search API for relevant images
    try {
      const searchQuery = type === 'meal' 
        ? `healthy ${prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()} food nutrition`
        : `${prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()} exercise fitness workout`
      
      const unsplashUrl = `https://source.unsplash.com/600x400/?${encodeURIComponent(searchQuery)}`
      
      return NextResponse.json({ 
        imageUrl: unsplashUrl,
        prompt,
        type,
        generated: false
      })
    } catch (unsplashError) {
      // Final fallback to high-quality Unsplash images
      const fallbackImages = {
        meal: [
          'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&q=80'
        ],
        exercise: [
          'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&h=400&fit=crop&q=80',
          'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop&q=80'
        ]
      }
      
      const categoryImages = type === 'meal' ? fallbackImages.meal : fallbackImages.exercise
      const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)]
      
      return NextResponse.json({ 
        imageUrl: randomImage,
        prompt,
        type,
        generated: false
      })
    }
    
  } catch (error) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    )
  }
}