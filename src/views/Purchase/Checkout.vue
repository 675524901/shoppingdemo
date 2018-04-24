<template>
  <div class="checkout-container">
    <el-card class="w clraefix card-container">
      <div slot="header" class="address-header">
        <span>收货地址</span>
      </div>
      <div class="address-container">
        <el-row :gutter="8">
          <el-col v-for="item in addressList" :key="item.id" :span="6">
            <li @click="handleSelect(item.addressId)" class="card-item" :class="{'card-item-default':item.addressId===selectedId}">
              <div slot="header" class="item-header">
                <i size="small" @click="handleDeleteAddress(item.addressId)" class="el-icon-delete" style="float:right;width:30px;"></i>
                <i size="small" @click="handleEditAddress(item)" class="el-icon-edit" style="float:right;width:30px;"></i>
              </div>
              <p class="text">收货人：{{item.name}}</p>
              <p class="text" style="margin-top:20px;">收货地址：{{item.address}}</p>
              <p class="text" style="margin-top:20px;">手机号：{{item.phone}}</p>
            </li>
          </el-col>
          <el-col :span="6">
            <li class="card-item-add" @click="handleCreateAddress">
              <i class="el-icon-circle-plus"></i>
              <p>添加收获地址</p>
            </li>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="w clraefix card-container">
      <div slot="header" class="order-header">
        <span>订单详情</span>
      </div>
      <div>

      </div>
    </el-card>
    <el-dialog title="收获地址管理" :visible.sync="dialogVisible" :before-close="handleClose" width="700px">
      <el-form style="margin-left:50px;" :model="form" ref="tempForm" label-position="left" label-width="120px" :rules="rules">
        <el-form-item label="收货人姓名：" prop="name">
          <el-input style="width:400px;" v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="phone">
          <el-input style="width:400px;" v-model.number="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="收获地址：" prop="address">
          <el-input style="width:400px;" v-model.trim="form.address"></el-input>
        </el-form-item>
        <el-form-item label="设为默认地址：">
          <el-switch v-model="form.isDefault" type="primary">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button v-if="form.addressId" type="primary" @click="editAddress">更新</el-button>
        <el-button v-else type="primary" @click="addAddress">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchAddressList,
  updateAddress,
  createAddress,
  deleteAddress
} from '@/api/user'
export default {
  name: 'Checkout',
  data() {
    return {
      selectedId: '',
      form: {
        name: '',
        phone: '',
        address: '',
        isDefault: false
      },
      addressList: [],
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[34578]\d{9}$/,
            message: '请输入正确手机号',
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入收货地址', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getAddressList()
    },
    async getAddressList() {
      const res = await fetchAddressList()
      if (res.data.status && res.data.status === '0') {
        this.addressList = res.data.list
        this.addressList.forEach(item => {
          if (item.isDefault === 1) this.selectedId = item.addressId
        })
      }
    },
    handleEditAddress(row) {
      this.resetForm()
      this.form = { ...row }
      this.form.isDefault = row.isDefault === 1
      this.dialogVisible = true
    },
    handleCreateAddress() {
      this.resetForm()
      this.dialogVisible = true
    },
    async handleDeleteAddress(id) {
      this.$confirm('确认删除该条收货地址吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteAddress({ addressId: id })
          if (res.data.status) {
            const index = this.addressList.findIndex(
              item => item.addressId === id
            )
            this.addressList.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        })
        .catch(() => {})
    },
    async editAddress() {
      this.$refs.tempForm.validate(async valid => {
        if (valid) {
          const res = await updateAddress(this.form)
          if (res.data.status && res.data.status === '0') {
            this.$message({
              type: 'success',
              message: '更新成功'
            })
            this.dialogVisible = false
            this.getAddressList()
          } else {
            this.$message({
              type: 'error',
              message: '更新失败'
            })
          }
        }
      })
    },
    async addAddress() {
      this.$refs.tempForm.validate(async valid => {
        if (valid) {
          const res = await createAddress(this.form)
          if (res.data.status && res.data.status === '0') {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getAddressList()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        }
      })
    },
    handleSelect(id) {
      this.selectedId = id
    },
    handleClose() {
      this.$refs.tempForm.resetFields()
      this.dialogVisible = false
    },
    resetForm() {
      this.form = {
        name: '',
        phone: '',
        address: '',
        isDefault: false
      }
    }
  }
}
</script>
<style lang="scss">
.checkout-container {
  .el-dialog {
    border-radius: 8px;
  }
  .card-container {
    .el-card__body {
      padding-top: 0;
    }
    margin-top: 40px;
    border-radius: 9px;
    .address-header {
      font-size: 21px;
    }
    .address-container {
      .card-item {
        margin-top: 20px;
        border-radius: 5px;
        padding: 20px;
        cursor: pointer;
        border: 1px solid #ebeef5;
        height: 180px;
        word-wrap: break-word;
        line-height: 25px;
        .el-card__header {
          border-bottom: 0;
        }
        .text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &:hover {
          background: #dff2f59f;
          .operation-section {
            visibility: visible;
            transform: translate(0, 0);
          }
        }
      }
      .card-item-default {
        border: 1px solid rgb(33, 173, 216);
      }
      .card-item-add {
        margin-top: 20px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #ebeef5;
        height: 180px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        p {
          margin-top: 5px;
        }
        &:hover {
          background: #dff2f59f;
          .operation-section {
            visibility: visible;
            transform: translate(0, 0);
          }
        }
      }
    }
    .order-header {
      margin-top: 20px;
      font-size: 21px;
    }
  }
}
</style>

