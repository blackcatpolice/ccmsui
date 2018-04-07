/**
 * Created by sch on 2018/3/8.
 */
export default {
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
  // 深克隆一个对象
  cloneObject (obj) {
    let o = {}
    for (let key in obj) {
      o[key] = obj[key]
    }
    return o
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
  }
}
