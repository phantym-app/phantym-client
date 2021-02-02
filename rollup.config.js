import { terser } from 'rollup-plugin-terser';

export default {
  input: ['build/_dist_/main.js', 'build/_dist_/cast-receiver.js'],
  preserveEntrySignatures: false,

  plugins: [terser()],

  output: {
    dir: 'build/chunks',
    format: 'es',
    sourcemap: false,
  },
};
