import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main:             resolve(__dirname, 'index.html'),
        manifeste:        resolve(__dirname, 'manifeste.html'),
        'a-team-workshops': resolve(__dirname, 'a-team-workshops.html'),
        'a-team-open':    resolve(__dirname, 'a-team-open.html'),
        'rejoindre':      resolve(__dirname, 'rejoindre.html'),
      },
    },
  },
});
