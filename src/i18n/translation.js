/**
 * Created by Administrator on 2017/7/27.
 */
const context = require.context('../i18n/local', true, /((?!\/)[\s\S])+\.json$/)
let zh = {}
let en = {}
let i18n = {}
context.keys().map(key => {
  if (key.replace('./', '').split('/')[0] === 'en') {
    i18n = en
  } else if (key.replace('./', '').split('/')[0] === 'zh-CN') {
    i18n = zh
  }
  mergeObj(pathToInlinObj(key, context(key)), i18n)
})
console.log(en, zh)
// localStorage.setItem('zh', JSON.stringify(zh))
// localStorage.setItem('en', JSON.stringify(en))
export default {en, zh}
/**
*@author:sch11450
*time:18:24-2017/7/27
*disc: str /a/b/c 文件字符串
 * 将字符串路径转为对象
 * return a:{b:{c:{}}}
*/
function pathToInlinObj (str, obj2) {
  var arrs = str.replace('.json', '').replace('./', '').split('/')
  let obj = {}
  arrs.splice(0, 1)
  arrs.forEach((item, index, arr) => {
    deepTrvalObj(item, obj, obj2, index, arr)
  })
  return obj
}
/**
*@author:sch11450
*time:18:44-2017/7/27
*disc: 将数组转换为具有相同深度的对象
 * [a,b,c] => {a:{b:{c:{}}}}
 * item 每一项
 * obj 当前对象
 * obj2 附加在item 上的对象
*/
function deepTrvalObj (item, obj, obj2, index, arr) {
  if (Object.keys(obj).length) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        deepTrvalObj(item, obj[key], obj2, index, arr)
      } else {
        obj[item] = obj2
      }
    }
  } else {
    // 数组的最后一项
    if (index === arr.length - 1) {
      obj[item] = obj2
    } else {
      obj[item] = {}
    }
  }
}
/**
*@author:sch11450
*time:14:32-2017/7/28
*disc: 合并对象
 * sourceObj 源对象
 * tarObj 目标对象
*/
function mergeObj (sourceObj, tarObj, oldObj, oldKey) {
  for (let key in sourceObj) {
    if (typeof sourceObj[key] === 'object') {
      if (typeof tarObj[key] !== 'object') {
        tarObj[key] = sourceObj[key]
      }
      mergeObj(sourceObj[key], tarObj[key], sourceObj, key)
    } else {
      if (oldObj[oldKey]) {
        return
      }
      tarObj[oldKey] = oldObj[oldKey]
    }
  }
}
