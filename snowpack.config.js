/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/_dist_' },
    public: { url: '/', static: true, resolve: false },
  },
  plugins: [
    '@snowpack/plugin-typescript',
    '@snowpack/plugin-sass',
    '@prefresh/snowpack',
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    installTypes: true,
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',
    '@assets/': './public/assets/',
  },
};
