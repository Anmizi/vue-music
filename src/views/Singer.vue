<template>
  <div class="singer">
    歌手
  </div>
</template>

<script>
// import { getLetterArtists } from '../api/index'
import { getAllArtists } from '../api/index'
export default {
  name: 'Singer',
  created () {
    getAllArtists()
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>

</style>
