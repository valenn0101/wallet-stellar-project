import { defineConfig } from "cypress";    

export default defineConfig({
  env: {
    baseUrl: 'http://localhost:5173',
  },

  e2e: {
    setupNodeEvents(on, config) {
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
