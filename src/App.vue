<template>
<div id="app">
  <MainHeader />
  <Tabbar></Tabbar>
  <router-view></router-view>
  <Player v-show="isShow"></Player>
</div>
</template>
<script>
import MainHeader from './components/MainHeader'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: { MainHeader, Tabbar, Player },
  data () {
    return {
      isShow: true
    }
  }
}
</script>
<style lang="scss">
</style>
