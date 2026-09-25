import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    apiUrl:"http://localhost:8081",
    userEmail: "test2@test.fr",
    userPassword: "testtest",
  }
});
