// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    prodEnv: require('./prod.env'),
    t1Env: require('./prod.t1Env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false
  },
  dev: {
    env: require('./dev.env'),
    port: 8099,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyIp: {
      smm: 'http://22.189.32.109:8080',
      gls: 'http://22.189.32.96:8080'
    },
    proxyTable: {
      '/ccms_p703': {
        target: 'http://22.189.22.217:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/ccms_p703': '/ccms_p703'
        }
      },
      '/ccms_platform_web': {
        // target: 'http://22.189.22.217:8580/', // zsl
        // target: 'http://22.189.22.54:8080/', //lk
        target: 'http://22.189.32.135:8080',
        // target: 'http://22.189.22.62:8080/', //smm
        changeOrigin: true,
        pathRewrite: {
          '/ccms_platform_web': '/ccms_platform_web'
        }
      },
      // '/ccms': {
      //   target: 'http://ccms.com:8080/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //   '^/ccms': '/ccms'
      //   }
      // },
      '/ccms': {
          target: 'http://127.0.0.1:8801',
      //  target: 'http://22.189.22.111:8080/',
      //  target: 'http://22.189.32.115:6080/', // wxm
        //  target: 'http://22.189.22.78:8080/', // zsl
        // target: 'http://22.189.22.54:8080/', //lk
        // target: 'http://22.189.31.94:8080/', //smm
        // target: 'http://22.189.22.72:8088/', //smm
        // target: 'http://22.189.22.62:8080/', //clq
        // target: 'http://22.188.13.189:8080/', //gls
        // target: 'http://22.189.22.230:8080/', //zlf
        //zlf http://22.189.22.230:8080/
        //zsl http://22.189.22.217:8080/
        //lk http://22.189.22.54:8080/
        //smm 'http://22.189.22.72:8080/',
        // target: 'http://22.189.22.217:8080/',
        // target: 'http://22.188.13.189:8080/',
        // target: 'http://22.189.22.72:8080/',
        // target: 'http://22.189.22.230:8080/',
        // target: 'http://22.189.22.62:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/ccms': '/ccms'
        }
      },
      // '/ccms': {
      //   target: 'http://ccms.com:8080/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/ccms': '/ccms'
      //   }
      // },
      // '/ccms': {
      //   //zsl http://22.189.22.217:8080/
      //   //lk http://22.189.22.54:8080/
      //   //smm 'http://22.189.22.72:8080/',
      //   target: 'http://22.189.22.217:8080/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/ccms': '/ccms'
      //   }
      // },
      '/cas': {
        //zsl http://22.189.22.217:8080/
        target: 'http://22.188.192.207:9081/',
        changeOrigin: true,
        pathRewrite: {
          '^/cas': '/cas'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
