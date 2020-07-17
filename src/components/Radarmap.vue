<template>
  <div style="display:flex">
    <div class="radarmap">
      <ve-radar :data="chartData" :settings="chartSettings"></ve-radar>
    </div>
    <div class="radarmap">
      <ve-pie :data="chartData1" :settings="chartSettings1"></ve-pie>
    </div>
    <div class="radarmap">
      <ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    acd: {
      type: Array
    },
    add: {
      type: Array
    },
    app: {
      type: Array
    }
  },
  components: {},
  data() {
    // 雷达图
    ;(this.chartSettings = {
      dimension: ['name'],
      metrics: ['sales', 'ministration', 'techology', 'delelopmer', 'marketing']
    }),
      // 饼状图
      (this.chartSettings1 = {
        roseType: 'radius'
      }),
      // 柱状图
      (this.chartSettings2 = {
        metrics: ['expected', 'actual'],
        dimension: ['date']
      })
    return {
      // 雷达图
      chartData: {
        columns: [
          'sales',
          'ministration',
          'techology',
          'delelopmer',
          'marketing'
        ],
        rows: []
      },
      // 饼状图
      chartData1: {
        columns: ['name', 'data'],
        rows: []
      },
      // 柱状图
      chartData2: {
        columns: ['date', 'expected', 'actual'],
        rows: []
      }
    }
  },
  methods: {},
  mounted() {
    this.chartData.rows = this.acd
    this.chartData1.rows = this.add
    this.chartData2.rows = this.app
    console.log(this.chartData2.rows)
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
.radarmap {
  width: 33%;
  flex: 1;
}
</style>