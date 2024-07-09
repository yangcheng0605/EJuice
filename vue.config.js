const { defineConfig } = require("@vue/cli-service");
const CompressionPlugin = require('compression-webpack-plugin');
 
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "./",
  outputDir: "build",
  productionSourceMap: false,
  devServer: {
    hot: true
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // 在这里添加自定义的Less配置
        },
      },
    },
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境开启Gzip压缩
      return {
        plugins: [
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8,
          }),
        ],
      };
    }
  },
});
