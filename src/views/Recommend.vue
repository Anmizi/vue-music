<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
   <Personalized :personalized="personalized" :title="'推荐歌单'"></Personalized>
   <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getAlbum } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
export default {
  name: 'Recommend',
  components: { Banner, Personalized },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: []
    }
  },
  created () {
    getBanner()
      .then(data => {
        this.banners = data.banners
      }).catch(error => {
        console.log(error)
      })
    getPersonalized()
      .then(data => {
        this.personalized = data.result
      }).catch(error => {
        console.log(error)
      })
    getAlbum()
      .then(data => {
        // console.log(data.albums.splice(0, 6))
        this.albums = data.albums.splice(0, 6)
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
