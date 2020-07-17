<template>
  <div>
    <template>
      <div style="width:500px;">
        <el-form :model="form" label-width="100px" status-icon :rules="rules" ref="form">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:20%" @click="registered">立即注册</el-button>
            <el-button type="primary" style="width:30%" @click="login">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: '',
  props: {},
  components: {},
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '用户名在2~8位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { trigger: 'blur' },
          { min: 6, max: 15, message: '密码在6~15位', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '两次输入密码不一致', trigger: 'blur' },
          { trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    registered() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios
            .post('/api/user/register', {
              username: this.form.username,
              password: this.form.password
            })
            .then(res => {
              if (res.data.code === 200) {
                this.$message.success(res.data.message)
              } else {
                this.$message.error(res.data.message)
              }
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('验证错误')
        }
      })
    },
    login() {
      this.$router.push('/Login')
    }
  },
  mounted() {},
  watch: {},
  computed: {}
}
</script>
<style scoped lang="scss"></style>
