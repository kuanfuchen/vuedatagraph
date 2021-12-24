<template>
  <div id="header">
    <div class="">
      <div class="d-flex pt-2 align-items-center">
        <div class="">
          <img src="../assets/img/Logo.png" />
        </div>

        <div class="text-white headerTitle ms-5">修練精神時光屋</div>

        <!-- <a href="#" class=""></a> -->
        <!-- Example single danger button -->
        <div class="btn-group">
          <button
            type="button"
            class="btn text-white btn-sm dropdown-toggle ms-3"
            @click="headtitleBtn = !headtitleBtn"
            data-bs-toggle="dropdown"
            aria-expanded="true"
          >
            薪資調查報告
          </button>
          <ul
            class="dropdown-menu text-center"
            :class="{ show: headtitleBtn === true }"
            style="margin-top: 40px"
          >
            <li class="mb-1">
              <router-link
                class="headerTitle dropdown-item"
                :to="{ name: 'Home' }"
                @click="headtitleBtn = false"
                >前端工程師
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'uiinterface' }"
                class="headerTitle dropdown-item"
                @click="headtitleBtn = false"
                >UI設計師
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "header",
  data() {
    return {
      headtitleBtn: false,
    };
  },
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