// https://github.com/facebook/jest/issues/11444#issuecomment-855989054
const babelJestMd = require('babel-jest');
const babelJest = babelJestMd.__esModule ? babelJestMd.default : babelJestMd;

module.exports = babelJest.createTransformer({
  presets: ['babel-preset-gatsby'],
});
