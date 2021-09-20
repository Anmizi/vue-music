<template>
  <div id="wrapper" ref="wrapper">
    <slot></slot>
</div>
</template>

<script>
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'ScrollView',
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: false,
      probeType: 3,
      // 解决iscroll插件导致的移动端点击无效问题
      preventDefault: false,
      preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|DIV)$/ },
      // 解决卡顿问题
      scrollX: false,
      scrollY: true,
      disablePointer: true,
      disableTouch: false,
      disableMouse: true

    })
    // setTimeout(() => {
    //   console.log(this.iscroll.maxScrollY)
    //   this.iscroll.refresh()
    //   console.log(this.iscroll.maxScrollY)
    // }, 300)
    // 采用观察者模式监听dom结构的变化从而刷新iscroll
    const observer = new MutationObserver((mutationList, observer) => {
      this.iscroll.refresh()
    })
    // 观察内容
    const config = {
      // 观察子节点后代节点
      childList: true,
      subtree: true,
      // 观察特定属性
      attributeFilter: ['height', 'offsetHeight']
    }
    // 观察谁，观察哪些内容
    observer.observe(this.$refs.wrapper, config)
  },
  methods: {
    // 提高一个监听滚动距离的方法供外界使用
    scrolling (fn) {
      this.iscroll.on('scroll', function () {
        fn(this.y)
      })
    }
  }
}
</script>

<style scoped lang='scss'>
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
