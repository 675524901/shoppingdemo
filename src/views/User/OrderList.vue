<template>
  <div class="order-list">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>订单详情</span>
      </div>
      <el-table :data="orderList" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <div v-for="item in scope.row.goods" :key="item.goodsId">
                <el-form-item label="商品名称">
                  <span>{{ item.goodsName }}</span>
                </el-form-item>
                <el-form-item label="商品分类">
                  <span>{{ item.goodsNum }}</span>
                </el-form-item>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号" prop="id">
        </el-table-column>
        <el-table-column label="商品名称" prop="name">
        </el-table-column>
        <el-table-column label="描述" prop="desc">
        </el-table-column>
      </el-table>
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
    return {
      orderList: [
        {
          id: '111',
          desc: 'desc',
          name: 'name',
          goods: [
            {
              goodsId: '111',
              goodsName: '玩具',
              goodsNum: 3
            }
          ]
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
