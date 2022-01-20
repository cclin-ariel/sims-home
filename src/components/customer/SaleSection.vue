<template>
  <div class="flex justify-center mt-5">
    <div class="md:w-full lg:w-10/12 mb-10 flex justify-between flex-col md:flex-row">
      <div class="m-3 min-w-min hidden md:block">
        <img src="https://picsum.photos/350/400 " alt="wall-paper" />
      </div>
      <div class="m-3">
        <img src="https://picsum.photos/700/400 " alt="wall-paper" />
      </div>
      <div class="w-full mt-4 md:mt-0 md:w-4/12 px-6 flex flex-col justify-center">
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
