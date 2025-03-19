# 🎯 AI Mock Interviews - Complete Project Summary

## 📋 Project Overview

**AI Mock Interviews** is a full-stack web application that combines AI-powered interview practice with a personal voice assistant. Users can practice technical interviews with an AI interviewer, receive instant feedback, and also chat with a personal AI companion for queries and conversations.

### **Key Features:**
- ✅ AI-powered mock interviews with instant feedback
- ✅ Personal voice assistant for conversations
- ✅ Real-time speech-to-text transcription
- ✅ User authentication & profiles
- ✅ Smooth animations & letter-based avatars
- ✅ Interview history tracking
- ✅ Conversation storage

---

## 🏗️ Technology Stack

### **Frontend**
- **Framework:** Next.js 15.2.2 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Notifications:** Sonner (Toast notifications)
- **Animations:** Custom CSS (@keyframes fadeIn, slideUp, scaleIn)
- **UI Components:** Custom button, input, form, label, select components

### **Backend/Server**
- **Runtime:** Node.js
- **Framework:** Next.js Server Actions
- **API Routes:** Next.js API routes (`/api/...`)

### **Authentication**
- **Client-side Auth:** Firebase Authentication
- **Server-side Auth:** Firebase Admin SDK
- **Session Management:** Secure cookies

### **Database**
- **Primary Database:** Firestore (NoSQL)
- **Collections:** users, interviews, feedback, conversations
- **Indexes:** Composite indexes for optimized queries
- **Query Workarounds:** Server-side filtering & client-side sorting to avoid excessive index creation

### **AI & Voice Services**
- **Voice Orchestration:** Vapi Web SDK
- **Speech-to-Text (STT):** Deepgram (Nova-2 model)
- **Text-to-Speech (TTS):** ElevenLabs (Sarah voice)
- **Conversation AI:** GPT-4 via OpenAI (through Vapi)
- **Question Generation:** Google Gemini AI

### **Infrastructure**
- **Hosting:** Vercel (recommended for Next.js)
- **Database:** Firebase/Firestore
- **Real-time Voice:** Vapi Cloud

---

## 🎮 How It Works

### **1. Authentication Flow**

```
User Sign-up/Sign-in
        ↓
Firebase Auth (client-side)
        ↓
Server Action validates credentials
        ↓
Firebase Admin SDK creates session cookie
        ↓
Secure cookie stored in browser
        ↓
User redirected to dashboard
```

**Key Files:**
- `lib/actions/auth.action.ts` - Authentication server actions
- `firebase/client.ts` - Firebase client configuration
- `firebase/admin.ts` - Firebase admin configuration
- `components/AuthForm.tsx` - Sign-in/Sign-up UI

---

### **2. Interview Mode Flow**

```
User creates interview (role, level, tech stack)
        ↓
POST /api/vapi/generate
        ↓
Google Gemini generates custom questions
        ↓
Interview saved to Firestore
        ↓
User clicks "Start an Interview"
        ↓
Agent component loads interviewer config
        ↓
Vapi initializes voice session
```

**During Interview:**
```
User speaks
        ↓
Deepgram transcribes speech to text
        ↓
GPT-4 reads transcript
        ↓
GPT-4 generates AI response
        ↓
ElevenLabs converts response to speech
        ↓
User hears AI response
        ↓
(Cycle repeats for each interaction)
```

**After Interview:**
```
User ends call
        ↓
All transcripts collected
        ↓
Server Action createFeedback() processes transcripts
        ↓
Google Gemini generates AI feedback & scoring
        ↓
Feedback saved to Firestore
        ↓
User redirected to feedback page
```

**Key Files:**
- `app/api/vapi/generate/route.ts` - Question generation endpoint
- `components/Agent.tsx` - Voice call management
- `lib/actions/general.action.ts` - Interview & feedback queries
- `constants/index.ts` - Interviewer AI configuration

---

### **3. Personal Assistant Mode Flow**

```
User navigates to /assistant
        ↓
Sees feature cards (Quick Answers, Planning, etc.)
        ↓
Clicks "Call" button
        ↓
Agent component loads personalAssistant config
        ↓
Vapi initializes voice session
        ↓
Free-form conversation begins
```

**During Conversation:**
```
User speaks query/question
        ↓
Deepgram transcribes to text
        ↓
GPT-4 understands context (warm, helpful personality)
        ↓
GPT-4 generates helpful response
        ↓
ElevenLabs converts to speech
        ↓
User hears response
        ↓
Conversation continues naturally
```

**After Conversation:**
```
User ends call
        ↓
Conversation transcripts collected
        ↓
POST /api/conversations saves to Firestore
        ↓
Conversation stored for history
        ↓
User can start new conversation
```

**Key Files:**
- `app/(root)/assistant/page.tsx` - Assistant UI
- `components/Agent.tsx` - Voice call management
- `app/api/conversations/route.ts` - Save conversations
- `constants/index.ts` - Assistant AI configuration

---

## 📁 Project Architecture

```
ai_mock_interviews/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── vapi/generate/        # Generate interview questions
│   │   └── conversations/        # Save conversations
│   ├── (auth)/                   # Auth routes
│   │   ├── sign-in/              # Login page
│   │   └── sign-up/              # Registration page
│   ├── (root)/                   # Protected routes
│   │   ├── layout.tsx            # Dashboard layout with avatar
│   │   ├── page.tsx              # Home/dashboard
│   │   ├── assistant/            # Voice assistant page
│   │   └── interview/            # Interview flows
│   └── globals.css               # Global styles & animations
│
├── components/                   # React components
│   ├── Agent.tsx                 # Voice call orchestration
│   ├── AuthForm.tsx              # Auth UI
│   ├── Avatar.tsx                # Letter avatar display
│   ├── InterviewCard.tsx         # Interview card component
│   ├── DisplayTechIcons.tsx      # Tech icons display
│   └── ui/                       # UI components (button, input, etc.)
│
├── lib/                          # Utilities & server actions
│   ├── actions/
│   │   ├── auth.action.ts        # Auth server actions
│   │   └── general.action.ts     # Interview/feedback server actions
│   ├── vapi.sdk.ts               # Vapi initialization
│   └── utils.ts                  # Helper functions
│
├── firebase/                     # Firebase configuration
│   ├── client.ts                 # Firebase client SDK
│   └── admin.ts                  # Firebase Admin SDK
│
├── constants/                    # Configuration
│   └── index.ts                  # AI configs, schemas, constants
│
├── types/                        # TypeScript definitions
│   ├── index.d.ts                # App types
│   └── vapi.d.ts                 # Vapi types
│
├── public/                       # Static assets
│   ├── robot.png                 # Hero robot image
│   ├── ai-avatar.png             # AI avatar
│   ├── user-avatar.png           # User avatar placeholder
│   └── covers/                   # Interview cover images
│
└── .env.local                    # Environment variables (API keys)
```

---

## 🔑 Environment Variables Required

```bash
# Vapi Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=          # Vapi API token
NEXT_PUBLIC_VAPI_WORKFLOW_ID=        # Vapi workflow ID

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY=        # Google Gemini API key

# Firebase Client (Public)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Firebase Admin (Server-side)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

# Application
NEXT_PUBLIC_BASE_URL=               # http://localhost:3000 (dev)
```

---

## 📊 Database Schema (Firestore)

### **Collections:**

#### **1. users**
```json
{
  "id": "user123",
  "name": "Rishit Mehta",
  "email": "rishit@example.com",
  "createdAt": "2025-11-11T10:00:00Z",
  "avatar": "R"
}
```

#### **2. interviews**
```json
{
  "id": "interview123",
  "userId": "user123",
  "role": "Frontend Developer",
  "type": "Technical",
  "level": "Junior",
  "techstack": ["React", "TypeScript", "Next.js"],
  "questions": ["What is React?", "Explain hooks..."],
  "finalized": true,
  "coverImage": "/adobe.png",
  "createdAt": "2025-11-11T10:00:00Z"
}
```

#### **3. feedback**
```json
{
  "id": "feedback123",
  "interviewId": "interview123",
  "userId": "user123",
  "transcript": [
    { "role": "user", "content": "React is..." },
    { "role": "assistant", "content": "Good!" }
  ],
  "totalScore": 78,
  "categoryScores": [
    { "name": "Communication Skills", "score": 80, "comment": "..." },
    { "name": "Technical Knowledge", "score": 75, "comment": "..." }
  ],
  "strengths": ["Clear explanation", "Good examples"],
  "areasForImprovement": ["Need more depth"],
  "finalAssessment": "Good overall performance...",
  "createdAt": "2025-11-11T10:30:00Z"
}
```

#### **4. conversations** (NEW)
```json
{
  "id": "conv123",
  "userId": "user123",
  "transcript": [
    { "role": "user", "content": "What should I focus on today?" },
    { "role": "assistant", "content": "Great question! Let me help..." }
  ],
  "type": "assistant",
  "createdAt": "2025-11-11T11:00:00Z",
  "updatedAt": "2025-11-11T11:15:00Z"
}
```

---

## 🤖 AI Personalities

### **Interviewer Mode**
- **Name:** "Interviewer"
- **Tone:** Professional, formal
- **First Message:** "Hello! Thank you for taking the time to speak with me today..."
- **Purpose:** Conduct structured technical interviews with follow-up questions
- **Model:** GPT-4
- **Voice:** Sarah (ElevenLabs), speed 0.9

### **Personal Assistant Mode**
- **Name:** "Personal Voice Assistant"
- **Tone:** Warm, friendly, conversational
- **First Message:** "Hey there! I'm your personal AI assistant. What's on your mind today?..."
- **Purpose:** Be a helpful companion for queries, planning, problem-solving, brainstorming
- **Model:** GPT-4
- **Voice:** Sarah (ElevenLabs), speed 1.0
- **Capabilities:** 
  - Answer questions on any topic
  - Problem solving & decision making
  - Planning & organization
  - Learning & tutoring
  - Casual conversation
  - Productivity & brainstorming
  - Emotional support

---

## 🎨 UI/UX Features

### **Animations**
- **Fade In:** Page elements appear smoothly
- **Slide Up:** Elements slide up from bottom
- **Scale In:** Elements scale from 0.95 to 1.0
- **All with 200ms cubic-bezier timing for smooth motion**

### **Letter Avatars**
- Shows user's first initial in gradient circle
- Hover scale effect (1.05x)
- Integrated in navigation bar
- Example: "R" for Rishit

### **Interactive Elements**
- **Buttons:** Scale up on hover (1.10x)
- **Cards:** Scale and shadow on hover
- **Images:** Rotate and scale on hover
- **Links:** Color transitions on hover

### **Responsive Design**
- Mobile-first approach with Tailwind CSS
- Stack layout on small screens
- Grid layout on desktop
- Smooth transitions between breakpoints

---

## 🔄 Key Workflows

### **Workflow 1: Complete Interview Session**

```
1. User signs in
2. Navigate to "Start an Interview"
3. Fill interview details (role, level, tech, type, count)
4. Submit → Gemini generates questions → Saved to Firestore
5. Click "Start Interview" on card
6. Agent component initializes Vapi voice session
7. Interview progresses with Q&A
8. User clicks "End" to finish
9. Transcripts → Gemini generates feedback
10. Feedback saved to Firestore
11. Redirect to feedback page showing scores & assessment
12. User can view past interviews on dashboard
```

### **Workflow 2: Voice Assistant Conversation**

```
1. User signs in
2. Click "💬 Chat with Voice Assistant"
3. Redirected to /assistant page
4. See feature cards (Quick Answers, Planning, etc.)
5. Click "Call" button
6. Agent component initializes Vapi with assistant config
7. Free-form conversation begins (no structured questions)
8. User can ask anything - AI responds warmly
9. User clicks "End" to finish
10. Transcript → POST /api/conversations
11. Conversation saved to Firestore
12. User stays on assistant page, can start new conversation
```

### **Workflow 3: View Interview History**

```
1. User on dashboard
2. "Your Interviews" section shows past interviews
3. "Take Interviews" section shows available interviews from others
4. Click on card → Navigate to interview details
5. Can view feedback, retake, or practice similar
```

---

## 🚀 How Everything Connects

```
┌─────────────────────────────────────────────────────────┐
│                    User Browser                          │
│  (Next.js Client Components + React 19)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────┐
│              Next.js Server (Node.js)                    │
│  (Server Actions + API Routes)                          │
├──────────────────────┬──────────────────────────────────┤
│ auth.action.ts       │ Firebase Admin Auth              │
│ general.action.ts    │ Firestore Database               │
│ /api/vapi/generate   │ Google Gemini AI                 │
│ /api/conversations   │ Conversation storage             │
└──────────────────────┬──────────────────────────────────┘
                       │
          ┌────────────┼────────────┬──────────────┐
          ↓            ↓            ↓              ↓
    ┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────────┐
    │ Firebase │ │  Vapi    │ │ Google │ │ ElevenLabs   │
    │  Auth &  │ │  (Voice  │ │ Gemini │ │   (Voice)    │
    │Firestore │ │ Orchest) │ │  (AI)  │ │              │
    └──────────┘ └──────────┘ └────────┘ └──────────────┘
         │             │
         └────────────────────────┬──────────────────┘
                      │
         ┌────────────┴─────────────┐
         ↓                          ↓
    ┌─────────────┐        ┌──────────────┐
    │  Deepgram   │        │   OpenAI     │
    │   (STT)     │        │   (GPT-4)    │
    └─────────────┘        └──────────────┘
```

---

## 📱 User Flows

### **New User Journey**
```
Landing → Sign Up → Create Profile → 
Dashboard → Choose Mode (Interview or Assistant) → 
Complete Activity → View Results → 
History & Future Conversations
```

### **Returning User Journey**
```
Sign In → Dashboard → 
Either:
  A) Create New Interview → Practice → Get Feedback
  B) Chat with Assistant → Save Conversation
  C) Review Interview History
```

---

## ✅ Features Implemented

- ✅ Complete authentication system (sign-up, sign-in, sessions)
- ✅ AI mock interview generation (custom questions via Gemini)
- ✅ Real-time voice interviews (Vapi + Deepgram + GPT-4 + ElevenLabs)
- ✅ Automatic feedback generation (using Gemini)
- ✅ Personal voice assistant (free-form conversations)
- ✅ Conversation storage (Firestore)
- ✅ User profiles with letter avatars
- ✅ Interview history tracking
- ✅ Smooth CSS animations & transitions
- ✅ Responsive mobile-first design
- ✅ Error handling & loading states
- ✅ Toast notifications (Sonner)
- ✅ Firestore database with security rules

---

## 🧪 Testing Checklist

- [ ] Sign up with new email
- [ ] Sign in with credentials
- [ ] Avatar displays first letter
- [ ] Create new interview (verify Gemini questions generated)
- [ ] Start interview call (verify audio input/output)
- [ ] Complete interview (verify feedback generation)
- [ ] Navigate to assistant page
- [ ] Start voice assistant conversation
- [ ] Verify conversation saved in Firestore
- [ ] Review interview history
- [ ] Test on mobile device
- [ ] Verify animations smooth at 60fps

---

## 🛠️ Development

**Run dev server:**
```bash
npm run dev
```

**Build for production:**
```bash
npm run build
```

**Deploy:**
```bash
# Vercel (recommended)
vercel deploy

# Or Firebase Hosting
firebase deploy
```

---

## 📚 Key Technologies Summary

| Technology | Purpose | Version |
|-----------|---------|---------|
| Next.js | Full-stack framework | 15.2.2 |
| React | UI library | 19 |
| TypeScript | Type safety | Latest |
| Tailwind CSS | Styling | v4 |
| Firebase | Auth & Database | Latest |
| Vapi | Voice orchestration | Latest |
| OpenAI | LLM (GPT-4) | Via Vapi |
| Deepgram | Speech-to-text | Nova-2 |
| ElevenLabs | Text-to-speech | Sarah voice |
| Google Gemini | Question & feedback AI | Latest |

---

## 🎯 Summary

This is a **production-ready full-stack application** that combines:
1. **Modern web technologies** (Next.js, React, TypeScript)
2. **Real-time voice AI** (Vapi ecosystem)
3. **Secure authentication** (Firebase Auth)
4. **Scalable database** (Firestore)
5. **Beautiful UX** (Tailwind + custom animations)
6. **Multiple AI personalities** (Interviewer + Assistant)

The app is fully functional and ready for end-to-end testing! 🚀

---

**Last Updated:** November 11, 2025  
**Project Status:** ✅ Complete & Ready for Testing
