import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
  
//   plugins: [react()],
// })
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  // Check if the environment variable is set to 'true'
  // const isGitHub = process.env.isLiveInGitHUB === 'true';
const env = loadEnv(mode, process.cwd(), '')

  console.log("-------------------------------------------------")
  console.log("🚧 VERCEL BUILD LOG DEBUGGING 🚧")
  console.log("Mode:", mode)
  console.log("Checking VITE_APP_EMAILJS_PUBLIC_KEY...")
  
  if (env.VITE_APP_EMAILJS_PUBLIC_KEY) {
    console.log("✅ STATUS: FOUND")
    // Security: Only print the first 3 chars to verify it's the right key
    console.log("🔍 VALUE STARTS WITH:", env.VITE_APP_EMAILJS_PUBLIC_KEY.slice(0, 3) + "...") 
  } else {
    console.log("❌ STATUS: MISSING / UNDEFINED")
  }
  console.log("-------------------------------------------------")
  return {
    plugins: [react()],
    // If live in GitHub, use repo name. If local, use root.
    // REPLACE '/portfolio/' with your actual repo name if different!
    // base: isGitHub ? "/portfolio/" : "/", 
  }
})