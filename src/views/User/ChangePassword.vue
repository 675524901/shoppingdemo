<template>
  <div class="change-password">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>修改密码</span>
      </div>
      <el-row>
        <el-form style="margin-left:150px;" :model="form" label-position="left" label-width="100px" ref="passForm" :rules="rules">
          <el-form-item label="旧密码" prop="oldPass">
            <el-input style="width:400px;" v-model="form.oldPass"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input style="width:400px;" type="password" v-model="form.newPass"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="rePass">
            <el-input style="width:400px;" type="password" v-model="form.rePass"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-left:380px;margin-top:50px;" type="primary" size="small" @click="doChangePassword">修 改</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { checkPassword, changePassword } from '@/api/user'
export default {
  name: 'ChangePassword',
  data() {
    var validateOldPass = async (rule, value, callback) => {
      if (value) {
        const res = await checkPassword({ password: this.form.oldPass })
        if (res.data.status === '0') {
          callback()
        } else callback(new Error('密码不正确'))
      } else callback(new Error('请输入旧密码'))
    }
    var validateRePass = async (rule, value, callback) => {
      if (value) {
        if (value === this.form.newPass) {
          callback()
        } else callback(new Error('两次输入密码不一致'))
      } else callback(new Error('请确认密码'))
    }
    return {
      form: {
        oldPass: null,
        newPass: null,
        rePass: null
      },
      rules: {
        oldPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateOldPass, trigger: 'blur' }
        ],
        newPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 之间', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9_@.*]*$/,
            message: '请输入有效字符',
            trigger: 'blur'
          }
        ],
        rePass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: validateRePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    doChangePassword() {
      this.$refs.passForm.validate(async valid => {
        if (valid) {
          const res = await changePassword({ password: this.form.newPass })
          if (res.data.status === '0') {
            this.resetForm()
          }
          this.$message({
            type: res.data.status === '0' ? 'success' : 'error',
            message: res.data.msg
          })
        }
      })
    },
    resetForm() {
      this.form = {
        oldPass: null,
        newPass: null,
        rePass: null
      }
      this.$refs.passForm.resetFields()
    }
  }
}
</script>

<style lang="scss">
.change-password {
  min-height: 600px;
  .card-container {
    border-radius: 9px;
    .header {
      font-size: 21px;
    }
    .el-card__body {
      padding: 50px;
    }
  }
}
</style>
