# 🔑 API Keys Setup Guide

This guide will help you obtain all the necessary API keys for your Personal Assistant & Interview Prep app.

## 📋 Required Services

1. **Vapi AI** - Voice conversation platform
2. **Google Gemini** - AI question generation and feedback
3. **Firebase** - Authentication and database
4. **OpenAI** - Used by Vapi (configured in Vapi dashboard)
5. **ElevenLabs** - Used by Vapi (configured in Vapi dashboard)

---

## 1. 🎤 Vapi AI Setup

### Get Vapi Web Token
1. Go to [https://vapi.ai/](https://vapi.ai/)
2. Sign up or log in
3. Navigate to **Dashboard** → **API Keys**
4. Click **"Create API Key"**
5. Copy the **Public Key** (starts with `vapi_public_...`)
6. Paste into `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_WEB_TOKEN=vapi_public_xxxxx
   ```

### Get Vapi Workflow ID (Optional - for interview generation)
1. In Vapi Dashboard, go to **Workflows**
2. Create a new workflow or use existing one
3. Copy the **Workflow ID**
4. Paste into `.env.local`:
   ```
   NEXT_PUBLIC_VAPI_WORKFLOW_ID=xxxxx-xxxxx-xxxxx
   ```

### Configure OpenAI & ElevenLabs in Vapi
1. In Vapi Dashboard, go to **Integrations**
2. Add **OpenAI API Key**:
   - Get from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Click "Create new secret key"
   - Add to Vapi integrations
3. Add **ElevenLabs API Key** (Optional - Free tier available):
   - Get from [https://elevenlabs.io/](https://elevenlabs.io/)
   - Sign up and go to Profile Settings
   - Copy API key
   - Add to Vapi integrations

---

## 2. 🤖 Google Gemini Setup

1. Go to [https://ai.google.dev/](https://ai.google.dev/)
2. Click **"Get API key"**
3. Sign in with Google account
4. Click **"Create API key"** or **"Get API key in new project"**
5. Copy the API key
6. Paste into `.env.local`:
   ```
   GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

**Free Tier**: 15 requests per minute, 1500 requests per day

---

## 3. 🔥 Firebase Setup

### Create Firebase Project
1. Go to [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name (e.g., "AI Interview Assistant")
4. Follow setup wizard
5. Choose "Pay as you go" (Spark plan) - Free tier is generous

### Enable Authentication
1. In Firebase Console, go to **Build** → **Authentication**
2. Click **"Get started"**
3. Enable **Email/Password** sign-in method
4. Click **Save**

### Create Firestore Database
1. Go to **Build** → **Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll set rules later)
4. Select location closest to your users
5. Click **"Enable"**

### Get Client Configuration (Public Keys)
1. Go to **Project Settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click **Web icon** (</>) to add a web app
4. Register app with a nickname (e.g., "AI Interview Web")
5. Copy the config values:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "project-id.firebaseapp.com",
     projectId: "project-id",
     storageBucket: "project-id.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef"
   };
   ```
6. Paste into `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

### Get Admin SDK Configuration (Private Keys)
1. Still in **Project Settings**
2. Go to **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"** (downloads a JSON file)
5. Open the JSON file and copy these values:
   ```json
   {
     "project_id": "your-project-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com"
   }
   ```
6. Paste into `.env.local`:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nMultiline\nKey\nHere\n-----END PRIVATE KEY-----\n"
   ```

**⚠️ Important**: Keep the quotes around `FIREBASE_PRIVATE_KEY` and preserve the `\n` newline characters!

### Set Firestore Security Rules
1. Go to **Firestore Database** → **Rules**
2. Replace with these rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users collection
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Interviews collection
       match /interviews/{interviewId} {
         allow read: if request.auth != null;
         allow create: if request.auth != null;
         allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
       }
       
       // Feedback collection
       match /feedback/{feedbackId} {
         allow read: if request.auth != null && resource.data.userId == request.auth.uid;
         allow create, update: if request.auth != null;
       }
     }
   }
   ```
3. Click **"Publish"**

---

## 4. 🔐 Security Best Practices

### Add .env.local to .gitignore
Make sure `.env.local` is in your `.gitignore`:
```
# .gitignore
.env.local
.env
```

### Never Commit API Keys
- Don't commit `.env.local` to git
- Use `.env.example` for team reference
- Use environment variables in production (Vercel, Netlify, etc.)

### Rotate Keys Regularly
- Change API keys every few months
- Immediately rotate if compromised
- Use different keys for development/production

---

## 5. ✅ Verify Setup

After adding all keys to `.env.local`:

1. **Restart your dev server**:
   ```bash
   npm run dev
   ```

2. **Test Authentication**:
   - Go to `/sign-up`
   - Create an account
   - Should successfully sign up and redirect

3. **Test Assistant**:
   - Go to `/assistant`
   - Click "Call"
   - Should connect and start conversation

4. **Test Interview Generation**:
   - Go to `/interview`
   - Fill form and submit
   - Should generate questions and create interview

---

## 6. 💰 Cost Estimates (Free Tiers)

### Vapi AI
- **Free Trial**: $10 credit
- **Cost**: ~$0.05 per minute
- **Includes**: Deepgram + OpenAI + ElevenLabs

### Google Gemini
- **Free Tier**: 15 RPM, 1500 RPD
- **More than enough** for development and testing

### Firebase
- **Spark Plan (Free)**:
  - 1 GB storage
  - 10 GB/month transfer
  - 50K reads/day
  - 20K writes/day
- **More than enough** for small to medium apps

### OpenAI (via Vapi)
- GPT-4: ~$0.03 per 1K tokens
- GPT-3.5: ~$0.002 per 1K tokens
- **Included in Vapi pricing**

### ElevenLabs (via Vapi)
- **Free**: 10K characters/month
- **Included in Vapi pricing**

---

## 7. 🚨 Troubleshooting

### "Invalid API Key" Error
- Double-check key is copied correctly (no extra spaces)
- Verify key is active in the service dashboard
- Restart dev server after adding keys

### Firebase "Permission Denied"
- Check Firestore security rules
- Verify user is authenticated
- Check if userId matches in rules

### Vapi Not Connecting
- Verify `NEXT_PUBLIC_VAPI_WEB_TOKEN` is the **public key**
- Check OpenAI key is added in Vapi dashboard
- Test in Vapi dashboard playground first

### "Module not found" Errors
- Run `npm install` to ensure all packages installed
- Check if `.env.local` file exists in root directory

---

## 8. 📦 Production Deployment

When deploying to Vercel/Netlify:

1. **Add environment variables** in dashboard:
   - All `NEXT_PUBLIC_*` variables
   - All Firebase variables
   - Google Gemini key

2. **Security**:
   - Never expose private keys in client-side code
   - Only `NEXT_PUBLIC_*` variables are exposed to browser
   - Admin SDK keys stay server-side only

3. **Domain**:
   - Update `NEXT_PUBLIC_BASE_URL` to production domain
   - Update Firebase authorized domains in console

---

## 🎉 Done!

Once all keys are added, your app is ready to use! 

**Quick Test Checklist**:
- ✅ Sign up works
- ✅ Sign in works
- ✅ Personal Assistant connects
- ✅ Interview creation works
- ✅ Interview conversation works
- ✅ Feedback generation works

Need help? Check the documentation files:
- `DOCUMENTATION.md` - Technical details
- `PERSONAL_ASSISTANT_GUIDE.md` - Customization guide
- `QUICKSTART_ASSISTANT.md` - Quick reference
