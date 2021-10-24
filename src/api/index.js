// 专门用于管理处理各种请求接口
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail', data)
export const getAlbum = (data) => Network.get('album', data)
export const getSongDetail = (data) => Network.get('song/detail', data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getArtistsSong = (data) => Network.get('artists', data)
export const getHotArtists = (data) => {
  return new Promise((resolve, reject) => {
    Network.get('top/artists?offset=0&limit=5', data)
      .then((result) => {
        resolve(result.artists)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise((resolve, reject) => {
    const lettersArtist = []
    Network.all([
      Network.get(`/artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=3&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=-1&area=96&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&type=-1&area=0&initial=${letter}`)
    ])
      .then((result) => {
        result.forEach((item) => {
          lettersArtist.push(...item.artists)
        })
        resolve(lettersArtist)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export const getAllArtists = (letters) => {
  return new Promise((resolve, reject) => {
    const keys = ['热']
    const list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      const char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(result => {
        resolve({ keys, list: result })
      }).catch(error => {
        reject(error)
      })
  })
}
