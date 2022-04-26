<template>
  <div class="recommend">
    <div class="recommend-wrapper">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            :type="'personalized'"
            @select="fatherSelectItem"
          ></Personalized>
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            :type="'albums'"
            @select="fatherSelectItem"
          ></Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {
  getBanner,
  getPersonalized,
  getNewAlbum,
  getNewSong
} from '../api/index'
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import SongList from '../components/Recommend/SongList'
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
    getNewAlbum()
      .then((data) => {
        this.albums = data.albums.splice(0, 6)
      })
      .catch((error) => {
        console.log(error)
      })
    getNewSong()
      .then((data) => {
        const list = []
        data.result.forEach((item, index) => {
          const obj = {}
          obj.id = item.id
          obj.name = item.name
          obj.picUrl = item.picUrl
          let singer = ''
          for (let i = 0; i < item.song.artists.length; i++) {
            if (i === 0) {
              singer = item.song.artists[0].name
            } else {
              singer += ' ' + item.song.artists[i].name
            }
          }
          obj.singer = singer
          list.push(obj)
        })
        this.songs = list
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    fatherSelectItem (id, type) {
      this.$router.push({
        path: `/recommend/detail/${id}/${type}`
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  .recommend-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
