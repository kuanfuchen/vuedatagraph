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
  // text-align: center;
  // color: #2c3e50;
}
.bg {
  background-color: #28234c;
  height: 100vh;
}
</style>
