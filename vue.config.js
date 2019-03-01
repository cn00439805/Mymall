const path = require('path')
const projConfig = require('./projConfig')

//console.log(projConfig.outputDir,process.env.NODE_ENV,process.env.VUE_APP_URL)

const resolve = (dir) => path.join(__dirname, dir);
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

let BundleAnalyzerPlugin
if (process.env.IS_ANALYZ) {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
}

let CompressionWebpackPlugin,productionGzipExtensions
if(IS_PROD){
  CompressionWebpackPlugin = require('compression-webpack-plugin');
  productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
}

module.exports = {
  publicPath:"./",
  outputDir:projConfig.outputDir[process.env.NODE_ENV],
  lintOnSave:false,
  devServer: {
    open: IS_PROD,
    disableHostCheck:true,
    host: '192.168.0.100',
    port: 8086,
    hot: true,
  },
  configureWebpack: config => {
    if (IS_PROD) {
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    return {
      externals: {
          'jquery' : 'jQuery',
          'axios':'axios' ,
      }
    }
  },
  chainWebpack: config => {
    //移除预加载
    config.plugins.delete('prefetch')
    // 添加别名
    config.resolve.alias
     .set('@', resolve('src'))
     .set('assets', resolve('src/assets'))
     .set('components', resolve('src/components'))

    if (process.env.IS_ANALYZ) {
      config
        .plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
        }])
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/styles/index.scss";
        `
      }
    }
  },
}