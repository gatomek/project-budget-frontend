import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'
import fs from 'node:fs';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')
        ? {
          key: fs.readFileSync('./key.pem'),
          cert: fs.readFileSync('./cert.pem')
        } : undefined
  }
})
