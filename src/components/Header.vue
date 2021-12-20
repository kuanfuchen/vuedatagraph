<template>
  <div id="header">
    <div class="">
      <div class="d-flex pt-2 align-items-center">
        <div class="">
          <img src="../assets/img/Logo.png" />
        </div>
        <a href="#" class="text-white headerTitle ms-5">修練精神時光屋</a>

        <a href="#" class="text-white headerTitle ms-5">薪資調查報告</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "header",
};
</script>
<style lang="scss">
#header {
  height: 80px;
  width: 100vw;
}
.headerTitle {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 16px;
  text-decoration: none;
}
</style>