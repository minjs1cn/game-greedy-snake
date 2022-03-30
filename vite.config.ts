import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: './lib',
    lib: {
      entry: 'src/index.ts',
      name: 'GreedySnake',
      fileName: (format) => `greedy-snake.${format}.js`,
    },
  },
});
