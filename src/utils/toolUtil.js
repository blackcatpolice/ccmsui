/**
 * Created by sch on 2017/8/15.
 * 一般性的工具
 */
import { fetchConfig } from '@/utils/network/fetch'
export default {
  /**
   * 去掉字符串中所有的空格
   * @param str
   */
  trimAll (str) {
    return str.replace(/\s/g, '')
  },
  // 将一维数组转化为二维数组
  turnArrToMoreArr (arr, d) {
    let arr1 = []
    let arr2 = []
    for (let i = 0; i < arr.length; i++) {
      arr1.push(arr[i])
      if ((i + 1) % d === 0 || (i + 1) === arr.length) {
        arr2.push(arr1)
        arr1 = []
      }
    }
    return arr2
  },
  /**
   * 获取嵌套的对象
   * @param obj 目标对象 {a:b{c:1}}
   * @param pro 目标属性 'a.b.c'
   * @return {*}
   */
  getInlineProFromObj (obj, pro) {
    let workObj = obj
    let proArr = pro.split('.')
    proArr.map(item => {
      workObj = workObj[item]
    })
    return workObj
  },
  jsonProI18n (str) {
    return window.$vue.$t(str)
  },
  /*
  *国际化字段转换
  * sourcePro 对象的原属性
  * tarPro 对象的目标属性
  * obj 传入的对象 */
  turnValue (sourcePro, tarPro, obj) {
    if (window.$vue.$store.getters.localMsg === 'en_US') {
      obj[sourcePro] = obj[tarPro]
    }
  },
  /**
   * 将对象复制到目标对象上 (目标对象已有的属性)
   */
  copyObjToTar (tarObj, sourObj) {
    for (let key in tarObj) {
      if (sourObj[key] !== undefined) {
        tarObj[key] = sourObj[key]
      }
    }
  },
  /**
   * 数组复制
   */
  copyArr (arr) {
    let workArr = []
    for (let i = 0; i < arr.length; i++) {
      workArr[i] = arr[i]
    }
    return arr
  },
  /**
   * 将字符串转为unicode
   * @param str
   * @return {string}
   */
  strToUnicode (str) {
    let arr = []
    for (let i = 0; i < str.length; i++) {
      // 判断是两个字节还是4个字节
      if (str[i].codePointAt(0) > 0xFFFF) {
        arr.push('0x' + str[i].codePointAt(0).toString(16), '0x' + str[i].codePointAt(1).toString(16))
      } else {
        arr.push('0x' + str[i].codePointAt(0).toString(16))
      }
    }
    return arr.join(',')
  },
  unicodeToStr (str) {
    if (!str) return
    let arr = str.split(',')
    let outArr = []
    for (let i = 0; i < arr.length; i++) {
      outArr.push(String.fromCharCode(arr[i]))
    }
    return outArr.join('')
  },
  // 读取前端配置文件
  fetchConfigAjax ({url = '', data = {}, method = 'get'}) {
    return fetchConfig({url, data, method})
  },
  // 将map转换为arr对象 {1:'1231',2: '23123} => [{label: '123', value:'1'},{label:23123, value: '2'}]
  mapTurnArr (jsonMap) {
    let arr = []
    for (let key in jsonMap) {
      arr.push({label: jsonMap[key], value: key})
    }
    return arr
  },
  // 将一级对象转为数组{a: {a: 1}, b: {b: 1}} => [{a:1}, {b:1}]
  objectToArray (obj) {
    let arr = []
    for (let key in obj) {
      arr.push(obj[key])
    }
    return arr
  }
}
