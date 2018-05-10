<template>
  <div class="address-list">
    <el-card class="card-container">
      <div slot="header" class="header clearfix">
        <span>收货地址</span>
        <el-button v-on:click="handleAddAddress" style="float: right;" plain size="small" type="primary">添加</el-button>
      </div>

      <el-table v-loading="tableLoading" element-loading-text="拼命加载中" v-bind:data="addressList" style="width: 100%" :row-class-name="tableRowClassName" border>
        <el-table-column align="center" label="收货人姓名" width="170">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="手机号" width="170">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="收获地址" width="350">
          <template slot-scope="scope">
            {{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="250">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isDefault===0" type="text" @click="handleSetDefault(scope.row.addressId)">设为默认</el-button>
            <el-tag style="margin-right:6px;" type="success" v-else>默认地址</el-tag>
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.addressId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </el-card>
    <el-dialog title="管理收获地址" :visible.sync="dialogVisible" :before-close="handleClose" width="700px">
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
        <el-button v-if="form.addressId" type="primary" @click="updateAdd">更新</el-button>
        <el-button v-else type="primary" @click="addAddress">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  fetchAddressList,
  deleteAddress,
  createAddress,
  setDefaultAddress,
  updateAddress
} from '@/api/user'
import UShelf from '@/components/Shelf'
export default {
  name: 'AddressList',
  components: {
    UShelf
  },
  data() {
    return {
      form: {
        name: '',
        phone: '',
        address: '',
        isDefault: false
      },
      tableLoading: false,
      dialogVisible: false,
      addressList: [],
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
      await this.getaddressList()
    },
    async getaddressList() {
      this.tableLoading = true
      const res = await fetchAddressList()
      if (res.data.status === '0') {
        this.addressList = res.data.list
        this.tableLoading = false
      }
    },
    async handleSetDefault(id) {
      const res = await setDefaultAddress({ addressId: id })
      if (res.data.status === '0') {
        this.getaddressList()
      }
    },
    handleAddAddress() {
      this.resetForm()
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.resetForm()
      this.form = { ...row }
      this.form.isDefault = row.isDefault === 1
      this.dialogVisible = true
    },
    async addAddress() {
      this.$refs.tempForm.validate(async valid => {
        if (valid) {
          const res = await createAddress(this.form)
          if (res.data.status === '0') {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getaddressList()
          }
        }
      })
    },
    async updateAdd() {
      this.$refs.tempForm.validate(async valid => {
        if (valid) {
          const res = await updateAddress(this.form)
          if (res.data.status === '0') {
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.dialogVisible = false
            this.getaddressList()
          }
        }
      })
    },
    handleClose() {
      this.$refs.tempForm.resetFields()
      this.dialogVisible = false
    },
    handleDelete(id) {
      this.$confirm('确认删除该条收货地址吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await deleteAddress({ addressId: id })
          if (res.data.status && res.data.status === '0') {
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
    tableRowClassName({ row, index }) {
      if (row.isDefault === 1) {
        return 'row-default'
      } else return ''
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
.address-list {
  min-height: 600px;
  .el-dialog {
    border-radius: 8px;
  }
  .card-container {
    border-radius: 9px;
    .header {
      font-size: 21px;
    }
    .el-table {
      .row-default {
        background: oldlace;
      }
      .row-primary {
        background: #f0f9eb;
      }
    }
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }
}
</style>
