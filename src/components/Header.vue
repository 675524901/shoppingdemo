<template>
  <div class="header-box">
    <header></header>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/style/theme';
@import '../assets/style/mixin';

.header-box {
  background-image: -webkit-linear-gradient(#000, #121212);
  background-image: linear-gradient(#000, #121212);
  background-size: 100%;
  width: 100%;
  overflow: hidden;
}
header {
  height: 115px;
  z-index: 30;
  // position: relative;
  border: 0;
}
</style>
