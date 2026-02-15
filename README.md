# 🎯 PathPilot.AI

**AI-Powered Campus Placement & Career Preparation Platform**

PathPilot.AI is a comprehensive platform designed to help students ace campus placements through AI-driven guidance, adaptive learning plans, resume optimization, and real-time placement insights.

![PathPilot.AI](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react) ![Firebase](https://img.shields.io/badge/Firebase-12.9.0-FFCA28?logo=firebase) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)

---

## ✨ Features

### 🤖 AI Career Advisor
- **Personalized AI Chat**: Get placement strategies, interview tips, and career guidance tailored to your profile
- **Context-Aware Responses**: AI remembers your goals and provides relevant advice
- **Dark Mode Support**: Comfortable reading in any lighting condition

### 📋 Prep Planner (Quest Mode)
- **Gamified Learning**: Transform placement prep into engaging daily quests with XP and rewards
- **Role-Specific Plans**: Customized prep plans for different job roles (SDE, Data Scientist, PM, etc.)
- **Boss Battles**: Weekly milestone challenges to test your progress
- **Debuff System**: Identify and overcome common preparation pitfalls

### 📄 Resume Builder & ATS Optimizer
- **ATS Score Analysis**: Comprehensive resume scoring against Applicant Tracking Systems
- **AI-Powered Improvements**: Get specific, actionable bullet point rewrites
- **Keyword Gap Analysis**: Identify critical missing keywords for your target role
- **Interactive Chat**: Ask questions about your resume analysis and get instant help
- **Visual Metrics**: Radar charts and breakdowns of your resume strengths/weaknesses

### 🗺️ Dynamic Skill Roadmap
- **Interactive Roadmaps**: Visual learning paths inspired by roadmap.sh
- **Role-Specific**: Tailored for different career paths
- **Dependency Tracking**: Understand which skills to learn first

### 👥 Admin Dashboard
- **Placement Analytics**: Track overall placement trends and statistics
- **User Management**: Monitor student progress and engagement
- **Role-Based Access**: Secured admin-only access control

### 🔐 Firebase Authentication
- **Google Sign-In**: Seamless authentication with your Gmail account
- **Secure Profile Management**: Store and sync your prep progress across devices

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Firebase Project** ([Create one here](https://console.firebase.google.com))
- **Gemini API Key** ([Get yours here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/R1shabhCodes/PathPilot_Ai.git
   cd PathPilot_Ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy the example env file:
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` and fill in your credentials:
   ```env
   VITE_GEMINI_API_KEY=your_actual_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   # ... (see .env.example for all fields)
   ```

4. **Configure Firebase**
   
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create a new project or select existing one
   - Enable **Google Authentication** in Authentication > Sign-in method
   - Create a **Firestore Database** in Database section
   - Update Firestore security rules:
     ```javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     ```

5. **Update Admin Emails** (Optional)
   
   Edit `src/config/adminEmails.ts` to add admin email addresses:
   ```typescript
   export const ADMIN_EMAILS = [
     'your-admin-email@example.com'
   ];
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3001](http://localhost:3001) in your browser

---

## 📂 Project Structure

```
PathPilot.Ai-main/
├── pages/                    # Application pages/routes
│   ├── AdvisorChat.tsx      # AI Career Advisor
│   ├── PrepPlanner.tsx      # Gamified prep planner
│   ├── ResumeBuilder.tsx    # ATS resume analyzer
│   ├── Roadmap.tsx          # Skill roadmap viewer
│   ├── AdminPanel.tsx       # Admin dashboard
│   └── ProfileSetup.tsx     # User onboarding
├── src/
│   ├── services/
│   │   ├── geminiService.ts # Gemini AI integration
│   │   └── firebase.ts      # Firebase configuration
│   ├── config/
│   │   └── adminEmails.ts   # Admin access control
│   └── contexts/
│       └── AuthContext.tsx  # Authentication state
├── types.ts                 # TypeScript type definitions
├── App.tsx                  # Main app component
└── .env.example            # Environment template
```

---

## 🎨 Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **AI**: Google Gemini API
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## 🔑 Key Features Explained

### Quest-Based Prep Planner
Transform boring prep into an RPG-style adventure:
- Daily quests with XP rewards
- Weekly "Boss Battles" for major milestones
- Debuffs system to identify weak areas
- Progress tracking and streaks

### ATS Resume Optimizer
Beat the robots before meeting humans:
- Real-time ATS compatibility scoring
- Keyword gap analysis (Critical/Important/Nice-to-have)
- AI-powered bullet point improvements
- Formatting and structure feedback
- Interactive chat for specific questions

### AI Career Advisor
Your personal placement coach:
- Context-aware advice based on your profile
- Interview preparation strategies
- Company research assistance
- Salary negotiation tips

---

## 🛠️ Configuration

### Gemini API Limits
Free tier: **20 requests/day** per model
- Consider upgrading for unlimited access
- Monitor usage at [Google AI Studio](https://aistudio.google.dev)

### Firebase Setup
1. Enable Google Sign-In provider
2. Set up Firestore with user collection
3. Configure OAuth redirect URIs
4. Update security rules as shown above

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Known Issues

- **Gemini API Quota**: Free tier has rate limits (20 req/day)
- **Browser Tool**: Playwright errors in some environments (safe to ignore)

---

## 📧 Support

For issues and questions:
- 📧 Email: support@pathpilot.ai (if you have one)
- 🐛 Issues: [GitHub Issues](https://github.com/R1shabhCodes/PathPilot_Ai/issues)

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Firebase for authentication and database
- Roadmap.sh for roadmap inspiration
- The React and TypeScript communities

---

**Built with ❤️ for students preparing for campus placements**
