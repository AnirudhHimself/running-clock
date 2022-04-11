import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path/posix';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: 'pages',
        replacement: path.resolve(__dirname, 'src/pages'),
      },
      {
        find: 'styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
      {
        find: 'utilities',
        replacement: path.resolve(__dirname, 'src/utilities'),
      },
      {
        find: 'hooks',
        replacement: path.resolve(__dirname, 'src/hooks'),
      },
    ],
  },
  plugins: [react()],
});
