// frontend/pages/api/config.js
// https://web-production-edf6.up.railway.app
// const API_URL = "http://3.13.2.27:8000";
// On Vercel, set the NEXT_PUBLIC_API_URL environment variable to your live server address
// (for example https://your-app.up.railway.app). On your own computer it falls back to the local server.
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
// const API_URL = "http://localhost:8000";
export default API_URL;
