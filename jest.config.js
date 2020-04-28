module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node", "d.ts"],
  globals: {
    "ts-jest": {
      babelConfig: true
    }
  },
  transform: {
    "\\.js$": ["babel-jest"]
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/build"
  ],
};
