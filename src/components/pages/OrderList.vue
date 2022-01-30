<template>
  <div>
    <div class="mt-1">Orders</div>
    <!-- the start of order -->
    <table class="table-fixed w-full p-3 mt-3">
      <thead class="py-8">
        <th class="text-left w-min"># Order Date</th>
        <th class="text-center w-20">Payment</th>
        <th class="text-right w-24">Total</th>
        <th class="w-6"></th>

        <th class="text-center w-min">Products</th>
        <th class="text-center w-min">Customer info</th>
        <th class="text-center w-30">Message</th>
        <th class="text-center w-24">-</th>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="border-t-2 h-18">
          <td>
            # {{ order.num }} -
            {{ order.create_at | date }}

            <div class="text-xs">
              {{ order.id }}
            </div>
          </td>
          <td class="">
            <div class="w-full flex justify-center">
              <div v-if="order.is_paid">
                <div class="text-secondaryColor">Confirmed</div>
                <div class="text-xs text-center mt-2">
                  {{ order.paid_date | date }}
                </div>
              </div>
              <div v-else class="text-red-500 text-sm text-center">
                Not confirmed
              </div>
            </div>
          </td>
          <td>
            <div v-if="!order.final_total" class="text-right">
              {{ order.total | currency }}
            </div>
            <div v-if="order.final_total">
              {{ order.final_total | currency }}<br />
              with coupon
            </div>
          </td>
          <td class=""></td>
          <td>
            <ul v-for="product in order.products" :key="product.id">
              <li v-if="product.qty != 0" class="overflow-auto">
                {{ product.product.title }} * {{ product.qty }}
              </li>
            </ul>
          </td>
          <td>
            <p><i class="fas fa-user"></i> {{ order.user.name }}</p>
            <p><i class="fas fa-phone"></i> {{ order.user.tel }}</p>
            <!-- <p><i class="fas fa-envelope"></i> {{ order.user.email }}</p> -->
            <p>
              <!-- <i class="fas fa-map-marker-alt"></i> {{ order.user.address }} -->
            </p>
          </td>
          <td>
            <p v-if="order.message" class="overflow-auto">
              {{ order.message }}
            </p>
            <p class="text-center" v-else>-</p>
          </td>
          <td style="height: 100%" class="align-middle">
            <div class="w-full flex justify-center">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm border py-1 px-2 border rounded-lg"
                @click="openModal(true, order)"
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm border py-1 px-2 border rounded-lg"
                @click="openModal(false)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- the end of order -->
    <Pagination
      :pagination-from-products="pagination"
      @trigger="getOrderList"
    />
    <!-- start of edit order modal -->
    <t-modal
      v-if="isEdit"
      class="flex z-40 w-full min-w-sm mt-10 fixed top-20 justify-center"
      id="orderModal"
    >
      <div
        class="flex flex-col w-full sm:w-5/6 lg:w-1/2 max-w-2xl rounded-lg border border-gray-300 shadow-xl"
      >
        <div
          class="flex flex-row justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <div class="modal-header w-full flex flex-row justify-between">
            <div class="modal-title" id="exampleModalLabel">
              <div class="text-2xl">Edit Order</div>
            </div>
            <div>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="isEdit = false"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="modal-body bg-white px-8 py-3">
          <div class="row">
            <div class="py-2 text-xl">Order info</div>
            <div class="flex flex-row">
              <div class="py-1 text-gray-600">Order ID:</div>
              <div>
                {{ tempOrder.id }}
              </div>
            </div>
            <div class="py-1 text-gray-600">
              Ordered Time:
              <span>
                {{ tempOrder.create_at | date }}
              </span>
            </div>

            <div class="py-1 text-gray-600">
              <label for="payment">Payment: </label>
              <span v-if="tempOrder.is_paid" class="text-success">
                Confirmed
              </span>
              <span v-else>Not confirmed</span>
            </div>
            <div class="py-1 text-gray-600">
              <div>
                Paid Date:
                <span>
                  {{
                    new Date(tempOrder.paid_date * 1000).toLocaleDateString()
                  }}
                </span>
              </div>
            </div>
            <div class="">
              <div class="py-1 text-gray-600">Products:</div>
              <div class="border rounded">
                <ul v-for="product in tempOrder.products" :key="product.id">
                  <li
                    v-if="product.qty != 0"
                    class="px-2 py-1 flex flex-row max-h-16 overflow-auto"
                  >
                    <div class="w-8/12">
                      {{ product.product.title }}
                      <!-- <option :value="products.product.title">{{ products.product.title }}</option> -->
                    </div>
                    <div class="text-center">*</div>

                    <div class="px-2 w-1/12">{{ product.qty }}</div>
                    <div class="px-2">=</div>
                    <div class="px-2 text-right w-2/12">
                      {{
                        product.final_total | currency ||product.total | currency
                      }}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="tempOrder.final_total" class="py-2">Coupon Used!</div>
            <div class="flex flex-row justify-end pr-8 my-3">
              <div class="w-min min-w-5/12">Total:</div>
              <div class="text-red-500 ml-5 my-auto">
                {{
                  tempOrder.total | currency || tempOrder.final_total | currency
                }}
              </div>
            </div>

            <!-- division line -->
            <div class="flex self-center border-b-2 w-full"></div>

            <div class="py-3">
              <div class="py-1 text-xl">Customer info</div>
              <div class="py-1">
                <label for="userName">Name</label>
                <input
                  type="text"
                  class="border ml-4 px-2"
                  id="userName"
                  v-model="tempOrder.user.name"
                />
              </div>
              <div class="py-1">
                <label for="userTel">Tel</label>
                <input
                  type="number"
                  class="border ml-4 px-2"
                  id="userTel"
                  v-model="tempOrder.user.tel"
                />
              </div>
              <div class="py-1">
                <label for="userEmail">email</label>
                <input
                  type="email"
                  class="border ml-4 px-2"
                  id="userEmail"
                  v-model="tempOrder.user.email"
                />
              </div>
              <div class="py-1">
                <label for="userAddress">Address</label>
                <input
                  type="text"
                  class="border ml-4 px-2"
                  id="userAddress"
                  v-model="tempOrder.user.address"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal-footer bg-white py-3 px-8 flex justify-end border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <button
            type="button"
            class="rounded border px-2 py-1 hover:shadow-md"
            data-dismiss="modal"
            @click="isEdit = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
            @click="updateOrder"
          >
            Save
          </button>
        </div>
      </div>
    </t-modal>
    <!-- end of edit order modal -->
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },
  data() {
    return {
      orders: [],
      pagination: {},
      isLoading: false,
      tempOrder: {
        user: {},
        products: [],
      },
      isEdit: false,
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList(page = 1) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("getOrderList", response.data.orders);
        vm.isLoading = false;
        vm.orders = response.data.orders;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isEdit, order) {
      if (isEdit) {
        this.tempOrder = Object.assign({}, order);
        this.isEdit = true;
        // $('#orderModal').modal('show')
        console.log(this.tempOrder);
      }
      if (!isEdit) {
        console.log("delete");
      }
    },
    // updateOrder (id) {
    updateOrder() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/order/${vm.tempOrder.id}`;
      //   let httpMethod = 'post'
      //   if (!vm.isEdit) {
      //     api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      //     httpMethod = 'put'
      //   }
      this.$http.put(api, { data: vm.tempOrder }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          //   $('#orderModal').modal('hide')
          //   vm.getOrderList()
          //   $('#orderModal').modal('hide')
        } else {
          vm.getOrderList();
          console.log("failure");
        }
        //   vm.products = response.data.products
      });
    },
  },
};
</script>
