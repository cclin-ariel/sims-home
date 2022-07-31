<template>
  <div
    class="w-11/12 lg:w-10/12 xl:w-8/12 max-w-1600px flex justify-center flex-col sm:w-10/12"
  >
    <!-- start of breadcrumb -->
    <div class="w-full flex flex-row pl-5 md:pl-0 w-full md:w-10/12 my-8">
      <p
        class="text-sm sm:text-base font-serif capitalize"
        to="/sims_home/shop_by_category"
      >
        product
      </p>
      <div class="mx-3 flex self-center">
        <i class="fas fa-chevron-right fa-xs"></i>
      </div>
      <router-link
        class="hover:text-gray-400 text-sm sm:text-base font-serif capitalize"
        :to="{
          path: '`/shop_by_category/${category}`',
          name: 'ShopByCategory',
          query: {
            cate: product.category,
          },
          props: true,
        }"
        >{{ product.category }}</router-link
      >
      <div class="mx-3 flex self-center">
        <i class="fas fa-chevron-right fa-xs"></i>
      </div>
      <p
        class="text-sm sm:text-base font-serif capitalize"
        to="/sims_home/shop_by_category"
      >
        {{ product.title }}
      </p>
    </div>
    <!-- end of breadcrumb -->

    <div
      class="mx-auto w-full flex flex-col md:grid md:grid-flow-col md:auto-col-min"
    >
      <!-- start of carousel -->
      <div
        class="relative slide w-full mt-3 order-2 md:order-1 md:row-span-3 md:col-span-1 lg:max-w-4xl"
      >
        <div
          class="carousel-inner relative overflow-hidden w-11/12 lg:w-10/12 mx-auto md:mx-0 flex flex-row"
        >
          <div
            class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
          >
            <img
              class="block w-full max-w-2xl mx-auto sm:mx-0 rounded"
              :src="product.imageUrl"
              :alt="product.title"
            />
          </div>
        </div>
      </div>
      <!-- end of carousel -->

      <!-- start of product detail -->
      <!-- start of product title -->
      <div
        class="mx-auto w-full max-w-4xl order-1 md:order-2 md:col-span-1 md:h-10 md:pl-3 lg:pt-5"
      >
        <div class="underline px-5 tracking-widest md:px-0">new!</div>
        <div
          class="w-full capitalize font-serif text-xl px-5 md:px-0 tracking-widest mt-1 mb-3"
        >
          {{ product.title }}
        </div>
      </div>
      <!-- end of product title -->

      <div
        class="order-3 md:pl-3 lg:pt-5 md:col-span-1 md:row-span-2 flex flex-col md:min-w-2xl"
      >
        <!-- division line -->
        <div class="flex self-center border-b-2 w-11/12 sm:hidden"></div>

        <div class="sm:mt-8 w-10/12 md:w-full flex self-center flex-col">
          <div class="text-gray-500 tracking-wider text-xl mt-8">
            {{ product.price | currency }}
          </div>
          <!-- start of QTY -->
          <div class="flex flex-row mt-5">
            <div class="text-gray-500 flex self-center">QTY:</div>
            <div class="pl-3">
              <div
                class="flex flex-row border h-10 w-24 border-gray-400 relative"
              >
                <button
                  class="border-r bg-gray-300 hover:bg-bgColor text-white border-gray-400 h-full w-20 flex focus:outline-none cursor-pointer"
                >
                  <span class="m-auto" @click="reduce">-</span>
                </button>
                <input
                  type="hidden"
                  class="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center"
                  readonly
                  name="custom-input-number"
                />
                <div
                  class="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default"
                >
                  <span class="text-gray-500">{{ num }}</span>
                </div>

                <button
                  class="border-l bg-gray-300 hover:bg-bgColor text-white border-gray-400 h-full w-20 flex focus:outline-none cursor-pointer"
                >
                  <span class="m-auto" @click="add">+</span>
                </button>
              </div>
            </div>
          </div>
          <!-- end of QTY -->
          <button
            @click="addToCart(product.id, num)"
            class="uppercase rounded px-3 py-2 m-1 shadow-lg bg-secondaryColor text-white my-10 tracking-widest w-full sm:max-w-md mx-auto"
          >
            add to bag
          </button>
        </div>
        <!-- division line -->
        <div class="flex self-center border-b-2 w-11/12"></div>

        <div class="mt-8 w-10/12 flex self-center flex-col">
          <div class="uppercase text-gray-500 tracking-wider">description</div>
          <div class="text-gray-400 text-sm tracking-wider mt-3 mb-16">
            {{ product.description }}
          </div>
        </div>
      </div>
    </div>
    <!-- end of product detail -->
    <!-- start of successfully added message -->
    <div
      v-if="successfullyAdded"
      class="flex items-center justify-center fixed left-0 bottom-0 sm:w-full h-full font-mono border-gray-400 shadow-lg"
    >
      <div class="bg-white rounded-lg w-11/12 sm:w-1/2 border-gray-400 shadow">
        <div class="flex flex-col items-start p-4">
          <div class="flex items-center w-full border-b">
            <div class="font-light mt-3">Added to your Bag...</div>
          </div>
          <div class="font-medium pt-3">
            <div class="flex">
              <div class="w-8/12 sm:w-full">
                <img
                  class="block w-full max-w-xs rounded sm:flex sm:justify-center"
                  src="product.imageUrl"
                  alt="image"
                />
              </div>
              <div class="pl-3 sm:pl-5 pt-2">
                <div class="col-span-2 font-serif capitalize my-auto">
                  {{ tempProduct.product.title }}
                </div>
                <div class="mt-3 text-sm">
                  <div class="tracking-wider">QTY: {{ tempProduct.qty }}</div>
                  <div class="tracking-wider">
                    {{ tempProduct.total | currency }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="w-full mx-auto mt-3 border-t pt-3 flex">
            <router-link class="shop-cart w-1/2" to="/sims_home/shop_Cart">
              <button
                class="border w-full px-3 py-1 ml-2 bg-secondaryColor text-bgColor uppercase hover:opacity-70 hover:border-secondaryColor"
                @click="successfullyAdded = false"
              >
                view bag
              </button>
            </router-link>
            <button
              class="px-3 py-1 ml-2 w-1/2 text-base uppercase cursor-pointer"
              @click="successfullyAdded = false"
            >
              continue shopping <i class="fas fa-caret-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of successfully added message -->
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      product: JSON.parse(this.$route.query.targetProduct),
      tempProduct: {
        total: "",
        qty: "",
        product: {
          title: "",
        },
      },
      productId: "",
      num: 1,
      successfullyAdded: false,
      active: 0,
    };
  },
  created() {
    window.scrollTo(0, 0);
  },
  methods: {
    ...mapActions(["getProducts", "getCart"]),

    addToCart(id, qty) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/cart`;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log("addToCart", response);
        if (response.data.success) {
          this.tempProduct = response.data.data;
          this.successfullyAdded = true;
          this.getCart();
        }
        console.log("addToCart", response);
      });
    },
    add() {
      this.num++;
      this.product.num = this.num;
    },
    reduce() {
      if (this.num > 1) {
        this.num--;
        this.product.num = this.num;
      }
      return;
    },
  },
};
</script>
