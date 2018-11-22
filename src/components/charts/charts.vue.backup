<!--
 -
 -
 - @author: Storm
 - @date: 2018/08/23
 -->
<template>
  <div
    :class="classes"
    class="s-charts">
    <ul
      v-if="desc"
      class="s-charts-name">
      <li><span>{{ desc }}</span></li>
    </ul>
    <div
      v-if="unit"
      class="s-charts-unit">({{ unit }})
    </div>
    <div
      ref="content"
      :style="styles"
      class="s-charts-content" />
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

// 默认配置
const defOpts = {
  grid: {
    left: 24,
    right: 24,
    bottom: 36,
    top: 24,
    containLabel: true
  },
  textStyle: {
    color: '#777',
    lineHeight: 17
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#bbb'
      }
    }
  },
  xAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    boundaryGap: false,
    offset: 12
  },
  yAxis: {
    axisTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    splitLine: {
      lineStyle: {
        color: '#eee'
      }
    }
  },
  series: []
}

const seriesItem = {
  type: 'line',
  smooth: true
}

// 主题
const theme = {
  success: {
    area: 'rgba(72,198,115,.15)',
    item: '#48c673'
  },
  danger: {
    area: 'rgba(255,94,110,.15)',
    item: '#ff5e6e'
  }
}

export default {
  name: 'SCharts',
  props: {
    type: {
      type: String,
      default: 'success',
      validator (val) {
        return ['success', 'danger'].includes(val)
      }
    },

    desc: {
      type: String,
      default: ''
    },

    xData: {
      type: Array,
      default () {
        return []
      }
    },
    yData: {
      type: Array,
      default () {
        return []
      }
    },

    // Y轴单位
    unit: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },

    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  computed: {
    styles () {
      const result = {}
      if (this.width) result.width = `${this.width}px`
      if (this.height) result.height = `${this.height}px`
      return result
    },

    classes () {
      return {
        [`s-charts-${this.type}`]: !!this.type
      }
    }
  },
  watch: {
    options (val) {
      this.chart.setOption(val)
    }
  },
  beforeDestroy () {
    this.chart.clear()
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const opts = Object.assign({}, defOpts, this.options)

      opts.xAxis.data = this.xData

      const series = Array.isArray(this.yData) ? this.yData : [this.yData]

      opts.series = series.map(item => Object.assign({
        areaStyle: {
          color: theme[this.type].area
        },
        itemStyle: {
          normal: {
            color: theme[this.type].item
          }
        }
      }, seriesItem, item))
      // FIXME: 跳到其它路由, 再回来时, 无法显示图标
      this.chart = echarts.init(this.$refs.content)
      this.chart.setOption(opts)
    }
  }
}
</script>

<style lang="scss">
  .s-charts {
    color: #777;
    line-height: 17px;

    &-content {
      height: 250px;
    }

    &-name {
      margin-top: 16px;

      li {
        display: flex;
        align-items: baseline;
        margin-left: 24px;

        &:before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-right: 12px;
        }
      }
    }

    &-unit {
      padding-left: 24px;
      margin-top: 8px;
    }

    &-success {
      .s-charts-name li:before {
        background-color: #48c673;
      }
    }

    &-danger {
      .s-charts-name li:before {
        background-color: #ff5e6e;
      }
    }
  }
</style>
