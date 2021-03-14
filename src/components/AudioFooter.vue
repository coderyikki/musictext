<template>
  <div class="audio-footer">
    <div class="audio_con">
      <audio class="musicplay"  @click="audioActived" :src="$store.state.url" controls="controls" autoplay="muted"></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "AudioFooter",
  data(){
      return{
          isPlay: false,
      }
  },
  methods:{
      play(){
          this.isPlay = true
      },
      pause(){
          this.isPlay = false
      },
      audioActived(){
        this.$store.commit({
          type: "updatemusicControl",
          isPlay
        })
      }
  }
};
</script>

<style scoped>
.audio-footer {
  width: 100%;
}

.musicplay {
  position: relative;
  width: 100%;
  height: 40px;
  padding-top: 5px;
  outline: none;
  background-color: #f1f3f4;
  z-index: 2;
}
.audio_con {
  height: 45px;
  background-color: #f1f3f4;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
</style>