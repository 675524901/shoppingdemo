<template>
  <div>
    <!--轮播图片-->
    <div class="w mt30 clearfix">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in carousels" :key="item.id">
          <img style="width:100%;height:100%;" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--热门商品-->
    <section class="w mt30 clearfix">
      <h-shelf title="热门商品">
        <div slot="content" class="floors">
          <goods-card v-for="(item,i) in hotGoods" :msg="item" :key="i"></goods-card>
        </div>
      </h-shelf>
    </section>

    <!--上新商品-->
    <section class="w mt30 clearfix">
      <h-shelf title="商品上新">
        <div slot="content" class="floors">
          <goods-card v-for="(item,i) in newGoods" :msg="item" :key="i"></goods-card>
        </div>
      </h-shelf>
    </section>

    <section class="w mt30 clearfix" v-for="(item,i) in saleGoods" :key="i">
      <h-shelf :title="item.title">
        <div slot="content" class="floors">
          <div class="imgbanner">
            <img :src="saleGoods[i].image" :alt="item.title">
          </div>
          <goods-card :msg="tab" v-for="(tab,i) in item.tabs" :key="i"></goods-card>
        </div>
      </h-shelf>
    </section>
  </div>
</template>
<script>
import HShelf from '@/components/Shelf'
import GoodsCard from '@/components/GoodsCard'
import { fetchSettings, fetchNewUpGoods } from '@/api/home'
export default {
  name: 'HomePage',
  data() {
    return {
      carousels: [],
      hotGoods: [],
      newGoods: [],
      saleGoods: [
        {
          tabs: [
            {
              productName: '名字1',
              desc: 'subTitle111',
              productId: '003',
              productPrice: '50',
              productImg: '/images/goods/pic03.jpg',
              totalNum: '5'
            }
          ],
          image: '/images/goods/pic01.jpg',
          title: '111'
        },
        {
          tabs: [
            {
              productName: '名字2',
              desc: 'subTitle222',
              productId: '004',
              productPrice: '50',
              productImg: '/images/goods/pic01.jpg',
              totalNum: '5'
            }
          ],
          image: '/images/goods/pic01.jpg',
          title: '222'
        }
      ],
      banner: {},
      bgOpt: {
        offsetLeft: 0,
        offsetTop: 0,
        offsetWidth: 0,
        offsetHeight: 0
      },
      floors: [],
      hot: []
    }
  },
  components: {
    HShelf,
    GoodsCard
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      await this.getCarousels()
      await this.getHostList()
      await this.getNewUpGoods()
    },
    async getCarousels() {
      const res = await fetchSettings({ type: 'carousel' })
      if (res.data.status && res.data.status === '0') {
        this.carousels = res.data.list.map(item => {
          return {
            id: item.id,
            url: item.carousel
          }
        })
      }
    },
    async getHostList() {
      const res = await fetchSettings({ type: 'hot' })
      if (res.data.status && res.data.status === '0') {
        this.hotGoods = res.data.list
      }
    },
    async getNewUpGoods() {
      const res = await fetchNewUpGoods()
      if (res.data.status && res.data.status === '0') {
        this.newGoods = res.data.list
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.banner {
  perspective: 3000px;
  position: relative;
  z-index: 19;
}

.img {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 5px;
  left: 0;
  background: url('/static/images/banner-3d.png') center no-repeat;
  background-size: 95% 100%;
}

.text {
  position: absolute;
  top: 20%;
  right: 10%;
  font-size: 30px;
  color: #fff;
  text-align: right;
  font-weight: lighter;
}

.copyright {
  position: absolute;
  bottom: 10%;
  right: 10%;
  font-size: 10px;
  color: #fff;
  text-align: right;
  font-weight: lighter;
}

.sk_item {
  width: 170px;
  height: 225px;
  padding: 0 14px 0 15px;
  > div {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-5px);
    }
  }
  img {
    width: 130px;
    height: 130px;
    margin: 17px 0;
  }
  .sk_item_name {
    color: #999;
    display: block;
    max-width: 100%;
    _width: 100%;
    overflow: hidden;
    font-size: 12px;
    text-align: left;
    height: 32px;
    line-height: 16px;
    word-wrap: break-word;
    word-break: break-all;
  }
  .sk_item_price {
    padding: 3px 0;
    height: 25px;
  }
  .price_new {
    font-size: 18px;
    font-weight: 700;
    margin-right: 8px;
    color: #f10214;
  }
  .price_origin {
    color: #999;
    font-size: 12px;
  }
}

.box {
  overflow: hidden;
  position: relative;
  z-index: 0;
  margin-top: 29px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 3px 8px -6px rgba(0, 0, 0, 0.1);
}

ul.box {
  display: flex;
  li {
    flex: 1;
    img {
      display: block;
      width: 305px;
      height: 200px;
    }
  }
}

.mt30 {
  margin-top: 30px;
}

.hot {
  display: flex;
  > div {
    flex: 1;
    width: 25%;
  }
}

.floors {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  .imgbanner {
    width: 50%;
    height: 430px;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
