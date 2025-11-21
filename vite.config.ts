import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [{ src: 'static/*', dest: '' }],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // custom domain, root
  build: {
    outDir: 'dist',
  },
});
