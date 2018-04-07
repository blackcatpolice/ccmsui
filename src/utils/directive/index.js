/**
 * Created by sch on 2017/12/13.
 */
import format from '@/utils/formatterUtil'
const install = function (Vue) {
  Vue.directive('formatRMB', formatRMB)
}
export default {
  install
}
let formatRMB = {
  twoWay: true,
  bind (el) {
    let input = el.getElementsByTagName('input').length ? el.getElementsByTagName('input')[0] : el
    input.addEventListener('change', function () {
      let value = (function () {
        value = format.formatterNumber(input.value, 2, 1)
        return value
      })()
      input.value = value
    })
  },
  update (el, binding, vnode) {
    let input = el.getElementsByTagName('input').length ? el.getElementsByTagName('input')[0] : el
    if (input.value !== '') {
      input.value = input.value.replace(/[^0-9.]+/g, '')
    }
  }
}

