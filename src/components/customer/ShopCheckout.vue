<template>
  <div class="">
    <div
      class="
        w-11/12
        lg:w-10/12
        max-w-screen-lg
        mx-auto
        pt-16
        pb-6
        pl-1
        text-2xl
        font-serif
        capitalize
      "
    >
      your order
    </div>
    <div class="w-11/12 lg:w-10/12 max-w-screen-lg mx-auto mb-16 flex flex-col">
      <div class="bg-bgColor p-1 sm:p-8 lg:max-w-10/12">
        <form class="p-1 sm:p-5" @submit.prevent="payOrder">
          <div class="p-3 sm:bg-white sm:px-10 sm:py-5">
            <table class="table-fixed w-full px-3 my-2 uppercase">
              <thead class="py-8 uppercase">
                <th class="text-left w-3/12">Product</th>
                <th class="w-6/12 hidden sm:block"></th>
                <th class="text-center w-1/12">QTY</th>
                <th class="text-right w-1/12">Price</th>
              </thead>
              <tbody class="py-2 mx-auto">
                <tr
                  v-for="item in order.products"
                  :key="item.id"
                  class="border-t"
                >
                  <td class="py-2 hidden sm:block">
                    <img
                      class="
                        block
                        w-full
                        max-w-xs
                        rounded
                        sm:flex sm:justify-center
                      "
                      :src="item.product.imageUrl"
                      alt="image"
                    />
                  </td>
                  <td class="text-left capitalize px-2">
                    {{ item.product.title }}
                  </td>
                  <td class="text-center">
                    {{ item.qty }}
                  </td>
                  <td class="text-right">
                    {{ item.final_total | currency }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-5 w-full pr-3 sm:pr-10 border-b pb-2">
            <div class="text-right text-base xl:text-lg uppercase">
              order total:
              <span class="text-right text-secondaryColor w-full text-xl pl-5">
                {{ order.total | currency }}
              </span>
            </div>
          </div>

          <div class="py-5 w-full mt-5">
            <div class="bg-white sm:px-10 py-8">
              <div class="">
                <div class="grid grid-cols-5 gap-1 mb-5">
                  <div class="col-span-2 text-center font-bold">Email</div>
                  <div class="col-span-3 text-center">
                    {{ order.user.email }}
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-1 mb-5">
                  <div class="col-span-2 text-center font-bold">Name</div>
                  <div class="col-span-3 text-center">
                    {{ order.user.name }}
                  </div>
                </div>
                <div class="grid grid-cols-5 gap-1 mb-5">
                  <div class="col-span-2 text-center font-bold">Phone</div>
                  <div class="col-span-3 text-center">{{ order.user.tel }}</div>
                </div>
                <div class="grid grid-cols-5 gap-1 mb-5">
                  <div class="col-span-2 text-center font-bold">Add</div>
                  <div class="col-span-3 text-center">
                    {{ order.user.address }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right my-5">
            <router-link to="/sims_home/shop_orderConform/">
              <button
                class="
                  rounded
                  text-bgColor
                  bg-secondaryColor
                  py-1.5
                  px-4
                  hover:bg-opacity-80
                "
              >
                Proceed to Checkout
              </button>
            </router-link>
          </div>
        </form>
      </div>
    </div>
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
      // const api = `https://vue-course-api.hexschool.io/api/cclin/order/${vm.orderId}`;
      vm.order = {
        create_at: 1659236352,
        id: "-N8HBN6go_oPQdJPCqhj",
        is_paid: false,
        products: {
          "-N8HBN8-Kob2m1a0HQ8O": {
            final_total: 300,
            id: "-N8HBN8-Kob2m1a0HQ8O",
            product: {
              category: "plants & DÉCOR",
              content: "bedroom_inspiration3",
              description: "you can also bit them as a adult",
              id: "-MwSOC7wQ5FaXPZfn8o9",
              imageUrl:
                "https://storage.googleapis.com/vue-course-api.appspot.com/cclin/1645465518316.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=EqQlYGAHgZWcPpZ2Tln%2BTnaMgKbZc74L%2BGnvi0cyRgqoF0njS78fcF8ySmTvXcF3bYfKhFYRFEaQSStwDKj2pUaASxLqdgfuz%2BzBBS1eKNrWbXKlmq0f3dmbtnan3E2077nIs41EyxfdyGtIpVjOGs66Vnv9LYqWOVDP5GGZnXrcApNYBNMh9%2FStx6hW8zp5XzbbCOWltPgq3VBHM%2BnqLZE3WHlYOKHXuwXxM%2B2NMGrabz9iZOz9ur8VC8wDPCXwE7OTmG84xonJdZrgmwn4oZjjm9fCcFyEnMcm4AoHQE359LcjCsj049aPVlaDnVUxZPfU7yn6S7fEYZ1V7s1RlA%3D%3D",
              is_enabled: true,
              num: 16,
              price: "300",
              title: "kids toy set",
            },
            product_id: "-MwSOC7wQ5FaXPZfn8o9",
            qty: 1,
            total: 300,
          },
        },
        total: 300,
        user: {
          address: "fdfklgm",
          email: "sdf2df@f.dfg",
          name: "kmlm",
          tel: "4565621321",
        },
      };
      // this.$http.get(api).then((response) => {
      //   vm.order = response.data.order;
      //   console.log("getOrder", response.data.order);
      // });
    },
    payOrder() {
      const vm = this;
      const api = `https://vue-course-api.hexschool.io/api/cclin/pay/${vm.orderId}`;
      this.$http.post(api).then((response) => {
        // vm.order = response.data.order
        console.log("payOrder", response.data.success);
        if (response.data.success) {
          vm.getOrder();
        }
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
