import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name.includes('css')) {
            return '[name].[hash].[ext]';
          }
          return '[name].[ext]';
        },
        entryFileNames: `[name].[hash].js`,
      },
    },
  },
  plugins: [svelte()],
});
