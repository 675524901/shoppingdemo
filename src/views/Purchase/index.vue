<template>
  <div>
    <y-header :showNav="false"></y-header>
    <router-view class="prichase-container"></router-view>
    <y-footer></y-footer>
  </div>
</template>
<script>
import YHeader from '@/components/Header'
import YFooter from '@/components/Footer'
export default {
  components: {
    YHeader,
    YFooter
  }
}
</script>
<style lang="scss">
.prichase-container {
  min-height: calc(100vh - 454px);
  background: #ededed;
  overflow: hidden;
  width: 100%;
}
</style>

