import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_LIST,
  SET_HISTORY_SONG
} from './mutations-type'
import { getSongDetail, getSongLyric, getSongURL } from '../api/index'
import { parseLyric } from '../tools/tools'
export default {
  setFullScreen ({ commit }, flag) {
    commit(SET_FULL_SCREEN, flag)
  },
  setMiniPlayer ({ commit }, flag) {
    commit(SET_MINI_PLAYER, flag)
  },
  setListPlayer ({ commit }, flag) {
    commit(SET_LIST_PLAYER, flag)
  },
  setIsPlaying ({ commit }, flag) {
    commit(SET_IS_PLAYING, flag)
  },
  setModeType ({ commit }, flag) {
    commit(SET_MODE_TYPE, flag)
  },
  async setSongDetail ({ commit }, ids) {
    const result = await getSongDetail({ ids: ids.join(',') })
    const urls = await getSongURL({ id: ids.join(',') })
    const list = []
    for (let i = 0; i < result.songs.length; i++) {
      const obj = {}
      for (let j = 0; j < urls.data.length; j++) {
        if (result.songs[i].id === urls.data[j].id) {
          obj.url = urls.data[j].url
          break
        }
      }
      obj.name = result.songs[i].name
      let singer = ''
      result.songs[i].ar.forEach((item, index) => {
        if (index === 0) {
          singer = item.name
        } else {
          singer += ' ' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = result.songs[i].al.picUrl
      obj.id = result.songs[i].id
      list.push(obj)
    }
    commit(SET_SONG_DETAIL, list)
  },
  async getSongLyric ({ commit }, id) {
    const result = await getSongLyric({ id })
    // console.log(result)
    let obj = {}
    if (Object.prototype.hasOwnProperty.call(result, 'lrc') && result.lrc.lyric) {
      obj = parseLyric(result.lrc.lyric)
    } else {
      obj = { 0: '纯音乐' }
    }
    commit(SET_SONG_LYRIC, obj)
  },
  setDelSong ({ commit }, index) {
    commit(SET_DEL_SONG, index)
  },
  setCurrentIndex ({ commit }, index) {
    commit(SET_CURRENT_INDEX, index)
  },
  setCurrentTime ({ commit }, time) {
    commit(SET_CURRENT_TIME, time)
  },
  setFavoriteSong ({ commit }, song) {
    commit(SET_FAVORITE_SONG, song)
  },
  setFavoriteList ({ commit }, favoriteList) {
    commit(SET_FAVORITE_LIST, favoriteList)
  },
  setHistorySong ({ commit }, song) {
    commit(SET_HISTORY_SONG, song)
  },
  setHistoryList ({ commit }, list) {
    commit(SET_HISTORY_LIST, list)
  }
}
