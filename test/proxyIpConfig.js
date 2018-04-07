/**
 * Created by sch on 2018/3/5.
 */
import * as loginApiMock from './mock/login/loginApiMock'
const smm = 'smm'
const gw = 'smm'
const gls = 'smm'
/*
 gnplLoginTrans.do?method=login 访问后台的api
 name config/index/dev/proxyIp 中name 对应的后台服务器的ip
 mock true 代表使用mock数据 【注意: func没写 mock无效】
 func mock为true的时候 返回mock数据
 * */
export const proxyIpMap = {
  'gnplLoginTrans.do?method=getLoginSessionSysUserEntity': { name: smm, mock: true, func: loginApiMock.getLoginSessionSysUserEntity },
  'gnplLoginTrans.do?method=login': { name: gw, mock: true, func: loginApiMock.login },
  'roleTrans.do?method=getMenuListByUserId': {name: gls, mock: true, func: loginApiMock.getMenu}
}
