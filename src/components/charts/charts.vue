<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <e-charts
    :options="options"
    :theme="theme"
    :init-options="initOptions"
    :group="group"
    :auto-resize="autoResize"
    :watch-shallow="watchShallow"
    :manual-update="manualUpdate" />
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import theme from './theme.json'

export default {
  name: 'SCharts',
  components: { ECharts },
  props: {
    options: {
      type: Object,
      default: undefined
    },
    theme: {
      type: [String, Object],
      default: () => theme
    },
    initOptions: {
      type: Object,
      default: undefined
    },
    group: {
      type: String,
      default: undefined
    },
    autoResize: {
      type: Boolean,
      default: undefined
    },
    watchShallow: {
      type: Boolean,
      default: undefined
    },
    manualUpdate: {
      type: Boolean,
      default: undefined
    }
  }
}
</script>
