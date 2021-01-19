/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    src: { url: '/_dist_' },
    public: { url: '/', static: true, resolve: false },
    dev: { url: '/_dist_' },
  },
  plugins: ['snowpack-plugin-swc', '@snowpack/plugin-sass', '@prefresh/snowpack'],
  packageOptions: {
    installTypes: true,
  },
  buildOptions: {
    out: 'build',
    watch: false, // useful if using own backend instead of dev server
  },
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',

    '@assets/': './public/assets/',
    '@routes/': './src/routes/',
    '@store/': './src/store/',
    '@logic/': './src/logic/',
    '@components/': './src/components/',
  },
  routes: [{ match: 'routes', src: '.*', dest: '/index.html' }],
};
