const Dotenv = require('dotenv-webpack');

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv({
        path: './.env',
        systemvars: true,
        silent: true,
      }),
    ],
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/scss/main.scss";`
      }
    }
  },
  devServer: {
    clientLogLevel: 'info',
    watchOptions: {
        poll: true
    }
}
};
