<template>
  <div class="max-w-screen flex flex-col items-center">
    <ShopNav />
    <div class="md:h-32 h-20"></div>
 
    <!-- section fo INSPIRATION DELIVERED -->
    <SaleSection />
    <!-- division line -->
    <div class="border-b w-full md:w-10/12"></div>
    <ShopByInspiration />
    <!-- division line -->
    <div class="border-b w-full md:w-10/12"></div>
    <ShoppingCarousel />

    <ShopFooter />
  </div>
</template>
<script>
import ShopNav from "./ShopNav.vue";
import SaleSection from "./SaleSection.vue";
import ShopByInspiration from "./ShopByInspiration.vue";
import ShoppingCarousel from "./ShoppingCarousel.vue";
import ShopFooter from "./ShopFooter.vue";
export default {
  components: {
    ShopNav,
    SaleSection,
    ShopByInspiration,
    ShoppingCarousel,
    ShopFooter,
  },
};
</script>
