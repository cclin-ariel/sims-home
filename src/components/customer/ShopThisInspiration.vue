<template>
  <div>
    <div class="mt-10 mb-5 max-w-1600px">
      <div class="flex flex-col justify-center">
        <div
          class="uppercase font-mono pl-2 flex justify-center text-xl tracking-wide"
        >
          {{ inspirationTitle }}
        </div>
        <div class="mx-auto my-12">
          <img
            class="sm:w-11/12 w-11/12 rounded max-w-2xl mx-auto"
            :src="this.inspirationPic"
            :alt="this.inspirationTitle"
          />
        </div>
      </div>
      <!-- division line -->
      <div class="border-b w-11/12 md:w-full mx-auto"></div>

      <!-- start of product grid -->
      <div
        class="flex mt-5 sm:mt-5 flex-col sm:flex-row flex-wrap justify-center w-full sm:max-w-11/12"
      >
        <div
          v-for="product in filterProductList"
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
                path: '`/sims_home/shop_product/${product.id}`',
                name: 'ShopProduct',
                query: {
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
import { mapActions } from "vuex";

export default {
  data() {
    return {
      inspirationPic: this.$route.params.inspirationPic,
      inspirationTitle: this.$route.params.productTitle,
    };
  },
  created() {
    this.getProducts();
    window.scrollTo(0, 0);
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    filterProductList() {
      return this.$store.state.products.filter((product) => {
        return (
          product.is_enabled == 1 && product.content === this.inspirationTitle
        );
      });
    },
  },
  methods: {
    ...mapActions(["getProducts"]),
  },
};
</script>
