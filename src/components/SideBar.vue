<template>
  <aside class="w-60 h-screen shadow-md hidden sm:block text-bgColor">
    <div class="flex flex-col h-screen p-4 bg-mainColor">
      <span class="mb-2 pb-1 text-base"
        ><i class="fas fa-tasks pr-1"></i> Order Management</span
      >
      <div class="text-sm">
        <router-link to="/admin/products">
          <div
            class="bg-gray-500 p-2 rounded mt-2 cursor-pointer hover:bg-gray-400"
          >
            <span data-feather="file-text"></span>
            <i class="fas fa-box-open"></i>
            Product List
          </div>
        </router-link>
        <router-link to="/admin/order_list">
          <div
            class="bg-gray-500 p-2 rounded mt-2 cursor-pointer hover:bg-gray-400"
          >
            <span data-feather="file-text"></span>
            <i class="far fa-list-alt"></i>
            Order List
          </div>
        </router-link>

        <!-- <div
            class="bg-gray-900 flex justify-between items-center  p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300"
          >
            <span>Reports</span>
            <span
              class="w-4 h-4 bg-blue-600 rounded-full  text-center font-normal text-xs"
              >5</span
            >
          </div> -->
        <router-link to="/admin/coupon_list" class="nav-link" href="#">
          <div
            class="bg-gray-500 p-2 rounded mt-2 cursor-pointer hover:bg-gray-400"
          >
            <span data-feather="file-text"></span>
            <i class="fas fa-ticket-alt"></i>
            Coupon List
          </div>
        </router-link>
      </div>

      <span class="mb-2 mt-8  pb-1 text-base"
        ><i class="fas fa-poll-h pr-2"></i>Customer Order</span
      >
      <div class="text-sm">
        <router-link to="/customer_orders" class="nav-link" href="#">
          <div
            class="bg-gray-500 p-2 rounded mt-2 cursor-pointer hover:bg-gray-400"
          >
            <span data-feather="file-text"></span>
            <i class="fas fa-store"></i> Official Release
          </div>
        </router-link>
      </div>
    </div>
  </aside>
</template>
