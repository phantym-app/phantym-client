/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    src: '/_dist_',
    public: { url: '/', static: true, resolve: false },
  },
  routes: [
    { src: '/cast', dest: '/cast.html' },
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],

  buildOptions: { out: 'build' },
  optimize: { target: 'es2017' },

  alias: {
    '@assets': './public/assets',
    '@routes': './src/routes',
    '@store': './src/store',
    '@logic': './src/logic',
    '@components': './src/components',
  },

  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    'snowpack-plugin-swc',
    '@snowpack/plugin-sass',
    '@prefresh/snowpack',
  ],
};
