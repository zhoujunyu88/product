<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="reads" name="first">
        <div v-if="this.arr.length>0">
          <div v-for="(item,index) in arr" :key="index">
            <div style="display:flex; justify-content: space-between;">
              <div>{{item.title}}</div>
              <div>{{item.time}}</div>
              <div>
                <button @click="read(item,index)">标为已读</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
        <div>
          <button @click="all">全部标为已读</button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="readed" name="second">
        <div v-if="this.arr1.length>0">
          <div v-for="(item,index) in arr1" :key="index">
            <div style="display:flex; justify-content: space-between;">
              <div>{{item.title}}</div>
              <div>{{item.time}}</div>
              <div>
                <button @click="del(item,index)">删除</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
        <div>
          <button @click="delall">删除全部</button>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="hui" name="third">
        <div v-if="this.arr2.length>0">
          <div v-for="(item,index) in arr2" :key="index">
            <div style="display:flex; justify-content: space-between;">
              <div>{{item.title}}</div>
              <div>{{item.time}}</div>
              <div>
                <button @click="yuan(item,index)">还原</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
        <div>
          <button @click="deletall">清空所有</button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      activeName: 'first',
      arr: [
        { title: '【系统通知】该系统要维护', time: '2018-04-29' },
        { title: '【系统通知】该系统jiang要维护', time: '2018-04-29' }
      ],
      arr1: [
        { title: '【系统通知】该系统要维护', time: '2018-04-29' },
        { title: '【系统通知】该系统jiang要维护', time: '2018-04-29' }
      ],
      arr2: [
        { title: '【系统通知】该系统要维护', time: '2018-04-29' },
        { title: '【系统通知】该系统jiang要维护', time: '2018-04-29' }
      ]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    read(item, index) {
      this.arr.splice(index, 1)
      this.arr1.unshift(item)
    },
    all() {
      this.arr1 = this.arr.concat(this.arr1)
      this.arr = []
    },
    del(item, index) {
      this.arr1.splice(index, 1)
      this.arr2.unshift(item)
    },
    delall() {
      this.arr2 = this.arr1.concat(this.arr2)
      this.arr1 = []
    },
    yuan(item, index) {
      this.arr2.splice(index, 1)
      this.arr1.unshift(item)
    },
    deletall() {
      this.arr2 = []
    }
  },
  mounted() {},
  watch: {},
  computed: {
    reads() {
      return `未读消息(${this.arr.length})`
    },
    readed() {
      return `已读消息(${this.arr1.length})`
    },
    hui() {
      return `回收站(${this.arr2.length})`
    }
  }
}
</script>

<style scoped lang='scss'>
.njs {
  justify-content: space-between;
}
</style>