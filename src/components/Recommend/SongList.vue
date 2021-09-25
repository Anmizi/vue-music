<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
  <ul class="song-list">
    <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic">
      <img v-lazy="value.song.album.picUrl" alt="">
      <div>
        <h3>{{value.name}}</h3>
        <p>{{value.song.artists[0].name}}</p>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SongList',
  props: {
    songs: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen'
    ]),
    selectMusic () {
      this.setFullScreen(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';
.song{
  @include bg_sub_color();
  .song-top{
    box-sizing: border-box;
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
    h3{
        @include font_size($font_large);
        font-weight: bold;
        @include font_color();
    }
  }
  .song-list{
    width: 100%;
    overflow: hidden;
    .item{
      display: flex;
      height: 200px;
      align-items: center;
      padding: 0 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      img{
        width: 150px;
        height: 150px;
        border-radius: 20px;
        margin-right: 20px;
      }
      div{
        h3{
          @include font_size($font_large);
          @include font_color();
        }
        p{
          @include font_size($font_medium);
          margin-top: 20px;
          @include font_color();
          opacity: .6;
        }
      }
    }
  }
}
</style>
