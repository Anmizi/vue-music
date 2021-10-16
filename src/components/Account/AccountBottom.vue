<template>
  <div class="account-bottom">
    <div class="bottom-play">
      <span></span>
      <span>播放全部</span>
    </div>
    <div class="bottom-wrapper">
      <ScrollView>
        <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../ScrollView.vue'
import SongListItem from '../SongListItem.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'AccountBottom',
  components: {
    ScrollView,
    SongListItem
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'historyList'
    ])
  },
  props: {
    switchNum: {
      type: Number,
      default: 0,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/css/mixin';
.account-bottom{
  position: fixed;
  top: 100px;
  bottom: 0;
  left: 0;
  right: 0;
  .bottom-play{
    width: 260px;
    height: 60px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      display: inline-block;
      &:nth-of-type(1){
        width: 46px;
        height: 46px;
        @include bg_img('../../assets/images/small_play');
        margin-right: 20px;
      }
    }
    border: 1px solid #fff;
    @include border_color();
    border-radius: 30px;
  }
  .bottom-wrapper{
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
}
</style>
