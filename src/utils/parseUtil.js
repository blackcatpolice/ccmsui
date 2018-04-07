/**
 * Created by sch on 2018/3/12.
 */
export default {
  /**
   * 判断是不是对象 如果不是返回一个空对象
   * @param objName 对象的名称
   * @returns {*} 是Object 返回Object 否则 返回{}
   * @constructor
   */
  NotObjReturnEmptyObj (obj) {
    if (typeof obj === 'object' && Object.prototype.toString.call(obj) !== '[object Null]') {
      return obj
    } else {
      console.error('is not object')
      return {}
    }
  },
  /**
   * 判断是不是数组 不是返回空数组
   * @param arr 源数组
   * @returns {*} 是Array 返回Array 否则返回[]
   * @constructor
   */
  NotArrayReturnEmptyArray (arr) {
    if (Array.isArray(arr)) {
      return arr
    } else {
      console.error('is not Array')
      return []
    }
  },
  /**
   *
   * @param str
   * @return {*}
   * @constructor
   */
  NotStringReturnEmptyString (str) {
    if (Object.prototype.toString.call(str) !== '[object String]') {
      return ''
    }
    return str
  },
  /**
   * 判断对象是否包含某些属性
   * @param obj 要判断的对象
   * @param proArr 判断对象是否包含这个数组里的所有属性
   * @returns {*|boolean} 返回true false
   * @constructor
   */
  ObjectNotTargetProThenAdd (obj, proArr) {
    let workObj = this.NotObjReturnEmptyObj(obj)
    let workProArr = this.NotArrayReturnEmptyArray(proArr)
    workProArr.forEach(item => {
      if (workObj[item] === undefined) {
        console.error('object has not property ' + item)
        workObj[item] = ''
      }
    })
    return workObj
  },
  /**
   * 判断数组中的对象是否包含某些属性[{}]
   * @param arr 需要验证的数组对象
   * @param proArr 需要验证是否包含的字段
   * @returns {*}
   * @constructor
   */
  ArrayInEveryObjNotTargetProThenAdd (arr, proArr) {
    let workArr = this.NotArrayReturnEmptyArray(arr)
    let workProArr = this.NotArrayReturnEmptyArray(proArr)
    workArr.forEach((item) => {
      this.ObjectNotTargetProThenAdd(item, workProArr)
    })
    return workArr
  }
}
