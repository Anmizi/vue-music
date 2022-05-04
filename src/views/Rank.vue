<template>
  <div class="rank">
    <ScrollView>
      <ul>
        <li v-for="(value, key) in category['titles']" :key="key">
          <h3 class="group-title">{{ value }}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li
              v-for="obj in category[key]"
              :key="obj.rank.id"
              @click.stop="selectedItem(obj.id)"
            >
              <div class="rank-left">
                <img v-lazy="obj.rank.coverImgUrl + imgSize" alt="" />
                <p>{{ obj.rank.updateFrequency }}</p>
              </div>
              <div class="rank-right">
                <p v-for="(song, index) in obj.rank.tracks" :key="song.first">
                  {{ index + 1 }}.{{ song.first }}-{{ song.second }}
                </p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="obj in category[key]" :key="obj.rank.id">
              <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl + imgSize" alt="" />
                <p>{{ obj.rank.updateFrequency }}</p>
              </div>
              <div class="rank-bottom">
                <p>{{ obj.rank.name }}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getTopListDetail } from '../api/index'
import ScrollView from '../components/ScrollView'
export default {
  name: 'Rank',
  components: {
    ScrollView
  },
  data () {
    return {
      category: {},
      // 限制图片大小
      imgSize: '?param=300y300'
    }
  },
  created () {
    getTopListDetail()
      .then((data) => {
        this.category = data
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    selectedItem (id) {
      this.$router.push(`/rank/detail/${id}/rank`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/mixin";
.rank {
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 184px;
  bottom: 0;
  @include bg_sub_color();
  .group-title {
    padding: 10px 20px;
    @include font_color();
    @include font_size($font_large);
    font-weight: bold;
  }
  .normal-group {
    li {
      display: flex;
      padding: 10px 20px;
      box-sizing: border-box;
      align-items: center;
      .rank-left {
        position: relative;
        img {
          width: 200px;
          height: 200px;
          border-radius: 10px;
        }
        p {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_medium_s);
        }
      }
      .rank-right {
        margin-left: 20px;
        p {
          @include font_color();
          @include font_size($font_medium_s);
          padding: 10px 0;
        }
      }
    }
  }
  .other-group {
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 1;
      width: 33.3%;
      min-width: 33.3%;
      max-width: 33.3%;
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-top {
        position: relative;
        img {
          width: 100%;
          height: 200px;
          border-radius: 10px;
        }
        p {
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_medium_s);
        }
      }
      .rank-bottom {
        width: 200px;
        @include no_wrap();
        p {
          text-align: center;
          padding: 10px 0;
          @include font_color();
          @include font_size($font_medium_s);
        }
      }
    }
  }
}
.v-enter {
  transform: translateX(100%);
}
.v-enter-to {
  transform: translateX(0%);
}
.v-enter-active {
  transition: transform 1s;
}
.v-leave {
  transform: translateX(0%);
}
.v-leave-to {
  transform: translateX(100%);
}
.v-leave-active {
  transition: transform 1s;
}
</style>
