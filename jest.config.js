module.exports = {
    "moduleNameMapper": {
        "\\.(css|less)$": "identity-obj-proxy",
        "\\.(svg)$": "<rootDir>/__mocks__/svg-transformer.js"
    },
    "setupFiles": [
        "<rootDir>/__mocks__/test-setup.js"
    ],
    "testEnvironment": "jest-environment-jsdom-global",
    "coverageReporters": [
        "lcov",
        "cobertura",
        "text-summary"
    ],
    "roots": [
        "src",
        "server"
    ],
    "testRegex": "(/__tests__/.*\\.(test|spec))\\.jsx?$",
    "collectCoverageFrom": [
        "src/**/*.{js,jsx}",
        "!src/index.js",
        "!node_modules/**",
        "!dist/**",
        "!**/__tests__/**"
    ],
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(svg)$": "<rootDir>/__mocks__/svg-transformer.js",
        "^.+\\.(png)$": "<rootDir>/__mocks__/media-file-transformer.js"
    }
};