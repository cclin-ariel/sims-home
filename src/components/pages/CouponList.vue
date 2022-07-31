<template>
  <div>
    <!-- start of Add Coupon button -->
    <div>
      <button
        class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        @click="openModal(true, false, '', false)"
      >
        Add New Coupon
      </button>
    </div>
    <!-- end of Add Coupon button -->
    <!-- start of coupon list -->
    <table class="table-fixed w-full p-3 mt-5">
      <thead class="py-8 min-w-min">
        <th class="text-center w-1/12">Status</th>
        <th class="text-center w-auto">Coupon Name</th>
        <th class="text-center w-2/12">Coupon Code</th>
        <th class="text-center w-1/12">Percent</th>
        <th class="text-center w-2/12">Due Day</th>
        <th class="text-center w-1/12 mx-auto">Edit</th>
        <th class="text-center w-1/12 mx-auto">Delete</th>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id" class="border-t-2">
          <td class="text-center">
            <span v-if="item.is_enabled">Launched</span>
            <span v-else>Hidden</span>
          </td>
          <td class="text-center">{{ item.title }}</td>
          <td class="text-center">{{ item.code }}</td>
          <td class="text-center">
            {{ item.percent }}%
            <div class="min-w-max">({{ 100 - item.percent }}% off)</div>
          </td>
          <td class="text-center">{{ item.due_date }}</td>
          <td>
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-primary btn-sm border py-1 px-2 border rounded-lg mx-auto hover:text-gray-500"
                @click="openModal(false, true, item, false)"
              >
                Edit
              </button>
            </div>
          </td>
          <td>
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-danger btn-sm border py-1 px-2 border rounded-lg hover:text-gray-500"
                @click="openModal(false, false, item, true)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- end of coupon list -->
    <Pagination :pagination-from-products="pagination" @trigger="getCoupons" />
    <!-- start of add new coupon modal -->
    <div v-if="isNew || isEdit">
      <div
        class="flex z-40 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
      >
        <div
          class="flex flex-col w- m-auto rounded-lg border border-gray-300 shadow-xl"
        >
          <div
            class="flex flex-row justify-between px-6 py-2 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <div
              class="capitalize font-sans text-xl text-secondaryColor font-medium"
            >
              <span v-if="isNew">Add New Coupon</span>
              <span v-else>Edit Coupon</span>
            </div>
          </div>
          <div class="modal-body py-4 px-6 justify-center bg-white">
            <div class="row">
              <div class="flex flex-row">
                <label for="title" class="py-1 text-gray-600 w-6/12 my-auto"
                  >Coupon Name</label
                >
                <input
                  type="text"
                  id="title"
                  class="rounded border w-full px-3 py-1 my-2"
                  v-model="tempCoupon.title"
                  placeholder="Coupon Name"
                />
              </div>
              <div class="flex flex-row">
                <label for="percent" class="py-1 text-gray-600 w-6/12 my-auto"
                  >Discount</label
                >
                <input
                  type="num"
                  class="rounded border w-full px-3 py-1 my-2"
                  id="percent"
                  v-model="tempCoupon.percent"
                  placeholder="ex: 80  (20%off)"
                />
              </div>
              <div class="flex flex-row">
                <label for="due_date" class="py-1 text-gray-600 w-6/12 my-auto"
                  >Due Date</label
                >
                <input
                  type="date"
                  class="rounded border w-full px-3 py-1 my-2"
                  id="due_date"
                  v-model="tempCoupon.due_date"
                  placeholder="
              Due Date"
                />
              </div>
              <div class="flex flex-row mb-3">
                <label
                  for="coupon_code"
                  class="py-1 text-gray-600 w-6/12 my-auto"
                  >Coupon Code</label
                >
                <input
                  type="text"
                  class="rounded border w-full px-3 py-1 my-2"
                  id="coupon_code"
                  v-model="tempCoupon.code"
                  placeholder="ex: NEWYEARSALE"
                />
              </div>
              <!-- division line -->
              <div class="flex self-center border-b-2 w-full"></div>
              <div class="flex justify-end mt-3 mb-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempCoupon.is_enabled"
                    :true="1"
                    :false="0"
                  />
                  <label class="form-check-label" for="is_enabled">
                    Launch
                  </label>
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
              @click="
                isEdit = false;
                isNew = false;
              "
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
              @click="updateCoupon"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of add new coupon modal -->
    <!-- start of the delete modal -->
    <div v-if="isDelete">
      <div
        class="flex z-40 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
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
                  Coupon delete
                </div>
              </div>
              <div class="w-full py-2 border-b">
                <div class="pb-1">
                  Are you sure going to delete this coupon?
                </div>
                <div>
                  <i class="fal fa-exclamation-circle text-secondaryColor"></i>
                  <span class="p-2">
                    {{ tempCoupon.title }}
                  </span>
                </div>
              </div>
              <div class="ml-auto pt-2">
                <button
                  @click="isDelete = false"
                  class="rounded border px-2 py-1 hover:shadow-md"
                >
                  Cancel
                </button>
                <button
                  class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
                  @click="deleteCoupon"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end of the delete modal -->
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
export default {
  components: { Pagination },

  data() {
    return {
      coupons: [],
      pagination: {},
      tempCoupon: {},
      isEdit: false,
      isNew: false,
      isDelete: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getCoupons(page = 1) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("getCoupons", response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
        console.log(this.isDelete);
      });
    },
    openModal(isNew, isEdit, item, isDelete) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      }
      if (isEdit) {
        this.tempCoupon = Object.assign({}, item); // 避免傳參考而覆蓋物件的值
        this.isEdit = true;
      }
      if (isDelete) {
        this.tempCoupon = item; // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.isDelete = true;
      }
    },
    updateCoupon() {
      let api = `https://vue-course-api.hexschool.io/api/cclin/admin/coupon`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `https://vue-course-api.hexschool.io/api/cclin/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.isNew = false;
          this.isEdit = false;

          vm.getCoupons();
        } else {
          vm.getCoupons();
          console.log("failure");
        }
        vm.coupons = response.data.coupons;
      });
    },
    deleteCoupon() {
      const vm = this;
      console.log(vm.tempCoupon);
      const delApi = `https://vue-course-api.hexschool.io/api/cclin/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(delApi).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          this.isDelete = false;
          vm.getCoupons();
        } else {
          vm.getCoupons();
          console.log("failure");
        }
      });
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
