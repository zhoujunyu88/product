<template>
  <div>
    <div style="display:flex;justify-content:space-around;margin:20px;">
      <div class="back">
        <div>今日发布</div>
        <div>{{ a }}</div>
      </div>
      <div class="back1">
        <div>原创文章</div>
        <div>{{ c }}</div>
      </div>
      <div class="back2">
        <div>新留言</div>
        <div></div>
      </div>
      <div class="back3">
        <div>新消息</div>
        <div></div>
      </div>
    </div>
    <div class="tab">
      <div style="flex:1">
        <ve-pie :data="chartData"></ve-pie>
      </div>
      <div style="flex:1">
        <ve-pie :data="chartDatas"></ve-pie>
      </div>
    </div>
    <div>
      <ve-waterfall :data="chartDatad"></ve-waterfall>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
import lodash from 'lodash'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      chartData: {
        columns: ['分类', '数量'],
        rows: []
      },
      chartDatas: {
        columns: ['来源', '数量'],
        rows: []
      },
      chartDatad: {
        columns: ['发布时间', '数量'],
        rows: []
      },
      arr: [],
      a: 0,
      c: 0
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/article/allArticle')
        .then(res => {
          // 第一个饼图
          let category = lodash.groupBy(res.data.data, 'category')
          for (let i in category) {
            let obj = {}
            obj['分类'] = i
            obj['数量'] = category[i].length
            this.chartData.rows.push(obj)
            // console.log(obj)
          }
          // 第二个饼图
          let source = lodash.groupBy(res.data.data, 'source')
          for (let s in source) {
            let objs = {}
            objs['来源'] = s
            objs['数量'] = source[s].length
            this.chartDatas.rows.push(objs)
          }
          // 瀑布图
          res.data.data.map(item => {
            item.date = dayjs(item.date).format('YYYY年MM月DD日')
          })
          let date1 = lodash.groupBy(res.data.data, 'date')
          // console.log('date', date1)
          for (let dt in date1) {
            let objes = {}
            objes['发布时间'] = dt
            objes['数量'] = date1[dt].length
            this.chartDatad.rows.push(objes)
          }
          // 记录原创数据

          let d = '原创'
          let b = dayjs().format('YYYY年MM月DD日')
          res.data.data.map(item => {
            // item.date = dayjs(item.date).format('YYYY年MM月DD日')
            console.log('bbc', item.date)
            if (b === item.date) {
              this.a++
              // console.log(this.a)
            }
            if (d === item.source) {
              this.c++
              console.log(this.c)
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getData()
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.back {
  background: orange;
  box-shadow: 2px 2px 2px #888888;
  & div {
    padding: 30px 50px 0px 50px;
    color: white;
  }
}
.back1 {
  background: orange;
  box-shadow: 2px 2px 2px #888888;
  & div {
    padding: 30px 50px 0px 50px;
    color: white;
  }
}
.back2 {
  background: orange;
  box-shadow: 2px 2px 2px #888888;
  & div {
    padding: 30px 50px 0px 50px;
    color: white;
  }
}
.back3 {
  background: orange;
  box-shadow: 2px 2px 2px #888888;
  & div {
    padding: 30px 50px 0px 50px;
    color: white;
  }
}
.tab {
  display: flex;
  width: 1200px;
  margin: 20px 0;
}
</style>
