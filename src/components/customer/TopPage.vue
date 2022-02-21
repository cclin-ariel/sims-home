<template>
  <div>
    <!-- section fo INSPIRATION DELIVERED -->
    <SaleSection />
    <!-- division line -->
    <div class="border-b w-full lg:w-10/12 mx-auto"></div>
    <ShopByInspiration :categories="categoriesData" :productList="products" ref="topPageInspiration" />
    <!-- division line -->
    <div class="border-b w-full md:w-10/12"></div>
    <ShoppingCarousel :productList="products" ref="topPageInspiration"/>
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
  data() {
    return {
      products:[],
      categoriesData: [
        "bedroom",
        "bath",
        "kitchen",
        "living",
        "dining",
        "outdoor",
        "LIGHT & DECOR",
        "ART",
      ],
    };
  },
  created() {
    this.getProducts()
  },
  methods: {
    parentEvent() {
      // console.log("pass the categoriesData");
    },
    getProducts() {
      const api = `https://vue-course-api.hexschool.io/api/cclin/products/all`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
  },
};
</script>
