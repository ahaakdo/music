<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
      <hr />
    </h1>
    <div style="width: 100%">
    <el-table :data="commentlist" style="width: 100%" height="500" border :header-cell-style="{ 'text-align': 'center' }"
              :cell-style="{ 'text-align': 'center' }">
      <el-table-column type="index" label="序号"  />
      <el-table-column prop="songListId" label="歌单编号"  margin-left="20px" @cell-click="showTitle(comment.songListId)">
          <template slot-scope="scope">
            <div @click="showTitle(scope.row.songListId)">{{ scope.row.songListId }}</div>
          </template>
      </el-table-column>
      <el-table-column prop="content" label="评论内容" />
      <el-table-column prop="up" label="点赞数" />
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="danger" plain @click="deleteComment(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { mixin } from '../mixins'
import '../assets/js/alert'
import { deleteUserComment, getUserAllComment, getSongListTitleById } from '../api/index.js'

export default {
  name: 'comment-content',
  mixins: [mixin],
  props: [
    'userCommentList'
  ],
  data () {
    return {
      commentlist: [], // 评论列表
      title: [],
      songList: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    console.log(this.userId)
    this.getUserAllComment(this.userId)
    this.go()
  },
  mounted () {
    this.go()
  },
  methods: {
    // toCommentPlace (songListId) {
    //   console.log(songListId)
    //   this.$router.push({ path: `song-list-album/${songListId}` })
    // },
    deleteComment (id) {
      deleteUserComment(id)
      location.reload()
    },
    // 通过用户id获取用户评论过的内容
    getUserAllComment (userId) {
      getUserAllComment(userId)
        .then(res => {
          this.commentlist = res
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取歌单名
    getUserAllCommentTitle (listId) {
      getSongListTitleById(listId)
        .then(res => {
          this.songList = res
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    showTitle(songListId) {
      getSongListTitleById(songListId).then(title=>{
        alert(title);
      })
    }
    // go () {
    //   for (let i = 0; i < this.commentlist.length; i++) {
    //     this.songList = this.getUserAllCommentTitle(this.commentlist[i].songListId)
    //     console.log('1')
    //   }
    //   for (let i = 0; i < this.songList.length; i++) {
    //     this.title = this.songList.title
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/comment-content.scss';
</style>
