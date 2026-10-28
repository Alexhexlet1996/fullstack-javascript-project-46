import { defineConfig, coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      thresholds: {
        global: {
          functions: 100,
          lines: 80,
        },
      },
      exclude: [
        ...coverageConfigDefaults.exclude,
        "**/__fixtures__/**",
        "bin/genDiff.ts",
      ],
    },
  },
});
