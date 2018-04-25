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
    <el-card class="w clearfix card-container goods-list">
      <div slot="header" style="font-size:21px;">
        <span>订单详情</span>
      </div>
      <div class="box-inner ui-cart">
        <div>
          <!--标题-->
          <div class="cart-table-title">
            <span class="name">商品信息</span>
            <span class="subtotal">小计</span>
            <span class="num">数量</span>
            <span class="price">单价</span>
          </div>
          <!--列表-->
          <div class="cart-table" v-for="(item,i) in cartList" :key="i" v-if="item.checked">
            <div class="cart-group divide pr" :data-productid="item.productId">
              <div class="cart-top-items">
                <div class="cart-items clearfix">
                  <!--图片-->
                  <div class="items-thumb fl">
                    <img :alt="item.productName" :src="item.productImg">
                    <a href="javascript:;" :title="item.productName" target="_blank"></a>
                  </div>
                  <!--信息-->
                  <div class="name hide-row fl">
                    <div class="name-table">
                      <a href="javascript:;" :title="item.productName" target="_blank" v-text="item.productName"></a>
                      <ul class="attribute">
                        <li>白色</li>
                      </ul>
                    </div>
                  </div>
                  <!--商品数量-->
                  <div>
                    <!--总价格-->
                    <div class="subtotal" style="font-size: 14px">¥ {{item.productPrice * item.productNum}}</div>
                    <!--数量-->
                    <div class="item-cols-num">
                      <span v-text="item.productNum"></span>
                    </div>
                    <!--价格-->
                    <div class="price">¥ {{item.productPrice}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 总价 -->
        <div class="cart-bottom-bg fix-bottom">
          <div class="fix-bottom-inner">
            <div class="shipping">
              <div class="shipping-box" style="padding: 0 40px;">
                <div class="shipping-total shipping-price">
                  <h4 class="highlight">应付总额：
                    <em>￥{{totalPrice}}</em>
                  </h4>
                </div>
              </div>
              <el-button @click="handlePayment" size="large" type="primary">提交订单</el-button>
            </div>
          </div>
        </div>
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
      cartList: [],
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
  computed: {
    totalPrice() {
      let totalPrice = 0
      this.cartList.forEach(item => {
        if (item.checked) {
          totalPrice += item.productNum * item.productPrice
        }
      })
      return totalPrice
    }
  },
  methods: {
    async init() {
      await this.getAddressList()
      this.cartList = this.$store.state.cartList
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
    handlePayment() {},
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
  .goods-list {
    .el-card__body {
      padding: 0;
    }
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

    .s-content {
      .md {
        > div {
          text-align: left;
          margin-bottom: 15px;
          > input {
            width: 100%;
            height: 50px;
            font-size: 18px;
            padding: 10px 20px;
            border: 1px solid #ccc;
            border-radius: 6px;
            box-shadow: 0 3px 5px -4px rgba(0, 0, 0, 0.4) inset,
              -1px 0 3px -2px rgba(0, 0, 0, 0.1) inset;
            line-height: 46px;
          }
        }
      }

      .btn {
        margin: 0;
        width: 100%;
        height: 50px;
        font-size: 14px;
        line-height: 48px;
      }
    }

    .ui-cart {
      img {
        width: 80px;
        height: 80px;
      }

      .cart-table-title {
        position: relative;
        z-index: 1;
        line-height: 38px;
        height: 38px;
        padding: 0 0 0 30px;
        font-size: 12px;
        background: #eee;
        border-bottom: 1px solid #dbdbdb;
        border-bottom-color: rgba(0, 0, 0, 0.08);
        .name {
          float: left;
          text-align: left;
        }
        span {
          width: 137px;
          float: right;
          text-align: center;
          color: #838383;
        }
      }
      .cart-group.divide {
        .cart-items {
          border-top: 1px dashed #eee;
        }
      }
      .cart-items {
        position: relative;
        height: 140px;
        margin-left: 74px;
        .subtotal {
          font-weight: 700;
        }
        .item-cols-num,
        .price,
        .subtotal {
          overflow: hidden;
          float: right;
          width: 137px;
          text-align: center;
          color: #666;
          line-height: 140px;
        }
        /*数量*/
        .item-cols-num {
          padding-top: 50px;
          line-height: 40px;
        }
        .select {
          width: 112px;
          height: 40px;
          padding-top: 4px;
          margin: 0 auto;
          line-height: 40px;
          .down {
            background-position: 0 -60px;
          }
          .down.down-disabled:hover {
            background-position: 0 -300px;
            cursor: not-allowed;
          }
          .num {
            position: relative;
            overflow: hidden;
            display: inline-block;
            width: 36px;
            height: 18px;
            margin: 7px 0 0;
            border: none;
            border-radius: 3px;
            line-height: 18px;
            text-align: center;
            font-size: 14px;
            transition: all 0.2s ease-out;
          }
        }
      }
      .down.down-disabled {
        background-position: 0 -300px;
        cursor: not-allowed;
      }
    }

    .cart-group.divide .cart-top-items:first-child .cart-items {
      border-top: none;
    }

    .items-choose {
      position: absolute;
      left: -74px;
      top: 0;
      width: 74px;
      height: 20px;
      padding: 60px 0 0 31px;
      font-size: 12px;
      color: #999;
    }

    .items-thumb {
      position: relative;
      margin-top: 30px;
      overflow: hidden;
      width: 80px;
      height: 80px;
    }

    .cart-items .items-thumb > a,
    .ui-cart .cart-items .items-thumb > i {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 1px solid #fff;
      border-radius: 3px;
      border: 0 solid rgba(255, 255, 255, 0.1);
      box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.06);
    }

    .name {
      width: 380px;
      margin-left: 20px;
      color: #323232;
      display: table;
      a {
        color: #333;
        font-size: 16px;
      }
    }

    .name-table {
      display: table-cell;
      vertical-align: middle;
      height: 140px;
    }

    .fix-bottom {
      padding: 22px 29px 19px 30px;
      height: 90px;
      width: 100%;
      z-index: 1;
      background-position: center;
      background: #fdfdfd;
      background: -webkit-linear-gradient(#fdfdfd, #f9f9f9);
      background: linear-gradient(#fdfdfd, #f9f9f9);
      border-top: 1px solid #e9e9e9;
      box-shadow: 0 -3px 8px rgba(0, 0, 0, 0.04);
      .cart-bottom-bg {
        height: 80px;
        border-top: 1px solid #d9d9d9;
        border-radius: 0 0 8px 8px;
      }
      .fix-bottom-inner {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .shipping {
        display: flex;
        align-items: center;
      }
      em {
        display: inline-block;
        position: relative;
        top: 3px;
        margin-top: -4px;
        font-size: 24px;
        color: #d44d44;
        font-weight: 700;
      }
    }

    .attribute,
    .name p {
      color: #999;
      font-size: 12px;
      padding-top: 4px;
      line-height: 17px;
    }
  }
}
</style>

