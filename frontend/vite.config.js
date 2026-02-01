import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/team-lineup/', // Update to match your repository name
  build: {
    outDir: 'dist'
  }
})
