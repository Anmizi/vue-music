<template>
  <div class="detail">
    <SubHeader :title="playlist.name"></SubHeader>
  </div>
</template>

<script>
import { getPlayList } from '../api/index'
import SubHeader from '../components/SubHeader'
export default {
  name: 'Detail',
  data () {
    return {
      playlist: []
    }
  },
  components: {
    SubHeader
  },
  created () {
    getPlayList({ id: this.$route.params.id })
      .then(data => {
        this.playlist = data.playlist
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style scoped lang='scss'>
.detail{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: skyblue;
}
</style>
