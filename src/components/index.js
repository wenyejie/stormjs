/**
 * components
 *
 * @author: Storm
 * @date: 2018/08/09
 */

import sLayout from './layout'
import sIcon from './icon'
import sPanel from './panel'
import sRow from './row'
import sCol from './col'
import sInput from './input'
import { sCheckbox, sCheckboxGroup } from './checkbox'
import { sButton, sButtonGroup } from './button'
import sTable from './table'
import sPage from './page'
import sBadge from './badge'
import { sForm, sFormItem } from './form'
import sSelect from './select'
import sPortrait from './portrait'
import sDialog from './dialog'
import { sMenu, sSubmenu, sMenuItem } from './menu'
import sSwitch from './switch'
import sMask from './mask'
import sTextarea from './textarea'
import sNotice from './notice'
import sMessage from './message'
import sDatePicker from './datePicker'
import sTimePicker from './timePicker'
import sCharts from './charts'
import { sChosen, sChosenItem } from './chosen'
import { sTab, sTabItem } from './tab'
import SPeople from './people'
import sTree from './tree'
import { sRadio, sRadioGroup } from './radio'
import sPopover from './popover'
import sUpload from './upload'
import sDateTimePicker from './dateTimePicker'
import sDropdown from './dropdown'
import sDate from './datetime/date.vue'
import sTime from './datetime/time.vue'
import SEditor from './editor'
import DynamicBlock from './dynamicBlock/dynamicBlock.vue'
import STransfer from './transfer'

const components = {
  sLayout,
  sIcon,
  sPanel,
  sRow,
  sCol,
  sInput,
  sCheckbox,
  sCheckboxGroup,
  sButton,
  sButtonGroup,
  sTable,
  sPage,
  sBadge,
  sForm,
  sFormItem,
  sSelect,
  sPortrait,
  sDialog,
  sMenu,
  sSubmenu,
  sMenuItem,
  sSwitch,
  sMask,
  sTextarea,
  sNotice,
  sMessage,
  sDatePicker,
  sTimePicker,
  sCharts,
  sChosen,
  sChosenItem,
  sTab,
  sTabItem,
  SPeople,
  sTree,
  sRadio,
  sRadioGroup,
  sPopover,
  sUpload,
  sDateTimePicker,
  sDropdown,
  sDate,
  sTime,
  SEditor,
  DynamicBlock,
  STransfer
}

const install = (Vue) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default Object.assign(components, { install })
