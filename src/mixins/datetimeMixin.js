/**
 *
 *
 * @author: Storm
 * @date: 2018/11/05
 */

export default {
  props: {
    value: {
      type: Date,
      default: undefined
    },
    min: {
      type: Date,
      default: undefined
    },
    max: {
      type: Date,
      default: undefined
    }
  },
  data () {
    return {
      innerVal: this.value || new Date()
    }
  }
}
