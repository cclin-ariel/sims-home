<template>
  <div class="w-full fixed bg-white z-40 sm:px-2">
    <!-- header -->
    <div class="relative flex justify-between pb-8 pt-5 sm:py-5 mt-2">
      <div class="flex md:w-2/12">
        <!-- leaf logo -->
        <div class="rounded-full w-4 h-4 sm:w-7 sm:h-7">
          <img src="@/assets/logo.jpg" alt="logo" />
        </div>
        <div
          class="
            uppercase
            text-xs
            pl-0
            sm:pl-2
            font-mono
            self-center
            sm:text-base
          "
        >
          inspiration
        </div>
      </div>
      <div
        class="
          absolute
          top-1/2
          left-1/2
          transform
          -translate-x-1/2 -translate-y-1/2
          uppercase
          text-2xl
          font-serif
          lg:text-3xl
          text-center
        "
      >
        <router-link :to="{ path: '/sims_home' }"> sims-home</router-link>
      </div>
      <div class="flex font-mono self-center sm:w-4/12 md:3/12 justify-end">
        <div
          class="
            search
            uppercase
            text-xs
            sm:text-base
            my-auto
            flex flex-row
            sm:justify-end
            relative
            hidden
            md:block
          "
        >
          <input
            class="
              focus:ring-2
              focus:ring-gray-300
              focus:outline-none
              focus:border-transparent
              border
              rounded
              mr-2
              pl-3
              w-6/12
              md:w-8/12
            "
            type="text"
            v-model="searchKeyword"
            @keyup.enter="toShopByKeyword(filteredByKeywordList)"
            placeholder="Search"
          />
          <!-- start of input filter -->
          <div
            class="
              search
              absolute
              top-7
              left-0
              w-6/12
              md:w-8/12
              bg-bgColor
              rounded-bl rounded-br
              py-1
              px-2
              text-gray-500
            "
            v-if="this.filteredByKeywordList && this.searchKeyword"
          >
            <div
              class="searchResult border-b"
              v-for="product in filteredByKeywordList"
              :key="product.id"
            >
              <button
                class="uppercase text-left"
                @click="toShopProduct(product)"
              >
                {{ product.title }}
              </button>
            </div>
          </div>
          <!-- end of input filter -->
          <button @click="toShopByKeyword(filteredByKeywordList)" class="px-2">
            <i class="fas fa-search m-auto"></i>
          </button>
        </div>
        <div class="flex flex-row">
          <router-link
            class="shop-cart sm:pl-1 my-auto mr-3"
            to="/sims_home/shop_Cart"
          >
            <i class="fa badge fa-lg" :value="this.cartsAmount">&#xf07a;</i>
          </router-link>
          <button
            class="md:hidden flex self-senter mx-2"
            @click="mobileCategoryShowing = !mobileCategoryShowing"
          >
            <div><i class="fas fa-bars"></i></div>
          </button>
        </div>
      </div>

      <!-- division line -->
    </div>
    <div class="md:hidden block border-b w-full"></div>
    <!--start of nav -->
    <div
      class="
        nav
        border-t border-b
        py-2
        lg:px-32
        md:px-auto
        px-2
        font-mono
        hidden
        md:block
      "
    >
      <ul class="flex flex-row justify-around">
        <li class="uppercase" v-for="category in categories" :key="category.id">
          <router-link
            :to="{
              path: '`/shop_by_category/${category}`',
              name: 'ShopByCategory',
              query: {
                cate: category,
              },
              props: true,
            }"
            class="border-0 hover:text-gray-400 px-2 border-secondaryColor"
            >{{ category }}</router-link
          >
        </li>
      </ul>
    </div>
    <!--end of nav -->
    <!-- start of mobileCategoryShowing -->
    <div
      v-if="mobileCategoryShowing"
      class="bg-bgColor relative px-2 pt-2 shadow-lg"
    >
      <div class="flex justify-between border-b-2 px-2">
        <div
          class="
            uppercase
            text-left
            py-3
            text- text-secondaryColor
            tracking-wider
            font-medium
          "
        >
          search by categorys
        </div>
        <button @click="mobileCategoryShowing = false">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <ul class="flex flex-col justify-left">
        <li
          class="uppercase py-3 border-b"
          v-for="category in categories"
          :key="category.id"
          @click="mobileCategoryShowing = false"
        >
          <router-link
            :to="{
              path: '`/shop_by_category/${category}`',
              name: 'ShopByCategory',
              query: {
                cate: category,
              },
            }"
            class="px-2 hover:text-gray-500 tracking-wider flex justify-between"
          >
            <div>
              {{ category }}
            </div>
            <i class="fas fa-angle-right"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- end of mobileCategoryShowing -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      mobileCategoryShowing: false,
      searchKeyword: "",
    };
  },
  computed: {
    ...mapGetters(["cartsAmount"]),
    categories() {
      return this.$store.state.categories;
    },
    filteredByKeywordList() {
      return this.$store.state.products.filter((product) => {
        return (
          (!product.title.toUpperCase().includes("INSPIRATION") &&
            product.title
              .toUpperCase()
              .includes(this.searchKeyword.toUpperCase())) ||
          (!product.title.toUpperCase().includes("INSPIRATION") &&
            product.category
              .toUpperCase()
              .includes(this.searchKeyword.toUpperCase()))
        );
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
  methods: {
    ...mapActions(["getProducts", "getCart", "productsFilterByCate"]),
    toShopProduct(product) {
      this.$router.push({
        path: "`/sims_home/shop_product/${product.id}`",
        name: "ShopProduct",
        query: {
          productID: product.id,
          targetProduct: JSON.stringify(product),
        },
        props: true,

        params: { targetProduct: JSON.stringify(product) },
      });
      this.searchKeyword = "";
    },

    toShopByKeyword(filteredList) {
      console.log("toShopByKeyword", this.filteredByKeywordList);
      if (!this.searchKeyword) return;
      if (this.searchKeyword) {
        this.$router.push({
          name: "ShopByKeyword",
          params: {
            filteredListFromSearchKeyword: JSON.stringify(filteredList),
          },
        });
      }
      this.searchKeyword = "";
    },
  },
};
</script>

<style scoped>
.badge:after {
  content: attr(value);
  font-size: 11px;
  color: #fff;
  background: #c19434;
  border-radius: 50%;
  padding: 0 5px;
  position: relative;
  left: -8px;
  top: -10px;
  opacity: 0.9;
}
</style>
