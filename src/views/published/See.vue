
<template>
  <div>
    <el-button type="success" round @click="returnd">返回</el-button>
    <h4 style="text-align:center">{{this.title}}</h4>
    <h5 style="text-align:center">{{this.abstract}}</h5>
    <div style="text-align:center">{{this.author}}</div>
    <div style="text-align:center">{{this.text}}</div>
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
      id: '',
      title: '',
      abstract: '',
      author: '',
      text: ''
    }
  },
  methods: {
    returnd() {
      this.$router.push('/Published')
    }
  },
  mounted() {
    this.id = this.$route.query._id
    axios
      .post('/api/article/article', {
        _id: this.id
      })
      .then(res => {
        if (res.data.code === 200) {
          this.title = res.data.data.title
          this.abstract = res.data.data.abstract
          this.author = res.data.data.author
          this.text = res.data.data.text
        }
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {},
  computed: {}
}
</script>

<style scoped lang='scss'>
</style>