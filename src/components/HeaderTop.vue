<template>
  <div class="header-top">
    <div class="logo">MusicText</div>
    <div class="search-all">
      <input
        v-model="query"
        @keyup.enter="searchMusic()"
        class="search"
        type="text"
      />
      <el-button
        @click="searchMusic()"
        class="search-icon"
        type="primary"
        icon="el-icon-search"
      ></el-button>
    </div>
  </div>
</template>

<script>
import request from "../network/request";

export default {
  name: "HeaderTop",
  data() {
    return {
      //关键字
      query: '',
      //音乐列表
      musicList: [],
    };
  },
  methods: {
    searchMusic() {
      if(this.query == 0){
        return
      }
      let that = this;
      request("/search?", {
        params: {
          keywords: this.query,
        },
      })
        .then((res) => {
          that.musicList = res.data.result.songs;
          console.log(res);
          const songs = that.musicList;
          const name = that.query;
          this.$store.commit({
            type: "updateinfo",
            songs,
            name,
          })
        })
        .catch((err) => {
          console.log(err);
        })
        this.query = ''
    },
  },
};
</script>

<style scoped>
.header-top {
  display: flex;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  border-radius: 8px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: pink;
}

.logo {
  margin: 10px;
  padding-left: 10px;
  font-weight: 700;
}

.search-all {
  position: relative;
}

.search {
  height: 30px;
  line-height: 30px;
  margin: 5px;
  margin-right: 20px;
  padding: 0 15px;
  color: #737477;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  border: none;
  outline: none;
}

.search-icon {
  position: absolute;
  right: 25px;
  top: 5px;
  border: 0;
  height: 30px;
  padding: 5px;
  color: #606266;
  background-color: transparent;
}
</style>