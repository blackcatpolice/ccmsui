/**
 * Created by sch on 2017/6/6.
 */
import { Message, Notification, MessageBox } from 'element-ui'
import Tool from '@/utils/toolUtil'
// import $ from '../../node_modules/jquery/dist/jquery'
export default {
  // 通知
  notifyWarning (msg) {
    Notification({
      title: '警告',
      type: 'warning',
      message: msg
    })
  },
  notifyError (msg) {
    Notification({
      title: '错误',
      customClass: 'notify-custom',
      duration: 0,
      type: 'error',
      message: msg
    })
  },
  notifySuccess (msg) {
    Notification({
      title: '错误',
      type: 'success',
      message: msg
    })
  },
  warning (msg) {
    Message.warning({
      message: msg
    })
  },
  success (msg) {
    Message.success({
      message: msg
    })
  },
  error (msg) {
    Message.error({
      message: msg
    })
  },
  info (msg) {
    Message.info({
      message: msg
    })
  },
  MessageBoxConfirmJson ({msg = '', beforeClose = function () {}, comFrimCb = function () {}, cancelCb = function () {}, customClass = 'cus', type = 'warning', title = Tool.jsonProI18n('common.dialog_tt'), showCancelButton = false, showConfirmButton = true} = {}) {
    MessageBox.confirm(msg, title, {
      confirmButtonText: Tool.jsonProI18n('common.comfrim'),
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      customClass: customClass + ' MessageBoxConfirm',
      beforeClose: function (action, instance, done) {
        beforeClose()
        done()
      },
      type: type
    }).then(() => {
      comFrimCb()
    }).catch(() => {
      cancelCb()
    })
  }
}
