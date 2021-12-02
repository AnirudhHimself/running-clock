import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression";
import react from "@vitejs/plugin-react";
import path from "path/posix";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
  plugins: [react(), viteCompression()],
});
