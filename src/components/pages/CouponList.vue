<template>
  <div>
    <!-- <loading :active.sync="isLoading" /> -->

    <div>
      <button
        class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        @click="openModal(true, false, false)"
      >
        Add New Coupon
      </button>
    </div>
    <!-- start of coupon list -->
    <table class="table-fixed w-full p-3 mt-5">
      <thead class="py-8">
        <th class="text-center w-10">Status</th>
        <th class="text-center w-2/12">Coupon Name</th>
        <th class="text-center w-2/12">Coupon Code</th>
        <th class="text-center w-24">Percent</th>
        <th class="text-center w-24">Due Day</th>
        <th class="text-center w-20 mx-auto">Edit</th>
        <th class="text-center w-20">Delete</th>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id" class="border-t-2">
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">Launched</span>
            <span v-else>Hidden</span>
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.code }}</td>
          <td class="text-center">{{ item.percent }}%</td>
          <td class="text-center">{{ item.due_date }}</td>
          <td>
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-primary btn-sm border py-1 px-2 border rounded-lg mx-auto"
                @click="openModal(false, item)"
              >
                Edit
              </button>
            </div>
          </td>
          <td>
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-danger btn-sm border py-1 px-2 border rounded-lg"
                @click="openModal(false, item, true)"
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
    <t-model
      v-if="isNew || isEdit"
      class="flex z-40 min-w-full mt-10 fixed top-20 justify-center"
      id="couponModal"
    >
      <div
        class="flex flex-col w-full sm:w-5/6 lg:w-1/2 max-w-2xl rounded-lg border border-gray-300 shadow-xl"
      >
        <div
          class="flex flex-row justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <div class="modal-header w-full flex flex-row justify-between">
            <div class="modal-title" id="exampleModalLabel">
              <div class="text-2xl">
                <div v-if="isNew">New Coupon</div>
                <div v-else>Edit Coupon</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body bg-white px-8 py-3">
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
                placeholder="Enter the
              Coupon Name"
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
                placeholder="Enter the
              Discount Percentage"
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
                placeholder="Enter the
              Due Date"
              />
            </div>

            <div class="flex flex-row mb-3">
              <label for="coupon_code" class="py-1 text-gray-600 w-6/12 my-auto"
                >Coupon Code</label
              >
              <input
                type="text"
                class="rounded border w-full px-3 py-1 my-2"
                id="coupon_code"
                v-model="tempCoupon.code"
                placeholder="Enter the code"
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
                  是否啟用
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
    </t-model>
    <!-- end of add new coupon modal -->
    <!-- start of the delete modal -->
    <!-- v-if="isDelete" -->

    <t-model
      v-if="false"
      class="flex z-40 min-w-full mt-10 fixed top-20 justify-center"
      id="couponModal"
    >
      <div
        class="flex flex-col w-full sm:w-5/6 lg:w-1/2 max-w-2xl rounded-lg border border-gray-300 shadow-xl"
      >
        <div
          class="flex flex-row justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <div class="modal-header w-full flex flex-row justify-between">
            <div class="modal-title" id="exampleModalLabel">
              <div class="text-2xl">
                <div>Coupon Delete</div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-body bg-white px-8 py-3">
          <div class="modal-body">
            Are you sure to DELETE the coupon?
            <div class="text-secondaryColor">{{ tempCoupon.title }}</div>
            Coupon(刪除後將無法恢復)。
          </div>
        </div>
        <div
          class="modal-footer bg-white py-3 px-8 flex justify-end border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <button
            type="button"
            class="rounded border px-2 py-1 hover:shadow-md"
            data-dismiss="modal"
            @click="isDelete = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
            @click="deleteCoupon(tempCoupon.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </t-model>

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
      modalType: "",
      isDelete: true,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    getCoupons(page = 1) {
      // const cors = 'https://cors-anywhere.herokuapp.com/'; 
      const api = `https://vue-course-api.hexschool.io/api/cclin/admin/coupons?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("getCoupons", response.data);
        vm.isLoading = false;
        vm.coupons = response.data.coupons;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item, isDelete) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
        this.modalType = "#couponModal";
      }
      if (!isNew) {
        this.tempCoupon = Object.assign({}, item); // 避免傳參考而覆蓋物件的值
        this.isNew = false;
        this.modalType = "#couponModal";
      }
      if (isDelete) {
        this.tempCoupon = item; // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.modalType = "#delCouponModal";
      }
      // $(this.modalType).modal("show");
    },
    updateCoupon() {
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // $("#couponModal").modal("hide");
          vm.getCoupons();
        } else {
          // $("#couponModal").modal("hide");
          vm.getCoupons();
          console.log("failure");
        }
        vm.coupons = response.data.coupons;
      });
    },
    // deleteCoupon(id) {
    deleteCoupon() {
      const vm = this;
      console.log(vm.tempCoupon);

      const delApi = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(delApi).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // $("#delCouponModal").modal("hide");
          vm.getCoupons();
        } else {
          // $("#delCouponModal").modal("hide");
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
