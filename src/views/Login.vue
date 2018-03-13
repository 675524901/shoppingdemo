<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog" style="display: block; margin-top: -362px;">

        <!--登陆-->
        <el-card style="text-align:center">

          <div v-if="loginPage">
            <div class="title" v-show="loginPage">
              <h4>使用账号登录官网</h4>
            </div>
            <el-form :model="loginForm" :rules="loginRules" ref="loginForm">

              <el-form-item prop="loginAccount">
                <el-input style="width:350px" v-model.trim="loginForm.loginAccount" placeholder="账号"></el-input>
              </el-form-item>

              <el-form-item prop="loginPwd">
                <el-input style="width:350px" v-model.trim="loginForm.loginPwd" placeholder="密码" type="password"></el-input>
              </el-form-item>

              <el-row>
                <el-col :offset="9">
                  <el-button type="text" @click="handleRegister">注册</el-button>
                </el-col>
              </el-row>
              <el-button style="width:310px" @click="login" type="primary">登陆</el-button>
            </el-form>
          </div>

          <div v-else>
            <div class="title" v-show="!loginPage">
              <h4>注册账号</h4>
            </div>
            <el-form :model="registerForm" :rules="registerRules" ref="registerForm">

              <el-form-item prop="registerAccount">
                <el-input style="width:350px" v-model.trim="registerForm.registerAccount" placeholder="账号"></el-input>
              </el-form-item>

              <el-form-item prop="registerPwd">
                <el-input style="width:350px" v-model.trim="registerForm.registerPwd" placeholder="密码"></el-input>
              </el-form-item>

              <el-form-item prop="registerPwd2">
                <el-input style="width:350px" v-model.trim="registerForm.registerPwd2" placeholder="确认密码"></el-input>
              </el-form-item>

            </el-form>
            <el-row>
              <el-col>
                <el-button style="width:310px" @click="regist" type="primary">注册</el-button>
              </el-col>
            </el-row>
            <el-row style="margin-top:20px">
              <el-col>
                <span style="font-size:14px">如果您已拥有账号，则可在此</span>
                <el-button type="text" @click="handleLogin">登陆</el-button>
              </el-col>
            </el-row>
          </div>

        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateAccount = async (rule, value, callback) => {
      if (value) {
        const data = { account: this.loginForm.loginAccount }
        const res = await this.$http.get('/nodeapi/users/checkAccount', {
          params: data
        })
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
          },
          { validator: validateAccount, trigger: 'blur' }
        ],
        loginPwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      registerRules: {
        registerAccount: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
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
  methods: {
    handleRegister() {
      this.$refs.loginForm.resetFields()
      this.loginPage = false
    },
    handleLogin() {
      this.$refs.registerForm.resetFields()
      this.loginPage = true
    },
    // 登陆时将本地的添加到用户购物车
    login_addCart() {
      /* let cartArr = []
        let locaCart = JSON.parse(getStore('buyCart'))
        if (locaCart && locaCart.length) {
          cartArr = locaCart.map(item => {
            return {
              'productId': item.productId,
              'productNum': item.productNum
            }
          })
        }
        this.cart = cartArr */
    },
    async login() {
      const data = {
        account: this.loginForm.loginAccount,
        password: this.loginForm.loginPwd
      }
      const res = await this.$http.post('/nodeapi/users/login', data)
      console.log(res)
    },
    async regist() {
      const data = {
        account: this.registerForm.registerAccount,
        password: this.registerForm.registerPwd
      }
      const res = await this.$http.post('/nodeapi/users/register', data)
      console.log(res)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
* {
  box-sizing: content-box;
}

.login {
  overflow-x: hidden;
  overflow-y: hidden;
  .input {
    height: 50px;
    display: flex;
    align-items: center;
    input {
      font-size: 16px;
      width: 100%;
      height: 100%;
      padding: 10px 15px;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
  }
  .wrapper {
    background: url(/static/images/bg_9b9dcb65ff.png) repeat;
    background-size: 100px;
    min-height: 800px;
    min-width: 630px;
  }
  .btn {
    margin: 0;
    width: 100%;
    height: 48px;
    font-size: 18px;
    line-height: 48px;
  }
}

.v2 .dialog {
  width: 450px;
  border: 1px solid #dadada;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  position: absolute;
  .title {
    background: linear-gradient(#fff, #f5f5f5);
    overflow: visible;
    position: relative;
    background-image: url(/static/images/smartisan_4ada7fecea.png);
    background-size: 160px;
    background-position: top center;
    background-repeat: no-repeat;
    height: 92px;
    margin: 23px 0 50px;
    padding: 75px 0 0;
    box-shadow: none;
    h4 {
      padding: 0;
      text-align: center;
      border-bottom: 1px solid #dcdcdc;
      position: absolute;
      bottom: 0;
      width: 100%;
      margin: 0;
      border-bottom: 0;
      box-shadow: none;
      line-height: 1em;
      height: auto;
      color: #333;
      font-weight: 400;
    }
  }
  .content {
    padding: 0 40px 22px;
    height: auto;
    .common-form {
      li {
        clear: both;
        margin-bottom: 15px;
        position: relative;
      }
    }
  }
}

.dialog-shadow,
.v2 .bbs .dialog-shadow,
.v2 .dialog-shadow {
  -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
}

@media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
  .wrapper {
    background: url(/static/images/con-bg_04f25dbf8e.jpg) repeat-x;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .dialog {
    background: url(/static/images/dialog-gray-bg.png) #fff bottom repeat-x;
    border-radius: 12px;
    display: none;
    margin: -163px 0 0 -218px;
    width: 436px;
    position: fixed;
    left: 50%;
    top: 50%;
  }
  .dialog .title h4 {
    border-bottom: #d1d1d1 solid 1px;
    box-shadow: 0 2px 6px #d1d1d1;
    color: #666;
    font-size: 20px;
    height: 61px;
    line-height: 61px;
    padding: 0 0 0 35px;
  }
  .common-form li {
    clear: both;
    margin-bottom: 15px;
    position: relative;
  }
}

.registered {
  h4 {
    padding: 0;
    text-align: center;
    color: #666;
    border-bottom: 1px solid #dcdcdc;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    font-weight: 700;
    font-size: 20px;
    height: 60px;
    line-height: 60px;
  }
}
</style>