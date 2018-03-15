<template>
  <div>
    <y-header></y-header>
    <router-view class="main"></router-view>
    <y-footer></y-footer>

  </div>
</template>

<script>
import YHeader from '@/components/Header'
import YFooter from '@/components/Footer'
export default {
  name: 'outerIndex',
  components: {
    YHeader,
    YFooter
  },
  data() {
    return {}
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