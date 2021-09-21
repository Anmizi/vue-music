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
      <div class="mode"></div>
      <div class="prev"></div>
      <div class="play"></div>
      <div class="next"></div>
      <div class="favorite"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerBottom'
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
      @include bg_img('../../assets/images/loop')
    }
    .prev{
      @include bg_img('../../assets/images/prev')
    }
    .play{
      @include bg_img('../../assets/images/play')
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
