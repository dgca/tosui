import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import preserveDirectives from "rollup-preserve-directives";
import bundleCss from "vite-plugin-bundle-css";
import { resolve } from "path";
import { copyFileSync } from "fs";

// Custom plugin to copy fonts.css to dist (since it's excluded from bundling)
function copyFontsPlugin(): Plugin {
  return {
    name: "copy-fonts",
    writeBundle() {
      copyFileSync(
        resolve(__dirname, "src/styles/fonts.css"),
        resolve(__dirname, "dist/fonts.css")
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
      outDir: "dist",
      insertTypesEntry: true,
    }),
    // Preserve "use client" directives in output files
    preserveDirectives() as Plugin,
    // Bundle all CSS into a single file (excluding fonts.css which is separate)
    bundleCss({
      name: "index.css",
      fileName: "index.css",
      mode: "inline",
      exclude: ["**/fonts.css"],
    }),
    // Copy fonts.css separately
    copyFontsPlugin(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "clsx"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
    sourcemap: true,
    emptyOutDir: true,
    cssCodeSplit: true,
    // Don't minify so we can inspect the output; also terser might strip directives
    minify: false,
  },
});
