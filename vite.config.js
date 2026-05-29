import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://taleb2030.github.io/nouakchott-night/
export default defineConfig({
  base: '/nouakchott-night/',
  plugins: [react()],
})
