/** @type {import("snowpack").SnowpackUserConfig } */

module.exports = {
  mount: {
    src: '/_dist_',
    public: { url: '/', static: true, resolve: false },
    'dev/mods': '/_dist_',
  },

  routes: [
    { src: '/cast', dest: '/cast-receiver.html' },
    { match: 'routes', src: '.*', dest: '/index.html' },
  ],

  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv',
    'snowpack-plugin-swc',
    '@snowpack/plugin-sass',
    '@prefresh/snowpack',
  ],

  buildOptions: { out: 'build' },
  // packageOptions: { types: true, source: "remote" },

  alias: {
    react: 'preact/compat',
    'react-dom': 'preact/compat',

    '@assets/': './public/assets/',
    '@routes/': './src/routes/',
    '@store/': './src/store/',
    '@logic/': './src/logic/',
    '@components/': './src/components/',
  },
};
