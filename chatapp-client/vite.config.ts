import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, UserConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig((config: UserConfig) => {
  const isProduction = config.mode === "production";
  return {
    base: "./",
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "#": path.resolve(__dirname,"./src"),
      },
    },
    plugins: [
      react(),
      svgrPlugin({
        include: "**/*.svg",
        svgrOptions: {
          exportType: "default",
        },
      }),
    ],
    server: {
      proxy: {
        "/socket.io": {
          target: "http://localhost:4000",
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      port: 8000,
    },
    define: {
      "process.env": {
        REACT_APP_API_URL: "http://localhost:4000/api",
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      minify: isProduction,
      assetsDir: "assets",
      cssCodeSplit: true,
      sourcemap: !isProduction,
      rollupOptions: {
        treeshake: isProduction,
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        minify: false,
      },
    },
    test: {
      includeSource: ["src/**/*.{js,ts,jsx,tsx}"],
      environment: "jsdom",
      globals: true,
      coverage: {
        provider: "istanbul",
        reporter: ["text", "json", "html"],
        reportsDirectory: "coverage",
        exclude: [
          "**/*.test.*",
          "**/*.spec.*",
          "**/main.tsx",
          "**/vite.config.ts",
          "**/*.cjs",
          "**/coverge/**",
          "**/dist/**",
          "**/mocks/**",
          "**/constants/**",
          "**/modules/**",
          "**/views/**",
        ],
      },
    },
  };
});
