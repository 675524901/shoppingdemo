<template>
  <div class="w store-content">

    <div class="gray-box">

      <div class="gallery-wrapper">
        <div class="gallery">
          <div class="thumbnail">
            <ul>
              <li v-for="item in small" :class="{on:big===item}" @click="big=item">
                <img v-lazy="item" :alt="product.productName">
              </li>
            </ul>
          </div>
          <div class="thumb">
            <div class="big">
              <img :src="big.src" :alt="product.productName">
            </div>
          </div>
        </div>
      </div>

      <!--右侧描述-->
      <div class="banner">
        <div class="sku-custom-title">
          <h4>{{product.productName}}</h4>
          <h6>
            <span>{{product.desc}}</span>
            <span class="price">
              <em>¥</em>
              <i>{{product.productPrice}}</i>
            </span>
          </h6>
        </div>
        <div style="margin-top:20px;margin-left:10px;">
          <el-row>
            <el-col>
              <span class="params-name">库存:{{product.totalNum}}</span>
            </el-col>
          </el-row>
          <el-row style="margin-top:15px;">
            <el-col>
              <span class="params-name">数量</span>
              <el-input-number v-model="product.productNum" :min="1" :max="parseInt(`${product.totalNum}`)"></el-input-number>
            </el-col>
          </el-row>
        </div>
        <div class="buy">
          <el-button style="width: 145px" type="primary" plain @click="handleAddCart()">加入购物车</el-button>
          <el-button style="width: 145px" type="primary">现在购买</el-button>
        </div>
      </div>
    </div>
    <!--详情介绍-->

    <el-card style="margin-top:20px;">
      <el-tabs v-model="activeName">
        <el-tab-pane label="商品数据" name="first">
          <el-table :data="productTable" border style="width: 100%">
            <el-table-column prop="date" label="名称" width="180">
            </el-table-column>

            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>

            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import { fetchGoodsDetail } from '@/api/goods'
import { addCart } from '@/api/cart'
export default {
  data() {
    return {
      activeName: 'first',
      productTable: [],
      product: {},
      small: [],
      big: {}
    }
  },
  created() {
    this.init()
  },
  computed: {
    ...mapState(['login', 'showMoveImg', 'showCart'])
  },
  methods: {
    init() {
      this.getGoodsDetail()
    },
    async getGoodsDetail() {
      const data = { productId: this.$route.query.productId }
      const res = await fetchGoodsDetail(data)
      if (res.data.status && res.data.status === '0') {
        this.product = { ...res.data.data, productNum: 1 }
        if (res.data.data.showImgs) {
          const arr = res.data.data.showImgs.split(',')
          this.small = arr.map(item => {
            return {
              src: item
            }
          })
          // 模拟初始化时有大图
          this.big = this.small[0]
        }
      }
    },
    async handleAddCart() {
      // 判断动画是否在运动
      if (!this.showMoveImg) {
        if (this.login) {
          // 已经登陆
          const add = await addCart(this.product)
          if (add.data.status === '0') {
            this.$store.commit('ADD_CART', {
              productId: this.product.productId,
              productPrice: this.product.productPrice,
              productName: this.product.productName,
              productImg: this.product.productImg,
              productNum: this.product.productNum
            })
            this.$message({
              showClose: true,
              type: 'success',
              message: '添加成功'
            })
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: '添加失败'
            })
          }
        } else {
          // 未登录
          this.$store.commit('ADD_CART', {
            productId: this.product.productId,
            productPrice: this.product.productPrice,
            productName: this.product.productName,
            productImg: this.product.productImg,
            productNum: this.product.productNum
          })
        }
        // 加入购物车动画
        /* const dom = event.target
        const elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2
        const elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2
        this.$store.commit('ADD_ANIMATION', {
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: this.product.productImg
        })
        if (!this.showCart) {
          this.$store.commit('SHOW_CART', { showCart: true })
        } */
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixin';

.store-content {
  clear: both;
  width: 1220px;
  min-height: 600px;
  padding: 0 0 25px;
  margin: 0 auto;
}

.gray-box {
  display: flex;
  padding: 60px;
  margin: 20px 0;
  .gallery-wrapper {
    .gallery {
      display: flex;
      width: 540px;
      .thumbnail {
        li:first-child {
          margin-top: 0px;
        }
        li {
          @include wh(80px);
          margin-top: 10px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border: 1px solid rgba(0, 0, 0, 0.06);
          border-radius: 5px;
          cursor: pointer;
          &.on {
            padding: 10px;
            border: 3px solid #ccc;
            border: 3px solid rgba(0, 0, 0, 0.2);
          }
          img {
            display: block;
            @include wh(100%);
          }
        }
      }
      .thumb {
        .big {
          margin-left: 20px;
        }
        img {
          display: block;
          @include wh(440px);
        }
      }
    }
  }
  // 右边
  .banner {
    width: 450px;
    margin-left: 10px;
    h4 {
      font-size: 24px;
      line-height: 1.25;
      color: #000;
      margin-bottom: 13px;
    }
    h6 {
      font-size: 14px;
      line-height: 1.5;
      color: #bdbdbd;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sku-custom-title {
      border-bottom: 1px solid #ebebeb;
      overflow: hidden;
      padding: 8px 8px 18px 10px;
      position: relative;
    }
    .params-name {
      padding-right: 20px;
      font-size: 14px;
      color: #8d8d8d;
      line-height: 36px;
    }
    .num {
      padding: 29px 0 8px 10px;
      border-top: 1px solid #ebebeb;
      display: flex;
      align-items: center;
    }
    .buy {
      margin-top: 20px;
      position: relative;
      border-top: 1px solid #ebebeb;
      padding: 30px 0 0 10px;
    }
  }
}

.item-info {
  .gray-box {
    padding: 0;
    display: block;
  }
  .img-item {
    width: 1220px;
    img {
      width: 100%;
      height: auto;
      display: block;
    }
  }
}

.no-info {
  padding: 200px 0;
  text-align: center;
  font-size: 30px;
}

.price {
  display: block;
  color: #d44d44;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  text-align: right;
  i {
    padding-left: 2px;
    font-size: 24px;
  }
}
</style>
