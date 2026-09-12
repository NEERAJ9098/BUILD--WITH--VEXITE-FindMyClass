/**
 * FindMyClass — Client Configuration
 * 
 * NOTE: For security, no API keys or secrets are stored in client-side code.
 * All AI requests are routed through a secure backend or serverless API endpoint.
 */
const CAMPUS_AI_CONFIG = {
  // Relative '/api/ai' when frontend and backend share domain (e.g., local server or Vercel),
  // or your deployed backend URL (e.g., 'https://your-backend.vercel.app/api/ai')
  BACKEND_API_URL: "/api/ai"
};
