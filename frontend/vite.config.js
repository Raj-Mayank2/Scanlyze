import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // All requests starting with /api will be proxied to the backend
      '/api': {
        target: 'http://localhost:5000',   // or your backend port
        changeOrigin: true,
        // Remove the '/api' prefix if your backend routes are not prefixed (optional)
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
})
