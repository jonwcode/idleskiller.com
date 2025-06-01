import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import swc from "vite-plugin-svgr";

// Simulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  define: {
    __ASSETS__: JSON.stringify("https://assets.idleskiller.com/"),
  },
  plugins: [
    react(),
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        exportType: "named",
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: "**/*.svg",
    }),
    swc(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@store": `${__dirname}/src/store`,
      "@common/": `${__dirname}/src/common/`,
      "@common": `${__dirname}/src/common/index.tsx`,
      "@hooks": `${__dirname}/src/hooks`,
      "@comp": `${__dirname}/src/components`,
      "@cssc": `${__dirname}/src/styles/components/`,
      "@css": path.resolve(__dirname, "/src/styles"),
      "@svg": path.resolve(__dirname, "/src/assets/svg/"),
      "@screens": path.resolve(__dirname, "/src/screens"),
      // "@types": `${__dirname}/src/types`,
    },
  },
  server: {
    allowedHosts: ["app.idleskiller.com"],
    host: "0.0.0.0",
    port: 3001,
    proxy: {
      "/api": {
        target: "https://api.idleskiller.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove '/api' prefix before forwarding
      },
    },
  },
});
