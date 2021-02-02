// NODE_ENV=test - Needed by "@snowpack/web-test-runner-plugin"
process.env.NODE_ENV = 'test';
const { chromeLauncher } = require('@web/test-runner-chrome');

module.exports = {
  nodeResolve: true,
  browsers: [chromeLauncher()],
  plugins: [require('@snowpack/web-test-runner-plugin')()],
};
