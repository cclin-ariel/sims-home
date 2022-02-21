<template>
  <div class="max-w-screen flex flex-col items-center">
    <ShopNav />
    <div class="md:h-32 h-20"></div>
    <router-view />
    <ShopFooter />
  </div>
</template>
<script>
import ShopNav from "./ShopNav.vue";
import ShopFooter from "./ShopFooter.vue";
export default {
  components: {
    ShopNav,
    ShopFooter,
  },
};
</script>
