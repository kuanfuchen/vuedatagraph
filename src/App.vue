<template>
  <div class="bg" id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "./assets/all.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  // text-align: center;
  // color: #2c3e50;
}
</style>
