/**
 * Created by sch on 2017/12/13.
 */
export default {
  // 0 女 1 男
  sexFM (val) {
    if (val + '' === '0') {
      return '女'
    } else if (val + '' === '1') {
      return '男'
    }
    return val
  },
  // 0 否 1 是 -1 全部
  boolFM (val) {
    if (val + '' === '0') {
      return '否'
    } else if (val + '' === '1') {
      return '是'
    } else if (val + '' === '-1') {
      return '全部'
    }
    return val
  },
  /**
   *
   * @param num 输入值
   * @param cent 位数后面加零
   * @param isThousand 是否千位分割
   * @return {string} 返回格式化的数据
   */
  formatterNumber (num, cent, isThousand) {
    num = num.toString().replace(/\$|/g, '')
    if (isNaN(num)) {
      num = '0'
    }
    let sign = (parseInt(num) === (num = Math.abs(num)))
    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001)
    let cents = num % Math.pow(10, cent)
    num = Math.floor(num / Math.pow(10, cent)).toString()
    cents = cents.toString()
    while (cents.length < cent) {
      cents = '0' + cents
    }
    if (isThousand) {
      for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
      }
    }
    if (cent > 0) {
      return (((sign) ? '' : '-') + num + '.' + cents)
    } else {
      return (((sign) ? '' : '-') + num)
    }
  },
  formatterSts (val) {
    if (val === '01') {
      return '生效'
    } else if (val === '02') {
      return '失效'
    }
    return val
  },
  formatterYes (val) {
    if (val + '' === '1') {
      return '是'
    } else {
      return '否'
    }
  },
  formatterHandleTask (val) {
    if (val + '' === '0') {
      return '处理'
    } else {
      return '查看'
    }
  },
  splitCodeTrim (str, symbol) {
    return str.split(symbol).filter(item => item)
  }
}
