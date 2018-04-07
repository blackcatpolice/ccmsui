/**
 * Created by sch on 2018/3/12.
 */
import Zh from '../lang/zh-CN'
import En from '../lang/en'
let lang = Zh
export const t = function (args) {
  let keyArr = args.split('.')
  keyArr = keyArr instanceof Array ? keyArr : []
  let res = lang[keyArr[0]]
  for (let i = 1; i < keyArr.length; i++) {
    try {
      res = res[keyArr[i]]
    } catch (e) {
      res = args
    }
  }
  return res
}
export const use = function (l) {
  lang = l || lang
}
export const Lang = {'zh-cn': Zh, 'en': En}
export default {Lang, use, t}
