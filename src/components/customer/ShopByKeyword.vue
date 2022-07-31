<template>
  <div>
    <div class="mt-10 mb-5 max-w-1600px">
      <div class="flex flex-col justify-center">
        <div
          class="uppercase font-mono pl-2 flex justify-center text-xl tracking-wide"
        >
          ALL SEARCH RESULTS
        </div>
      </div>
      <!-- division line -->
      <div class="border-b w-11/12 md:w-11/12 mx-auto mt-16"></div>

      <!-- start of product grid -->
      <div
        class="flex mt-5 sm:mt-5 flex-col sm:flex-row flex-wrap justify-center w-full sm:max-w-11/12"
      >
        <div
          v-for="product in filteredListFromNav"
          :key="product.id"
          class="mx-5 my-5 md:my-10"
        >
          <router-link
            :to="{
              path: '`/sims_home/shop_product/${product.id}`',
              name: 'ShopProduct',
              query: {
                productID: product.id,
                targetProduct: JSON.stringify(product),
              },
              props: true,
            }"
          >
            <img
              class="sm:w-11/12 w-full rounded max-w-xl mx-auto"
              :src="product.imageUrl"
              :alt="product.title"
            />
          </router-link>

          <div
            class="w-full sm:w-11/12 mx-auto text-xl text-center sm:text-left capitalize font-serif mt-8"
          >
            {{ product.title }}
          </div>

          <div
            class="uppercase w-full sm:w-11/12 mx-auto text-center sm:text-left text-xs mt-5 hover:text-gray-500"
          >
            <router-link
              class="border p-2"
              :to="{
                name: 'ShopProduct',
                params: {
                  productID: product.id,
                  targetProduct: JSON.stringify(product),
                },
                props: true,
              }"
            >
              shop now</router-link
            >
          </div>
        </div>
      </div>
      <!-- end of product grid -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // filteredListFromNav: JSON.parse(
      //   this.$route.params.filteredListFromSearchKeyword
      // ),
    };
  },
  created() {
    window.scrollTo(0, 0);
    // console.log(
    //   "filteredListFromNav",
    //   this.$route.params.filteredListFromSearchKeyword
    // );
  },
  computed: {
    filteredListFromNav() {
      return JSON.parse(this.$route.params.filteredListFromSearchKeyword);
    },
  },
};
</script>
