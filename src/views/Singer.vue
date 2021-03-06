<template>
  <div class="singer">
    <ScrollView ref="ScrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
          <h2 class="group-title">{{keys[index]}}</h2>
          <ul>
            <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click.stop="switchSinger(obj.id)">
              <img v-lazy="obj.img1v1Url + imgSize" alt="">
              <p>{{obj.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li v-for="(key,index) in keys" :key="key" :class="{'active': currentIndex === index}" :data-index="index" @touchstart.stop.prevent="touchstart" @touchmove.stop.prevent="touchmove">{{key}}</li>
    </ul>
    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getAllArtists } from '../api/index'
import ScrollView from '../components/ScrollView.vue'
export default {
  name: 'Singer',
  components: {
    ScrollView
  },
  computed: {
    fixTitle () {
      if (this.scrollY >= 0) {
        return ''
      } else {
        return this.keys[this.currentIndex]
      }
    }
  },
  created () {
    getAllArtists()
      .then(result => {
        this.keys = result.keys
        this.list = result.list
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted () {
    // 监听歌手列表滚动事件
    this.$refs.ScrollView.scrolling((y) => {
      this.scrollY = y
      // 处理第一个区域
      if (y >= 0) {
        this.currentIndex = 0
        return
      }
      // 处理中间区域
      for (let i = 0; i < this.groupsTop.length - 1; i++) {
        const preTop = this.groupsTop[i]
        const nextTop = this.groupsTop[i + 1]
        if (-y >= preTop && -y <= nextTop) {
          this.currentIndex = i

          const diffOffsetY = nextTop + y
          let fixTitleOffsetY = 0
          if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight) {
            fixTitleOffsetY = diffOffsetY - this.fixTitleHeight
          } else {
            fixTitleOffsetY = 0
          }
          if (fixTitleOffsetY === this.fixTitleOffsetY) {
            return
          }
          this.fixTitleOffsetY = fixTitleOffsetY
          this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`
          return
        }
      }
      this.currentIndex = this.groupsTop.length - 1
    })
  },
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0,
      beginOffsetY: 0,
      moveOffsetY: 0,
      scrollY: 0,
      // 限制图片尺寸
      imgSize: '?param=165y165'
    }
  },
  watch: {
    // 监听歌手数据列表变化,获取不同歌手分类区域距离父盒子顶部的距离
    list () {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
      })
    },
    fixTitle () {
      this.$nextTick(() => {
        this.fixTitleHeight = this.$refs.fixTitle.offsetHeight
      })
    }
  },
  methods: {
    _keyDown (index) {
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      this.$refs.ScrollView.scrollTo(0, -offsetY)
    },
    touchstart (e) {
      const index = parseInt(e.target.dataset.index)
      this._keyDown(index)
      this.beginOffsetY = e.touches[0].pageY
    },
    touchmove (e) {
      this.moveOffsetY = e.touches[0].pageY
      const offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight
      let index = parseInt(e.target.dataset.index) + Math.floor(offsetY)

      if (index <= 0) {
        index = 0
      } else if (index > this.keys.length - 1) {
        index = this.keys.length - 1
      }
      this._keyDown(index)
    },
    switchSinger (id) {
      this.$router.push(`/singer/detail/${id}/singer`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/css/mixin';
.singer{
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  overflow: hidden;
  .list-wrapper{
    .list-group{
      .group-title{
        @include bg_color();
        @include font_size($font_medium);
        padding: 10px 20px;
        box-sizing: border-box;
        color: #fff;
      }
      .group-item{
        display: flex;
        padding: 10px 20px;
        justify-content: flex-start;
        border-bottom: 1px solid #ccc;
        img{
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
        }
        p{
          display: flex;
          align-items: center;
          margin-left: 20px;
          @include font_size($font_medium);
          @include font_color();
        }
      }
    }
  }
  .list-keys{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    li{
      @include font_color();
      @include font_size($font_medium_s);
      padding: 3px 0;
      &.active{
        text-shadow: 0 0 10px #000;
      }
    }
  }
  .fix-title{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    @include font_size($font_medium);
    color: #fff;
    @include bg_color()
  }
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
