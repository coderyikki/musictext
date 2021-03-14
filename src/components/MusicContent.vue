<template>
  <div class="music-content">
    <div class="leftside">
      <div class="song_header">
        <span>全部歌曲</span>
        <span>歌手</span>
      </div>
      <ul class="song_list">
        <li v-for="(item, index) in songlist" :key="index">
          <a
            :class="{ actived_color: active == index }"
            @click="changecolor(index), getMusicInformation(item.id)"
            >{{ (index + 1) | addzero }}&nbsp;&nbsp;
            <i
              :class="
                active == index ? 'el-icon-video-pause' : 'el-icon-video-play'
              "
            ></i>
            &nbsp;&nbsp;<span class="songname">{{ item.name }}</span>
            <span class="singer">{{ item.artists[0].name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="center">
      <div class="song_pic">
        <img :class="$store.state.isPlay != true ? 'rotate' : 'rotatePause'" :src="$store.state.pic" alt="" />
      </div>
    </div>


    <div class="rightside">
      <div class="hotcomments">
        热门评论
      </div>
      <ul class="comments_list">
        <li v-for="item in $store.state.comment">
          <div class="userpic">
            <img :src="item.user.avatarUrl" alt="">
          </div>
          <div class="usercomment">
            <div class="userNickName">{{ item.user.nickname }}</div>
            <div class="userhotcomment">{{ item.content}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import request from "../network/request";

export default {
  name: "MusicContent",
  data() {
    return {
      active: -1,
      musicUrl: "",
      // 用来接收vuex state内的音乐列表，用处为监听后改变a的状态
      songlist: null,
      musicpic: "",
      musicComment:null,
    };
  },
  watch: {
    "$store.state.songs"() {
      if (this.songlist != this.$store.state.songs) {
        (this.active = -1), (this.songlist = this.$store.state.songs);
      }
    },
  },
  filters: {
    addzero(index) {
      if (index < 10) {
        return "0" + index;
      } else {
        return index;
      }
    },
  },
  methods: {
    changecolor(index) {
      this.active = index;
    },

    getMusicInformation(musicId) {
      let that = this;

      // 获取歌曲地址
      request("/song/url?", {
        params: {
          id: musicId,
        },
      }).then((res) => {
        that.musicUrl = res.data.data[0].url;
        const url = that.musicUrl;
        this.$store.commit({
          type: "updateUrl",
          url,
        });
      });

      //获取歌曲封面
      request("/song/detail?", {
        params: {
          ids: musicId,
        },
      }).then((res) => {
        that.musicpic = res.data.songs[0].al.picUrl;
        const pic = that.musicpic;
        this.$store.commit({
          type: "updatePic",
          pic,
        });
      });

      request("/comment/hot?type=0&",{
        params:{
          id: musicId,
        },
      }).then(res=>{
        that.musicComment = res.data.hotComments;
        const comment = that.musicComment;
        this.$store.commit({
          type:"updateComment",
          comment
        })
      })
    },
  },
};
</script>

<style scoped>
.music-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 550px;
  background-color: rgba(184, 227, 240, .6);
}

/* song_list   section    Start */
.leftside {
  width: 35%;
  height: 100%;
  box-shadow: 1px 0px 5px 1px lightpink;
}

.song_header {
  width: 100%;
  font-weight: 700;
  padding: 10px 0;
  margin-left: 80px;
}

.song_header :nth-child(2) {
  padding-left: 180px;
}

.song_list {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 隐藏滚动条 */
.song_list::-webkit-scrollbar {
  display: none;
}

.song_list li {
  color: #333;
  height: 40px;
  padding-left: 10px;
  transition: all 0.2s;
}

.song_list li:nth-child(odd) {
  background-color: rgba(240, 240, 240, 0.3);
}

.song_list li:hover {
  background-color: #fff;
}

.actived_color {
  color: red;
}

.song_list li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 40px;
  font-size: 16px;
  padding-left: 10px;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.song_list li a i {
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}

.song_list li a .singer {
  float: right;
  padding-right: 50px;
}
/* song_list   section    End */

/* content   section    Start */
.center {
  width: 45%;
  height: 100%;
}

.song_pic {
  display: block;
  width: 60%;
  margin: 50% auto;
  padding: 45px;
  background: linear-gradient(130deg, skyblue, pink);
  background-size: 200% 200%;
  border-radius: 50%;
  animation: animation-gradient 2s linear infinite;
  transform: translate(0,-50%);
}

@keyframes animation-gradient{
  25% {
    background-position: left bottom;
  }
  50% {
    background-position: right bottom;
  }
  75% {
    background-position: right top;
  }
  100% {
    background-position: left top;
  }
}

.song_pic img {
  max-width: 100%;
  border-radius: 50%;
}

.song_pic .rotate{
  animation: animation-rotate 30s linear infinite;
  transform-origin: 50% 50%;
}

.song_pic .rotatePause{
  animation-play-state:paused;
}

@keyframes animation-rotate{
  to{
    transform:rotate(1turn);
  }
}
/* content   section    End */


/* comment section Start */
.rightside {
  width: 20%;
  height: 100%;
  box-shadow: -1px 0px 5px 1px lightblue;
}

.hotcomments{
  margin: 10px;
  font-weight: 700;
}

.comments_list{
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.comments_list::-webkit-scrollbar {
  display: none;
}

.comments_list li{
  position: relative;
  display: block;
  margin-bottom: 15px;
  padding-bottom: 15px;
  box-shadow: 0px 1px 1px 1px rgba(160, 248, 244, 0.5);
}

.userpic{
  position: absolute;
  display: inline-block;
  width: 40px;
  margin-left: 8px;
}

.userpic img{
  max-width: 100%;
  border-radius: 50%;
}

.usercomment{
  width: 70%;
  margin-left: 50px;
  padding-top: 5px;
}

.userNickName{
  margin: 5px;
  font-size: 14px;
  font-weight: 700;
}

.userhotcomment{
  margin-left: 5px;
  font-size: 14px;
}
/* comment section End */
</style>