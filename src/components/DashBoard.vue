<template>
  <!-- component -->
  <Header />

  <!-- <div class="flex w-full h-screen">
    <SideBar />
    <section class="w-full p-4">
      <div class="w-full h-64 border-dashed border-4 p-4 text-md">
        Dashboard
      </div>
    </section>
  </div> -->
</template>
<script>
import Header from "./Header.vue";
import SideBar from "./SideBar.vue";
export default {
  components: {
    Header,
    SideBar,
  },
};
</script>
