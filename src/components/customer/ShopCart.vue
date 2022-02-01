<template>
  <div>
    <!-- <loading :active.sync="isLoading" /> -->
    <div class="w-10/12 md:w-8/12 mx-auto my-16">
      <!-- the start of cart list -->
      <table class="table-fixed w-full px-1 mt-5">
        <thead class="py-8">
          <th class="text-center w-10 md:w-min">No.</th>
          <th class="text-left w-auto ">Product</th>
          <th class="text-center w-8 md:w-min">QTY</th>
          <th class="text-right w-20 md:w-min">Price</th>
          <th class="text-center w-8 md:w-min"></th>
        </thead>
        <tbody class="py-2">
          <tr v-for="(item, index) in carts" :key="item.id"  class="border-t-2">
            <td class="flex justify-center py-2">{{ index + 1 }}.</td>
            <td class="text-left">
              {{ item.product.title }}
              <div colspan="5" class="text-success" v-if="item.coupon">
                Saving
                <strong>{{
                  (item.total - item.final_total).toFixed(0) | currency
                }}</strong>
                by using coupon!!
              </div>
            </td>
            <td class="text-center">{{ item.qty }}</td>
            <td class="text-right">
              {{ item.final_total | currency }}
            </td>
            <td class="flex justify-center">
              <button @click="deleteProductInCart(item.id)">
                <i class="far fa-trash-alt mx-auto"></i>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right pt-8 text-xl">Total</td>
            <td class="text-right pt-8 text-secondaryColor">
              {{ amount.total | currency }}
            </td>
          </tr>

          <tr
            class="text-right primary"
            v-if="amount.final_total !== amount.total"
          >
            <td class="text-success text-right" colspan="3">After Discount</td>
            <td class="text-success text-right">
              {{ amount.final_total | currency }}
            </td>
          </tr>
        </tfoot>
      </table>
      <!-- coupon -->
      <form class="w-50 mx-auto mt-4 hidden">
        <div class="form-group row">
          <input
            type="text"
            class="form-control col-8"
            id="exampleInputCouponNo"
            placeholder="Coupon No."
            v-model="coupon_code"
          />
          <button
            @click="addCouponCode"
            type="button"
            class="btn btn-primary col-4"
          >
            Use COUPON
          </button>
        </div>
      </form>
      <!-- the end of cart list -->

      <!-- start of Form Validation -->

      <!-- <div class="my-5 row justify-content-center">
      <validation-observer v-slot="{ invalid }" class="col-md-6">
        <form @submit.prevent="createOrder"> -->
      <!-- email Validation -->
      <!-- <validation-provider
            rules="required|email"
            v-slot="{ errors, classes }"
          >
            <div class="form-group"> -->
      <!-- 輸入框 -->
      <!-- <label for="email">Email</label>
              <input
                id="email"
                type="email"
                name="Email"
                v-model="form.user.email"
                class="form-control"
                :class="classes"
                placeholder="name@example.com"
              /> -->
      <!-- error message -->
      <!-- <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider> -->

      <!-- name Validation -->
      <!-- <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="username">收件人姓名</label>
              <input
                type="text"
                class="form-control"
                name="Name"
                id="username"
                :class="classes"
                v-model="form.user.name"
                placeholder="your name"
              /> -->
      <!-- error message -->
      <!-- <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider> -->

      <!-- phone Validation -->
      <!-- <validation-provider
            rules="required|numeric|min:8"
            v-slot="{ errors, classes }"
          >
            <div class="form-group">
              <label for="userTel">收件人電話</label>
              <input
                type="tel"
                class="form-control"
                name="Phone_number"
                id="usertel"
                :class="classes"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              /> -->
      <!-- error message -->
      <!-- <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider> -->
      <!-- address Validation -->
      <!-- <validation-provider rules="required" v-slot="{ errors, classes }">
            <div class="form-group">
              <label for="useraddress">收件人地址</label>
              <input
                type="text"
                class="form-control"
                name="Address"
                id="useraddress"
                :class="classes"
                v-model="form.user.address"
                placeholder="請輸入地址"
              /> -->
      <!-- error message -->
      <!-- <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea
              name=""
              id="comment"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-right">
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div> -->
      <!-- end of Form validation -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products: [],
      product: {},
      carts: [],
      amount: {},
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
      },
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
    getProduct(id) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((response) => {
        vm.product = response.data.product;
        // $('#productModal').modal('show')
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
    getCart() {
      const api = `https://vue-course-api.hexschool.io/api/cclin/cart`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // console.log('getCart', response.data)
        vm.isLoading = false;
        vm.amount = response.data.data;
        vm.carts = response.data.data.carts;
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
      // if (id) {
      //   $('#delProductModal').modal('show')
      //   vm.getProducts()
      //   vm.getCart()
      // }
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
      });
    },
    createOrder() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/order`;
      const order = vm.form;
      vm.isLoading = true;
      this.$http.post(api, { data: order }).then((response) => {
        console.log("createOrder", response);
        if (response.data.success) {
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    // this.getProducts();
    this.getCart();
  },
};
</script>
