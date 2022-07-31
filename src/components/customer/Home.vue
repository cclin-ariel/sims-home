<template>
  <div class="max-w-screen flex flex-col items-center min-h-screen" >
    <!-- start of loading -->
    <div
      v-if="isLoading"
      class="w-full h-screen z-50 fixed flex flex-col bg-bgColor bg-opacity-90"
    >
      <div class="m-auto w-full">
        <div class="fa-3x text-center w-full">
          <i class="fas fa-spinner fa-spin m-auto"></i>
        </div>
        <div
          class="w-full capitalize text-center mx-auto mt-8 font-mono text-lg"
        >
          please wait a minute...
        </div>
      </div>
    </div>
    <!-- end of loading -->
    <ShopNav ref="topPageInspiration" />
    <div class="md:h-32 h-20"></div>
    <router-view class="flex-grow" ref="topPageInspiration" />
    <ShopFooter class="flex-none" />
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
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>
