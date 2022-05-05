<template>
  <swiper ref="mySwiper" :options="swiperOptions" class="banner">
    <swiper-slide class="cd">
      <div class="cd-wrapper" ref="cdWrapper">
        <img :src="currentSong.picUrl + imgSize" alt="">
      </div>
      <p>{{getFirstLyric()}}</p>
    </swiper-slide>
    <swiper-slide class="lyric" ref="lyric">
      <ScrollView ref="ScrollView">
        <ul>
          <li
          v-for="value,index in currentLyric"
          :key="index"
          :class="{'active': index === currentLineNum}"
          >{{value}}</li>
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
      },
      currentLineNum: '0',
      imgSize: '?param=400y400'
    }
  },
  props: {
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    Swiper,
    SwiperSlide,
    ScrollView
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'currentSong',
      'currentLyric'
    ])
  },
  methods: {
    getFirstLyric () {
      for (const key in this.currentLyric) {
        return this.currentLyric[key]
      }
    },
    getActiveLineNum (lineNum) {
      if (lineNum < 0) {
        return this.currentLineNum
      }
      if (this.currentLyric[lineNum]) {
        return lineNum + ''
      } else {
        return this.getActiveLineNum(--lineNum)
      }
    }
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.cdWrapper.classList.add('active')
      } else {
        this.$refs.cdWrapper.classList.remove('active')
      }
    },
    currentLyric (newValue, oldValue) {
      for (const key in newValue) {
        this.currentLineNum = key
        break
      }
    },
    currentTime (newValue, oldValue) {
      // 1.高亮歌词同步
      // const key = Math.floor(newValue) + ''
      // if (this.currentLyric[key]) {
      //   this.currentLineNum = key
      //   // 歌词滚动同步
      //   const currentLyricTop = document.querySelector('li.active').offsetTop
      //   const lyricHeight = this.$refs.lyric.$el.offsetHeight
      //   if (currentLyricTop > lyricHeight / 2) {
      //     this.$refs.ScrollView.scrollTo(0, -(currentLyricTop - lyricHeight / 2), 100)
      //   }
      // }

      /* 无歌词或纯音乐无需滚动歌词 */
      if (Object.keys(this.currentLyric).length <= 1) return
      const lineNum = Math.floor(newValue)
      this.currentLineNum = this.getActiveLineNum(lineNum)
      const Li = document.querySelector('.lyric li.active')
      const currentLyricTop = Li.offsetTop
      const lyricHeight = this.$refs.lyric.$el.offsetHeight
      if (currentLyricTop > lyricHeight / 2) {
        this.$refs.ScrollView.scrollTo(0, -(currentLyricTop - lyricHeight / 2), 100)
      } else {
        this.$refs.ScrollView.scrollTo(0, 0, 60)
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
        padding-bottom: 60%;
      }
      &.active{
        color: #ffff;
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
