/**
 * Created by woyawei on 16/11/18.
 */
// const time = /^([0-1]\d|2[0-3]):[0-5]\d$/
// const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
// const phone = /^((\(\d{3}\))|(\d{3}\/-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/
const phone = /^\d{11,15}$/
const mobile = /^((\(\d{3}\))|(\d{3}\/-))?1[3,5,8]\d{9}$/
const orgNum = /^[9]{1}([0-9]){4}$/
// const url = /^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/
// const idcard = /^\d{15}(\d{2}[A-Za-z0-9])?$/
// const currency = /^\d+(\.\d+)?$/
const number = /^\d+$/
// const zip = /^[1-9]\d{5}$/
// const qq = /^[1-9]\d{4,8}$/
// const integer = /^[-\+]?\d+$/
// const double = /^[-\+]?\d+(\.\d+)?$/
// const english = /^[A-Za-z]+$/
// const unSafe = /^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/
// const cntno = /^[a-zA-Z0-9\-]*$/// add by shenbo, 合同编号由数字、大小写字母或'-'组成，与位置无关,可以为空
import Tool from '@/utils/tool'
export default {
  // 验证字符长度
  checkLen (maxlen, msg) {
    return (rule, value, callback) => {
      let len = 0
      if (value && value.length === 0) {
        callback()
      } else {
        len = value.length
        for (let i = 0; i < value.length; i++) {
          let u = value.charCodeAt(i)
          if ((u > 0) && (u < 128)) {
            continue
          } else {
            len = len + 2
          }
        }
      }
      if (len > maxlen) {
        callback(new Error(msg))
      } else {
        callback()
      }
    }
  },
  // 机构号开头9及长度验证
  orgCheck (maxlen, msg) {
    return (rule, value, callback) => {
      if (!orgNum.test(value)) {
        callback(new Error(msg))
      } else {
        callback()
        return true
      }
    }
  },
  // 验证手机
  checkMobile (tipMsg) {
    return (rule, value, callback) => {
      if (!mobile.test(value)) {
        callback(new Error(tipMsg))
      } else {
        callback()
      }
    }
  },
  // 验证电话
  checkPhone (tipMsg) {
    return (rule, value, callback) => {
      if (!phone.test(value)) {
        callback(new Error(tipMsg))
      } else {
        callback()
      }
    }
  },
  // 数字
  validateNum (tipMsg) {
    return (rule, value, callback) => {
      if (number.test(value)) {
        callback()
      } else {
        callback(new Error(tipMsg))
      }
    }
  },
  // 字母数字
  validate0Aa (tipMsg) {
    const reg = /^[0-9A-Za-z]*$/
    return (rule, value, callback) => {
      if (!reg.test(value)) {
        callback(new Error(tipMsg))
      } else {
        callback()
      }
    }
  },
  /**
   * 特殊字符校验
   * @param str 输入的字符串
   * @param sys 默认系统级别
   * @return true 含有特殊字符
   */
  specialChar (sys = true) {
    return (rule, value, callback) => {
      if (sys) {
        if (/["{}[\]'^$\\`:;!@?#%&*<>：；，。、！·￥……◎#%…※×——？‘’“”]/.test(value)) {
          return callback(new Error(Tool.jsonProI18n('common.specialChart')))
        }
        return callback()
      } else {
        if (/\^/.test(value)) {
          return callback(new Error(Tool.jsonProI18n('common.specialChart')))
        }
        return callback()
      }
    }
  },
  /**
   * 特殊字符校验
   * @param str 输入的字符串
   * @param sys 默认系统级别
   * @return true 含有特殊字符(不包括中文下的各种符号)
   */
  messChar (sys = true) {
    return (rule, value, callback) => {
      if (sys) {
        if (/["[\]'^$\\`:;!@#%&*<>·￥……◎#%…※×——]/.test(value)) {
          return callback(new Error(Tool.jsonProI18n('common.specialChart')))
        }
        return callback()
      } else {
        if (/\^/.test(value)) {
          return callback(new Error(Tool.jsonProI18n('common.specialChart')))
        }
        return callback()
      }
    }
  },
//  验证是否含有中文
  isCH () {
    return (rule, value, callback) => {
      if (/([\u0391-\uFFE5])/ig.test(value)) {
        callback(this.$t('system.mui.adduser.virNotCh'))
        return true
      }
      return false
    }
  },
  // 验证必须含有字母
  isIncludeAlphabet () {
    return (rule, value, callback) => {
      if (!/^(?![^a-zA-Z]+$)/.test(value)) {
        callback(this.$t('system.mui.adduser.virIncludeAbc'))
        return false
      }
      return true
    }
  }
}

/* 是否是公司邮箱 */
export function isWscnEmail (str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@boc\.com$/i
  return reg.test(str.trim())
}

/* 合法uri */
export function validateURL (textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 验证key */
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母 */
export function validateUpperCase (str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets (str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
