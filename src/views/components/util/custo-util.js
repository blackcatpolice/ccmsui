/**
 * Created by wyw5559 on 2017/7/31.
 */
/**
 * 限制文本域输入最大长度
 * @param  {String} value  文本域当前值
 * @param  {Number} maxLen 最大长度
 * @return {String}        不大于最大长度的字符串
 */
export function limTextArea (value, maxLen) {
  if (value.length > maxLen) {
    return value.substr(0, maxLen)
  }
  return value
}

/**
 * IE9中获取el-input输入框的值
 * @param  {VueComponent} component   el-input组件实例
 * @return {String}                   返回输入框中的值
 */
export function getInputVal (component) {
  return component.$el.firstElementChild.value
}

/**
 * 实现IE input placeholder 效果
 * @param  {NodeList} nodes  要实现placeholder效果的input元素list
 * @param  {String}   pcolor placeholder文字颜色
 */
export function setPlaceholder (nodes, pcolor) {
  if (!('placeholder' in document.createElement('input'))) {
    for (let i = 0; i < nodes.length; i++) {
      let node = nodes[i]
      let ph = node.getAttribute('placeholder') || ''
      let type = node.getAttribute('type')
      if (node.value === '' && type !== 'passWord') {
        node.value = ph
        node.style.color = pcolor
      }
      node.onfocus = function () {
        if (node.value === ph) {
          node.value = ''
          node.style.color = ''
        }
      }
      node.onblur = function () {
        if (node.value === '') {
          node.value = ph
          node.style.color = pcolor
        }
      }
      node.onpropertychange = function () {
        if (node.value !== ph && node.style.color !== '') {
          node.style.color = ''
        }
      }
      // let type = node.getAttribute('type')
      // if (type === 'passWord') {
      //   let symbol = Symbol('createdId')
      //   node.insertBefore('<input id=' + symbol + ' type="text" value=' + ph + ' autocomplete="off">')
      //   let nodeAfter = document.getElementById(symbol)
      //   nodeAfter.style.display = 'inline-block'
      //   node.style.display = 'none'
      //   nodeAfter.focus(function () {
      //     nodeAfter.style.display = 'none'
      //     node.style.display = 'inline-block'
      //   })
      //   node.blur(function () {
      //     if (node.value === '') {
      //       nodeAfter.style.display = 'inline-block'
      //       node.style.display = 'none'
      //     }
      //   })
      // }
    }
  }
}

/**
 * 阻止用户输入，推荐在触发keypress事件后调用
 * 支持浏览器：IE、chrome
 * @param  {Regex} illegal 非法字符正则表达式
 */
export function preventInput (illegal) {
  let isPrevent = true
  let char = String.fromCharCode(window.event.keyCode)
  if (illegal && !(new RegExp(illegal)).test(char)) {
    isPrevent = false
  }
  if (isPrevent) {
    window.event.returnValue = false
  }
}
