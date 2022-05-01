import * as path from "path";

import { defineConfig } from "vite";
import reactJsx from "vite-react-jsx";

import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactJsx()],
  resolve: {
    alias: {
      '~' : path.resolve(__dirname, './src'),
      '~type': path.resolve(__dirname, './types')
    }
  },
  build: {
    outDir: 'build'
  }
});
