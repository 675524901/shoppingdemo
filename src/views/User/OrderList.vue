<template>
  <div class="order-list">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>订单详情</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import UShelf from '@/components/Shelf'
export default {
  name: 'orderList',
  components: {
    UShelf
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.order-list {
  min-height: 600px;
  .card-container {
    border-radius: 9px;
    .header {
      font-size: 21px;
    }
  }
}
</style>