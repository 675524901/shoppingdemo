<template>
  <div class="login-page">
    <div class="login-center">
      <el-card>
        <div v-if="loginPage">
          <div class="title" v-show="loginPage">
            <h4>使用账号登录官网</h4>
          </div>
          <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">

            <el-form-item prop="loginAccount">
              <el-input v-model.trim="loginForm.loginAccount" placeholder="账号"></el-input>
            </el-form-item>

            <el-form-item prop="loginPwd">
              <el-input v-model.trim="loginForm.loginPwd" placeholder="密码" type="password"></el-input>
            </el-form-item>

            <el-row>
              <el-col :offset="9">
                <el-button type="text" @click="handleRegister">注册</el-button>
              </el-col>
            </el-row>
            <el-button style="width:350px" @click="login" type="primary">登陆</el-button>
          </el-form>
        </div>

        <div v-else>
          <div class="title" v-show="!loginPage">
            <h4>注册账号</h4>
          </div>
          <el-form :model="registerForm" :rules="registerRules" ref="registerForm">

            <el-form-item prop="registerAccount">
              <el-input v-model.trim="registerForm.registerAccount" placeholder="账号"></el-input>
            </el-form-item>

            <el-form-item prop="registerPwd">
              <el-input v-model.trim="registerForm.registerPwd" placeholder="密码"></el-input>
            </el-form-item>

            <el-form-item prop="registerPwd2">
              <el-input v-model.trim="registerForm.registerPwd2" placeholder="确认密码"></el-input>
            </el-form-item>

          </el-form>
          <el-row>
            <el-col>
              <el-button style="width:350px" @click="regist" type="primary">注册</el-button>
            </el-col>
          </el-row>
          <el-row class="mt20">
            <el-col>
              <span style="font-size:14px">如果您已拥有账号，则可在此</span>
              <el-button type="text" @click="handleLogin">登陆</el-button>
            </el-col>
          </el-row>
        </div>

      </el-card>
    </div>
  </div>
</template>

<script>
import { userLogin, userRegister, checkAccount } from '@/api/login'
import { addSeveralCart } from '@/api/cart'
import { setToken, removeToken } from '@/utils/session'
export default {
  name: 'loginPage',
  data() {
    var validateAccount = async (rule, value, callback) => {
      if (value) {
        const data = { account: this.registerForm.registerAccount }
        const res = await checkAccount(data)
        if (res.data.status === '0') {
          callback()
        } else callback(new Error('此账号已经存在'))
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.registerPwd) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      cart: [],
      loginPage: true,
      loginForm: {
        loginAccount: '',
        loginPwd: ''
      },
      registerForm: {
        registerAccount: '',
        registerPwd: '',
        registerPwd2: ''
      },
      loginRules: {
        loginAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          }
        ],
        loginPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerRules: {
        registerAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur'
          },
          { validator: validateAccount, trigger: 'blur' }
        ],
        registerPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 之间', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_@.*]*$/,
            message: '请输入有效字符',
            trigger: 'blur'
          }
        ],
        registerPwd2: [
          { validator: validatePass2, trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_@.*]*$/,
            message: '请输入有效字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem('buyCart'))
  },
  methods: {
    handleRegister() {
      this.$refs.loginForm.resetFields()
      this.loginPage = false
    },
    handleLogin() {
      this.$refs.registerForm.resetFields()
      this.loginPage = true
    },
    // 登陆时需要添加本地购物车到服务器购物车
    async login() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          const data = {
            account: this.loginForm.loginAccount,
            password: this.loginForm.loginPwd
          }
          const res = await userLogin(data)
          if (res.data.status && res.data.status === '0') {
            setToken(res.data.token) // 用sessionStorage把token存下来
            this.$message({
              showClose: true,
              message: '登陆成功',
              type: 'success'
            })
            // 成功登陆后同步数据库购物车,删除本地购物车
            if (this.cart && this.cart.length) {
              await addSeveralCart(this.cart)
              localStorage.removeItem('buyCart')
              this.$router.go(-1)
            } else {
              this.$router.go(-1)
            }
          } else {
            this.$message({
              showClose: true,
              message: '账号或密码错误',
              type: 'error'
            })
            removeToken() // 将token清空
          }
        }
      })
    },
    async regist() {
      this.$refs.registerForm.validate(async valid => {
        if (valid) {
          const data = {
            account: this.registerForm.registerAccount,
            password: this.registerForm.registerPwd
          }
          // const res = await this.$http.post('/nodeapi/users/register', data)
          const res = await userRegister(data)
          if (res.data.status && res.data.status === '0') {
            this.handleLogin()
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: '注册失败',
              type: 'error'
            })
          }
        } else return false
      })
    }
  }
}
</script>

<style lang="scss" >
.login-page {
  width: 100vw;
  height: 100vh;
  background: url(/static/images/bg_9b9dcb65ff.png) repeat;
  background-size: 100px;
  overflow: hidden;

  .login-center {
    top: 50%;
    left: 50%;
    margin-left: -225px;
    margin-top: -225px;
    position: absolute;
    .el-card {
      text-align: center;
      width: 450px;
      .title {
        h4 {
          color: #666;
          font-size: 20px;
        }
      }
    }
  }
  .mt30 {
    margin-top: 30px;
  }
  .mt20 {
    margin-top: 20px;
  }
  .el-input {
    width: 350px;
  }
  .el-form {
    margin-top: 20px;
  }
  .el-form-item {
    width: 350px;
    margin-left: 30px;
    margin-top: 20px;
  }
}
</style>
