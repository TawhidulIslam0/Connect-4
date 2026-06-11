import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Connect-4/', // Replace 'Connect-4' with your exact repository name
})