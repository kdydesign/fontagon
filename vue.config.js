const path = require('path')
const webpack = require('webpack')
const { red, green } = require('chalk')
const { name, version } = require('./package.json')

console.log(`💪 Start ${green(name)} ${red(`v${version}`)}...\n\n`)

module.exports = {
  devServer: {
    port: 9900
  },
  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./test/fixture/main.js')
      .end()

    config.resolve.alias
      .set('@', path.join(__dirname, './test/fixture'))
      .set('vue-data-table', path.join(__dirname, './dist/'))
  },
  configureWebpack: (config) => {
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        _: true
      })
    ]
  }
}
