<template>
  <div>
    <div class="mt-2">
      <button
        class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        @click="openModal(true), (modalIsShowing = true)"
      >
        Add Product
      </button>
    </div>

    <!-- start of product list -->
    <table class="table-fixed w-full p-3 mt-5">
      <thead class="py-8">
        <th class="text-center w-10">No.</th>
        <th class="text-center w-2/12">Category</th>
        <th class="text-left w-auto">Product Name</th>
        <th class="text-right w-24">Origin Price</th>
        <th class="text-right w-24">Price</th>
        <th class="w-5"></th>
        <th class="text-center w-24">Status</th>
        <th class="text-center w-20 mx-auto">Edit</th>
        <th class="text-center w-20">Delete</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in products" :key="item.id" class="border-t-2">
          <td class="text-center md:py-4">{{ index + 1 }}.</td>
          <td class="text-center">{{ item.category }}</td>
          <td class="text-left">{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class=""></td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">Launched</span>
            <span v-else>Hidden</span>
          </td>
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
    <!-- end of product list -->
    <Pagination :pagination-from-products="pagination" @trigger="getProducts" />

    <!-- start of add new modal -->
    <t-modal
      v-if="modalIsShowing"
      class="flex z-40 w-full bg-opacity-50 antialiased mt-10 fixed top-20"
      id="addNewModal"
    >
      <div
        class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl"
      >
        <div
          class="flex flex-row justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
        >
          <p class="font-sans text-gray-800">
            <span v-if="isNew">Add New Product</span>
            <span v-else>Edit product</span>
          </p>
        </div>
        <div class="modal-body py-4 px-6 justify-center bg-white">
          <div class="grid grid-cols-1 gap-4">
            <div class="">
              <div class="">
                <label for="image">Upload Image by url</label>
                <input
                  type="text"
                  class="rounded border w-full px-2 py-1"
                  id="image"
                  v-model="tempProduct.imageUrl"
                  placeholder="Image url..."
                />
              </div>
              <div class="mt-4">
                <label for="customFile"
                  >Or Upload Image by file
                  <i
                    class="fas fa-spinner fa-pulse"
                    v-if="status.fileUploading"
                  ></i>
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="ml-3"
                  ref="files"
                  @change="uploadFile"
                />
              </div>
              <img
                img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class=""
                :src="tempProduct.imageUrl"
                alt=""
              />
            </div>
            <hr class="col-span-2" />
            <div class="grid grid-cols-2 gap-4">
              <div class="">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="rounded border w-full px-2 py-1"
                  id="title"
                  v-model="tempProduct.title"
                  placeholder="Product title"
                />
              </div>

              <div class="">
                <div class="">
                  <label for="category">Category</label>
                  <input
                    type="text"
                    class="rounded border w-full px-2 py-1"
                    id="category"
                    v-model="tempProduct.category"
                    placeholder="Category"
                  />
                </div>
              </div>

              <div class="">
                <div class="">
                  <label for="origin_price">Origin Price</label>
                  <input
                    type="number"
                    class="rounded border w-full px-2 py-1"
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    placeholder="Origin Price"
                  />
                </div>
              </div>
              <div class="">
                <label for="price">Price</label>
                <input
                  type="number"
                  class="rounded border w-full px-2 py-1"
                  id="price"
                  v-model="tempProduct.price"
                  placeholder="Price"
                />
              </div>

              <div class="col-span-2">
                <label for="description" class="align-top"
                  >Product Description</label
                >
                <textarea
                  type="text"
                  class="rounded border w-full px-2 py-1"
                  id="description"
                  v-model="tempProduct.description"
                  placeholder="Description..."
                ></textarea>
              </div>
              <div class="col-span-2">
                <label for="content" class="align-top">Product Content</label>
                <textarea
                  type="text"
                  class="rounded border w-full px-2 py-1"
                  id="content"
                  v-model="tempProduct.content"
                  placeholder="Content..."
                ></textarea>
              </div>
              <div class="col-span-2">
                <div class="flex justify-end">
                  <input
                    class="self-center"
                    type="checkbox"
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    :true="1"
                    :false="0"
                  />
                  <label class="ml-2" for="is_enabled"> Launched </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex flex-row items-center justify-end p-5 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
        >
          <button
            type="button"
            class="px-4 py-2 text-secondaryColor font-semibold bg-bgColor hover:bg-opacity-80 rounded"
            @click="modalIsShowing = false"
          >
            Cancel
          </button>
          <button
            type="button"
            class="ml-4 px-4 py-2 text-bgColor font-semibold bg-secondaryColor hover:bg-opacity-80 rounded"
            @click="updateProduct"
          >
            Save
          </button>
        </div>
      </div>
    </t-modal>
    <!-- end of add new modal -->
  </div>
</template>
<script>
import Pagination from '../Pagination.vue'
export default {
    components: { Pagination },

  data() {
    return {
      modalIsShowing: false,
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      modalType: "",
      isDelete: true,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page = 1) {
      const api = `https://vue-course-api.hexschool.io/api/cclin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, item, isDelete) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        this.modalType = "#productModal";
      }
      if (!isNew) {
        this.tempProduct = Object.assign({}, item); // 避免傳參考而覆蓋物件的值
        this.isNew = false;
        this.modalType = "#productModal";
      }
      if (isDelete) {
        this.tempProduct = item; // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.modalType = "#delProductModal";
      }
      // $(this.modalType).modal('show')
    },
    updateProduct() {
      let api = `https://vue-course-api.hexschool.io/api/cclin/admin/product`;
      let httpMethod = "post";
      const vm = this;
      if (!vm.isNew) {
        api = `https://vue-course-api.hexschool.io/api/cclin/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        // if (response.data.success) {
        //   $("#productModal").modal("hide");
        //   vm.getProducts();
        // } else {
        //   $("#productModal").modal("hide");
        //   vm.getProducts();
        //   console.log("failure");
        // }
        //   vm.products = response.data.products
        vm.modalIsShowing = false;
      });
    },
  },
};
</script>
