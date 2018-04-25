<template>
  <div class="payment">
    <el-card class="w clearfix card-container">
      <div slot="header" class="card-header">
        <span>支付订单</span>
      </div>
      <div class="card-content">
        <!-- <div class="box-inner order-info">
          <h3>提交订单成功</h3>
          <p class="payment-detail">请在
            <span>24 小时内</span>完成支付，超时订单将自动取消。</p>
          <p class="payment-detail">我们将在您完成支付后的 72 小时内发货</p>
        </div> -->
        <el-table :data="orderList" style="width:100%;margin-top:40px;">
          <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="productPrice" label="单价" align="center"></el-table-column>
          <el-table-column prop="productNum" label="数量" align="center"></el-table-column>
          <el-table-column label="小计" align="center">
            <template slot-scope="scope">
              {{scope.row.productNum*scope.row.productPrice}}
            </template>
          </el-table-column>
        </el-table>
        <el-form style="margin:40px auto;width:1000px;" :model="addressDetail">
          <el-form-item label="收货人">
            {{addressDetail.name}}
          </el-form-item>
          <el-form-item label="手机号">
            {{addressDetail.phone}}
          </el-form-item>
          <el-form-item label="收货地址">
            {{addressDetail.address}}
          </el-form-item>
        </el-form>
        <!--支付方式-->
        <div style="margin-top:40px;" class="pay-type">
          <div class="p-title">支付方式</div>
          <div class="pay-item">
            <div :class="{'active':payType==='1'}" @click="handleSelect('1')"><img src="/static/images/alipay@2x.png" alt=""></div>
            <div :class="{'active':payType==='2'}" @click="handleSelect('2')"><img src="/static/images/weixinpay@2x.png" alt=""></div>
          </div>
        </div>

        <div>
          <div class="box-inner">
            <div>
              <span>
                应付金额:
              </span>
              <em>
                <span>¥</span>{{totalPrice}}</em>
              <el-button text="立刻支付" classStyle="main-btn" type="primary" @btnClick="handlePay()">立即支付</el-button>
            </div>
          </div>
        </div>

      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { fetchAddressDetail } from '@/api/user'
export default {
  name: 'Payment',
  data() {
    return {
      orderList: [],
      payType: '1',
      addressDetail: {}
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['cartList']),
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
      await this.getAddressDetail()
      this.cartList.forEach(item => {
        if (item.checked) {
          this.orderList.push(item)
        }
      })
    },
    async getAddressDetail() {
      const data = { addressId: this.$route.query.addressId }
      const res = await fetchAddressDetail(data)
      if (res.data.status && res.data.status === '0') {
        this.addressDetail = res.data.detail
        console.log(this.addressDetail)
      }
    },
    handlePay() {},
    handleSelect(data) {
      this.payType = data
    }
  }
}
</script>
<style lang="scss">
.payment {
  .card-container {
    margin-top: 40px;
    border-radius: 9px;
    .el-card__body {
      padding: 0;
    }
    .card-header {
      font-size: 21px;
    }
    .card-content {
      .w {
        padding-top: 39px;
      }

      .order-info {
        padding: 60px 0 55px;
        color: #333;
        background: #fff !important;
        h3 {
          padding-bottom: 14px;
          line-height: 36px;
          text-align: center;
          font-size: 36px;
          color: #212121;
        }
        .payment-detail {
          text-align: center;
          line-height: 24px;
          font-size: 14px;
          color: #999;
        }
      }

      /*支付类型*/
      .pay-type {
        margin: 0 auto;
        width: 90%;
        padding-bottom: 30px;
        .p-title {
          font-size: 18px;
          line-height: 40px;
          padding: 0 10px;
          position: relative;
          &:before {
            content: ' ';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            border-bottom: 1px solid #ccc;
          }
        }
      }

      .pay-type {
        .pay-item {
          display: flex;
          align-items: center;
          div {
            margin-top: 20px;
            width: 175px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e5e5e5;
            cursor: pointer;
            border-radius: 6px;
            margin-right: 10px;
            background: #fafafa;
            &.active {
              border-color: #6a8fe5;
              background: #fff;
            }
            img {
              display: block;
              height: 34px;
              margin: 8px auto;
            }
          }
        }
      }

      .box-inner {
        line-height: 80px;
        background: #f9f9f9;
        // border-top: 1px solid #e5e5e5;
        box-sizing: border-box;
        > div {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding: 0 20px;
        }
        em {
          margin-left: 5px;
          font-size: 24px;
          color: #d44d44;
          font-weight: 700;
          margin-right: 10px;
          span {
            margin-right: 4px;
            font-size: 16px;
          }
        }
      }

      .confirm-detail {
        padding: 0 30px 25px;
        border-top: 1px solid #d5d5d5;
        .info-title {
          height: 14px;
          margin: 30px 0 17px;
          line-height: 14px;
          font-weight: bolder;
          color: #333;
        }
        .info-detail {
          line-height: 24px;
          color: #666;
        }
      }

      .confirm-table-title {
        padding: 3px 0 0 30px;
        border-top: 1px solid #d5d5d5;
        line-height: 54px;
        font-weight: bolder;
        color: #000;
        display: flex;
        justify-content: space-between;
        span {
          display: inline-block;
          width: 175px;
          text-align: center;
        }
      }

      .confirm-goods-table {
        border-top: 1px solid #d5d5d5;
        .cart-items {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          a {
            color: #333;
          }
        }
        .n-b {
          display: flex;
          align-items: center;
          justify-content: center;
          > div {
            color: #626262;
            font-weight: 700;
            width: 175px;
            text-align: center;
          }
        }
      }

      .order-discount-line {
        padding: 22px 30px 53px;
        border-top: 1px solid #d5d5d5;
        line-height: 24px;
        text-align: right;
        font-size: 12px;
        &:first-child {
          line-height: 32px;
          text-align: right;
          font-size: 14px;
          font-weight: bolder;
        }
      }

      .name {
        width: 40%;
      }
    }
  }
}
</style>
