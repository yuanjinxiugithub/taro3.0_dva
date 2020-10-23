const isH5 = process.env.CLIENT_ENV === 'h5'
const HOST = '"https://login.16931.com/PROD"'

module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {},
  defineConstants: {
    HOST: isH5 ? '"/api"' : HOST,
  },
  h5: {
    esnextModules: ['taro-ui'],
    devServer: {
      proxy: {
        '/api/': {
          target: JSON.parse(HOST),
          pathRewrite: {
            '^/api/': '/'
          },
          changeOrigin: true
        },
      }
    },
  }
}
