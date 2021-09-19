<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
    <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
    <div class="bottom">
      <ScrollView
         ref="scrollview"><DetailBottom :playlist="playlist.tracks"></DetailBottom
      ></ScrollView>
    </div>
  </div>
</template>

<script>
import { getPlayList } from '../api/index'
import ScrollView from '../components/ScrollView'
import SubHeader from '../components/SubHeader'
import DetailTop from '../components/DetailTop'
import DetailBottom from '../components/DetailBottom'
export default {
  name: 'Detail',
  data () {
    return {
      playlist: []
    }
  },
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created () {
    getPlayList({ id: this.$route.params.id })
      .then((data) => {
        this.playlist = data.playlist
      })
      .catch((error) => {
        console.log(error)
      })
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    console.log(defaultHeight)

    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // 向上滚动
        const scale = 10 * Math.abs(offsetY) / defaultHeight
        this.$refs.top.$el.style.filter = `blur(${scale}px)`
      } else {
        // 向下滚动
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.style.transform = `scale(${scale})`
      }
    })
  }
}
</script>

<style scoped lang='scss'>
@import '../assets/css/mixin.scss';
.detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .bottom {
    position: fixed;
    top: 500px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
