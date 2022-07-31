<template>
  <div class="w-full mx-auto flex justify-center mt-0 sm:mt-5">
    <div
      class="w-full md:w-11/12 lg:w-10/12 mb-10 flex justify-between flex-col md:flex-row"
    >
      <div class="m-3 min-w-min hidden lg:block lg:w-2/12">
        <img src="@/photo/FOR SALE.png" alt="wall-paper" class="rounded" />
      </div>
      <div class="md:m-3 mx-auto w-full md:w-7/12 lg:w-6/12 rounded">
        <img src="@/photo/living1.png" alt="wall-paper" class="sm:rounded" />
      </div>
      <div
        class="w-full mt-4 md:mt-0 md:w-5/12 lg:w-4/12 px-6 flex flex-col justify-center"
      >
        <div class="underline font-mono">PLANTS & DÉCOR</div>
        <div class="font-bold text-3xl font-serif">Boldly Go</div>
        <p class="leading-relaxed my-6 font-mono">
          Chart a new course with fresh color, lush prints, and can't-miss
          texture.
        </p>
        <router-link
          :to="{
            path: '`/shop_by_category/${saleItem}`',
            name: 'ShopByCategory',
            query: {
              cate: saleItem,
            },
          }"
          class="btn btn-outline-primary btn-sm border py-2 px-6 uppercase self-end hover:shadow"
          >shop here</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      saleItem: "plants & DÉCOR",
    };
  },
};
</script>
