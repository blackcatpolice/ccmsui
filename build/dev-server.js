require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var URL = require('url')
var http = require('http')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')
var chokidar = require('chokidar')
var watcher = chokidar.watch(['../ccms-gnpl-vue/test/mock', '../ccms-gnpl-vue/src/views/pages/**/mock/*.js'])
var bodyParser = require('body-parser')
var responseFormat = require('../test/mock/mock')
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable
var proxyIp = config.dev.proxyIp

var app = express()
var apiRoute = express.Router()
// registerRoute(mockApi)
function diviStr(str, symbol) {
 return str.split(symbol)
}
// app.use(bodyParser.urlencoded({extend: false}))
// app.use('/mock',apiRoute)
app.post('/*',bodyParser.urlencoded({extend: false}), function (req, res) {
  let body = req.body.body
  let name = req.param('name')
  let href = URL.parse(req.url).href
  let href_arr = diviStr(href, '/')
    console.log('透传', href)
    // res.json({})
    let url_tar = proxyTable['/ccms'].target
    let arr
    if (name !== 'self') {
      arr = diviStr(proxyIp[name], ':')
    } else {
      arr = diviStr(url_tar, ':')
    }
    axios.post(`${arr.join(':')}${href}`,
      `body=${body}`,
      {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': req.headers.cookie || '',
        referer: `${arr[0]}:${arr[1]}`,
        host: `${arr[1].replace('//', '')}`,
        port:  `${arr[2].replace('/', '')}`
      },
    }).then(result => {
      res.setHeader('Set-Cookie', result.headers['set-cookie'] || '')
      // res.header['set-cookie'] = result.headers['set-cookie']
      res.json(result.data)
    }).catch(e => {
      console.log(e)
    })
})

//setTimeout(() => {
//  console.log('watcher.getWatched',watcher.getWatched())
//}, 2000)


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 1000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()


  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://ccms.com:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  console.log(autoOpenBrowser,process.env.NODE_ENV)
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})


var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
