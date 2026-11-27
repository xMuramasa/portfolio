import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // x-muramasa.dev serves from the root; set BASE_PATH for a host that serves from a subpath
  base: process.env.BASE_PATH ?? '/',
})
