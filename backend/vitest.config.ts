import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    alias: {
      graphql: "graphql/index.js",
    },
    reporters: ["verbose"],
  },
});
