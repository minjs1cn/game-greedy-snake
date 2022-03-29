const vite = require("vite");
const vue = require("@vitejs/plugin-vue");

(async () => {
  const server = await vite.createServer({
    // 任何合法的用户配置选项，加上 `mode` 和 `configFile`
    configFile: false,
    plugins: [vue()],
  });
  await server.listen();

  server.printUrls();
})();
