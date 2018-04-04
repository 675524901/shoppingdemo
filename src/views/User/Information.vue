<template>
  <div class="information">
    <el-card class="card-container">
      <div slot="header" class="header">
        <span>账户资料</span>
      </div>
    </el-card>
  </div>
</template>
<script>
import UShelf from '@/components/Shelf'
export default {
  name: 'UserInformation',
  components: {
    UShelf
  },
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.information {
  min-height: 600px;
  .card-container {
    border-radius: 9px;
    .header {
      font-size: 21px;
    }
  }
}
</style>
