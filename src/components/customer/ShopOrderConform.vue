<template>
  <div class="w-10/12 md:w-7/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 mx-auto py-16 font-mono capitalize">
    <div class="w-full text-lg mx-auto">
      Thank you for your purchase. <br />
      Your order has been confirmed. <br />
      We look forward to seeing you again.
    </div>
    <router-link to="/sims_home" class="flex justify-end">
      <button
        class="
          capitalize
          mt-10
          rounded
          text-base text-bgColor
          bg-secondaryColor
          py-1
          px-3
          hover:bg-opacity-80
        "
      >
        keep Shopping
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {},
};
</script>
