// 专门用于管理处理各种请求接口
import Network from './network'

export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized')
