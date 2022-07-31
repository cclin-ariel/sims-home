<template>
  <div>
    <div class="w-max">
      <button
        class="capitalize rounded text-bgColor bg-secondaryColor py-1.5 px-4"
      >
        Orders list
      </button>
    </div>
    <!-- the start of order -->
    <table class="table-fixed w-full p-5 mt-3">
      <thead class="py-8">
        <th class="text-center w-1/12 lg:w-16">No.</th>
        <th class="text-left w-4/12 lg:w-2/12">Order Date</th>
        <th class="text-center w-2/12 lg:w-1/12">Payment</th>
        <th class="text-right w-2/12 lg:w-1/12">Total</th>
        <th class="text-center w-auto invisible lg:visible">Products</th>
        <th class="text-center w-2/12 invisible lg:visible">Message</th>
        <th class="text-center w-auto invisible lg:visible">Customer info</th>
        <th class="w-2/12 lg:w-10"></th>
      </thead>
      <tbody>
        <tr
          v-for="order in orders"
          :key="order.id"
          class="border-t-2 h-18 py-2"
        >
          <td class="text-center">{{ order.num }}.</td>
          <td>
            {{ order.create_at | date }}
            <div class="text-xs max-content">
              {{ order.id }}
            </div>
          </td>
          <td class="text-sm">
            <div class="w-full flex justify-center">
              <div v-if="order.is_paid">
                <div class="text-secondaryColor">Confirmed</div>
                <div class="text-xs text-center mt-2">
                  {{ order.paid_date | date }}
                </div>
              </div>
              <div v-else class="text-red-500 text-sm text-center">-</div>
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
          <td class="px-1 invisible lg:visible text-center">
            <ul v-for="product in order.products" :key="product.id">
              <li v-if="product.qty != 0" class="py-1">
                {{ product.product.title }} * {{ product.qty }}
              </li>
            </ul>
          </td>
          <td class="px-1 invisible lg:visible">
            <p v-if="order.message" class="overflow-auto">
              {{ order.message }}
            </p>
            <p class="text-center" v-else>-</p>
          </td>
          <td class="px-1 hidden lg:inline-block">
            <p><i class="fas fa-user"></i> {{ order.user.name }}</p>
            <p><i class="fas fa-phone"></i> {{ order.user.tel }}</p>
          </td>
          <td style="height: 100%">
            <div class="w-full flex justify-center py-1">
              <!-- start of show customer info detail -->
              <button
                class="capitalize border py-1 px-1 border rounded-lg block lg:hidden mr-1"
                @click="openModal(false, false, order, true)"
              >
                detail
              </button>
              <!-- end of show customer info detail -->

              <button
                class="capitalize border py-1 px-2 border rounded-lg"
                @click="openModal(true, false, order)"
              >
                Edit
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
    <div v-if="isEdit">
      <div
        class="flex z-40 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
      >
        <div
          class="flex flex-col m-auto rounded-lg border border-gray-300 shadow-xl bg-white"
        >
          <div
            class="flex flex-row justify-between px-6 py-2 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <div
              class="capitalize font-sans text-xl text-secondaryColor font-medium"
            >
              <span>Edit Order</span>
            </div>
          </div>
          <div class="py-4 px-6 justify-center">
            <div class="grid grid-cols-1 gap-4">
              <div class="py-2 text-xl">Order info</div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-row">
                  <div class="py-1">Order ID:</div>
                  <span class="my-auto pl-3">
                    {{ tempOrder.id }}
                  </span>
                </div>
                <div class="py-1">
                  Ordered Time:
                  <span class="pl-3">
                    {{ tempOrder.create_at | date }}
                  </span>
                </div>
              </div>
              <div>
                <div class="py-1">Products:</div>
                <div class="border rounded px-1 py-2 mt-1">
                  <ul v-for="product in tempOrder.products" :key="product.id">
                    <li
                      v-if="product.qty != 0"
                      class="px-2 py-1 flex flex-row justify-between"
                    >
                      <div class="w-8/12">
                        {{ product.product.title }}
                      </div>
                      <div class="text-center">*</div>

                      <div class="px-2 w-1/12">{{ product.qty }}</div>
                      <div class="px-2">=</div>
                      <div class="px-2 text-right w-2/12">
                        {{
                          product.final_total | currency || product.total | currency
                        }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-if="tempOrder.final_total" class="py-2">Coupon Used!</div>
              <div class="flex flex-row justify-end pr-5 my-3">
                <div class="w-min min-w-5/12">Total:</div>
                <div class="text-red-500 ml-5 my-auto">
                  {{
                    tempOrder.total | currency || tempOrder.final_total | currency
                  }}
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="py-1 flex">
                  <label for="payment">Payment: </label>
                  <input
                    class="mx-2"
                    type="checkbox"
                    id="payment"
                    v-model="tempOrder.is_paid"
                  />

                  <span v-if="tempOrder.is_paid" class="text-secondaryColor">
                    Confirmed
                  </span>
                  <span v-else class="text-red-600">Not confirmed</span>
                </div>
                <div v-if="tempOrder.is_paid" class="py-1">
                  <div>
                    Paid Date:
                    <span class="pl-2">
                      {{
                        new Date(
                          tempOrder.paid_date * 1000
                        ).toLocaleDateString()
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- division line -->
              <div class="flex self-center border-b-2 w-full"></div>

              <div class="py-3">
                <div class="py-1 text-xl">Customer info</div>
                <div class="grid grid-cols-2 gap-4">
                  <div class="py-1 flex">
                    <label for="userName" class="flex-none w-10">Name</label>
                    <input
                      type="text"
                      class="border ml-4 px-2 flex-grow"
                      id="userName"
                      v-model="tempOrder.user.name"
                    />
                  </div>
                  <div class="py-1 flex">
                    <label for="userTel" class="flex-none w-10">Phone</label>
                    <input
                      type="text"
                      class="border ml-4 px-2 flex-grow"
                      id="userTel"
                      v-model="tempOrder.user.tel"
                    />
                  </div>
                  <div class="py-1 flex">
                    <label for="userEmail" class="flex-none w-10">Email</label>
                    <input
                      type="email"
                      class="border ml-4 px-2 flex-grow"
                      id="userEmail"
                      v-model="tempOrder.user.email"
                    />
                  </div>
                  <div class="py-1 flex">
                    <label for="userAddress" class="flex-none w-10">Add</label>
                    <input
                      type="text"
                      class="border ml-4 px-2 flex-grow"
                      id="userAddress"
                      v-model="tempOrder.user.address"
                    />
                  </div>
                </div>
                <div class="mt-5 flex flex-row">
                  <label for="customerMessage">Customer Message</label>
                  <textarea
                    name="customerMessage"
                    rows="3"
                    cols="43"
                    type="text"
                    class="border ml-4 mt-2 px-2"
                    id="customerMessage"
                    v-model="tempOrder.message"
                  >
                  </textarea>
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
              @click="saveChanges = true"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of edit order modal -->
    <!-- start of edit warning modal -->
    <div v-if="saveChanges">
      <div
        class="flex z-50 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
      >
        <div
          class="flex flex-col max-w-2xl m-auto rounded-lg border border-gray-300 shadow-xl"
        >
          <div class="bg-white rounded-lg w-full">
            <div class="flex flex-col items-start px-5 py-4">
              <div class="flex items-center w-full border-b pb-1">
                <div
                  class="capitalize font-sans text-xl text-secondaryColor font-medium"
                >
                  product delete
                </div>
              </div>
              <div class="w-full py-2 border-b">
                <div class="pb-1">Are you sure you want to save changes?</div>
              </div>
              <div class="ml-auto pt-2">
                <button
                  @click="saveChanges = false"
                  class="rounded border px-2 py-1 hover:shadow-md capitalize"
                >
                  no
                </button>
                <button
                  class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor capitalize"
                  @click="updateOrder"
                >
                  yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- end of edit warning modal -->
    <!-- start of edit order modal -->
    <div v-if="detail">
      <div
        class="flex z-40 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
      >
        <div
          class="flex flex-col m-auto rounded-lg border border-gray-300 shadow-xl bg-white"
        >
          <div
            class="flex flex-row justify-between px-6 py-2 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <div
              class="capitalize font-sans text-xl text-secondaryColor font-medium"
            >
              <span>check detail</span>
            </div>
          </div>
          <div class="py-4 px-6 justify-center">
            <div class="grid grid-cols-1 gap-4">
              <div class="py-2 text-xl">Order info</div>
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-row">
                  <div class="py-1">Order ID:</div>
                  <span class="my-auto pl-3">
                    {{ tempOrder.id }}
                  </span>
                </div>
                <div class="py-1">
                  Ordered Time:
                  <span class="pl-3">
                    {{ tempOrder.create_at | date }}
                  </span>
                </div>
              </div>

              <div>
                <div class="py-1">Products:</div>
                <div class="border rounded px-1 py-2 mt-1">
                  <ul v-for="product in tempOrder.products" :key="product.id">
                    <li
                      v-if="product.qty != 0"
                      class="px-2 py-1 flex flex-row justify-between"
                    >
                      <div class="w-8/12">
                        {{ product.product.title }}
                      </div>
                      <div class="text-center">*</div>
                      <div class="px-2 w-1/12">{{ product.qty }}</div>
                      <div class="px-2">=</div>
                      <div class="px-2 text-right w-2/12">
                        {{
                          product.final_total | currency || product.total | currency
                        }}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div v-if="tempOrder.final_total" class="py-2">Coupon Used!</div>
              <div class="flex flex-row justify-end pr-5 my-3">
                <div class="w-min min-w-5/12">Total:</div>
                <div class="text-red-500 ml-5 my-auto">
                  {{
                    tempOrder.total | currency || tempOrder.final_total | currency
                  }}
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="py-1 flex">
                  <span>Payment: </span>
                  <span class="mx-2">{{ tempOrder.is_paid }}</span>
                  <span v-if="tempOrder.is_paid" class="text-secondaryColor">
                    Confirmed
                  </span>
                  <span v-else class="text-red-600">Not confirmed</span>
                </div>
                <div v-if="tempOrder.is_paid" class="py-1">
                  <div>
                    Paid Date:
                    <span class="pl-2">
                      {{
                        new Date(
                          tempOrder.paid_date * 1000
                        ).toLocaleDateString()
                      }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- division line -->
              <div class="flex self-center border-b-2 w-full"></div>
              <div class="py-3">
                <div class="py-1 text-xl">Customer info</div>
                <div class="grid grid-cols-2 gap-4 mt-3">
                  <div class="py-1 flex">
                    <span>Name: </span>
                    <span class="ml-4 px-2 flex-grow">{{
                      tempOrder.user.name
                    }}</span>
                  </div>
                  <div class="py-1 flex">
                    <span>Phone: </span>
                    <span class="ml-4 px-2 flex-grow">{{
                      tempOrder.user.tel
                    }}</span>
                  </div>
                  <div class="py-1 flex">
                    <span>Email: </span>
                    <span class="ml-4 px-2 flex-grow">{{
                      tempOrder.user.email
                    }}</span>
                  </div>
                  <div class="py-1 flex">
                    <span>Add: </span>
                    <span class="ml-4 px-2 flex-grow">{{
                      tempOrder.user.address
                    }}</span>
                  </div>
                </div>
                <div class="mt-5 flex flex-row">
                  <span for="customerMessage">Customer Message:</span>
                  <span class="pl-4">{{ tempOrder.message }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="modal-footer bg-white py-3 px-8 flex justify-end border-t border-gray-200 rounded-bl-lg rounded-br-lg"
          >
            <button
              type="button"
              class="rounded border px-3 py-1 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
              @click="detail = false"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of edit order modal -->
    <!-- start of delete modal -->
    <!-- <div
      v-if="isDelete"
      class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full"
    >
      <div class="bg-white rounded-lg w-1/2">
        <div class="flex flex-col items-start p-4">
          <div class="flex items-center w-full">
            <div class="text-xl">Are you sure going to delete this order?</div>
          </div>
          <hr />
          <div class="text-secondaryColor font-medium">
            <i class="fas fa-minus"></i>
            {{ tempOrder.id }}
            {{ tempOrder.total }}
            {{ tempOrder.user.name }}
            {{ tempOrder.user.tel }}
          </div>
          <hr />
          <div class="ml-auto">
            <button
              @click="isDelete = false"
              class="rounded border px-2 py-1 hover:shadow-md"
            >
              Cancel
            </button>
            <button
              class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
              @click="deleteOrder"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div> -->
    <!-- end of delete modal -->
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
      isDelete: false,
      saveChanges: false,
      detail: false,
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
    openModal(isEdit, isDelete, order, detail) {
      if (isEdit) {
        this.tempOrder = Object.assign({}, order);
        this.isEdit = true;
        console.log(this.tempOrder);
      }
      if (isDelete) {
        this.tempOrder = Object.assign({}, order);
        this.isDelete = true;
        console.log("delete");
      }
      if (detail) {
        this.tempOrder = Object.assign({}, order);
        this.detail = true;
        console.log("check detail");
      }
    },
    updateOrder() {
      const vm = this;
      let api = `https://vue-course-api.hexschool.io/api/cclin/admin/order/${vm.tempOrder.id}`;
      this.$http.put(api, { data: vm.tempOrder }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.getOrderList();
          this.isEdit = false;
          this.saveChanges = false;
        } else {
          vm.getOrderList();
          console.log("updateOrder failure");
        }
      });
    },
  },
};
</script>
