<template>
  <div class="player">
    <PlayerHeader></PlayerHeader>
  </div>
</template>

<script>
import PlayerHeader from '../components/Player/PlayerHeader'
export default {
  name: 'Player',
  components: { PlayerHeader }
}
</script>

<style scoped lang="scss">
.player{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: pink;
}
</style>
