<template>
  <div>
    <div
      class="w-full sm:w-10/12 flex justify-center mx-auto mt-12 text-2xl font-mono uppercase"
    >
      ALL BEDDING
    </div>
    <div
      class="w-10/12 max-w-180px tracking-wide flex justify-center px-6 mx-auto mt-8 font-serif"
    >
      Sleep on it: Enjoy free shipping & returns on bedding.
    </div>

    <div
      class="max-w-screen-xl sm:w-10/12 mx-auto mt-10 flex flex-col justify-evenly sm:flex-row sm:flex-wrap sm:justify-around"
    >
      <div
        v-for="item in products"
        :key="item.id"
        :class="{ hidden: !item.imageUrl }"
        class="relative my-12 mx-3 max-w-md"
      >
        <img class="rounded" :src="`${item.imageUrl}`" :alt="`${item.title}`" />
        <router-link :to="`/sims_home/shop_product/${item.id}`">
          <button
            class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
          >
            check detail
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      product: {},
    };
  },
  methods: {
    getProducts() {
      const api = `https://vue-course-api.hexschool.io/api/cclin/products?page=:page`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log('getProducts', response.data)
        vm.isLoading = false;
        vm.products = response.data.products;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped></style>
