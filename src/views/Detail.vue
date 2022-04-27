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
import { getPlayList, getAlbum, getArtistsSong, getTopList } from '../api/index'
import ScrollView from '../components/ScrollView'
import SubHeader from '../components/Detail/DetailHeader'
import DetailTop from '../components/Detail/DetailTop'
import DetailBottom from '../components/Detail/DetailBottom'
export default {
  name: 'Detail',
  data () {
    return {
      playlist: {}
    }
  },
  components: {
    SubHeader,
    DetailTop,
    DetailBottom,
    ScrollView
  },
  created () {
    const type = this.$route.params.type
    if (type === 'personalized') {
      getPlayList({ id: this.$route.params.id })
        .then((data) => {
          this.playlist = data.playlist
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (type === 'albums') {
      getAlbum({ id: this.$route.params.id })
        .then(data => {
          this.playlist = {
            name: data.album.name,
            coverImgUrl: data.album.picUrl,
            tracks: data.songs
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else if (type === 'singer') {
      getArtistsSong({ id: this.$route.params.id })
        .then(data => {
          this.playlist = {
            name: data.artist.name,
            coverImgUrl: data.artist.picUrl,
            tracks: data.hotSongs
          }
        })
        .catch(error => {
          console.log(error)
        })
    } else if (type === 'rank') {
      getTopList({ id: this.$route.params.id })
        .then(data => {
          this.playlist = {
            name: data.playlist.name,
            coverImgUrl: data.playlist.coverImgUrl,
            tracks: data.playlist.tracks
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    const defaultHeight = this.$refs.top.$el.offsetHeight
    this.$refs.scrollview.scrolling((offsetY) => {
      if (offsetY < 0) {
        // 向上滚动
        // const scale = 10 * Math.abs(offsetY) / defaultHeight
        // this.$refs.top.$el.style.filter = `blur(${scale}px)`
        // 移动端高斯模糊消耗性能,非要使用建议使用一次,或者用蒙版代替

        const scale = Math.abs(offsetY) / defaultHeight
        this.$refs.top.changeMask(scale)
      } else {
        // 向下滚动
        const scale = 1 + offsetY / defaultHeight
        // console.log(scale)
        this.$refs.top.$el.children[0].style.transform = `scale(${scale})`
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
