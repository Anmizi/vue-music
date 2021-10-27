<template>
    <Header>
      <template v-slot:left>
        <div class="header-left" @click.stop="back"></div>
      </template>
      <template v-slot:center>
        <p class="header-title">{{title}}</p>
      </template>
      <template v-slot:right>
        <div class="header-right"></div>
      </template>
    </Header>
</template>
<script>
import Header from '../Header'
export default {
  name: 'DetailHeader',
  components: {
    Header
  },
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
    back () {
      window.history.back()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
// .header{
//   position: relative;
//   z-index: 999;
//   width: 100%;
//   height: 100px;
//   display: flex;
//   justify-content: space-between;
//   @include bg_color();
//   .header-left, .header-right{
//     width: 84px;
//     height: 84px;
//     margin-top: 8px;
//   }

// }
  .header-left{
    @include bg_img('../../assets/images/back')
  }
  .header-right{
    @include bg_img('../../assets/images/more')
  }
  .header-title{
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-weight: bold;
    @include no_wrap();
  }
</style>
