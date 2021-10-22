<template>
  <div class="singer">
    <ScrollView ref="ScrollView">
      <ul class="list-wrapper">
        <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
          <h2 class="group-title">{{keys[index]}}</h2>
          <ul>
            <li class="group-item" v-for="obj in list[index]" :key="obj.id">
              <img v-lazy="obj.img1v1Url" alt="">
              <p>{{obj.name}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <ul class="list-keys">
      <li v-for="(key,index) in keys" :key="key" @click.stop="keyDown(index)" :class="{'active': currentIndex === index}">{{key}}</li>
    </ul>
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
  data () {
    return {
      keys: [],
      list: [],
      groupsTop: [],
      currentIndex: 0
    }
  },
  watch: {
    list () {
      this.$nextTick(() => {
        this.$refs.group.forEach((group) => {
          this.groupsTop.push(group.offsetTop)
        })
      })
    }
  },
  methods: {
    keyDown (index) {
      this.currentIndex = index
      const offsetY = this.groupsTop[index]
      this.$refs.ScrollView.scrollTo(0, -offsetY)
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
}
</style>
