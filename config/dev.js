module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  h5: {
    esnextModules: ['taro-ui'],
    port: 8003,
    devServer: {
      disableHostCheck: true,
      host: 'localhost',
      https: true,
      open: true,  
      proxy: {
        '/api': {
          target: "https://login.16931.com/PROD",
          changeOrigin: true,
          pathRewrite: {
            '^/api/': '/'
          },
        }
      }
    },
  }
}
