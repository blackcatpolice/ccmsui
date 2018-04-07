/**
 * Created by sch on 2017/12/19.
 */
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  ENV_CONFIG: 't1'
})
