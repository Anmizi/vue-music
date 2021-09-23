<template>
  <div class="normal-player" v-show="this.$store.getters.isFullScreen">
    <div class="player-wrapper">
      <PlayerHeader></PlayerHeader>
      <PlayerMiddle></PlayerMiddle>
      <PlayerBottom></PlayerBottom>
    </div>
    <div class="player-bg">
       <img src="http://p4.music.126.net/q1ViZazAkd93W9QPx3215Q==/109951166419008197.jpg" alt="">
    </div>
  </div>
</template>

<script>
import PlayerHeader from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
export default {
  name: 'NormalPlayer',
  components: { PlayerHeader, PlayerMiddle, PlayerBottom }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
.normal-player{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    position: relative;
    z-index: 999;
    width: 100%;
    height: 100%;
  }
  .player-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      filter: blur(10px);
      height: 100%;
    }
  }
}
</style>
