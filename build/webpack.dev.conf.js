var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var GenerateAssetPlguin = require('generate-asset-webpack-plugin')
var HappyPack = require('happypack')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
var createInitConfig = function (compilation) {
  let cfgJson = {
    // 退出的url
    "logOutUrl": "https://22.188.13.173/cas/logout?service=https://22.188.13.172",
    // 服务器名称
    "serverRootName": "/ccms/",
    // 智能客服的URL
    "dialogue": "http://22.188.13.172/dialogue/index.html"
  }
  return JSON.stringify(cfgJson)
}
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new GenerateAssetPlguin({
      filename: 'static/ccmsconfig/initConfig.json',
      fn: (compilation, cb) => {
        cb(null, createInitConfig(compilation));
      },
      extraFiles: []
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new FriendlyErrorsPlugin(),
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'happyvue',
      loaders: ['vue-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    }),
    new HappyPack({
      id: 'happystyles',
      loaders: [ 'css-loader'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true
    })
  ]
})
