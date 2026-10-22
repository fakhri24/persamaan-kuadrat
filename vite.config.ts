import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          katex: ['katex'],
          lucide: ['lucide-react'],
          confetti: ['canvas-confetti'],
        },
      },
    },
  },
})

