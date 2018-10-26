const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  runtimeCompiler: true,

  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ],

  productionSourceMap: isDev,

  css: {
    modules: true,
    sourceMap: isDev,
    extract: false
  },

  lintOnSave: 'error',

  devServer: {
    port: 8888,
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
