<template>
  <div class="swiper">
    <el-carousel :interval="4000" type="card" height="280px">
      <el-carousel-item v-for="(item, index) in swiperList" :key="index">
        <img :src="item.picImg" @click="PlaySong" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { swiperList } from '../assets/data/swiper'
import { mapGetters } from 'vuex'
import { getAllSong } from '../api/index'
import { mixin } from '../mixins'
// import { get } from '../api/http'
export default {
  name: 'swiper',
  mixins: [mixin],
  data () {
    return {
      swiperList: [],
      songLists: [], // 当前页面需要展示的歌曲列表
      songsId: '', // 歌曲id
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'listOfSongs', // 当前播放列表
      'tempList', // 当前歌单对象
      'loginIn', // 用户是否已登录
      'userId' // 当前登录用户id
    ])
  },
  created () {
    this.swiperList = swiperList
    this.getSong()
  },
  methods: {
    PlaySong () {
      console.log(this.songs)
      this.songsId = Math.floor(Math.random() * (this.songs.length - 1) + 1)
      console.log(this.songsId)
      console.log(this.songs[this.songsId])
      this.toplay(this.songs[this.songsId].id, this.songs[this.songsId].url, this.songs[this.songsId].pic,
        0, this.songs[this.songsId].name, this.songs[this.songsId].lyric)
    },
    getSong () {
      getAllSong().then(res => {
        this.songs = res
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/swiper.scss';
</style>
