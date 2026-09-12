# 📍 FindMyClass – Smart Campus Navigation

> A modern, responsive campus navigation assistant that helps new students, freshmen, and visitors easily find classrooms, laboratories, administrative offices, libraries, cafeterias, washrooms, and other facilities across the campus.

---

## 🎯 Problem Statement
Navigating a multi-acre college campus with dozens of academic blocks, wings, and numbered rooms can be intimidating for freshmen, visitors, and new faculty. Traditional paper maps are cumbersome, room naming conventions (e.g., `B-204`, `A-101`) are often unclear, and students frequently run late to classes or exams simply trying to find the correct room.

## 💡 Solution
**FindMyClass** solves this by providing:
- **Instant Search**: Find any room, department, or amenity by room number or name.
- **Campus Details**: Detailed building block, floor level, room code, operating hours, and landmark checkpoints.
- **Turn-by-Step Directions**: Clear walking instructions with landmark references.
- **"I'm Lost" Wayfinder**: Calculates direct walking routes between any two points on campus.
- **Secure Campus AI Assistant**: A natural language navigation assistant grounded strictly in campus directory data, powered by Google Gemini via a secure serverless backend.

---

## ✨ Key Features
- **Smart Real-Time Search**: Instant filtering across 16+ verified campus locations.
- **Category Filter Pills**: Quick filters for Classrooms, Laboratories, Offices, Library, Canteens, and Facilities.
- **Interactive Campus Schematic**: Digital layout showing campus blocks and corridors.
- **Campus Route Simulator**: Visual pathway previews with estimated walking times.
- **Favorites & LocalStorage**: Save frequently visited classes with 1-click bookmarks.
- **Campus AI Assistant**: Answers natural language questions like *"Where is the CSE Lab?"* or *"How do I reach B-204?"*.
- **Mobile First & Responsive**: Optimized for desktop monitors, tablets, and mobile devices.

---

## 🔒 Security Architecture
- **Zero Client Secrets**: No API keys or credentials are ever exposed in frontend JavaScript or HTML.
- **Secure Backend API**: All AI queries are routed to `/api/ai`, which reads `API_KEY` strictly from server environment variables.
- **No Hallucinations**: Strict campus grounding ensures the AI assistant never invents non-existent campus locations.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript (No heavy frameworks)
- **Backend / Serverless**: Node.js HTTP Server (`server.js`) & Serverless Function (`api/ai.js`)
- **AI Engine**: Google Gemini API via secure backend proxy
- **Persistence**: Browser `localStorage` for user favorites

---

## 🚀 Getting Started Locally

### 1. Clone the repository
```bash
git clone https://github.com/NEERAJ9098/BUILD--WITH--VEXITE-FindMyClass.git
cd BUILD--WITH--VEXITE-FindMyClass
```

### 2. Configure Environment Variables
Copy the template configuration:
```bash
cp .env.example .env
```
Open `.env` and add your Google Gemini API key:
```env
API_KEY=your_api_key_here
PORT=3000
```

### 3. Run the Development Server
```bash
npm start
```
Open your browser at **`http://localhost:3000/`**.

---

## 🌐 Deployment Guide

### Frontend Deployment (GitHub Pages)
1. Push this repository to GitHub.
2. Go to **Settings > Pages > Build and deployment**.
3. Choose **GitHub Actions** (the included `.github/workflows/deploy.yml` workflow will deploy automatically) or **Deploy from a branch (`main` / `/root`)**.
4. The frontend will be live at `https://<your-username>.github.io/<repo-name>/`.

### Secure AI Backend Deployment (Vercel / Netlify / Render)
Because GitHub Pages only hosts static files, deploy the serverless function `/api/ai.js` to a free serverless provider:
1. Connect this repo to **Vercel** or **Netlify**.
2. Set the environment variable `API_KEY` in your project's dashboard.
3. Update `config.js` with your deployed backend URL:
   ```javascript
   const CAMPUS_AI_CONFIG = {
     BACKEND_API_URL: "https://your-backend.vercel.app/api/ai"
   };
   ```

---

## 👨‍💻 Team & Hackathon
- **Project**: FindMyClass
- **Developed for**: Hack Day Hackathon
- **License**: MIT
