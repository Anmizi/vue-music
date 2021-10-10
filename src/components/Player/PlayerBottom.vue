<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span ref="elecurrentTime">00:00</span>
      <div class="progress-bar" @click="progressClick" ref="progressBar">
        <div class="progress-line" ref="progressLine">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span ref="eletotalTime">00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite" @click="favorite" :class="{active: isFavorite()}"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import mode from '../../store/modeType'
export default {
  name: 'PlayerBottom',
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setCurrentIndex',
      'setCurrentTime',
      'setFavoriteSong'
    ]),
    play () {
      this.setIsPlaying(!this.isPlaying)
    },
    prev () {
      this.setCurrentIndex(this.currentIndex - 1)
    },
    next () {
      this.setCurrentIndex(this.currentIndex + 1)
    },
    mode () {
      if (this.modeType === mode.loop) {
        this.setModeType(mode.one)
      } else if (this.modeType === mode.one) {
        this.setModeType(mode.random)
      } else if (this.modeType === mode.random) {
        this.setModeType(mode.loop)
      }
    },
    favorite () {
      this.setFavoriteSong(this.currentSong)
    },
    isFavorite () {
      return this.favoriteList.find((newValue) => {
        return newValue.id === this.currentSong.id
      })
    },
    formartTime (time) {
      // 2.得到两个时间之间的差值(秒)
      const differSecond = time
      // 3.利用相差的总秒数 / 每一天的秒数 = 相差的天数
      let day = Math.floor(differSecond / (60 * 60 * 24))
      day = day >= 10 ? day : '0' + day
      // 4.利用相差的总秒数 / 小时 % 24;
      let hour = Math.floor(differSecond / (60 * 60) % 24)
      hour = hour >= 10 ? hour : '0' + hour
      // 5.利用相差的总秒数 / 分钟 % 60;
      let minute = Math.floor(differSecond / 60 % 60)
      minute = minute >= 10 ? minute : '0' + minute
      // 6.利用相差的总秒数 % 秒数
      let second = Math.floor(differSecond % 60)
      second = second >= 10 ? second : '0' + second
      return {
        day: day,
        hour: hour,
        minute: minute,
        second: second
      }
    },
    progressClick (e) {
      const normalLeft = this.$refs.progressBar.offsetLeft
      const eventLeft = e.pageX
      const progressWidth = this.$refs.progressBar.offsetWidth
      const value = (eventLeft - normalLeft) / progressWidth
      this.$refs.progressLine.style.width = value * 100 + '%'
      const currentTime = value * this.totalTime
      this.setCurrentTime(currentTime)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex',
      'currentSong',
      'favoriteList'
    ])
  },
  watch: {
    isPlaying (newValue, oldValue) {
      if (newValue) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
    },
    modeType (newValue, oldValue) {
      if (newValue === mode.loop) {
        this.$refs.mode.classList.remove('random')
        this.$refs.mode.classList.add('loop')
      } else if (newValue === mode.one) {
        this.$refs.mode.classList.remove('loop')
        this.$refs.mode.classList.add('one')
      } else if (newValue === mode.random) {
        this.$refs.mode.classList.remove('one')
        this.$refs.mode.classList.add('random')
      }
    },
    totalTime (newValue, oldValue) {
      const time = this.formartTime(newValue)
      this.$refs.eletotalTime.innerHTML = time.minute + ':' + time.second
    },
    currentTime (newValue, oldValue) {
      // 格式化时间
      const time = this.formartTime(newValue)
      this.$refs.elecurrentTime.innerHTML = time.minute + ':' + time.second
      // 进度条同步
      const value = newValue / this.totalTime * 100
      this.$refs.progressLine.style.width = value + '%'
    }

  },
  props: {
    totalTime: {
      type: Number,
      default: 0,
      required: true
    },
    currentTime: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
.player-bottom{
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      @include font_color();
      @include font_size($font_small);
    }
    .progress-bar{
      width: 100%;
      margin: 0 20px;
      height: 10px;
      background: #fff;
      .progress-line{
        position: relative;
        width: 0%;
        height: 100%;
        background: #ccc;
        .progress-dot{
          position: absolute;
          left: 100%;
          top: 50%;
          transform: translate(-50%,-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #fff;
        }
      }
    }
  }
  .bottom-control{
    width: 80%;
    margin: 0 auto;
    padding: 50px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div{
      width: 84px;
      height: 84px;
    }
    .mode{
      @include bg_img('../../assets/images/loop');
      &.loop{
        @include bg_img('../../assets/images/loop')
      }
      &.one{
        @include bg_img('../../assets/images/one')
      }
      &.random{
        @include bg_img('../../assets/images/shuffle')
      }
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play');
      &.active{
        @include bg_img('../../assets/images/pause');
      }
    }
    .next{
      @include bg_img('../../assets/images/next')
    }
    .favorite{
      @include bg_img('../../assets/images/un_favorite');
      &.active{
        @include bg_img('../../assets/images/favorite')
      }
    }
  }

}
</style>
