/**
 * Created by wyw5559 on 2017/5/22.
 */
import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import en from './locale/en/translation.json'
// import zh from './locale/translation.json'
// import i18n from './translation'
// Vue.use(VueI18n)
// let locale = i18n.zh
Vue.prototype.$t = function (key) {
  return key
}
Vue.prototype.t = function (...args) {
  console.log(args)
}
// let localeMsg = {
//   'en_US': i18n.en,
//   'zh_CN': i18n.zh
// }
export function setLocal (l) {
  // locale = typeof localeMsg[l] === 'object' ? localeMsg[l] : {} // zh
}
// function isObj (object) {
//   return object && typeof (object) === 'object' && Object.prototype.toString.call(object).toLowerCase() === '[object object]'
// }
// function getLength (object) {
//   var count = 0
//   var a = []
//   for (var i in object) {
//     a.push(i)
//     count++
//   }
//   return count
// }
// function Compare (objA, objB) {
//   if (!isObj(objA) || !isObj(objB)) return false
//   if (getLength(objA) !== getLength(objB)) return false
//   return CompareObj(objA, objB, true)
// }
// function CompareObj (objA, objB, flag) {
//   for (var key in objA) {
//     if (isObj(objA[key]) !== isObj(objB[key])) {
//       console.log(key, objA[key], objB[key], false)
//       return false
//     } else {
//       if (isObj(objA[key]) && isObj(objB[key])) {
//         CompareObj(objA[key], objB[key])
//       } else {
//         if (objA[key] !== objB[key]) {
//           console.log(objA[key], objB[key], false)
//           return false
//         }
//       }
//     }
//   }
// }

