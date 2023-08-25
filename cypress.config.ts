import { defineConfig } from "cypress";    

export default defineConfig({
  env: {
    baseUrl: 'http://localhost:5173', // Cambia el puerto si es necesario
    PROJECT_URL: 'http://localhost:5173',
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implementa aquí los event listeners de node
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
