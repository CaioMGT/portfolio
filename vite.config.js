/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
export default defineConfig(() => {
  return {
    root: "./dist",
    server: {
      port: 3000,
      open: "/",
    },
  };
});
