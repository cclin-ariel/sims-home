<template>
  <div class="w-full">
    <!-- section fo INSPIRATION DELIVERED -->
    <SaleSection />
    <!-- division line -->
    <div class="border-b w-full mx-auto md:w-10/12"></div>
    <ShopByInspiration />
    <!-- division line -->
    <div class="border-b w-full mx-auto md:w-10/12"></div>
    <ShoppingCarousel />
  </div>
</template>

<script>
import SaleSection from "./SaleSection.vue";
import ShopByInspiration from "./ShopByInspiration.vue";
import ShoppingCarousel from "./ShoppingCarousel.vue";
export default {
  components: {
    SaleSection,
    ShopByInspiration,
    ShoppingCarousel,
  },
};
</script>
