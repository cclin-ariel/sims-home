<template>
  <div>
    <Header />

    <div class="flex w-full h-screen">
      <Sidebar />
      <section class="w-full p-4">
          dashboard
            <router-view />

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
};
</script>
