<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} - {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'DetailBottom',
  props: {
    playlist: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
    },
    selectAllMusic () {
      this.setFullScreen(true)
      const ids = this.playlist.map((item) => item.id)
      this.setSongDetail(ids)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
    @include bg_sub_color();
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    overflow: hidden;
    .bottom-icon{
      width: 60px;
      height: 60px;
      margin-right: 20px;
      @include bg_img('../../assets/images/small_play')
    }
    .bottom-title{
      @include font_color();
      @include font_size($font_large);
    }
  }
  .item{
    // 高度自适应,防止歌曲文字内容溢出
    height: auto;
    h3{
      @include font_color();
      @include font_size($font_medium);
      @include clamp(1);
    }
    p{
      margin-top: 10px;
      @include font_color();
      @include font_size($font_small);
      @include clamp(1);
    }
  }
}
</style>
