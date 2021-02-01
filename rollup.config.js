import { terser } from 'rollup-plugin-terser';

export default {
  input: ['build/_dist_/index.js', 'build/_dist_/index-cast-receiver.js'],
  preserveEntrySignatures: false,

  plugins: [terser()],

  output: {
    dir: 'build/chunks',
    format: 'es',
    sourcemap: false,
  },
};
