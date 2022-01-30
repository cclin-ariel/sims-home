<template>
  <aside class="w-60 shadow-md hidden sm:block text-bgColor">
    <div class="flex h-full flex-col p-4 bg-mainColor">
      <span class="mb-2 pb-1 text-base"
        ><i class="fas fa-tasks pr-1"></i>Management</span
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

        <router-link to="/admin/coupon_list" class="nav-link hidden" href="#">
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
        <router-link to="/sims_home" >
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
