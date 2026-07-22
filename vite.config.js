import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,

    setupFiles: "./src/setupTests.js",

    coverage: {
      provider: "v8",

      reporter: ["text", "json", "html", "lcov"],

      reportsDirectory: "./coverage",

      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },

      exclude: [
        "node_modules/",
        "src/setupTests.js",
        "**/*.test.{js,jsx}",
        "**/*.spec.{js,jsx}",
        "**/main.{js,jsx}",
      ],
    },
  },
});
