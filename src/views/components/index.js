/**
 * Created by sch on 2017/12/11.
 */
import CcmsCard from './ccmsCard'
import CcmsFormItem from './ccmsFormItem'
import CcmsInputDialog from './ccmsInputDialog'
import CcmsLookTable from './ccmsLookTable'
import CcmsPullTree from './ccmsPullTree'
import CcmsSelectDialogTree from './ccmsSelectDialogTree'
import CcmsTable from './ccmsTable'
import CcmsTabs from './ccmsTabs'
import CcmsTree from './ccmsTree'
import CcmsForm from './ccmsForm'
import CcmsTimerShaft from './ccmsTimerShaft'
import CcmsDialog from './ccmsDialog'
import Ccinput from './input'
const components = [
  Ccinput,
  CcmsCard,
  CcmsFormItem,
  CcmsInputDialog,
  CcmsLookTable,
  CcmsPullTree,
  CcmsSelectDialogTree,
  CcmsTable,
  CcmsTabs,
  CcmsTree,
  CcmsForm,
  CcmsTimerShaft,
  CcmsDialog
]
// const context = require.context('@/views/components', true, /((?!\/)[\s\S])+\.vue$/)
const install = function (Vue) {
  components.map(component => {
    Vue.component(component.name, component)
  })
  // context.keys().map(key => {
  //   let component = context(key)
  //   Vue.component(component.name, component)
  // })
}
export default {
  install
}
