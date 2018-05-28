<template>
  <div class="user-information">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>账户资料</span>
      </div>
      <div>
        <el-row>
          <el-col :span="7">
            <el-upload class="avatar-uploader" action="/nodeapi/users/uploadUserImg" name="userImg" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="17">
            <el-form style="margin-top:30px;margin-left:20px;" :model="form" label-position="left" label-width="100px" ref="userForm" :rules="rules">
              <el-form-item label="用户名：" prop="name">
                <el-input style="width:300px;" v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item label="手机号：" prop="phone">
                <el-input style="width:300px;" v-model="form.phone"></el-input>
              </el-form-item>
            </el-form>
            <el-button style="margin-left:120px;margin-top:50px;" type="primary" size="small" @click="handleSave">保 存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
import { saveUserInfo } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
import { getUserInfo } from '@/api/login'
import { getToken } from '@/utils/session'
export default {
  name: 'UserInformation',
  data() {
    return {
      form: {
        name: null
      },
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        phone: []
      }
    }
  },
  computed: {
    ...mapState(['userInfo']),
    headers() {
      const token = getToken()
      const item = {}
      item.Authorization = 'Bearer ' + token
      return item
    },
    imageUrl() {
      return this.userInfo.image
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    myUpload(content) {
      console.log(content.action)
    },
    init() {
      this.initForm()
    },
    initForm() {
      this.form = {
        name: this.userInfo.name,
        phone: this.userInfo.phone
      }
    },
    async handleAvatarSuccess(res, file) {
      if (res.status && res.status === '0') {
        this.$message({
          type: 'success',
          message: '上传成功'
        })
        const res = await getUserInfo()
        if (res.data.status === '0') {
          this.SET_USERINFO(res.data.userInfo)
        }
      }
    },
    async beforeAvatarUpload(file) {
      const isPic = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isPic) {
        this.$message.error('只能上传图片！')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isLt2M && isPic
    },
    async handleSave() {
      this.$refs.userForm.validate(async valid => {
        if (valid) {
          const res = await saveUserInfo(this.form)
          if (res.data.status === '0') {
            this.$refs.userForm.resetFields()
            const res = await getUserInfo()
            if (res.data.status === '0') {
              this.SET_USERINFO(res.data.userInfo)
            }
            this.initForm()
          }
          this.$message({
            type: res.data.status === '0' ? 'success' : 'error',
            message: res.data.msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.user-information {
  min-height: 600px;
  .card-container {
    border-radius: 9px;
    .header {
      font-size: 21px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
