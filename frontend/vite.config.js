import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Avoids CORS friction in local dev; the backend also sets cors()
      // itself for direct deployed-frontend -> deployed-backend calls.
      '/api': 'http://localhost:3000',
    },
  },
});
