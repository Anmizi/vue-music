<template>
<div id="app">
  <Header />
  <Tabbar></Tabbar>
  <router-view></router-view>
  <Player v-show="isShow"></Player>
</div>
</template>
<script>
import Header from './components/Header'
import Tabbar from './components/Tabbar'
import Player from './views/Player'
export default {
  name: 'App',
  components: { Header, Tabbar, Player },
  data () {
    return {
      isShow: true
    }
  }
}
</script>
<style lang="scss">
</style>
