import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` controls the public path. For GitHub Pages project sites it must be
// "/<repo>/" — the deploy workflow sets VITE_BASE=/revolv3-website/. Defaults
// to "/" for local dev and root-domain hosts.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
