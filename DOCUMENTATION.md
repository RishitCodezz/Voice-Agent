# Prepwise - AI Mock Interview Platform Documentation

## 📋 Overview

**Prepwise** is an AI-powered job interview preparation platform that uses Vapi voice agents and Google Gemini to conduct realistic mock interviews with real-time voice interaction and intelligent feedback generation.

### Key Features
- 🎤 **Voice-based AI Interviews** - Real-time conversation with AI interviewer using Vapi
- 🤖 **AI-Generated Questions** - Google Gemini creates role-specific interview questions
- 📊 **Intelligent Feedback** - Detailed performance analysis across 5 categories
- 🔐 **Firebase Authentication** - Secure user authentication and data storage
- 📱 **Responsive Design** - Works seamlessly across all devices

---

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 15.2.2 (App Router), React 19, TailwindCSS
- **Backend**: Next.js API Routes (Server Actions)
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **AI Services**: 
  - Vapi AI (Voice conversations)
  - Google Gemini 2.0 Flash (Question generation & feedback)
- **UI Components**: shadcn/ui, Radix UI
- **Validation**: Zod

### Project Structure
```
ai_mock_interviews/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (root)/           # Main application pages
│   └── api/vapi/         # API routes for AI workflows
├── components/           # React components
├── constants/            # Configuration & constants
├── firebase/             # Firebase client & admin setup
├── lib/
│   ├── actions/          # Server actions
│   └── vapi.sdk.ts       # Vapi SDK initialization
└── types/                # TypeScript definitions
```

---

## 🔄 Application Flow

### 1. User Authentication
- Users sign up/sign in via Firebase Auth (email/password)
- Session managed via Firebase Auth tokens
- User data stored in Firestore

### 2. Interview Creation Workflow
**Location**: `/app/interview/page.tsx` → `/app/api/vapi/generate/route.ts`

1. User fills interview form:
   - Job Role (e.g., "Frontend Developer")
   - Experience Level (Junior/Mid/Senior)
   - Tech Stack (e.g., "React, TypeScript, Next.js")
   - Interview Type (Technical/Behavioral/Mixed)
   - Number of Questions (3-10)

2. Form submitted to `/api/vapi/generate` endpoint

3. **Google Gemini generates questions**:
   ```typescript
   Prompt: "Prepare questions for a job interview..."
   Model: gemini-2.0-flash-001
   Output: Array of interview questions
   ```

4. Interview saved to Firestore with:
   - Generated questions
   - User metadata
   - Random cover image
   - Timestamp

### 3. Interview Conduct Workflow
**Location**: `/app/(root)/interview/[id]/page.tsx` → `components/Agent.tsx`

#### Voice Agent Initialization
```typescript
// Vapi agent configuration in constants/index.ts
const interviewer = {
  name: "Interviewer",
  transcriber: { provider: "deepgram", model: "nova-2" },
  voice: { provider: "11labs", voiceId: "sarah" },
  model: { provider: "openai", model: "gpt-4" }
}
```

#### Interview Process:
1. **Call Start**: User clicks "Call" button
2. **Agent connects** via Vapi Web SDK
3. **Questions injected** into agent's system prompt as variables:
   ```typescript
   variableValues: {
     questions: formattedQuestions // Questions from Firestore
   }
   ```
4. **Real-time conversation**:
   - User speaks via microphone
   - Deepgram transcribes speech to text
   - GPT-4 generates responses
   - ElevenLabs converts text to speech
   - Audio played back to user

5. **Transcript captured**: Every message stored in state:
   ```typescript
   messages: [{role: "assistant", content: "..."}, {role: "user", content: "..."}]
   ```

6. **Call ends**: User clicks "End" or interview completes

### 4. Feedback Generation Workflow
**Location**: `lib/actions/general.action.ts` (createFeedback)

1. **Transcript formatted**:
   ```typescript
   "- assistant: Hello! Thank you for taking the time...\n- user: Hi, thank you for having me..."
   ```

2. **Google Gemini analyzes conversation**:
   ```typescript
   Model: gemini-2.0-flash-001
   Schema: feedbackSchema (Zod validation)
   
   Prompt: "You are an AI interviewer analyzing a mock interview..."
   
   Output Structure:
   {
     totalScore: number (0-100),
     categoryScores: [
       { name: "Communication Skills", score: number, comment: string },
       { name: "Technical Knowledge", score: number, comment: string },
       { name: "Problem Solving", score: number, comment: string },
       { name: "Cultural Fit", score: number, comment: string },
       { name: "Confidence and Clarity", score: number, comment: string }
     ],
     strengths: string[],
     areasForImprovement: string[],
     finalAssessment: string
   }
   ```

3. **Feedback saved to Firestore**
4. **User redirected** to `/interview/[id]/feedback`

### 5. Dashboard Display
**Location**: `/app/(root)/page.tsx`

- Displays user's past interviews
- Shows available interviews from other users
- Quick actions to start new interview or retake existing ones

---

## 🤖 AI Workflow Deep Dive

### Vapi Agent Configuration

#### **Agent Type 1: Interview Generator** (Workflow-based)
**Environment Variable**: `NEXT_PUBLIC_VAPI_WORKFLOW_ID`

This is a **Vapi Workflow** (not inline assistant) that you configure in the Vapi dashboard:
- Used for initial interview setup/onboarding
- Accessed in `Agent.tsx` when `type === "generate"`
- Takes username and userid as variables

#### **Agent Type 2: Interviewer** (Inline Assistant)
**Location**: `constants/index.ts` → `interviewer` object

This is an **inline assistant configuration**:

```typescript
{
  name: "Interviewer",
  firstMessage: "Hello! Thank you for taking the time...",
  
  // Speech-to-Text
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en"
  },
  
  // Text-to-Speech
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9
  },
  
  // AI Brain
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `You are a professional job interviewer...
        Follow the structured question flow:
        {{questions}}  // <- Dynamic injection
        ...`
    }]
  }
}
```

**How it works**:
1. Questions are **dynamically injected** as template variables
2. GPT-4 uses system prompt to guide conversation
3. Maintains context throughout interview
4. Follows professional interviewer behavior

### Real-time Events Handling

In `components/Agent.tsx`:

```typescript
// Call lifecycle
vapi.on("call-start", onCallStart)      // Connection established
vapi.on("call-end", onCallEnd)          // Interview finished
vapi.on("error", onError)               // Handle errors

// Speech events
vapi.on("speech-start", onSpeechStart)  // AI starts speaking
vapi.on("speech-end", onSpeechEnd)      // AI stops speaking

// Transcript capture
vapi.on("message", onMessage)           // Every message transcribed
```

### Message Types
```typescript
{
  type: "transcript",
  transcriptType: "final",  // or "partial"
  role: "user" | "assistant",
  transcript: "actual text content"
}
```

---

## 🔧 Environment Variables Required

```env
# Vapi Configuration
NEXT_PUBLIC_VAPI_WEB_TOKEN=        # Vapi public API key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=      # Workflow ID (for generation flow)

# Google Gemini
GOOGLE_GENERATIVE_AI_API_KEY=      # For question & feedback generation

# Application
NEXT_PUBLIC_BASE_URL=              # Your app URL

# Firebase Client
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
```

---

## 📊 Data Models (Firestore)

### Collections

#### `interviews`
```typescript
{
  id: string,
  userId: string,
  role: string,           // e.g., "Frontend Developer"
  type: string,           // "Technical" | "Behavioral" | "Mixed"
  level: string,          // "Junior" | "Mid" | "Senior"
  techstack: string[],    // ["React", "TypeScript", "Next.js"]
  questions: string[],    // AI-generated questions
  coverImage: string,     // Random company logo
  finalized: boolean,     // Interview ready to take
  createdAt: string       // ISO timestamp
}
```

#### `feedback`
```typescript
{
  id: string,
  interviewId: string,
  userId: string,
  totalScore: number,
  categoryScores: [
    { name: string, score: number, comment: string }
  ],
  strengths: string[],
  areasForImprovement: string[],
  finalAssessment: string,
  createdAt: string
}
```

#### `users`
```typescript
{
  id: string,
  name: string,
  email: string
}
```

---

## 🎯 Key Components

### `Agent.tsx`
**Purpose**: Manages Vapi voice call lifecycle and transcript capture

**States**:
- `callStatus`: INACTIVE → CONNECTING → ACTIVE → FINISHED
- `messages`: Array of transcript messages
- `isSpeaking`: Visual indicator for AI speech

**Props**:
- `type`: "generate" | "interview" (determines workflow)
- `questions`: Interview questions to inject into agent
- `interviewId`, `feedbackId`: For feedback persistence

### `InterviewCard.tsx`
**Purpose**: Display interview preview with metadata

Shows:
- Role & type
- Tech stack icons
- Creation date
- Progress indicator

### `AuthForm.tsx`
**Purpose**: Unified sign-in/sign-up form

Handles Firebase authentication with email/password

---

## 🚀 API Routes

### `POST /api/vapi/generate`
**Purpose**: Generate interview questions with AI

**Input**:
```json
{
  "type": "Technical",
  "role": "Frontend Developer",
  "level": "Senior",
  "techstack": "React, TypeScript, Next.js",
  "amount": 5,
  "userid": "user123"
}
```

**Process**:
1. Call Google Gemini with structured prompt
2. Parse JSON array of questions
3. Create interview document in Firestore
4. Return success status

---

## 🔐 Authentication Flow

1. User submits email/password
2. Firebase Auth creates/validates user
3. ID token generated
4. Token stored in cookies/session
5. Server Actions verify token on each request
6. `getCurrentUser()` helper extracts user from session

---

## 🎨 Styling & UI

- **TailwindCSS v4** with custom theme
- **Dark mode** support via CSS variables
- **Custom utilities**: `dark-gradient`, `blue-gradient`, `flex-center`
- **Responsive breakpoints**: `max-sm`, `max-lg`
- **shadcn/ui** components with custom styling

---

## 📱 User Experience Flow

1. **Landing** → Dashboard showing past & available interviews
2. **Create** → Fill form → AI generates questions
3. **Start** → Click "Call" → Voice conversation begins
4. **Interview** → Real-time speech with AI interviewer
5. **Finish** → Click "End" → AI analyzes transcript
6. **Feedback** → View detailed scores and recommendations
7. **Retake** → Option to redo interview for practice

---

## 🛠️ Making Vapi Your Personal Assistant

### Current Workflow Location
The Vapi workflow is configured via:
1. **Environment Variable**: `NEXT_PUBLIC_VAPI_WORKFLOW_ID`
2. **Dashboard**: https://vapi.ai/dashboard (your Vapi account)

### To Customize the AI Agent:

#### Option 1: Modify Inline Interviewer
Edit `constants/index.ts` → `interviewer` object:

```typescript
export const interviewer: CreateAssistantDTO = {
  name: "Your Personal Assistant",
  firstMessage: "Hello! I'm your AI assistant. How can I help you today?",
  
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `You are a helpful personal assistant.
        Your tasks include:
        - Answering questions
        - Providing recommendations
        - Scheduling and reminders
        - General conversation
        
        Be friendly, concise, and helpful.`
    }]
  }
}
```

#### Option 2: Create New Workflow in Vapi Dashboard
1. Go to https://vapi.ai/dashboard
2. Create new workflow
3. Configure:
   - **Transcriber**: Deepgram Nova-2
   - **Voice**: ElevenLabs (choose voice)
   - **Model**: GPT-4 with custom system prompt
   - **Variables**: Define custom inputs
4. Copy Workflow ID
5. Use in code:
   ```typescript
   vapi.start("your-new-workflow-id", {
     variableValues: { ... }
   })
   ```

#### Option 3: Multi-purpose Agent
Modify `Agent.tsx` to accept different agent configurations:

```typescript
interface AgentProps {
  agentType: "interviewer" | "assistant" | "coach";
  customPrompt?: string;
  // ...
}
```

Then create multiple assistant configurations in `constants/index.ts`.

---

## 📝 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🐛 Debugging Tips

1. **Vapi not connecting**: Check `NEXT_PUBLIC_VAPI_WEB_TOKEN`
2. **No feedback**: Check Gemini API key and quota
3. **Firebase errors**: Verify admin credentials format
4. **Questions not appearing**: Check AI response format (must be JSON array)
5. **Voice issues**: Test microphone permissions in browser

---

## 📌 Key Takeaways

- **Vapi handles entire voice pipeline**: Speech → AI → Speech
- **Two AI models**: Gemini (questions/feedback) + GPT-4 (conversation)
- **Real-time transcript capture** enables detailed feedback
- **Firebase** manages all persistence and auth
- **Modular design** allows easy customization of AI behavior

---

## 🔗 External Resources

- [Vapi Documentation](https://docs.vapi.ai)
- [Google Gemini API](https://ai.google.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js 15 Docs](https://nextjs.org/docs)
