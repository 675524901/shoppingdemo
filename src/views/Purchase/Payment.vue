<template>
  <div class="payment">
    <el-card>
      <div slot="header" class="card-header">
        <span>支付订单</span>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'Payment',
  date() {
    return {}
  }
}
</script>
<style lang="scss">
.payment {
  .card-header {
    font-size: 21px;
  }
}
</style>
