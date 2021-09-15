<template>
  <div class="recommend">
    推荐
  </div>
</template>

<script>
import { getBanner } from '../api/index'
export default {
  name: 'Recommend',
  created () {
    getBanner()
      .then(data => {
        console.log(data)
      }).catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss" scoped>

</style>
