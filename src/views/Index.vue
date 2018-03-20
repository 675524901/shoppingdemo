<template>
  <div>
    <y-header></y-header>
    <router-view class="main"></router-view>
    <y-footer></y-footer>
    <!--抛物图片-->
    <transition @after-enter='afterEnter' @before-enter="beforeEnter">
      <!--整张图片-->
      <div class="move_img" v-if="showMoveImg" :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">
        <div><img :src="moveImgUrl"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import YHeader from '@/components/Header'
import YFooter from '@/components/Footer'
import { mapState } from 'vuex'
export default {
  name: 'outerIndex',
  components: {
    YHeader,
    YFooter
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'cartPositionT',
      'cartPositionL',
      'showMoveImg',
      'elLeft',
      'elTop',
      'moveImgUrl'
    ])
  },
  methods: {
    // 动画结束后的回调，更新vuex数据
    listenInCart() {
      this.$store.commit('ADD_ANIMATION', {
        moveShow: false,
        receiveInCart: true
      })
    },
    beforeEnter(el) {
      const elStyle = el.style
      const elChild = el.children[0]
      const elChildSty = elChild.style
      elStyle.transform = `translate3d(0,${this.elTop -
        this.cartPositionT}px,0)`
      elChildSty.transform = `translate3d(${-(
        this.cartPositionL - this.elLeft
      )}px,0,0) scale(1.2)`
    },
    afterEnter(el) {
      const elStyle = el.style
      const elChild = el.children[0]
      const elChildSty = elChild.style
      elStyle.transform = `translate3d(0,0,0)`
      elChildSty.transform = `translate3d(0,0,0) scale(.2)`
      elStyle.transition = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
      elChildSty.transition = 'transform .55s linear'
      // 动画结束
      // transitionend事件在css完成过渡后触发
      elChild.addEventListener('transitionend', () => {
        this.listenInCart()
      })
      // webkitAnimationEnd事件在css动画结束后触发
      elChild.addEventListener('webkitAnimationEnd', () => {
        this.listenInCart()
      })
    }
  }
}
</script>
<style lang="scss">
@import '../assets/style/mixin';

.main {
  min-height: calc(100vh - 454px);
  background: #ededed;
  overflow: hidden;
  width: 100%;
}

.bn {
  border-style: none;
  border-width: 0;
  border: none;
}

.move_img {
  position: fixed;
  @include wh(40px);
  width: 45px;
  z-index: 29;
  height: 45px;
  div {
    @extend .bn;
  }
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: block;
    @extend .bn;
  }
}
</style>