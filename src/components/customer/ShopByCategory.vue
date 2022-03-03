<template>
  <div>
    <div
      class="w-full sm:w-10/12 flex justify-center mx-auto mt-12 text-2xl font-mono uppercase"
    >
      ALL {{ categoryTarget }}
    </div>
    <div
      class="w-10/12 max-w-180px tracking-wide flex justify-center px-6 mx-auto mt-8 font-serif"
    >
      Enjoy free shipping & returns on your life.
    </div>

    <div
      class="max-w-screen-xl sm:w-10/12 mx-auto mt-10 flex flex-col justify-evenly sm:flex-row sm:flex-wrap sm:justify-around"
    >
      <div
        v-for="product in filterProductList"
        :key="product.id"
        :class="{ hidden: !product.imageUrl }"
        class="relative my-12 mx-3 max-w-md"
      >
        <img class="rounded" :src="`${product.imageUrl}`" :alt="`${product.title}`" />
        <router-link
          :to="{
            name: 'ShopProduct',
            params: {
              productID: product.id,
              targetProduct: JSON.stringify(product),
            },
            props: true,
          }"
        >
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
      productList: JSON.parse(this.$route.query.productList),
      categoryTarget: this.$route.query.cate,
    };
  },
  computed: {
    filterProductList() {
      return this.productList.filter((product) => {
        return (
          product.content !== "inspiration" &&
          product.is_enabled == 1 &&
          product.category === this.categoryTarget
        );
      });
    },
  },
  methods: {
    // getProducts() {
    //   const api = `https://vue-course-api.hexschool.io/api/cclin/products/all`;
    //   const vm = this;
    //   vm.isLoading = true;
    //   this.$http.get(api).then((response) => {
    //     // console.log('getProducts', response.data)
    //     vm.isLoading = false;
    //     vm.products = response.data.products;
    //   });
    // },
    // changeCategory(item) {
    //   this.categoryTarget = item;
    // },
  },
  created() {
    // this.getProducts();
  },
};
</script>

<style scoped></style>
