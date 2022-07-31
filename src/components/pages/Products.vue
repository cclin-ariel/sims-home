<template>
  <div>
    <!-- start of Add Product button -->
    <div>
      <button
        class="rounded text-bgColor bg-secondaryColor py-1.5 px-4 hover:bg-opacity-80"
        @click="openModal(true, false, '', false)"
      >
        Add Product
      </button>
    </div>
    <!-- end of Add Product button -->
    <!-- start of product list -->
    <table class="table-fixed w-full mt-5">
      <thead class="py-8 min-w-max">
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
        <tr
          v-for="item in products"
          :key="item.id"
          class="border-t-2 min-w-max"
        >
          <td class="text-center py-2 min-w-max">{{ item.num }}.</td>
          <td class="text-center min-w-max">{{ item.category }}</td>
          <td class="text-left">{{ item.title }}</td>
          <td class="text-right">
            <dir v-if="!item.origin_price" class="text-center mx-auto p-0">
              -
            </dir>
            <dir v-else>{{ item.origin_price | currency }}</dir>
          </td>
          <td class="text-right">
            <dir v-if="!item.price" class="text-center">-</dir>
            <dir v-else>{{ item.price | currency }}</dir>
          </td>
          <td  ></td>
          <td class="text-center">
            <span v-if="item.is_enabled" class="text-success">Launched</span>
            <span v-else>Hidden</span>
          </td>
          <td class=" ">
            <div class="w-full flex justify-center">
              <button
                class="btn btn-outline-primary btn-sm border py-1 px-2 border rounded-lg mx-auto hover:text-gray-500"
                @click="openModal(false, true, item, false)"
              >
                Edit
              </button>
            </div>
          </td>
          <td class=" ">
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
    <!-- end of product list -->
    <Pagination :pagination-from-products="pagination" @trigger="getProducts" />

    <!-- start of add new modal -->
    <div   v-if="isNew || isEdit">
      <div
        class="flex z-40 w-screen h-screen bg-bgColor bg-opacity-70 absolute top-0 left-0"
      >
        <div
          class="flex flex-col m-auto rounded-lg border border-gray-300 shadow-xl"
        >
          <div
            class="flex flex-row justify-between px-6 py-2 bg-white border-b border-gray-200 rounded-tl-lg rounded-tr-lg"
          >
            <div
              class="capitalize font-sans text-xl text-secondaryColor font-medium"
            >
              <span v-if="isNew">Add New Product</span>
              <span v-else>Edit Product</span>
            </div>
          </div>
          <div class="modal-body py-4 px-6 justify-center bg-white">
            <div class="grid grid-cols-1 gap-4">
              <div class="flex flex-row w-full">
                <div class="flex flex-col w-6/12">
                  <div  >
                    <label for="image">Upload Image by url</label>
                    <br />
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
                <div
                  class="border rounded p-1 w-full max-h-40 max-w-50 ml-3 bg-cover bg-no-repeat"
                  :style="{ backgroundImage: `url(${tempProduct.imageUrl})` }"
                ></div>
              </div>
              <hr class="col-span-2" />
              <div class="grid grid-cols-2 gap-1">
                <div  >
                  <label for="title">Title</label>
                  <input
                    type="text"
                    class="rounded border w-full px-2 py-1"
                    id="title"
                    v-model="tempProduct.title"
                    placeholder="Product title"
                  />
                </div>
                <div  >
                  <div  >
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

                <div  >
                  <div  >
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
                <div  >
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
              </div>
            </div>
          </div>
          <div
            class="w-full flex flex-row justify-between bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg"
          >
            <div class="py-3 px-5">
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
            <div class="flex flex-row items-center justify-end py-3 px-5">
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
    </div>

    <!-- end of add new modal -->
    <!-- start of delete modal -->
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
                  product delete
                </div>
              </div>
              <div class="w-full py-2 border-b">
                <div class="pb-1">
                  Are you sure to delete this product?
                </div>
                <div>
                  <i class="fal fa-exclamation-circle text-secondaryColor"></i>
                  <span class="p-2">
                    {{ tempProduct.title }}
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
                  @click="deleteProduct"
                >
                  Delete
                </button>
              </div>
            </div>
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
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isEdit: false,
      isDelete: false,
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
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(isNew, isEdit, item, isDelete) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      }
      if (isEdit) {
        this.tempProduct = Object.assign({}, item); // 避免傳參考而覆蓋物件的值
        this.isEdit = true;
      }
      if (isDelete) {
        this.tempProduct = item; // no value in this modal, no need to避免傳參考而覆蓋物件的值
        this.isDelete = true;
      }
    },
    uploadFile() {
      console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      const vm = this;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      const api = `https://vue-course-api.hexschool.io/api/cclin/admin/upload`;

      vm.status.fileUploading = true;
      this.$http
        .post(api, formData, {
          headers: {
            "content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            vm.status.fileUploading = false;
            // console.log(vm.tempProduct)
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else if (response.status === 400) {
            console.log("400 please login");
            vm.$router.push("/login");
          } else if (response.status === 401) {
            console.log("401 Bad Request");
            vm.$router.push("/login");
          } else {
            vm.getProducts();
            console.log("failure");
          }
        });
    },
    updateProduct() {
      const vm = this;
      // new product
      let api = `https://vue-course-api.hexschool.io/api/cclin/admin/product`;
      let httpMethod = "post";
      // edit product
      if (!vm.isNew) {
        api = `https://vue-course-api.hexschool.io/api/cclin/admin/product/${vm.tempProduct.id}`;
        httpMethod = "put";
      }

      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        this.isNew = false;
        this.isEdit = false;

        console.log(response);
        if (response.data.success) vm.getProducts();
        if (!response.data.success) {
          if (response.status !== 401 && response.status !== 401) {
            vm.getProducts();
            console.log("failure");
          }
          if (response.status === 400) console.log("please login");
          if (response.status === 401) console.log("401 Bad Request");
          vm.$router.push("/login");
        }

        vm.products = response.data.products;
        vm.modalIsShowing = false;
      });
    },
    deleteProduct() {
      const vm = this;
      const delApi = `https://vue-course-api.hexschool.io/api/cclin/admin/product/${vm.tempProduct.id}`;

      this.$http.delete(delApi).then((response) => {
        vm.isDelete = false;
        // console.log(response.data);
        if (response.data.success) vm.getProducts();
        if (!response.data.success) {
          if (response.status !== 401 && response.status !== 401) {
            console.log("failure");
            vm.getProducts();
          }
          if (response.status === 400) console.log("please login");
          if (response.status === 401) console.log("401 Bad Request");
          vm.$router.push("/login");
        }
      });
    },
  },
};
</script>
