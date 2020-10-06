const path = require('path')

module.export = {
  mode: 'development',
  emtry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publickPath: ''
  },
  devtool: 'cheap-module-eval-source-map'
}
