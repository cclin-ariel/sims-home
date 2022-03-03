<template>
  <div class="w-10/12 md:w-full mx-auto flex justify-center mt-5">
    <div
      class="md:w-full lg:w-10/12 mb-10 flex justify-between flex-col md:flex-row"
    >
      <div class="m-3 min-w-min hidden md:block md:w-2/12">
        <img src="@/photo/FOR SALE.png" alt="wall-paper" class="rounded" />
      </div>
      <div class="md:m-3 mx-auto w-full md:w-6/12 rounded">
        <img src="@/photo/living1.png" alt="wall-paper" class="rounded" />
      </div>
      <div
        class="w-full mt-4 md:mt-0 md:w-4/12 px-6 flex flex-col justify-center"
      >
        <div class="underline font-mono">LIGHTING & DÉCOR</div>
        <div class="font-bold text-3xl font-serif">Boldly Go</div>
        <p class="leading-relaxed my-6 font-mono">
          Chart a new course with fresh color, lush prints, and can't-miss
          texture.
        </p>
        <router-link
          to="/sims_home/shop_product"
          class="btn btn-outline-primary btn-sm border py-2 px-6 border uppercase self-end"
          >shop here</router-link
        >
      </div>
    </div>
  </div>
</template>
