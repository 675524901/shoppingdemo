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
              <el-form-item label="收货人">
                <span>{{ scope.row.name }}</span>
              </el-form-item>
              <el-form-item label="收货人手机号">
                <span>{{ scope.row.phone }}</span>
              </el-form-item>
              <el-form-item label="收货地址">
                <span>{{ scope.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleViewProducts(scope.row.orderId)">{{scope.row.orderId}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="订单日期" align="center">
          <template slot-scope="scope">
            {{scope.row.createDate|timeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="金额" prop="payment" align="center">
        </el-table-column>
        <el-table-column label="订单状态" align="center">
          <template slot-scope="scope">
            <el-tag :type="handleTagType(scope.row.state)">{{scope.row.state|stateFilter}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.state==='0'" type="text" @click="handleToPay(scope.row.orderId)">去支付</el-button>
            <el-button type="text" @click="handleViewProducts(scope.row.orderId)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="商品清单" :visible.sync="dialogVisible" :before-close="handleClose" width="700px">
      <el-table :data="productsList" style="height:400px;">
        <el-table-column align="center" label="商品名称" prop="productName"></el-table-column>
        <el-table-column align="center" label="商品数量" prop="productNum"></el-table-column>
      </el-table>
      <div slot="footer">
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const stateList = [
  { id: '0', value: '未支付' },
  { id: '1', value: '已支付' },
  { id: '2', value: '已失效' }
]
const tagTypes = [
  { id: '0', value: 'danger' },
  { id: '1', value: '' },
  { id: '2', value: 'info' }
]
import { fetchOrderList, fetchOrderProducts } from '@/api/user'
import { parseTime } from '@/utils/index'
export default {
  name: 'orderList',
  data() {
    return {
      productsList: [],
      dialogVisible: false,
      tableLoading: false,
      orderList: []
    }
  },
  created() {
    this.init()
  },
  filters: {
    timeFilter(time) {
      return parseTime(time, '{y}-{m}-{d}')
    },
    stateFilter(state) {
      const temp = stateList.find(item => item.id === state)
      return temp ? temp.value : ''
    }
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
    },
    async handleViewProducts(orderId) {
      const res = await fetchOrderProducts({ orderId: orderId })
      if (res.data.status && res.data.status === '0') {
        this.productsList = res.data.list
        this.dialogVisible = true
      }
    },
    handleTagType(state) {
      const result = tagTypes.find(item => item.id === state)
      return result ? result.value : ''
    },
    handleToPay(orderId) {
      this.$router.push({
        path: '/purchase/payment',
        query: { orderId: orderId }
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.productsList = []
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
