<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img src="http://p4.music.126.net/q1ViZazAkd93W9QPx3215Q==/109951166419008197.jpg" alt="">
      </div>
      <p>歌词啊啊啊啊</p>
    </swiper-slide>
    <swiper-slide class="lyric">
      <ScrollView>
        <ul>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
          <li>啊啊啊啊啊啊啊啊</li>
        </ul>
      </ScrollView>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import ScrollView from '../../components/ScrollView'
import { mapGetters } from 'vuex'
export default {
  name: 'PlayerMiddle',
  data () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active'
        },
        observer: true,
        observerParents: true,
        observerSlideChildren: true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'isPlaying'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
.banner{
  position: fixed;
  top: 150px;
  bottom: 250px;
  left: 0;
  right: 0;
  .cd{
    .cd-wrapper{
      display: block;
      margin: 0 auto;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      border: 30px solid #fff;
      overflow: hidden;
      animation: sport 3s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin-top: 50px;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 100px;
      }
    }
  }

}
@keyframes sport{
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}
</style>
<style lang="scss">
@import '../../assets/css/mixin';
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #fff;
  margin: 0 20px;
}
.my-bullet-active{
  width: 60px;
  @include bg_color();
}
</style>
