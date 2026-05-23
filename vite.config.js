import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// NOTE ON `base`:
// If you deploy to GitHub Pages at a PROJECT url
//   (https://<user>.github.io/<repo>/), set base to '/<repo>/'.
// If you deploy to a CUSTOM DOMAIN or a USER page
//   (https://<user>.github.io/ or https://yourdomain.com/), leave base as '/'.
// You told me you have your own domain, so '/' is the right default.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
})
