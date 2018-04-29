<template>
  <div class="payment-result">
    <el-card class="w clearfix card-container">
      <div slot="header" class="card-header">
        <span>支付结果</span>
      </div>
      <div class="card-content">
        <el-row>
          <span class="text">您已成功支付订单,共计：</span>
          <span class="text red">￥{{this.$route.query.payment}}</span>
        </el-row>
        <el-row style="margin-top:50px;" :gutter="20">
          <el-button type="primary" @click="handleToOrder">查看订单</el-button>
          <el-button type="primary" @click="handleToBuy">继续购买</el-button>
        </el-row>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleToOrder() {
      this.$router.push('/user/orderList')
    },
    handleToBuy() {
      this.$router.push('/goodsList')
    }
  }
}
</script>
<style lang="scss">
.payment-result {
  .card-container {
    height: 600px;
    margin-top: 40px;
    border-radius: 9px;
    .card-header {
      font-size: 21px;
    }
    .card-content {
      margin-top: 150px;
      text-align: center;
      width: 100%;
      .text {
        font-size: 25px;
        font-weight: bold;
        color: rgb(48, 48, 51);
      }
      .red {
        font-size: 27px;
        color: red;
      }
    }
  }
}
</style>
