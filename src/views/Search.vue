<template>
  <div class="search">
    <div class="search-box">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
        alt=""
      />
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" />
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li>
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg=="
              alt=""
            />
            <p>江南 - 林俊杰</p>
          </li>
        </ul>
      </ScrollView>
    </div>
  </div>
</template>

<script>
import ScrollView from '../components/ScrollView'
export default {
  name: 'Search',
  components: {
    ScrollView
  },
  data () {
    return {
      keywords: ''
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
}
</style>
