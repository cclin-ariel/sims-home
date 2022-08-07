<template>
  <div class="min-h-screen">
    <div
      class="w-11/12 lg:w-10/12 max-w-screen-2xl mx-auto pt-16 pb-6 pl-1 text-2xl font-serif"
    >
      Shopping Bag ({{ this.cartsAmount }})
    </div>
    <div
      class="w-11/12 lg:w-10/12 max-w-screen-2xl mx-auto mb-16 flex flex-col lg:flex-row lg:grid lg:grid-cols-3 lg:gap-2"
    >
      <!-- the start of cart list -->
      <div class="bg-bgColor p-1 sm:p-8 lg:max-w-10/12 lg:col-span-2">
        <div class="p-1 sm:p-5 sm:bg-white">
          <table class="table-fixed w-full px-3 my-2 uppercase">
            <div v-if="this.cartsAmount == 0" class="capitalize w-full">
              <div>Your Shopping Bag is empty.</div>
              <div>Want to add an item?</div>
            </div>
            <thead v-if="this.cartsAmount !== 0">
              <th class="text-left w-3/12">Product</th>
              <th class="w-6/12 hidden sm:block"></th>
              <th class="text-center w-1/12">QTY</th>
              <th class="text-right w-1/12">Price</th>
              <th class="text-center w-1/12"></th>
            </thead>
            <tbody class="py-2">
              <tr v-for="item in cart" :key="item.id" class="border-t py-0">
                <td class="py-2 hidden sm:block">
                  <img
                    class="block w-full max-w-xs rounded sm:flex sm:justify-center"
                    :src="item.product.imageUrl"
                    alt="image"
                  />
                </td>
                <td class="text-left capitalize px-2">
                  {{ item.product.title }}
                </td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-right">
                  {{ item.final_total | currency }}
                </td>
                <td class="text-center">
                  <button @click="deleteProductInCart(item.id)">
                    <i class="far fa-trash-alt m-auto"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="this.cartsAmount !== 0" class="mt-8 w-full lg:mt-0 lg:pl-10">
        <div class="w-full h-full min-w-80">
          <div
            class="bg-bgColor py-8 px-3 h-full w-full flex flex-col justify-between"
          >
            <div class="w-full border-b uppercase py-2 text-lg">summary</div>
            <div
              class="text-md w-full uppercase flex space-between text-base lg:text-sm xl:text-base mt-5 lg:mt-0"
            >
              <div class="text-left w-full">subtotal:</div>
              <div class="text-right w-full">
                {{ totalAmount.total | currency }}
              </div>
            </div>
            <!-- coupon -->
            <div class="mt-4">
              <div class="text-base lg:text-sm xl:text-base">
                HAVE A PROMO CODE ?
              </div>
              <div class="flex mt-2">
                <input
                  type="text"
                  class="pl-1 py-1 flex-grow border focus:outline-none focus:ring-1 focus:ring-gray-300"
                  id="exampleInputCouponNo"
                  placeholder="Coupon Code"
                  v-model="coupon_code"
                  @keyup.enter="addCouponCode"
                />
                <button
                  @click="addCouponCode"
                  type="button"
                  class="border ml-1 px-4 py-1 bg-white flex-none hover:shadow"
                >
                  <i class="fas fa-angle-right"></i>
                </button>
              </div>
            </div>
            <!-- coupon used message -->
            <div
              v-if="totalAmount.final_total !== totalAmount.total"
              class="w-full uppercase flex justify-between pb-3"
            >
              <div class="capitalize">coupon used!</div>
              <div>
                <span class="text-secondaryColor capitalize">Saved for</span>
                {{ (totalAmount.total - totalAmount.final_total) | currency }}
              </div>
            </div>

            <div
              class="pt-3 text-xl w-full uppercase flex space-between border-t mt-8 lg:mt-0"
            >
              <div class="text-left w-full text-base lg:text-sm xl:text-base">
                order total:
              </div>
              <div class="text-right text-secondaryColor w-full text-xl">
                {{ totalAmount.final_total | currency }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- division line -->
    </div>
    <!-- the end of cart list -->

    <!-- start of Form Validation -->

    <div
      v-if="this.cartsAmount !== 0"
      class="w-11/12 lg:w-10/12 max-w-screen-2xl mx-auto my-16 border-t"
    >
      <div class="w-full mt-8 pl-1 text-2xl font-serif capitalize">
        contact & Shipping info
      </div>
      <ValidationObserver
        v-slot="{ handleSubmit }"
        class="w-full my-5 flex flex-col mx-auto font-mono bg-bgColor pt-1 sm:py-8 pl-0 pr-3 lg:pl-2 lg:pr-5"
      >
        <form
          @submit.prevent="handleSubmit(createOrder)"
          class="my-5 flex flex-col w-full lg:max-w-6xl px-3 sm:px-10"
        >
          <!-- email Validation -->
          <ValidationProvider
            name="E-mail"
            rules="required|email"
            v-slot="{ classes, errors }"
            class="w-full relative"
          >
            <div class="grid grid-cols-4 gap-2 mb-8 control" :class="classes">
              <label for="userTel">E-mail</label>
              <input
                type="email"
                name="email"
                v-model="form.user.email"
                placeholder="example@example.com"
                class="focus:ring-2 focus:ring-gray-300 focus:outline-none focus:border-transparent border rounded ml-2 px-3 w-full col-span-3"
              />
            </div>
            <span
              class="absolute text-sm text-secondaryColor right-0 bottom-3"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>

          <!-- name Validation -->

          <ValidationProvider
            name="Name"
            id="username"
            rules="required|alpha"
            v-slot="{ errors }"
            class="w-full relative"
            ><div class="grid grid-cols-4 gap-2 mb-8">
              <label for="userName">Name</label>
              <input
                type="text"
                name="name"
                v-model="form.user.name"
                placeholder="Allen Tai"
                class="focus:ring-2 focus:ring-gray-300 focus:outline-none focus:border-transparent border rounded ml-2 px-3 w-full col-span-3"
              />
            </div>
            <span
              class="absolute text-sm text-secondaryColor right-0 bottom-3"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>

          <!-- phone Validation -->
          <ValidationProvider
            rules="required|numeric|min:8"
            v-slot="{ errors }"
            class="w-full relative"
            ><div class="grid grid-cols-4 gap-2 mb-8">
              <label for="userTel">Phone</label>
              <input
                type="tel"
                name="Phone_number"
                id="userTel"
                v-model="form.user.tel"
                placeholder="080xxxx1234"
                class="focus:ring-2 focus:ring-gray-300 focus:outline-none focus:border-transparent border rounded ml-2 px-3 w-full col-span-3"
              />
            </div>
            <span
              class="absolute text-sm text-secondaryColor right-0 bottom-3"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>
          <!-- address Validation -->
          <ValidationProvider
            rules="required"
            v-slot="{ errors }"
            class="w-full relative"
            ><div class="grid grid-cols-4 gap-2 mb-8">
              <label for="userAddress">Address</label>
              <input
                type="text"
                name="Address"
                id="userAddress"
                v-model="form.user.address"
                placeholder="address"
                class="focus:ring-2 focus:ring-gray-300 focus:outline-none focus:border-transparent border rounded ml-2 px-3 w-full col-span-3"
              />
            </div>
            <span
              class="absolute text-sm text-secondaryColor right-0 bottom-3"
              >{{ errors[0] }}</span
            >
          </ValidationProvider>

          <div class="grid grid-cols-4 gap-2 mb-8">
            <label class=" " for="comment">Comment</label>
            <textarea
              name="comment"
              id="comment"
              class="col-span-3 focus:ring-2 focus:ring-gray-300 focus:outline-none focus:border-transparent border rounded ml-2 px-3 py-1 mt-2 w-full"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button
              class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80 uppercase"
            >
              check out now
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
    <!-- end of Form validation -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      products: [],
      product: {},
      carts: [],
      isLoading: false,
      status: {
        loadingItem: "",
      },
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  computed: {
    ...mapGetters(["cartsAmount"]),

    cart() {
      return this.$store.state.cart;
    },
    totalAmount() {
      return this.$store.state.totalAmount;
    },
  },
  created() {
    this.getCart();
  },
  methods: {
    ...mapActions(["getCart"]),
    getProduct(id) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        // console.log('getProduct', response.data)
        vm.status.loadingItem = "";
      });
    },
    addToCart(id, qty = 1) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/cart`;
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log("addToCart", response);
        vm.status.loadingItem = "";
        vm.getCart();
        // $('#productModal').modal('hide')
      });
    },

    deleteProductInCart(id) {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/cart/${id}`;
      vm.isLoading = true;

      this.$http.delete(api).then((response) => {
        console.log("deleteProductInCart", response);
        vm.isLoading = false;
        vm.getCart();
      });
    },
    addCouponCode() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      this.$http.post(api, { data: coupon }).then((response) => {
        console.log("addCouponCode", response);
        vm.isLoading = false;
        vm.getCart();
        vm.coupon_code = "";
      });
    },

    createOrder() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/order`;
      const order = vm.form;
      this.$http.post(api, { data: order }).then((response) => {
        console.log("createOrder", response);
        if (response.data.success) {
          vm.$router.push({
            // path: `/sims_home/shop_checkout/${response.data.orderId}`
            name: "ShopCheckout",
            params: {
              orderId: response.data.orderId,
            },
          });
        }
      });
    },
  },
};
</script>
