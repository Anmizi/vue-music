<template>
    <div class="header" @click="changeTheme">
        <div class="header-left" @click.stop="back"></div>
        <ul class="header-title">
          <li :class="{'active': switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
          <li :class="{'active': switchNum === 1}" @click.stop="switchItem(1)">最近听的</li>
        </ul>
        <div class="header-right"></div>
    </div>
</template>
<script>
export default {
  name: 'AccountHeader',
  props: {

  },
  data () {
    return {
      themes: ['theme', 'theme1', 'theme2'],
      index: 0,
      switchNum: 0
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
    },
    switchItem (num) {
      this.switchNum = num
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.header{
  position: relative;
  z-index: 999;
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
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    display: flex;
    height: 60px;
    justify-content: center;
    align-items: center;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 10px;
    font-weight: bold;
    margin-top: 20px;
    @include no_wrap();
    li{
      padding: 0 20px;
      height: 60px;
      line-height: 60px;
      &:nth-of-type(1){
        border-right: 1px solid #fff;
      }
      &.active{
        background: rgba(255,255,255,.3);
      }
    }
  }
}
</style>
