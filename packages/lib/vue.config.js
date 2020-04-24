const path = require('path')
const webpack = require('webpack')
const { red, green } = require('chalk')
const { name, version } = require('./packages/lib/package.json')

console.log(`💪 Start ${green(name)} ${red(`v${version}`)}...\n`)

module.exports = {
  devServer: {
    port: 8080
  },
  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./test/fixture/main.js')
      .end()

    config.resolve.alias
      .set('@', path.join(__dirname, './test/fixture'))
      .set('fontagon-icons', path.join(__dirname, './dist/fontagon-icons.css'))
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
