<template>
    <div class="header">
        <div class="header-left" @click="hiddenNormalPlayer"></div>
        <div class="header-title">
          <h3>演员</h3>
          <p>薛之谦</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'PlayerHeader',
  methods: {
    ...mapActions([
      'setFullScreen'
    ]),
    hiddenNormalPlayer () {
      this.setFullScreen(false)
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
  .header-left, .header-right{
    width: 84px;
    height: 84px;
    margin-top: 8px;
  }
  .header-left{
    @include bg_img('../../assets/images/down')
  }
  .header-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #fff;
    @include no_wrap();
  }
}
</style>
