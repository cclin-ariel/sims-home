<template>
  <div class="mt-24 mb-5 max-w-1600px w-full md:w-11/12 mx-auto">
    <div
      class="uppercase underline font-mono pl-2 flex justify-center text-xl tracking-wide"
    >
      INSPIRATION DELIVERED
      <div class="md:hidden ml-3">
        <!-- <button><i class="fas fa-caret-down"></i></button> -->
      </div>
    </div>
    <!-- start of inspiration nav -->
    <div>
      <ul
        class="max-w-full mx-auto sm:w-11/12 lg:w-10/12 sm:mt-8 md:mt-16 sm:flex sm:justify-around hidden sm:block sm:text-sm sm:flex-wrap"
      >
        <li
          class="btn btn-outline-primary btn-sm border py-2 px-4 md:mx-2 border uppercase rounded-full sm:mb-5 hover:shadow"
          v-for="item in categoriesOfInspiration"
          :key="item.id"
        >
          <router-link
            :to="{
              path: `/sims_home/shop_inspiration_idea/${item}`,
              name: 'ShopInspirationIdea',
              params: {
                inspirationTarget: item,
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
    <div class="flex mt-5 sm:mt-5 flex-wrap justify-center w-full mx-auto ">
      <div
        v-for="product in filteredInspirationList"
        :key="product.id"
        class="my-5 md:my-10"
      >
        <router-link
          :to="{
            name: 'ShopThisInspiration',
            params: {
              productTitle: product.title,
              inspirationPic: product.imageUrl,
            },
            props: true,
          }"
        >
          <img
            class="w-full sm:w-11/12 mx-auto sm:rounded max-w-lg"
            :src="product.imageUrl"
            :alt="product.title"
            loading="lazy"
        /></router-link>
        <div class="w-full sm:w-11/12 mx-auto text-xl text-center sm:text-left capitalize font-serif mt-8">
          {{ product.title }}
        </div>
        <div
          class="uppercase w-full sm:w-11/12 mx-auto text-center sm:text-left text-xs mt-5 hover:text-gray-500"
        >
          <router-link
          class="border p-2 "
            :to="{
              name: 'ShopThisInspiration',
              params: {
                productTitle: product.title,
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
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    categoriesOfInspiration() {
      return this.$store.state.categoriesOfInspiration;
    },
    filteredInspirationList() {
      return this.$store.state.products.filter((product) => {
        return product.is_enabled == 1 && product.content === "inspiration";
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
