module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa', // lighthouse:recommended
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': 'error',

        // prone to false-positives
        'unused-javascript': ['warn', { minScore: 0.6, maxLength: 10 }],
        'unminified-javascript': 'warn',
        'unused-css-rules': 'warn',
        'unminified-css': 'warn',
        'errors-in-console': 'warn',

        // not needed
        'no-unload-listeners': 'off',
        'unsized-images': 'off',

        // just stupid
        'valid-source-maps': 'off',
        'redirects-http': 'off',
        'is-on-https': 'off',

        // doesnt work
        'uses-rel-preconnect': 'off',
      },
    },
  },
};
