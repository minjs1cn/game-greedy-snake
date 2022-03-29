const vite = require("vite");
const vue = require("@vitejs/plugin-vue");
const pkg = require("../package.json");

vite.build({
  plugins: [vue()],
  base: "/" + pkg.name,
  build: {
    outDir: "./preview",
    rollupOptions: {
      input: {
        main: "index.html",
      },
    },
  },
});
