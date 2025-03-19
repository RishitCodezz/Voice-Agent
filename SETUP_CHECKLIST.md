# ✅ Setup Checklist

Use this checklist to ensure everything is configured correctly.

## 📋 Pre-Setup

- [ ] Node.js installed (v18 or higher)
- [ ] npm or yarn installed
- [ ] Git installed (optional)
- [ ] Code editor (VS Code recommended)

## 🔑 API Keys Configuration

### Vapi AI
- [ ] Created Vapi account at [vapi.ai](https://vapi.ai/)
- [ ] Got public API key (starts with `vapi_public_`)
- [ ] Added OpenAI API key in Vapi dashboard integrations
- [ ] Added ElevenLabs API key in Vapi dashboard (optional)
- [ ] Created workflow (optional - for interview generation)
- [ ] Added keys to `.env.local`:
  - [ ] `NEXT_PUBLIC_VAPI_WEB_TOKEN`
  - [ ] `NEXT_PUBLIC_VAPI_WORKFLOW_ID` (optional)

### Google Gemini
- [ ] Got API key from [ai.google.dev](https://ai.google.dev/)
- [ ] Added to `.env.local`:
  - [ ] `GOOGLE_GENERATIVE_AI_API_KEY`

### Firebase
- [ ] Created Firebase project
- [ ] Enabled Email/Password authentication
- [ ] Created Firestore database
- [ ] Set Firestore security rules
- [ ] Got client config (from web app settings)
- [ ] Downloaded admin SDK private key JSON
- [ ] Added all keys to `.env.local`:
  - [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
  - [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
  - [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
  - [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`
  - [ ] `FIREBASE_PROJECT_ID`
  - [ ] `FIREBASE_CLIENT_EMAIL`
  - [ ] `FIREBASE_PRIVATE_KEY`

### Application
- [ ] Set `NEXT_PUBLIC_BASE_URL=http://localhost:3000` in `.env.local`

## 📦 Installation

- [ ] Cloned or downloaded the repository
- [ ] Navigated to project directory in terminal
- [ ] Ran `npm install` to install dependencies
- [ ] Verified `.env.local` file exists in root directory
- [ ] Verified `.env.local` has all API keys filled in

## 🧪 Testing

### Test Development Server
- [ ] Run `npm run dev`
- [ ] No errors in terminal
- [ ] App opens at `http://localhost:3000`
- [ ] No console errors in browser

### Test Authentication
- [ ] Navigate to `/sign-up`
- [ ] Create a test account
- [ ] Successfully redirected to dashboard
- [ ] Can sign out
- [ ] Can sign back in at `/sign-in`

### Test Personal Assistant
- [ ] Navigate to `/assistant` (or click "Talk to AI Assistant" button)
- [ ] Click "Call" button
- [ ] Status changes to "Connecting..." then "Active"
- [ ] Microphone access granted
- [ ] Can hear AI greeting
- [ ] Can talk and get responses
- [ ] Conversation transcript appears
- [ ] Click "End" to finish call

### Test Interview Creation
- [ ] Navigate to `/interview`
- [ ] Fill out interview form:
  - [ ] Job role
  - [ ] Experience level
  - [ ] Tech stack
  - [ ] Interview type
  - [ ] Number of questions
- [ ] Submit form
- [ ] Successfully redirected to dashboard
- [ ] New interview appears in "Your Interviews"

### Test Interview Conduct
- [ ] Click on an interview card
- [ ] Interview details page loads
- [ ] Click "Call" button
- [ ] AI interviewer greets you
- [ ] Answer interview questions
- [ ] Conversation transcript updates
- [ ] Click "End" to finish
- [ ] Redirected to feedback page
- [ ] Feedback displays with scores and recommendations

### Test Dashboard
- [ ] Dashboard shows "Your Interviews" section
- [ ] Past interviews appear (if any)
- [ ] "Take Interviews" section shows available interviews
- [ ] Can click on interview cards to view details

## 🎨 Customization (Optional)

- [ ] Reviewed `PERSONAL_ASSISTANT_GUIDE.md`
- [ ] Customized assistant personality (optional)
- [ ] Changed voice settings (optional)
- [ ] Added custom prompts (optional)

## 🚀 Production Deployment (When Ready)

- [ ] Built successfully: `npm run build`
- [ ] No build errors
- [ ] Chosen hosting provider (Vercel recommended)
- [ ] Added all environment variables to hosting dashboard
- [ ] Updated `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Updated Firebase authorized domains
- [ ] Deployed successfully
- [ ] Tested all features in production

## 📚 Documentation Review

- [ ] Read `README.md`
- [ ] Read `DOCUMENTATION.md` for technical details
- [ ] Read `PERSONAL_ASSISTANT_GUIDE.md` for customization
- [ ] Read `API_KEYS_SETUP.md` for detailed setup instructions
- [ ] Read `QUICKSTART_ASSISTANT.md` for quick reference

## 🎉 All Done!

If all checkboxes are checked, your app is ready to use! 

### Quick Reference:
- **Dashboard**: `http://localhost:3000`
- **Personal Assistant**: `http://localhost:3000/assistant`
- **Create Interview**: `http://localhost:3000/interview`
- **Sign Up**: `http://localhost:3000/sign-up`
- **Sign In**: `http://localhost:3000/sign-in`

### Need Help?
1. Check the detailed guides in the documentation files
2. Review error messages in browser console
3. Check terminal output for server errors
4. Verify all API keys are correct in `.env.local`
5. Restart dev server after changing `.env.local`

### Common Issues:
- **"Invalid API Key"**: Double-check keys in `.env.local`, restart server
- **Firebase errors**: Check security rules, verify authentication is enabled
- **Vapi not connecting**: Ensure public key is used, OpenAI key added in Vapi dashboard
- **No questions generated**: Check Google Gemini API key and quota

Happy coding! 🚀
