<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img
          :src="currentSong.picUrl"
          alt=""
        />
      </div>
    </div>
  </transition>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import { mapGetters, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
export default {
  name: 'NormalPlayer',
  components: { PlayerHeader, PlayerMiddle, PlayerBottom },
  computed: {
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods: {
    ...mapActions([
      'getSongLyric'
    ]),
    enter (el, done) {
      Velocity(el, 'transition.slideLeftBigIn', {
        duration: 500
      }, function () {
        done()
      })
    },
    leave (el, done) {
      Velocity(el, 'transition.slideLeftBigOut', {
        duration: 500
      }, function () {
        done()
      })
    }
  },
  watch: {
    currentSong (newValue, oldValue) {
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper {
    position: relative;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      filter: blur(10px);
      height: 100%;
    }
  }
}
</style>
