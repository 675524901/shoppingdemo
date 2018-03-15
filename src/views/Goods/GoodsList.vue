<template>
  <div class="goods">
    <!-- <el-row>
      <el-col>
        <el-button type="text" size="small">价格从低到高</el-button>
      </el-col>
    </el-row> -->
    <div class="nav">

      <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}">综合排序</a>
        <a href="javascript:;" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格">
          <y-button text="确定" classStyle="main-btn" style="margin-left: 10px;"></y-button>
        </div>
      </div>
    </div>
    <!--商品-->
    <div class="goods-box w">
      <h-goods v-for="(item,i) in goodsList" :key="i" :msg="item"></h-goods>
    </div>
    <!--下拉无限滚动-->
    <div v-show="!busy" class="w load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100">
      正在加载中...
    </div>
  </div>
</template>
<script>
import HGoods from '@/components/MallGoods'
export default {
  name: 'GoodsList',
  components: {
    HGoods
  },
  data() {
    return {
      goodsList: [
        {
          productName: '名字1',
          sub_title: 'subTitle111',
          productId: '111',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        },
        {
          productName: '名字2',
          sub_title: 'subTitle222',
          productId: '222',
          salePrice: '50',
          productImageBig: '/static/images/smartisan_4ada7fecea.png'
        }
      ],
      busy: false
    }
  },
  methods: {
    loadMore() {
      this.busy = true
      setTimeout(() => {
        this.busy = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/style/mixin';
@import '../../assets/style/theme';

.nav {
  height: 60px;
  line-height: 60px;
  > div {
    display: flex;
    align-items: center;
    a {
      padding: 0 15px;
      height: 100%;
      @extend %block-center;
      font-size: 12px;
      color: #999;
      &.active {
        color: #5683ea;
      }
      &:hover {
        color: #5683ea;
      }
    }
    input {
      @include wh(80px, 30px);
      border: 1px solid #ccc;
    }
    input + input {
      margin-left: 10px;
    }
  }
  .price-interval {
    padding: 0 15px;
    @extend %block-center;
    input[type='number'] {
      border: 1px solid #ccc;
      text-align: center;
      background: none;
      border-radius: 5px;
    }
  }
}

.load-more {
  text-align: center;
  background: #fff;
}
.goods-box {
  > div {
    float: left;
    border: 1px solid #efefef;
  }
}
</style>