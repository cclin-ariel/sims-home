<template>
  <div class="h-screen bg-bgColor">
    <Header />
    <div class="flex w-full sideBar-height">
      <Sidebar />
      <section class="w-full h-full px-4 pt-4">
        <router-view  />
      </section>
    </div>
  </div>
</template>
<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  created() {
    const simsCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)simsToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log("simsCookie",simsCookie);
    this.$http.defaults.headers.common.Authorization = `${simsCookie}`;
  },
};
</script>
<style scoped>
.sideBar-height {
  height: calc(100vh - 70px);
}
</style>
