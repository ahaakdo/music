// 左侧导航栏
const navMsg = [
  { name: '首页', path: '/', icon: 'iconfont icon-xitongshouye' },
  { name: '歌单', path: '/song-list', icon: 'iconfont icon-dadie' },
  { name: '歌手', path: '/singer', icon: 'iconfont icon-xiuxianyule' },
  { name: '我的音乐', path: '/my-music', icon: 'iconfont icon-playlist' }
]

// 右侧导航栏
const loginMsg = [
  { name: '登录', path: '/login-in' },
  { name: '注册', path: '/sign-up' }
]

// 用户下拉菜单
const menuList = [
  { name: '设置', path: '/setting' },
  { name: '退出', path: 0 }
]

export {
  navMsg,
  loginMsg,
  menuList
}
