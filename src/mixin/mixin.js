/**
 * Created by Administrator on 2017/7/18.
 */
import Tips from '@/utils/tipsUtil'
import Tool from '@/utils/toolUtil'
import Base64 from 'base-64'
export default {
  methods: {
    // 添加跳转路由
    pushUrl (url, parm, query) {
      if (parm) {
        if (query) {
          this.$router.push(url + this.encodeParm(parm) + '?' + query)
        } else {
          this.$router.push(url + this.encodeParm(parm))
        }
        return
      }
      if (query) {
        this.$router.push(url + '?' + query)
      } else {
        this.$router.push(url)
      }
    },
    pushQuery (url, queryObj) {
      let workObj
      if (typeof url === 'object') {
        workObj = Object.assign({}, url)
      } else {
        workObj = {'path': url}
      }
      if (queryObj) {
        if (typeof queryObj === 'object') {
          Object.assign(workObj, {query: this.encodeObjPro(queryObj)})
        }
      }
      this.$router.push(workObj)
    },
    /**
     * 加密对象的每个属性 中文忽略
     * @param obj 要加密的对象
     * @returns {*} 返回加密后的对象的每个属性
     */
    encodeObjPro (obj) {
      let workObj = obj
      for (let key in workObj) {
        if (/[^\0-\xFF]/.test(workObj[key])) continue
        workObj[key] = this.encodeParm(workObj[key])
      }
      return workObj
    },
    /**
     * 解密对象的每个属性 中文忽略
     * @param obj 要解密的对象
     * @returns {*} 返回解密对象的每个属性
     */
    decodeObjPro (obj) {
      let workObj = obj
      for (let key in workObj) {
        if (/[^\0-\xFF]/.test(workObj[key])) continue
        workObj[key] = this.decodeParm(workObj[key])
      }
      return workObj
    },
    // 获取参数并解密
    getParmById (parmId) {
      let id = this.$route.params[parmId]
      if (id) {
        return this.decodeParm(id)
      }
      return ''
    },
    // 解密query传参数的方式
    getQueyById (parmId, isdecode = true) {
      let id = this.$route.query[parmId]
      if (id) {
        if (isdecode) {
          return this.decodeParm(id)
        }
        return id
      }
      return ''
    },
    // 编码字符串
    encodeParm (parm) {
      return Base64.encode(parm)
    },
    // 解码字符串
    decodeParm (parm) {
      try {
        return Base64.decode(parm)
      } catch (e) {
        return parm
      }
    },
    showAlert (obj) {
      if (obj.status === '0') {
        Tips.error(obj.msg)
      } else if (obj.status === '1') {
        Tips.success(obj.msg)
        return true
      }
    },
    showNotifyAlert (obj) {
      if (obj.status === '0') {
        Tips.notifyError(obj.msg)
      } else if (obj.status === '1') {
        Tips.notifySuccess(obj.msg)
        return true
      }
    },
    /**
     * @param msg 要提示的信息
     * @param showConfirmButton 是否显示确认按钮
     * @param showCancelButton 是否显示取消按钮
     * @param comFrimCb 点击确定的回调
     * @param cancelCb 点击取消的回调
     */
    showComfrimIcon ({msg = '', customClass = 'cus', beforeClose = function () {}, showConfirmButton = true, showCancelButton = true, comFrimCb = function () {}, cancelCb = function () {}} = {}) {
      this.$confirm(msg, Tool.jsonProI18n('common.dialog_tt'), {
        confirmButtonText: Tool.jsonProI18n('common.comfrim'),
        cancelButtonText: Tool.jsonProI18n('common.cancel'),
        showConfirmButton: showConfirmButton,
        customClass: customClass,
        showCancelButton: showCancelButton,
        beforeClose: function (action, instance, done) {
          beforeClose()
          done()
        },
        type: 'warning'
      }).then(() => {
        comFrimCb()
      }).catch(() => {
        cancelCb()
      })
    },
  //  trim 对象的字段
    trimObjProperty (obj) {
      let tarObj = Object.assign({}, obj)
      for (let key in tarObj) {
        if (typeof tarObj[key] === 'string') {
          tarObj[key] = tarObj[key].trim()
        }
      }
      return tarObj
    }
  }
}
