import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: Allow default export for config.
export default defineConfig({
	esbuild: {
		target: "es2022",
	},
});
