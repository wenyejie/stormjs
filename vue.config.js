module.exports = {
  runtimeCompiler: true,

  css: {
    modules: true,
    sourceMap: true
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
