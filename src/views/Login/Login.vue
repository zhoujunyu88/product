<template>
  <div class="bgc">
    <el-card class="box-card">
      <div slot="header" class="clear">欢迎来到小爱后台管理系统</div>
      <div class="text">
        <div style="width:500px;">
          <el-form :model="form" label-width="100px" status-icon :rules="rules" ref="form">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
            </el-form-item>
            <div class="df">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <div v-html="this.code1" @click="change"></div>
            </div>
            <el-form-item>
              <el-button type="primary" style="width:30% " @click="login">立即登录</el-button>
              <el-button type="primary" style="width:30% " @click="rsgister">立即注册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
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
    let checkUsername = (rule, value, callback) => {
      if (typeof value !== 'string') {
        callback(new Error('请输入字符'))
      }
      callback()
    }
    return {
      code1: '',
      form: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '用户名在2~8位', trigger: 'blur' },
          { trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在6~15位', trigger: 'blur' }
        ],
        Verification: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    change() {
      axios
        .get('/api/captcha')
        .then(res => {
          if (res.data) {
            this.code1 = res.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios
            .post('/api/user/login', {
              username: this.form.username,
              password: this.form.password,
              code: this.form.code
            })
            .then(res => {
              if (res.data.code === 200) {
                localStorage.setItem('user111', JSON.stringify(this.form))
                let nowtime = dayjs().format('YYYY年MM月DD日  HH时mm分ss秒')
                this.$message.success(res.data.message)
                // let user = {
                //   username: this.form.username,
                //   password: this.form.password,
                //   time: nowtime
                // }
                // console.log(user)
                // localStorage.setItem('user', JSON.stringify(this.form))

                this.$router.push('/Vues')
              } else if (res.data.code === 1) {
                this.$message.warning(res.data.message)
                this.form.code = ''
                axios
                  .get('/api/captcha')
                  .then(res => {
                    if (res.data) {
                      this.code1 = res.data
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
              } else if (res.data.code === 500) {
                this.$message.error(res.data.message)
                this.form.password = ''
                this.form.code = ''
                axios
                  .get('/api/captcha')
                  .then(res => {
                    if (res.data) {
                      this.code1 = res.data
                    }
                  })
                  .catch(err => {
                    console.log(err)
                  })
              }
              console.log(res.data)
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('错误')
          this.form.username = ''
          this.form.password = ''
        }
      })
    },
    rsgister() {
      this.$router.push('/registered')
    }
  },
  mounted() {
    axios
      .get('/api/captcha')
      .then(res => {
        if (res.data) {
          this.code1 = res.data
        }
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
.bgc {
  margin: 120px 350px;
}
.box-card {
  justify-content: center;
  align-items: center;
  width: 600px;
}
.df {
  display: flex;
}
.clear {
  margin-left: 50px;
  font-size: 14px;
}
</style>
