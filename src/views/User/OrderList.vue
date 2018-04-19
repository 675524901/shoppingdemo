<template>
  <div class="order-list">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>订单详情</span>
      </div>
      <el-table v-loading="tableLoading" element-loading-text="拼命加载中" :data="orderList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="收获人">
                <span>{{ scope.row.name }}</span>
              </el-form-item>
              <el-form-item label="收货人手机号">
                <span>{{ scope.row.phone }}</span>
              </el-form-item>
              <el-form-item label="收获地址">
                <span>{{ scope.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="orderId">
        </el-table-column>
        <el-table-column label="订单日期" prop="date">
        </el-table-column>
        <el-table-column label="金额" prop="payment">
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName">
        </el-table-column>
        <el-table-column label="数量" prop="goodsNum">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { fetchOrderList } from '@/api/user'
export default {
  name: 'orderList',
  data() {
    return {
      tableLoading: false,
      orderList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getOrderList()
    },
    async getOrderList() {
      const res = await fetchOrderList()
      if (res.data.status && res.data.status === '0') {
        this.orderList = res.data.list
      }
    }
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
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 120px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
}
</style>
