const Webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  runtimeCompiler: true,

  configureWebpack: {
    plugins: [
      new Webpack.ProvidePlugin({
        'window.Quill': 'quill/dist/quill.js',
        'Quill': 'quill/dist/quill.js'
      })
    ]
  },

  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],

  productionSourceMap: isDev,

  css: {

    // css
    modules: false,
    sourceMap: isDev,
    extract: false
  },

  lintOnSave: 'error',

  devServer: {
    port: 8889,
    proxy: {
      '/api': {
        target: 'http://test.zhiqicloud.com:8770/',
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}
