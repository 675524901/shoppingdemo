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
              <el-form-item label="商品名称">
                <span>{{ scope.row.goodsName }}</span>
              </el-form-item>
              <el-form-item label="商品数量">
                <span>{{ scope.row.goodsNum }}</span>
              </el-form-item>
              <el-form-item label="商品数量">
                <span>{{ scope.row.address }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="id">
        </el-table-column>
        <el-table-column label="订单日期" prop="date">
        </el-table-column>
        <el-table-column label="金额" prop="cost">
        </el-table-column>
        <el-table-column label="描述" prop="desc">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'orderList',
  data() {
    return {
      tableLoading: false,
      orderList: [
        {
          id: '111',
          address: 'address',
          cost: 12,
          desc: '玩具*1',
          date: '2017-8-12'
        },
        {
          id: '222',
          cost: 45,
          desc: '食物*1',
          address: 'address',
          date: '2017-8-12'
        }
      ]
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
      width: 90px;
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
