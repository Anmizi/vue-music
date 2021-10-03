<template>
  <div class="player-bottom">
    <div class="bottom-progress">
      <span>00:00</span>
      <div class="progress-bar">
        <div class="progress-line">
          <div class="progress-dot"></div>
        </div>
      </div>
      <span>00:00</span>
    </div>
    <div class="bottom-control">
      <div class="mode" @click="mode" ref="mode"></div>
      <div class="prev" @click="prev"></div>
      <div class="play" @click="play" ref="play"></div>
      <div class="next" @click="next"></div>
      <div class="favorite"></div>
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
      'setCurrentIndex'
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
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'modeType',
      'currentIndex'
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
        width: 50%;
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
      @include bg_img('../../assets/images/un_favorite')
    }
  }

}
</style>
