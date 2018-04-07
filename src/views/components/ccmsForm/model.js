/**
 * Created by sch on 2018/3/6.
 */
class BaseItem {
  constructor ({
                show = true,
                disabled = false
               }) {
    this.show = show
    this.disabled = disabled
  }
}
// class InputItem extends BaseItem {
//   constructor ({
//                   type = 'text',
//                   model = '',
//                   maxlength = 0,
//                   minlength = 0,
//                   placeholder = '',
//                   size = '',
//                   icon = '',
//                    rows = 2,
//                    autosize = false,
//                    autoComplete = 'off',
//                    name = '',
//                    readonly = false,
//                    max = '',
//                    min = '',
//                    step = '',
//                    resize = '',
//                    autofocus = false,
//                    form = '',
//                    onIconClick = function () {}
//                  } = {}) {
//     super()
//     this.type = 'text'
//     this.model = model
//     this.maxlength = maxlength
//     this.minlength = minlength
//     this.placeholder = placeholder
//     this.size = size
//     this.icon = icon
//     this.rows = rows
//     this.autosize = false
//     this.autoComplete = 'off'
//     this.name = ''
//     this.readonly = false
//     this.max = ''
//     this.min = ''
//     this.step = ''
//     this.resize = ''
//     this.autofocus = false
//     this.form = ''
//     this.onIconClick = function () {
//     }
//   }
// }
