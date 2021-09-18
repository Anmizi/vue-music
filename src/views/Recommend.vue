<template>
  <div class="recommend">
    <ScrollView>
      <div>
        <Banner :banners="banners"></Banner>
        <Personalized
          :personalized="personalized"
          :title="'推荐歌单'"
        ></Personalized>
        <Personalized :personalized="albums" :title="'最新专辑'"></Personalized>
        <SongList :songs="songs"></SongList>
      </div>
    </ScrollView>
  </div>
</template>

<script>
import { getBanner, getPersonalized, getAlbum, getNewSong } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
import SongList from '../components/SongList'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Recommend',
  components: { Banner, Personalized, SongList, ScrollView },
  data () {
    return {
      banners: [],
      personalized: [],
      albums: [],
      songs: []
    }
  },
  created () {
    getBanner()
      .then((data) => {
        this.banners = data.banners
      })
      .catch((error) => {
        console.log(error)
      })
    getPersonalized()
      .then((data) => {
        this.personalized = data.result
      })
      .catch((error) => {
        console.log(error)
      })
    getAlbum()
      .then((data) => {
        this.albums = data.albums.splice(0, 6)
      })
      .catch((error) => {
        console.log(error)
      })
    getNewSong()
      .then((data) => {
        this.songs = data.result
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>
.recommend{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
