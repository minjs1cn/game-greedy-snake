const vite = require("vite");

vite.build({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "GreedySnake",
      fileName: (format) => `greedy-snake.${format}.js`,
    },
  },
});
