<template>
  <div>
    <div class="mt-0">
      <button
        class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        @click="openModal(true, false, '', false)"
      >
        Add Product
      </button>
    </div>

    <!-- start of product list -->
    <table class="table-fixed w-full mt-5">
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
          <td class="text-center py-2">{{ index + 1 }}.</td>
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
                @click="openModal(false, true, item, false)"
              >
                Edit
              </button>
            </div>
          </td>
          <td>
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-danger btn-sm border py-1 px-2 border rounded-lg"
                @click="openModal(false, false, item, true)"
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
    <div class="relative" v-if="isNew || isEdit">
      <div
        class="flex items-center z-40 w-full bg-opacity-50 antialiased mt-10 fixed top-14"
        id="addNewModal"
      >
        <div
          class="flex flex-col w-11/12 sm:w-5/6 lg:w-1/2 max-w-2xl mx-auto rounded-lg border border-gray-300 shadow-xl"
        >
          <div
            class="flex flex-row justify-between px-6 py-3 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <p
              class="font-sans text-gray-800 text-xl text-secondaryColor font-medium"
            >
              <span v-if="isNew">Add New Product</span>
              <span v-else>Edit Product</span>
            </p>
          </div>
          <div class="modal-body py-4 px-6 justify-center bg-white">
            <div class="grid grid-cols-1 gap-4">
              <div class="flex flex-row">
                <div class="flex flex-col">
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
                </div>
                <img
                  img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                  class="border rounded p-1 max-h-40 ml-3"
                  :src="tempProduct.imageUrl"
                  alt="check your image url"
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
              class="rounded border px-2 py-1 hover:shadow-md"
              @click="(isNew = false), (isEdit = false)"
            >
              Cancel
            </button>
            <button
              type="button"
              class="rounded border px-2 py-1 ml-2 border text-base bg-secondaryColor text-bgColor hover:text-white hover:border-secondaryColor"
              @click="updateProduct"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- end of add new modal -->
    <!-- start of delete modal -->
    <!-- component -->
    <div
      v-if="isDelete"
      class="flex items-center justify-center fixed left-0 bottom-0 w-full h-full"
    >
      <div class="bg-white rounded-lg w-1/2">
        <div class="flex flex-col items-start p-4">
          <div class="flex items-center w-full">
            <div class="text-xl">
              Are you sure going to delete this product?
            </div>
          </div>
          <hr />
          <div class="text-secondaryColor font-medium">
            <i class="fas fa-minus"></i> {{ tempProduct.title }}
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
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- end of delete modal -->
  </div>
</template>
<script>
import Pagination from "../Pagination.vue";
export default {
  components: { Pagination },

  data() {
    return {
      // modalIsShowing: false,
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isEdit: false,
      modalType: "",
      isDelete: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  created() {
    this.getProducts();
    console.log(this.isNew, this.isEdit);
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
    openModal(isNew, isEdit, item, isDelete) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
        this.modalType = "#productModal";
      }
      if (isEdit) {
        this.tempProduct = Object.assign({}, item); // 避免傳參考而覆蓋物件的值
        this.isEdit = true;
        this.modalType = "#productModal";
      }
      if (isDelete) {
        this.tempProduct = item; // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.isDelete = true;

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
        if (response.data.success) {
          this.isNew = false;
          this.isEdit = false;
          vm.getProducts();
        } else {
          this.isNew = false;
          this.isEdit = false;
          vm.getProducts();
          console.log("failure");
        }
        vm.products = response.data.products;
        vm.modalIsShowing = false;
      });
    },
  },
};
</script>
