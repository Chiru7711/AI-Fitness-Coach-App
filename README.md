# 💪 AI Fitness Coach

Your personal AI-powered fitness assistant that creates custom workout and diet plans just for you.

## 🌐 Live Demo

**Try it now:** [https://ai-fitness-coach-app-eight-brown.vercel.app/](https://ai-fitness-coach-app-eight-brown.vercel.app/)

## What It Does

This app acts like a real personal trainer:
- Asks about your goals, fitness level, and preferences
- Creates a personalized 7-day workout plan
- Designs a custom daily nutrition plan
- Reads your plans out loud (text-to-speech)
- Shows images of exercises and meals
- Exports everything as PDF

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add your X.AI API key** (optional)
   - Copy `.env.example` to `.env.local`
   - Add your X.AI API key for AI-powered plans
   - Without API key: Uses high-quality fallback plans

3. **Run the app**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Go to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Fill out the form** - Tell us about yourself (4 easy steps)
2. **Get your plan** - AI creates personalized workout and diet plans
3. **Explore features**:
   - Switch between Workout, Diet, and Coaching tabs
   - Click "Show Form" to see exercise demonstrations
   - Click "Show Image" to see meal photos
   - Use "Read Plan" to hear your plan spoken aloud
4. **Export or save** - Download PDF or save locally

## Features

✅ **Smart Form** - 4-step questionnaire that adapts to your answers
✅ **AI Plans** - Personalized workouts and nutrition (powered by OpenAI GPT-4)
✅ **Voice Reading** - Hear your plans read aloud
✅ **Visual Learning** - AI-generated images of exercises and meals
✅ **PDF Export** - Download your complete plan
✅ **Data Persistence** - Plans saved locally, survives browser refresh
✅ **Mobile Friendly** - Works perfectly on phones and tablets
✅ **No Signup Required** - Start using immediately

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **X.AI Grok** - AI plan generation
- **Framer Motion** - Smooth animations
- **Browser APIs** - Text-to-speech, local storage

## API Key Setup (Optional)

For AI-powered personalized plans:

1. Get an X.AI API key at [x.ai](https://x.ai/)
2. Add to `.env.local`:
   ```
   XAI_API_KEY=your-key-here
   ```
3. Restart the app

**Note**: The app works great without an API key using smart fallback plans!

## Deployment

**Vercel (Recommended)**
1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add your OpenAI API key in environment variables
4. Deploy!

**Other platforms**: Netlify, Railway, DigitalOcean all work great

## Project Structure

```
src/
├── app/
│   ├── api/           # AI endpoints
│   ├── globals.css    # Styles
│   ├── layout.js      # App layout
│   └── page.js        # Homepage
└── components/
    ├── forms/         # User input form
    └── plans/         # Plan display components
```

## Troubleshooting

**Plans not generating?**
- Check if X.AI API key is correct
- Verify you have API credits
- App will use fallback plans if API fails

**Images not loading?**
- Images are generated dynamically
- May take a few seconds to load
- Fallback images provided if generation fails

**Voice not working?**
- Ensure browser supports speech synthesis
- Check device volume and permissions

## Contributing

Want to improve the app? 
1. Fork the repo
2. Make your changes
3. Submit a pull request

## License

MIT License - feel free to use for personal or commercial projects!

---

**Built with ❤️ for fitness enthusiasts everywhere!**

Need help? Open an issue on GitHub or check the troubleshooting section above.