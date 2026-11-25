import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node22",
  // shared paketi TS manba sifatida keladi, shuning uchun bundle ichiga olinadi
  noExternal: ["@toshbekov/shared"],
});
