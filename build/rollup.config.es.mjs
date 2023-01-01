import base, { banner } from './rollup.config.base.mjs'

const config = Object.assign({}, base, {
  output: {
    name: 'vuejsDatepicker',
    file: 'dist/vuejs-datepicker.esm.js',
    format: 'es',
    banner,
    globals: {
      vue: 'Vue'
    }
  },
  external: [
    'date-fns'
  ]
})

export default config
