module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    "^.+\\.css$": "<rootDir>/tests/config/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)": "<rootDir>/tests/config/fileTransform.js"
  },
  setupTestFrameworkScriptFile: "<rootDir>/client/src/setupTests.js",
  moduleFileExtensions: [
    'js',
    'jsx',
  ],
  modulePaths: [
    '<rootDir>/node_modules/',
    '<rootDir>/node_modules/jest-meteor-stubs/lib/',
  ],
  moduleNameMapper: {
    "meteor/(.*)": "<rootDir>/tests/mocks/$1.js",
    '^(.*):(.*)$': '$1_$2',
  },
  unmockedModulePathPatterns: [
    '/^imports\\/.*\\.jsx?$/',
    '/^node_modules/',
  ],
};