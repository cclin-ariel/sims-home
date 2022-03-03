<template>
    <div @click="getDataFromTopPage" class="mt-10 mb-5 max-w-1600px w-full md:w-11/12 mx-auto">
      <div
        class="uppercase font-mono pl-2 flex justify-center text-xl tracking-wide"
      >
        INSPIRATION DELIVERED
        <div class="md:hidden ml-3">
          <button><i class="fas fa-caret-down"></i></button>
        </div>
      </div>
      <!-- start of inspiration nav -->
      <div>
        <ul
          class="max-w-full mx-auto sm:w-11/12 lg:w-10/12 sm:mt-8 sm:flex sm:justify-around hidden sm:block sm:text-sm sm:flex-wrap"
        >
          <li
            class="btn btn-outline-primary btn-sm border py-2 px-4 md:mx-2 border uppercase rounded-full sm:mb-5 hover:shadow"
            v-for="item in categories"
            :key="item.id"
          >
            <router-link
              :to="{
                path: `/sims_home/shop_inspiration_idea/${item}`,
                name: 'ShopInspirationIdea',
                params: {
                  productList: JSON.stringify(productList),
                  categoriesData: JSON.stringify(categories),
                  cate: item,
                },
                props: true,
              }"
              >{{ item }}</router-link
            >
          </li>
        </ul>
      </div>
      <!-- end of inspiration nav -->

      <!-- start of inspiration grid -->
      <div class="flex mt-5 sm:mt-5 flex-wrap justify-center w-11/12 mx-auto">
        <div
          v-for="product in filterProductList"
          :key="product.id"
          class="mx-5 my-5 md:my-10"
        >
          <router-link
            :to="{
              name: 'ShopThisInspiration',
              params: {
                productTitle: product.title,
                inspirationPic: product.imageUrl,
                productList: JSON.stringify(productList),
              },
              props: true,
            }"
          >
            <img
              class="w-11/12 mx-auto rounded max-w-lg"
              :src="product.imageUrl"
              :alt="product.title"
              loading="lazy"
          /></router-link>
          <div class="w-full text-xl text-center capitalize font-serif mt-8">
            {{ product.title }}
          </div>
          <div
            class="uppercase w-full text-center text-xs mt-3 hover:text-gray-500"
          >
            <router-link
              :to="{
                name: 'ShopThisInspiration',
                params: {
                  productTitle: product.title,
                  productList: JSON.stringify(productList),
                },
                props: true,
              }"
            >
              shop now</router-link
            >
          </div>
        </div>
      </div>
      <!-- end of inspiration grid -->
    </div>
</template>
<script>
export default {
  props: ["categories", "productList"],
  data() {
    return {};
  },

  computed: {
    filterProductList() {
      return this.productList.filter((product) => {
        return product.is_enabled == 1 && product.content === "inspiration";
      });
    },
  },
  methods: {
    getDataFromTopPage() {
      // console.log(this.$parent.categoriesData);
      this.$parent.parentEvent();
    },
  },
};
</script>
