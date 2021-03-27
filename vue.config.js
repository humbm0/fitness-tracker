module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/_variables.scss";
        `
      }
    }
  },

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  },
  devServer: {
    https: false
  }
};
