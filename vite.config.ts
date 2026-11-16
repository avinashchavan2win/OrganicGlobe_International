import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

import { formatOverridesPlugin } from "./export-plugins/format-overrides-plugin.ts";
import { contentPlugin } from "./export-plugins/content-plugin/index.ts";

export default defineConfig({
  // Since your custom domain points directly to the root, base must be '/'
  base: "/",
  
  envPrefix: ["VITE_", "SITE_"],
  
  plugins: [
    react(),
    formatOverridesPlugin(__dirname),
    contentPlugin()
  ],
  
  resolve: {
    dedupe: ["react", "react-dom", "react-router"],
    alias: {
      nothing: "/src/fallbacks/missingModule.ts",
      "@": path.resolve(__dirname, "./src")
    }
  },
  
  optimizeDeps: {
    include: ["react", "react-dom", "react-router", "motion/react"]
  },
  
  server: {
    host: process.env.HOST || "0.0.0.0",
    port: parseInt(process.env.PORT || "5173"),
    strictPort: !!process.env.PORT,
    hmr: {
      overlay: false
    }
  },
  
  build: {
    outDir: "dist",
    emptyOutDir: true,
    copyPublicDir: true,
    rollupOptions: {
      output: {
        manualChunks: {

          "radix-ui": [
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-aspect-ratio",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-collapsible",
            "@radix-ui/react-context-menu",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-menubar",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-progress",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-select",
            "@radix-ui/react-separator",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
            "@radix-ui/react-switch",
            "@radix-ui/react-tabs",
            "@radix-ui/react-toast",
            "@radix-ui/react-toggle",
            "@radix-ui/react-toggle-group",
            "@radix-ui/react-tooltip"
          ],
          query: ["@tanstack/react-query"]
        }
      }
    }
  }
});