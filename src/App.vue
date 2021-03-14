<template>
  <div id="app">
    <div class="bg">
      <home></home>
    </div>
  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style scoped>
#app {
  position: relative;
}

.bg {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-image: url("../public/indexBg/animescape-4.jpg");
  background-size: cover;
  background-attachment: fixed;
  z-index: -1;
}
</style>

