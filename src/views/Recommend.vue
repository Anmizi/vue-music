<template>
  <div class="recommend">
    <Banner :banners="banners"></Banner>
   <Personalized :personalized="personalized"></Personalized>
  </div>
</template>

<script>
import { getBanner, getPersonalized } from '../api/index'
import Banner from '../components/Banner'
import Personalized from '../components/Personalized'
export default {
  name: 'Recommend',
  components: { Banner, Personalized },
  data () {
    return {
      banners: [],
      personalized: []
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
  }
}
</script>

<style lang="scss" scoped>

</style>
