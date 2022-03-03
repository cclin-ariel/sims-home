<template>
  <div>
    <div
      class="w-full sm:w-10/12 flex justify-center mx-auto mt-12 text-2xl font-mono uppercase"
    >
      Inspiration of {{ categoryTarget }}
    </div>
    <div
      class="w-10/12 max-w-180px tracking-wide flex justify-center px-1 sm:px-6 mx-auto mt-8 font-serif"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque dolore
      reprehenderit quos.
    </div>
    <!-- start of inspiration nav -->
    <div>
      <ul
        class="w-10/12 mx-auto sm:mt-8 sm:flex sm:justify-around hidden sm:block sm:text-sm sm:flex-wrap"
      >
        <li
          class="btn btn-outline-primary btn-sm border py-2 px-4 md:mx-2 border uppercase rounded-full sm:mb-5 hover:shadow"
          v-for="item in categories"
          :key="item.id"
        >
          <button class="uppercase" @click="changeCategory(item)">
            {{ item }}
          </button>
        </li>
      </ul>
    </div>
    <!-- end of inspiration nav -->
    <div class="flex mt-5 sm:mt-5 flex-wrap justify-center max-w-11/12">
      <div
        v-for="product in filterProductList"
        :key="product.id"
        class="mx-5 my-5 md:my-10"
      >
        <div class="relative my-12 mx-3 w-11/12 sm:min-w-10/12 max-w-2xl mx-auto">
          <img class="rounded" :src="product.imageUrl" alt="Interior Idea" />
          <router-link
            :to="{
              name: 'ShopThisInspiration',
              params: {
                inspirationPic: product.imageUrl,
                productTitle: product.title,
                productList: JSON.stringify(productList),
              },
              props: true,
            }"
          >
            <button
              class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-sm uppercase tracking-wide"
            >
              shop this look
            </button></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      productList: JSON.parse(this.$route.params.productList),
      categories: JSON.parse(this.$route.params.categoriesData),
      categoryTarget: this.$route.params.cate,
    };
  },
  created() {
    // if (this.$route.params.cate) {
    //   this.categoryTarget = this.$route.params.cate;
    // } else {
    //   this.categoryTarget = "bedroom";
    // }

    console.log(this.productList, this.categoryTarget);
  },
  computed: {
    filterProductList() {
      return this.productList.filter((product) => {
        return (
          product.is_enabled == 1 &&
          product.content === "inspiration" &&
          product.category === this.categoryTarget
        );
      });
    },
  },
  methods: {
    changeCategory(item) {
      this.categoryTarget = item;
    },
  },
};
</script>

<style scoped></style>
