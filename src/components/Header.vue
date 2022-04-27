<template>
    <div class="header" @click="changeTheme">
      <slot name="left"></slot>
      <slot name="center"></slot>
      <slot name="right"></slot>
    </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0
    }
  },
  methods: {
    changeTheme () {
      this.index++
      if (this.index >= this.themes.length) {
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme', this.themes[this.index])
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/css/mixin.scss';
.header{
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  @include bg_color();
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
}
</style>
