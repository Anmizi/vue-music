<template>
  <div class="detail-top">
    <div class="img-container">
      <img :src="path" alt="">
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailTop',
  props: {
    path: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    changeMask (opacity) {
      this.$refs.mask.style.opacity = opacity
    }
  }
}
</script>

<style scoped lang="scss">
.detail-top{
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  img{
    width: 100%;
    vertical-align: top;
  }
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0;
  }
}
</style>
