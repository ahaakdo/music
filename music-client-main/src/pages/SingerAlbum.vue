<template>
    <div class="singer-album">
        <div class="album-slide">
            <div class="singer-img">
                <img :src="attachImageUrl(singer.pic)">
            </div>
            <ul class="info">
                <li v-if="singer.sex==0||singer.sex==1">{{attachSex(singer.sex)}}</li>
                <li>生日：{{attachBirth(singer.birth)}}</li>
                <li>故乡：{{singer.location}}</li>
            </ul>
        </div>
        <div class="album-content">
            <div class="intro">
                <h2>{{singer.name}}</h2>
                <span>{{singer.introduction}}</span>
            </div>
            <div class="content">
                <album-content :songList="listOfSongs">
                    <template slot="title">歌单</template>
                </album-content>
            </div>
        </div>
    </div>
</template>
<script>
import { mixin } from '../mixins';
import { mapGetters } from 'vuex';
import { songOfSingerId } from '../api/index';
import AlbumContent from '../components/AlbumContent';

export default {
  name: 'singer-album',
  mixins: [mixin],
  components: {
    AlbumContent
  },
  data() {
    return {
      singerId: '',       // 前面传来的歌手id
      singer: {},         // 当前歌手信息
    };
  },
  computed: {
    ...mapGetters([
      'listOfSongs',      // 当前播放列表
      'tempList',         // 当前歌手对象
      'loginIn',          // 用户是否已登录
      'userId',           // 当前登录用户id
    ])
  },
  created() {
    this.singerId = this.$route.params.id;
    this.$store.dispatch('tempList/updateTempList', { tempList: [], clear: true });
    this.getSongOfSingerId(); 
    console.log('Temp List:', this.tempList);
    this.singer = this.tempList;
  },
  methods: {
    // 根据歌手id查询歌曲
    async getSongOfSingerId() {
        try {
        const res = await songOfSingerId(this.singerId);
        console.log('API Response:', res);
        this.$store.commit('setListOfSongs', res);
        this.singer = this.tempList;
        console.log('Temp List:', this.tempList);
        } catch (error) {
        console.error('Error fetching singer info:', error);
        }
    },
    // 获取性别
    attachSex(value) {
      if (value == 0) {
        return '女';
      } else if (value == 1) {
        return '男';
      }
      return '';
    },
    // 获取生日
    attachBirth(birth) {
      if (!birth) {
        return '';  // 如果 birth 为 undefined 或 null，返回一个空字符串或默认值
      }
      return birth.substr(0, 10);  // 进行 substr 操作
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/singer-album.scss';
</style>