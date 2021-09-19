<template>
    <div class="header" @click="changeTheme">
        <div class="header-left" @click.stop="back"></div>
        <p class="header-title">{{title}}</p>
        <div class="header-right"></div>
    </div>
</template>
<script>
export default {
  name: 'SubHeader',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
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
    back () {
      window.history.back()
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
    @include bg_img('../assets/images/back')
  }
  .header-right{
    @include bg_img('../assets/images/more')
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include no_wrap();
  }
}
</style>
