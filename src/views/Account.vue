<template>
  <transition appear>
    <div class="account"></div>
  </transition>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style lang="scss" scoped>
.account{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f00;
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
