<template>
  <div class="good-item">
    <div>
      <div class="good-img">
        <router-link :to="'goodsDetail?productId='+msg.productId">
          <img v-lazy="msg.productImg" :alt="msg.productName">
        </router-link>
      </div>
      <h6 class="good-title">{{msg.productName}}</h6>
      <h3 class="sub-title ellipsis">{{msg.desc}}</h3>
      <div class="good-price pr">
        <div class="ds pa">
          <router-link :to="'goodsDetail?productId='+msg.productId">
            <el-button style="margin: 0 5px" size="small" type="primary" plain>查看详情</el-button>
          </router-link>
          <el-button style="margin: 0 5px" type="primary" size="small" @click="handleAddCart(msg.productId,msg.salePrice,msg.productName,msg.productImg)">加入购物车</el-button>
        </div>
        <p>
          <span style="font-size: 16px">￥</span>
          {{msg.salePrice}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    msg: ''
  },
  data() {
    return {}
  },
  created() {
    /* if(this.msg){
      if(!Array.isArray(this.msg){
      })
    } */
  },
  methods: {
    handleAddCart(id, price, name, img) {
      if (!this.showMoveImg) {
        // 动画是否在运动
        if (this.login) {
          // 登录了 直接存在用户名下
          /* addCart({productId: id}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({productId: id, productPrice: price, productName: name, productImg: img})
            }) */
        } else {
          // 未登录 vuex
          this.$store.commit('ADD_CART', {
            productId: id,
            productPrice: price,
            productName: name,
            productImg: img
          })
        }
        // 加入购物车动画
        const dom = event.target

        // 获取点击的坐标
        const elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2
        const elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2
        // 需要触发
        this.$store.commit('ADD_ANIMATION', {
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: img
        })
        if (!this.showCart) {
          this.$store.commit('SHOW_CART', { showCart: true })
        }
      }
    }
  },
  computed: {
    ...mapState(['login', 'showMoveImg', 'showCart'])
  },
  mounted() {}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../assets/style/mixin';
@import '../assets/style/theme';

.good-item {
  background: #fff;
  width: 25%;
  transition: all 0.5s;
  height: 430px;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 1px 1px 20px #999;
    .good-price p {
      display: none;
    }
    .ds {
      display: flex;
    }
  }
  .ds {
    @extend %block-center;
    width: 100%;
    display: none;
  }

  .good-img {
    img {
      margin: 50px auto 10px;
      @include wh(206px);
      display: block;
    }
  }
  .good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #e4393c;
    font-size: 20px;
  }
  .good-title {
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
    text-align: center;
    overflow: hidden;
  }
  h3 {
    text-align: center;
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 10px;
  }
}
</style>