<template>
  <div>
    <div
      class="w-full sm:w-10/12 flex justify-center mx-auto mt-12 text-2xl font-mono uppercase"
    >
      ALL {{ categoryTarget }}
    </div>
    <div
      class="w-full tracking-wide flex justify-center px-6 mx-auto mt-8 leading-relaxed my-6 font-mono"
    >
      Enjoy free shipping & returns on your life.
    </div>

    <div
      class="w-11/12 sm:w-10/12 mx-auto mt-10 flex flex-col justify-evenly sm:flex-row sm:flex-wrap sm:justify-around"
    >
      <div
        v-for="product in filterProductList"
        :key="product.id"
        :class="{ hidden: !product.imageUrl }"
        class="relative my-12 mx-auto max-w-md"
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
            class="rounded"
            :src="`${product.imageUrl}`"
            :alt="`${product.title}`"
          />
        </router-link>
        <div class="mt-3 border-t">
          <div class="w-full mt-3 font-serif capitalize text-lg">
            {{ product.title }}
          </div>
          <div class="w-full mt-0 xm-auto font-sans text-sm text-gray-500">
            ${{ product.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    categoryTarget() {
      return this.$route.query.cate;
    },
    filterProductList() {
      return this.$store.state.products.filter((product) => {
        // console.log("ByCate", this.categoryTarget);
        window.scrollTo(0, 0);

        return (
          product.content !== "inspiration" &&
          product.is_enabled == 1 &&
          product.category === this.categoryTarget
        );
      });
    },
  },
  methods: {
    ...mapActions(["getProducts"]),
  },
  created() {
    this.getProducts();
  },
};
</script>
