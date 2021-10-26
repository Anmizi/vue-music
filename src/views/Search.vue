<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt=""
      />
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search" />
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="value in songs" :key="value.id" @click.stop="selectMusic(value.id)">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt=""
            />
            <p>{{value.name}} - {{value.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>
    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="(value,index) in hots" :key="index" @click.stop="selectHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistroy" :key="value">
        <div class="history-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="" @click.stop="deleteItem(value)">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
import { getSearchList, getSearchHot } from '../api/index'
import { setLocalStorage, getLocalStorage } from '../tools/tools'
import { mapActions } from 'vuex'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: '',
      songs: [],
      hots: [],
      searchHistroy: []
    }
  },
  created () {
    getSearchHot()
      .then(data => {
        this.hots = data.result.hots
      })
      .catch(error => {
        console.log(error)
      })
    const history = getLocalStorage('searchhistory')
    if (history == null) {
      return
    }
    this.searchHistroy = JSON.parse(history)
  },
  directives: {
    throttle: {
      // 实现节流阀
      // 指令的定义
      inserted: function (el, binging) {
        let timeId = null
        let flag = true
        el.addEventListener('input', function () {
          if (!flag) return
          flag = false
          timeId && clearTimeout(timeId)
          timeId = setTimeout(function () {
            flag = true
            binging.value()
          }, 1000)
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    search () {
      // 搜索词为空不发送请求
      if (this.keywords.length === 0) return
      getSearchList({ keywords: this.keywords })
        .then(data => {
          this.songs = data.result.songs
        })
        .catch(error => {
          console.log(error)
        })
    },
    selectMusic (id) {
      this.setFullScreen(true)
      this.setSongDetail([id])
      if (this.searchHistroy.includes(this.keywords)) {
        return
      }
      this.searchHistroy.push(this.keywords)
      setLocalStorage('searchhistory', this.searchHistroy)
    },
    selectHot (name) {
      this.keywords = name
      this.search()
    },
    deleteItem (name) {
      this.searchHistroy = this.searchHistroy.filter(item => {
        return item !== name
      })
      setLocalStorage('searchhistory', this.searchHistroy)
    }
  }

}
</script>

<style scoped lang="scss">
@import "../assets/css/mixin";
.search {
  position: fixed;
  top: 184px;
  bottom: 0;
  left: 0;
  right: 0;
  @include bg_sub_color();
  .search-box {
    display: flex;
    align-items: center;
    margin: 40px 20px;
    border-radius: 30px;
    border-bottom: 1px solid #ccc;
    background: #ebecec;
    img {
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input {
      height: 60px;
      @include font_size($font_medium);
      margin-left: 20px;
      outline: none;
      border: none;
      background: transparent;
    }
  }
  .search-suggest {
    position: fixed;
    top: 300px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    @include bg_sub_color();
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img {
        width: 40px;
        height: 40px;
      }
      p {
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }
  }
  .search-hot{
    h3{
      @include font_size($font_medium);
      @include font_color();
      padding: 10px 20px;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
          height: 60px;
          line-height: 60px;
          border: 1px solid #000;
          border-radius: 30px;
          @include font_color();
          @include font_size($font_medium);
          padding: 0 20px;
          margin: 10px 20px;
        }
      }
  }
  .search-history{
    margin-top: 20px;
    li{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      padding: 10px 20px;
      margin-bottom: 20px;
      box-sizing: border-box;
      .history-left{
        display: flex;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          margin-left: 20px;
          @include font_color();
          @include font_size($font_medium);
        }
      }
      .history-right{
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
