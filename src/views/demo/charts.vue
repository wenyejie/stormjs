<!--
 -
 -
 - @author: Storm
 - @date: 2018/11/22
 -->
<template>
  <s-layout>
    <h1>Charts</h1>

    <s-panel>
      <s-charts :options="demo" />
    </s-panel>
  </s-layout>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'

function randomize () {
  return [0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}

export default {
  name: 'VCharts',
  components: { ECharts },
  data () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      demo: {
        legend: {},
        tooltip: {},
        dataset: {
          // Provide data.
          source: [
            ['Product', '2015', '2016', '2017'],
            ['Matcha Latte', ...randomize()],
            ['Milk Tea', ...randomize()],
            ['Cheese Cocoa', ...randomize()],
            ['Walnut Brownie', ...randomize()]
          ]
        },
        // Declare X axis, which is a category axis, mapping
        // to the first column by default.
        xAxis: { type: 'category' },
        // Declare Y axis, which is a value axis.
        yAxis: {},
        // Declare several series, each of them mapped to a
        // column of the dataset by default.
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
