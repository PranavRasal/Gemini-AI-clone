import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const frontendDir = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(frontendDir, '../Backend/dist'),
    emptyOutDir: true,
  },
  plugins: [
      tailwindcss(),
    react()],
})
