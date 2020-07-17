<template>
  <div class="box">
    <div class="box_1">
      <el-table :data="tableData">
        <el-table-column label="Order_No" prop="num" align="center"></el-table-column>
        <el-table-column label="Price" prop="price" align="center"></el-table-column>
        <el-table-column label="Status" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1">success</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 0">pending</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-card class="box_2">
      <div slot="header" class="clearfix">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-button style="float: right; padding: 3px 0" type="text">Todo List</el-button>
      </div>
      <div v-if="brr.length > 0">
        <div
          v-for="(item, index) in brr"
          :key="index"
          class="box_2_1"
          :class="{ active: item.flag === true }"
          @mouseenter="enter(item)"
          @mouseleave="leave(item)"
        >
          <div>
            <input type="checkbox" name v-model="item.checked" />
            {{ item.name }}
          </div>
          <div v-if="item.flag">
            <button @click="del(item, index)">删除</button>
          </div>
        </div>
      </div>
      <div v-else>暂无数据</div>
      <div class="box_2_2">
        <span>{{ fals }}items left</span>
        <button>All</button>
        <button @click="actives" style="margin:0 5px">Active</button>
        <button @click="completed">Completed</button>
      </div>
    </el-card>

    <div class="box_3">
      <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png" alt />
      <div v-for="(item, index) in arr" :key="index">
        <div>{{ item.name }}</div>
        <el-progress :percentage="item.progress * 100" v-if="item.progress < 1"></el-progress>
        <el-progress :percentage="item.progress * 100" v-if="item.progress == 1" status="success"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {},
  components: {},
  data() {
    return {
      tableData: [
        {
          num: '',
          price: '',
          status: ''
        }
      ],
      arr: [],
      brr: [],
      all: []
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/orderData')
        .then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data
          }
          // console.log(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    etData() {
      axios
        .get('/api/progress ')
        .then(res => {
          if (res.data.code === 0) {
            this.arr = res.data.data
          }
          // console.log(res.data.data);
        })
        .catch(err => {
          console.log(err)
        })
    },
    tData() {
      axios
        .get('/api/todoList')
        .then(res => {
          if (res.data.code === 0) {
            this.brr = res.data.data
            this.brr.map(item => {
              this.$set(item, 'flag', false)
            })
          }
          console.log(res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    del(item, index) {
      this.brr.splice(index, 1)
    },
    enter(item) {
      item.flag = true
    },
    leave(item) {
      item.flag = false
    },
    actives() {
      this.brr = this.brr.filter(item => {
        return item.checked === false
      })
    },
    completed() {
      this.brr = this.brr.filter(item => {
        return item.checked === true
      })
    }
  },
  mounted() {
    this.getData()
    this.etData()
    this.tData()
  },
  watch: {},
  computed: {
    fals() {
      let crr = this.brr.filter(item => {
        return item.checked === false
      })
      return crr.length
    }
  }
}
</script>
<style>
.box {
  display: flex;
}
.box div {
  margin: 10px;
}
.box_1 {
  width: 400px;
}
/* .box_2 {
} */
.box_2_1 {
  display: flex;
}
/* .box_3 {
} */
</style>
