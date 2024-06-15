import { defineConfig } from "tsup";

// biome-ignore lint/style/noDefaultExport: Allow default export for config.
export default defineConfig({
	entry: ["src/index.ts"],
	clean: true,
	outDir: "dist",
	format: ["cjs", "esm"],
	minify: true,
	dts: true,
});
