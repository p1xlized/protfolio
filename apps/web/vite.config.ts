import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      // Use '#' to match your new base tsconfig paths
      '@': path.resolve(__dirname, './src'),
      '@portfolio/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },

  server: {
    fs: {
      allow: ['../..'], // Allow Vite to "climb" out to your packages
    },
  },
  plugins: [
    // 1. Path resolution first
    viteTsConfigPaths({ projects: ["./tsconfig.json"] }),
    // 2. Styling
    tailwindcss(),
    // 3. Framework (TanStack Start handles Nitro internally)
    tanstackStart(),
    // 4. React transformation
    viteReact(),
  ],
   envDir: '../../',
});
