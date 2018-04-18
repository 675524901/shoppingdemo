<template>
  <div class="user-information">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>账户资料</span>
      </div>
      <div>
        <el-upload class="avatar-uploader" action="/nodeapi/users/uploadUserImg" name="userImg" :headers="headers" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { getUserInfo } from '@/api/login'
export default {
  name: 'UserInformation',
  data() {
    return {}
  },
  computed: {
    ...mapState(['userInfo']),
    headers() {
      const token = sessionStorage.getItem('token')
      const item = {}
      item.Authorization = 'Bearer ' + token
      return item
    },
    imageUrl() {
      return this.userInfo.image
    }
  },
  methods: {
    ...mapMutations(['SET_USERINFO']),
    myUpload(content) {
      console.log(content.action)
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
