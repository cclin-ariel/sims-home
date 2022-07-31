<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-6" @submit.prevent="payOrder">
      <table class="table-fixed w-full max-w-5xl px-1 mt-5">
        <thead class="py-8">
          <th>Product</th>
          <th>QTY</th>
          <th>Price</th>
        </thead>
        <tbody class="py-2 mx-auto font-mono">
          <tr v-for="item in order.products" :key="item.id" class="border-t-2">
            <td class="align-middle text-center">sssss</td>
            <td class="align-middle text-center">{{ item.product.title }}</td>
            <td class="align-middle text-center">
              {{ item.qty }}
            </td>
            <td class="align-middle text-right">{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-right">Total</td>
            <td class="text-right">{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table class="table-fixed w-full max-w-5xl px-1 mt-5">
        <tbody class="py-2">
          <tr class="py-2">
            <th class="w-3/12">Email</th>
            <td class="w-9/12">{{ order.user.email }}</td>
          </tr>
          <tr class="py-2">
            <th>Name</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr class="py-2">
            <th>Tel</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr class="py-2">
            <th>Add</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr class="py-2">
            <th>Payment status</th>
            <td>
              <span v-if="!order.is_paid">Outstanding Payment</span>
              <span v-else class="text-success">Payment confirmation</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button
          class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        >
          Proceed to Checkout
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orderId: "",
      order: {
        user: {},
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/order/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.order = response.data.order;
        console.log("getOrder", response.data.order);
        // vm.isLoading = false
      });
    },
    payOrder() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/pay/${vm.orderId}`;
      // vm.isLoading = true
      this.$http.post(api).then((response) => {
        // vm.order = response.data.order
        console.log("payOrder", response.data.success);
        if (response.data.success) {
          vm.getOrder();
        }
        // vm.isLoading = false
        vm.$router.push(`/customer_orders/`);
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; // 'orderId' = the var in the path
    console.log(this.orderId);
    this.getOrder();
  },
};
</script>
