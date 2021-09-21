<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <img :src="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  props: {
    banners: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data () {
    return {
      swiperOptions: {
        loop: true,
        autoplay: {
          delay: 1000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        },
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>

<style lang="scss" scoped>
.banner{
  .item{
    img{
      width: 100%;
      height: 300px;
    }
  }

}
</style>
<style lang="scss">
@import '../../assets/css/mixin';
// 设置css作用于全局，否则无法覆盖
.swiper-pagination-bullet{
    width: 16px;
    height: 16px;
    background: #fff;
    opacity: 1;
  }
.swiper-pagination-bullet-active{
    @include bg_color();
}
</style>
