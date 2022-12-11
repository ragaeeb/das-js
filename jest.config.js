// https://stackoverflow.com/questions/56261381/how-do-i-set-a-timezone-in-my-jest-config
process.env.TZ = 'UTC';

/**
 * https://www.gatsbyjs.org/docs/unit-testing/
 */
module.exports = {
  transform: {
    '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
  }
};
