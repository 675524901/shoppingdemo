<template>
  <div class="user-index">
    <u-header :showNav="false"></u-header>

    <div class="w">
      <div class="content">
        <div class="account-sidebar">
          <div class="avatar gray-box ">
            <div>
              <img :src="userInfo.image">
              <h5>
                {{userInfo.name}}</h5>
            </div>
            <div class="box-inner">
              <ul class="account-nav">
                <li v-for="(item,i) in nav" :key='i' :class="{current:item.name===title}" @click="handleRouter(item)">
                  <a href="javascript:;">{{item.name}}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="account-content">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <u-footer></u-footer>
  </div>
</template>
<script>
import UHeader from '@/components/Header'
import UFooter from '@/components/Footer'
import { mapState } from 'vuex'
export default {
  name: 'UserIndex',
  components: {
    UHeader,
    UFooter
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data() {
    return {
      title: '我的订单',
      nav: [
        { name: '账户资料', path: 'information' },
        { name: '修改密码', path: 'changePassword' },
        { name: '我的订单', path: 'orderList' },
        { name: '收货地址', path: 'addressList' }
      ]
    }
  },
  watch: {
    $route(to) {
      const path = to.path.split('/')[2]
      this.nav.forEach(item => {
        if (item.path === path) {
          this.title = item.name
        }
      })
    }
  },
  created() {
    const path = this.$route.path.split('/')[2]
    this.nav.forEach(item => {
      if (item.path === path) {
        this.title = item.name
      }
    })
  },
  methods: {
    handleRouter(item) {
      this.$router.push({ path: '/user/' + item.path })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/style/mixin';

.w {
  padding-top: 40px;
}

.content {
  display: flex;
  height: 100%;
}

.account-sidebar {
  width: 210px;
  border-radius: 6px;
  .avatar {
    padding-top: 20px;
    border-radius: 10px;
    text-align: center;
    img {
      width: 168px;
      height: 168px;
    }
    h5 {
      font-size: 18px;
      line-height: 48px;
      font-weight: 700;
    }
  }
  .account-nav {
    padding-top: 15px;
    li {
      position: relative;
      height: 48px;
      border-top: 1px solid #ebebeb;
      line-height: 48px;
      &:hover {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
      a {
        display: block;
      }
      &.current {
        a {
          position: relative;
          z-index: 1;
          height: 50px;
          background-color: #98afee;
          line-height: 50px;
          color: #fff;
        }
      }
    }
  }
}

.account-content {
  margin-left: 20px;
  flex: 1;
}
</style>