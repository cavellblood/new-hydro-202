/// <reference types="vitest" />
import {defineConfig} from 'vite';
import hydrogen from '@shopify/hydrogen/plugin';

export default defineConfig({
  plugins: [hydrogen()],
  resolve: {
    alias: [{find: /^~\/(.*)/, replacement: '/src/$1'}],
  },
  optimizeDeps: {
    include: [
      '@headlessui/react',
      'clsx',
      'instantsearch.js',
      'react-use',
      'typographic-base',
    ],
  },
  server: {
    port: 3001,
  },
  test: {
    globals: true,
    testTimeout: 10000,
    hookTimeout: 10000,
  },
});
