<template>
  <transition @enter="enter" @leave="leave" :css="false">
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲播放</p>
            <p v-else>随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="del()"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="ScrollView">
            <ul ref="play">
              <li class="item" v-for="(value, index) in songs" :key="value.id" @click="selectMusic(index)">
                <div class="item-left">
                  <div class="item-play" @click.stop="play" v-if="currentIndex === index"></div>
                  <p>{{ value.name }}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import ScrollView from '../../components/ScrollView'
import { mapActions, mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'
import mode from '../../store/modeType'
export default {
  name: 'ListPlayer',
  components: { ScrollView },
  methods: {
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex'
    ]),
    hidden () {
      this.setListPlayer(false)
    },
    enter (el, done) {
      Velocity(
        el,
        'transition.perspectiveUpIn',
        {
          duration: 800
        },
        function () {
          done()
        }
      )
    },
    leave (el, done) {
      Velocity(
        el,
        'transition.perspectiveUpOut',
        {
          duration: 800
        },
        function () {
          done()
        }
      )
    },
    play () {
      this.setIsPlaying(!this.isPlaying)
      if (this.isPlaying) {
        this.$refs.play.classList.add('active')
      } else {
        this.$refs.play.classList.remove('active')
      }
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
    del (index) {
      this.setDelSong(index)
      this.setIsPlaying(false)
    },
    selectMusic (index) {
      this.setCurrentIndex(index)
    }
  },
  computed: {
    ...mapGetters(['isPlaying', 'modeType', 'isShowListPlayer', 'songs', 'currentIndex'])
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
    isShowListPlayer (newValue, oldValue) {
      this.$refs.ScrollView.refresh()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
.list-player {
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper {
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img("../../assets/images/small_loop");
          }
          &.one {
            @include bg_img("../../assets/images/small_one");
          }
          &.random {
            @include bg_img("../../assets/images/small_shuffle");
          }
          @include bg_img("../../assets/images/small_loop");
        }
        p {
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
      .top-right {
        .del {
          width: 84px;
          height: 84px;
          @include bg_img("../../assets/images/small_del");
        }
      }
    }
    .player-middle {
      height: 700px;
      overflow: hidden;
      width: 100%;
      ul {
        &.active {
          .item {
            .item-play{
              @include bg_img("../../assets/images/small_pause");
            }
          }
        }
      }
      .item {
        display: flex;
        height: 100px;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        border-top: 1px solid #ccc;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img("../../assets/images/small_play");
          }
          p {
            flex: 1;
            @include font_size($font_medium_s);
            @include font_color();
          }
        }
        .item-right {
          display: flex;
          justify-content: center;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img("../../assets/images/small_favorite");
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img("../../assets/images/small_close");
          }
        }
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        @include font_size($font_medium);
        color: #fff;
      }
    }
  }
}
</style>
