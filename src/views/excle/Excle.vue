<template>
  <div style="width:80%;margin:0 auto;">
    <input type="text" placeholder="请输入商品信息" v-model="input" />
    <div class="buto">
      <di style="width:40%">商品名称</di>
      <div style="width:30%">商品编号</div>
      <div style="width:10%">原价</div>
      <div style="width:10%">现价</div>
      <div style="width:10%">操作</div>
    </div>
    <div
      v-for="(item, index) in arr1.slice(
        (currentPage - 1) * pagesize,
        currentPage * pagesize
      )"
      :key="index"
    >
      <div class="buto">
        <div style="width:40%">{{ item.NAME }}</div>
        <div style="width:30%">{{ item.GOODS_SERIAL_NUMBER }}</div>
        <div style="width:10%">{{ item.ORI_PRICE }}</div>
        <div style="width:10%">{{ item.PRESENT_PRICE }}</div>
        <div class="but">
          <button class="xiu" @click="amend(item), (dialogFormVisible = true)">修改</button>
          <div>
            <button class="delet" @click="delet(index)">删除</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="arr.length"
      ></el-pagination>
    </div>
    <el-dialog title="修改商品信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.NAME" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品编号" :label-width="formLabelWidth">
          <el-input v-model="form.GOODS_SERIAL_NUMBER" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="原价" :label-width="formLabelWidth">
          <el-input v-model="form.ORI_PRICE" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="现价" :label-width="formLabelWidth">
          <el-input v-model="form.PRESENT_PRICE" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <div style="display:flex;margin:10px,0">
      <download-excel
        class="export-excel-wrapper"
        :data="
          this.arr1.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        :fields="json_fields"
        name="filename.xls"
      >
        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
        <el-button type="primary" size="small" class="xls">导出xls</el-button>
      </download-excel>
      <!-- <div class="xls" @click="xls">导出xls</div> -->
      <div style="display:flex;margin:10px,0">
        <download-excel
          class="export-excel-wrapper"
          :data="
            this.arr1.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
          :fields="json_fields"
          name="filename.csv"
        >
          <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
          <el-button type="primary" size="small" class="csv">导出csv</el-button>
        </download-excel>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    return {
      arr: [],
      pagesizes: [10, 20, 30, 40, 50, 60, 70],
      pagesize: 10,
      currentPage: 1,
      arr1: [],
      input: '',
      // arr2: [
      //   {
      //     NAME: '',
      //     GOODS_SERIAL_NUMBER: '',
      //     ORI_PRICE: '',
      //     PRESENT_PRICE: '',
      //   },
      // ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        NAME: '',
        GOODS_SERIAL_NUMBER: '',
        ORI_PRICE: '',
        PRESENT_PRICE: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getData() {
      axios
        .get('/api/tableData')
        .then(res => {
          this.arr = res.data.data
          this.arr1 = this.arr
          // console.log(this.arr)
          // console.log(this.arr1 + 'afs')
        })
        .catch(err => {
          console.log(err)
        })
    },
    amend(item) {
      this.form = item
      this.dialogFormVisible = true
    },
    delet(index) {
      this.arr.splice(index, 1)
    },
    handleSizeChange(val) {
      this.pagesize = val
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      // console.log(`当前页: ${val}`)
    },
    xls() {},
    csv() {}
  },
  mounted() {
    this.getData()
  },
  watch: {
    input(val) {
      this.arr1 = this.arr.filter(item => {
        return JSON.stringify(item).includes(val)
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.buto {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(231, 231, 231);
  padding: 10px 0;
  font-size: 14px;
  color: gray;
  .but {
    display: flex;
    width: 10%;
    .xiu {
      padding: 3px 5px;
      margin: 0 5px;
      color: white;
      border-radius: 5px;
      background: #409eff;
    }
    .delet {
      color: white;
      border-radius: 5px;
      padding: 3px 5px;
      background: #f56c6c;
    }
  }
}
.xls {
  padding: 10px;
  margin: 10px 5px;
  background: #409eff;
}
.csv {
  margin: 10px 5px;
  padding: 10px;
  background: #f56c6c;
}
</style>
