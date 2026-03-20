import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "webDev_term3",  // ← replace with your exact GitHub repo name
})
