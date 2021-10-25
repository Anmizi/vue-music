<template>
    <div class="header" @click="changeTheme">
        <div class="header-left"></div>
        <p class="header-title">VueMusic</p>
        <div class="header-right" @click.stop="accountClick"></div>
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
    },
    accountClick () {
      this.$router.push('./account')
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
  .header-left{
    @include bg_img('../assets/images/logo')
  }
  .header-right{
    @include bg_img('../assets/images/account')
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
  }
}
</style>
