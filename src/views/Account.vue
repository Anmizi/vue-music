<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>

  </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader.vue'
import AccountBottom from '../components/Account/AccountBottom.vue'
export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  },
  data () {
    return {
      switchNum: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/mixin';
.account{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color()
}

.v-enter{
  transform: translateX(100%);
}
.v-enter-to{
  transform: translateX(0%);
}
.v-enter-active{
  transition: transform 1s;
}
.v-leave{
  transform: translateX(0%);
}
.v-leave-to{
  transform: translateX(100%);
}
.v-leave-active{
  transition: transform 1s;
}
</style>
