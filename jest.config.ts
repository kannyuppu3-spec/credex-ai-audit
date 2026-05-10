import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFiles: ["dotenv/config"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },

  setupFilesAfterEnv: [
    "<rootDir>/jest.setup.js",
  ],
};

export default createJestConfig(
  customJestConfig
);