import path from 'path'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import common from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'

export default {
  input: path.join(__dirname, '..', 'example', 'main.js'),
  output: {
    file: path.join(__dirname, '..', 'example', 'demo.js'),
    format: 'iife',
    name: 'demo',
    sourcemap: true,
    external: [
      'moment'
    ]
  },
  plugins: [
    common(),
    vue({
      css: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve({
      mainFields: ['module', 'jsnext', 'browser']
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.es6', '.es', '.mjs', '.vue']
    }),
    serve({
      contentBase: path.join(__dirname, '..', 'example'),
      host: 'localhost',
      port: 10001
    }),
    livereload({
      verbose: true,
      watch: path.join(__dirname, '..', 'example')
    })
  ]
}
