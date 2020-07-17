<template>
  <div>
    <div class="title">
      <div style="width:5%">#</div>
      <div style="width:20%">标题</div>
      <div style="width:8%">作者</div>
      <div style="width:10%">类目</div>
      <div style="width:7%">来源</div>
      <div style="width:13%">重要性</div>
      <div style="width:10%">发布时间</div>
      <div style="width:27%">操作</div>
    </div>
    <div v-for="(item,index) in arr" :key="index">
      <div class="title1">
        <div style="width:5%">{{index+1}}</div>
        <div style="width:20%">{{item.title}}</div>
        <div style="width:8%">{{item.author}}</div>
        <div style="width:10%">{{item.category}}</div>
        <div style="width:7%">{{item.source}}</div>
        <div style="width:13%">
          <el-rate v-model="item.star" disabled text-color="#ff9900"></el-rate>
        </div>
        <div style="width:10%">{{item.date}}</div>
        <div class="title2">
          <div>
            <button @click="look(item,index)">查看</button>
          </div>
          <div>
            <button @click="delet(item,index)">删除</button>
          </div>
          <div>
            <button @click="looked(item,index)">编辑</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      arr: [],
      _id: ''
    }
  },
  methods: {
    // 获取所有文章数据
    getData() {
      axios
        .get('/api/article/allArticle')
        .then(res => {
          this.arr = res.data.data
          this.arr.map(item => {
            item.date = dayjs(item.date).format('YYYY年MM月DD日HH时mm分ss秒')
            item.star = Number(item.star)
          })
          // console.log(this.arr)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除效果
    delet(item, index) {
      // console.log(item)
      // console.log(index)
      // console.log(item._id)
      axios
        .post('/api/article/delete', {
          _id: item._id
        })
        .then(res => {
          if (res.data.code === 200) {
            this.arr.splice(index, 1)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查看文章
    look(item) {
      this.$router.push({
        path: '/See',
        query: { _id: item._id }
      })
    },
    // 编辑文章
    looked(item) {
      this.$router.push({
        path: '/Edu',
        query: { _id: item._id }
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

<style scoped lang='scss'>
.title {
  display: flex;
  border: 1px solid rgb(231, 231, 231);
  & div {
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.title1 {
  display: flex;
  border: 1px solid rgb(231, 231, 231);
  & div {
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.title2 {
  display: flex;
  width: 27%;
}
</style>