<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item, index) in songStyle" :key="index" @click="handleChangeView(item.name)"
        :class="{ active: item.name == activeName }">
        {{ item.name }}
      </li>
    </ul>
    <div :class="{ show: flag === false }">
      <content-list :contentList="data"></content-list>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
          :current-page="currentPage" :page-size="pageSize" :total="albumDatas.length">
        </el-pagination>
      </div>
    </div>
    <div :class="{ show: flag !== false }">
      <!-- <Order :order="ord"></Order> -->
      <el-table :data="orderAlbumDatas" style="width: 100%" height="800" border
        :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }" @cell-click="handle">
        <el-table-column type="index" label="序号" width="50px" />
        <el-table-column label="图片" width="330px" margin-left="20px">
          <template slot-scope="scope">
            <img :src="'http://127.0.0.1:8888' + scope.row.pic" style="width:50%" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="250px" />
        <el-table-column prop="introduction" label="描述" width="260px" />
        <el-table-column prop="style" label="风格" width="250px" />
      </el-table>
    </div>
  </div>
</template>
<script>
import ContentList from '../components/ContentList'
import { getAllSongList, getSongListOfLikeStyle, getSongListOrder } from '../api/index'
// import { mixin } from '../mixins'
import { songStyle } from '../assets/data/songList'

export default {
  name: 'song-list',
  components: {
    ContentList
  },
  data () {
    return {
      tempData: [],
      tableData: [],
      flag: true,
      average: [], // 分数
      id: '',
      albumDatas: [], // 歌单数据
      orderAlbumDatas: [], // 排行后的歌单数据
      pageSize: 15, // 页面大小，一页有15条数据
      currentPage: 1, // 当前页，默认第一页
      songStyle: [], // 风格
      activeName: '全部歌单' // 当前风格
    }
  },
  computed: {
    // 计算当前表格中的数据
    data () {
      return this.albumDatas.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  created () {
    this.getOrderSongList()
  },
  mounted () {
    this.songStyle = songStyle
    this.getSongList()
  },

  methods: {
    getSongList () {
      getAllSongList()
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        }).catch(err => {
          console.log(err)
        })
    },
    // 获取排行榜数据
    getOrderSongList () {
      getSongListOrder().then(res => {
        console.log(res)
        this.orderAlbumDatas = res
      })
    },
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 根据style显示对应的歌单
    handleChangeView (name) {
      this.activeName = name
      this.albumDatas = []
      this.orderAlbumData = []
      if (name === '全部歌单') {
        this.getSongList()
        this.flag = true
      } else if (name === '排行榜') {
        this.flag = false
        this.getOrderSongList()
      } else {
        this.goSongListOfStyle(name)
        this.flag = true
      }
    },
    // 根据style查询对应的歌单
    goSongListOfStyle (style) {
      getSongListOfLikeStyle(style)
        .then(res => {
          this.currentPage = 1
          this.albumDatas = res
        })
    },
    // 查询所有歌单
    getData () {
      this.tempData = []
      this.tableData = []
      getAllSongList().then(res => {
        this.tempData = res
        this.tableData = res
        this.currentPage = 1
      })
    },
    // 跳转
    handle (row, column, cell, event) {
      console.log(row)
      console.log(column)
      console.log(cell)
      console.log(event)
      this.$store.commit('setTempList', row)
      this.$router.push({ path: `song-list-album/${row.id}` })
    }

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/song-list.scss';

.show {
  display: none;
}

img {
  margin-left: 20px;
}
</style>
