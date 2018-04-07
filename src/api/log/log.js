/**
 * Created by sch on 2017/8/31.
 */

import { fetch } from '@/utils/network/fetch'
export default {
  doChgPwdInfo (log) {
    return fetch({
      url: 'userTrans.do?method=doChgPwdInfo',
      method: 'post',
      data: {log}
    })
  }
}
