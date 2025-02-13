import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

function resolve(path) {
  return fileURLToPath(new URL(path, import.meta.url));
}

export default defineConfig(({ command }) => ({
  plugins: [vue(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  },
  ...(command === 'serve'
    ? {
        root: 'dev',
      }
    : {
        build: {
          minify: false,
          emptyOutDir: true,
          target: 'esnext',
          lib: {
            formats: ['es', 'cjs'],
            entry: resolve('./src/main.js'),
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              entryFileNames: ({ name }) => {
                return `popper.[format].js`;
              },
            },
          },
        },
      }),
}));
