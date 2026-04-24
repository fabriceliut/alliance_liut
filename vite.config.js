import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main:             resolve(__dirname, 'index.html'),
        manifesto:        resolve(__dirname, 'manifesto.html'),
        'a-team-workshops': resolve(__dirname, 'a-team-workshops.html'),
        'a-team-open':    resolve(__dirname, 'a-team-open.html'),
      },
    },
  },
});
