<template>
  <div>
    <div class="right">
      <el-card class="box-card">
        <div class="text item">
          <div>
            <i class="el-icon-s-custom"></i>
          </div>
          <div>
            <div>New Visits</div>
            <div style="color:darkgray">
              <countTo :startVal="startVal" :endVal="this.count.visits" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <div>
            <i class="el-icon-delete"></i>
          </div>
          <div>
            <div>Messages</div>
            <div style="color:darkgray">
              <countTo :startVal="startVal" :endVal="this.count.messages" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <div class="money">￥</div>
          <div>
            <div>Purchases</div>
            <div style="color:darkgray">
              <countTo :startVal="startVal" :endVal="this.count.purchases" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div class="text item">
          <div>
            <i class="el-icon-shopping-cart-2"></i>
          </div>
          <div>
            <div>Shoppings</div>
            <div style="color:darkgray">
              <countTo :startVal="startVal" :endVal="this.count.shoppings" :duration="3000"></countTo>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div style="width:85vw">
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </div>
    <div>
      <Radarmap
        :acd="acd"
        :add="add"
        :app="app"
        v-if="this.acd.length>0&&this.add.length>0&&this.app.length>0"
      ></Radarmap>
    </div>
    <div>
      <Bodybottom></Bodybottom>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import axios from 'axios'
import Radarmap from '../../components/Radarmap'
import Bodybottom from '../../components/Bodybottom'
export default {
  name: '',
  props: {},
  components: {
    countTo,
    Radarmap,
    Bodybottom
  },
  data() {
    this.chartSettings = {
      metrics: ['expected', 'actual'],
      dimension: ['date']
    }
    return {
      count: {},
      startVal: 0,
      acd: [],
      add: [],
      app: [],
      // 折线图
      chartData: {
        columns: ['data', 'expected', 'actual'],
        rows: []
      }
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/radarChat')
        .then(res => {
          this.acd = res.data.data
          // console.log(this.acd)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDatas() {
      axios
        .get('/api/homeData')
        .then(res => {
          if (res.data.code === 0) {
            this.count = res.data.data
          }
          // console.log(this.count)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDate() {
      axios
        .get('/api/homeChat')
        .then(res => {
          if (res.data.code === 0) {
            this.chartData.rows = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 饼状图
    getDates() {
      axios
        .get('/api/ringChat')
        .then(res => {
          if (res.data.code === 0) {
            this.add = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDated() {
      axios
        .get('/api/homeChat')
        .then(res => {
          if (res.data.code === 0) {
            this.app = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getDatas()
    this.getDate()
    this.getData()
    this.getDates()
    this.getDated()
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang="scss">
.right {
  display: flex;
  height: 150px;
  width: 100%;
}
.text {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}

.item {
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
}
.el-icon-s-custom {
  font-size: 30px;
  color: #feba85;
}
.el-icon-shopping-cart-2 {
  font-size: 30px;
  color: #feba85;
}
.money {
  font-size: 30px;
  color: #f4768b;
}
.el-icon-delete {
  font-size: 30px;
  color: #3ba2f4;
}
.box-card {
  margin: 10px;
  flex: 1;
}
</style>
