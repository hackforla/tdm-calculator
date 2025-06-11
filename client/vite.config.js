import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig(() => {
  const OPEN_BROWSER = process.env.VITE_OPEN_BROWSER == "true" ? true : false;
  const API_URL = process.env.VITE_API_URL || "http://localhost:5000";
  const CLIENT_PORT = process.env.CLIENT_PORT || 3000;

  return {
    base: "/",
    plugins: [
      svgrPlugin(),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"]
        }
      }),
      viteTsconfigPaths()
    ],
    define: {
      global: {}
    },
    build: {
      rollupOptions: {
        input: {
          main: "./index.html",
          app: "/src/index.jsx"
        }
      }
    },
    server: {
      // this ensures that the browser opens upon server start
      open: OPEN_BROWSER,
      // this sets a default port to 3000
      port: CLIENT_PORT,
      host: true,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
