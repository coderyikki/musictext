<template>
  <div id="home">
    <header-top></header-top>
    <music-content></music-content>
    <audio-footer></audio-footer>
  </div>
</template>

<script>
import AudioFooter from '../components/AudioFooter.vue';
import HeaderTop from "../components/HeaderTop";
import MusicContent from "../components/MusicContent";

export default {
  name: "Home",
  components: {
    HeaderTop,
    MusicContent,
    AudioFooter,
  },
};
</script>

<style scoped>
#home {
  position: relative;
  width: 80%;
  height: 80%;
  left: 0;
  top: 0;
  right: 0;
  margin: 50px auto;
}
</style>