import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-copy-plugin';
import sourcemaps from 'rollup-plugin-sourcemaps';
import less from 'rollup-plugin-less';
import path from 'path';

const buildPath = path.resolve('../server/public');

export default {
  input: 'src/js/index.js',
  output: {
    file: path.join(buildPath, 'main.min.js'),
    sourceMap: true,
    format: 'cjs',
  },
  plugins: [
    sourcemaps(),
    babel({
      exclude: ['node_modules/**', '**/*.less']
    }),
    resolve({
      // use "jsnext:main" if possible
      // – see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true,

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,

      // by default, built-in modules such as `fs` and `path` are
      // treated as external if a local module with the same name
      // can't be found. If you really want to turn off this
      // behaviour for some reason, use `builtins: false`
      builtins: false,

      // some package.json files have a `browser` field which
      // specifies alternative files to load for people bundling
      // for the browser. If that's you, use this option, otherwise
      // pkg.browser will be ignored
      browser: true
    }),
    commonjs(),
    copy({
      'src/index.html': path.join(buildPath, 'index.html'),
    }),
    less({
      output: path.join(buildPath, 'styles.css')
    })
  ],
};