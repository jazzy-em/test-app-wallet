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
        "cobertura"
    ],
    "roots": [
        "src",
        "server"
    ],
    "testRegex": "(/__tests__/.*\\.(test|spec))\\.jsx?$",
    "collectCoverageFrom": [
        "server/**",
        "src/**/*.{js,jsx}",
        "!src/index.js",
        "!node_modules/**",
        "!dist/**",
        "!**/__tests__/**"
    ],
    "unmockedModulePathPatterns": [
        "react",
        "react-dom",
        "react-redux",
        "react-addons-test-utils",
        "fbjs",
        "enzyme",
        "cheerio",
        "htmlparser2",
        "underscore",
        "lodash",
        "domhandler",
        "object.assign",
        "define-properties",
        "function-bind",
        "object-keys"
    ],
    "transform": {
        "^.+\\.js$": "babel-jest",
        "^.+\\.(svg)$": "<rootDir>/__mocks__/svg-transformer.js",
        "^.+\\.(png)$": "<rootDir>/__mocks__/media-file-transformer.js"
    }
};