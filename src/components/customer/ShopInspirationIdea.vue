<template>
  <div class="max-w-screen flex flex-col items-center">
    <ShopNav />
    <div class="md:h-32 h-20"></div>

    <div
      class="w-full sm:w-10/12 flex justify-center mx-auto mt-12 text-2xl font-mono uppercase"
    >
      Interior Idea of bedroom
    </div>
    <div
      class="w-10/12 max-w-180px tracking-wide flex justify-center px-6 mx-auto mt-8 font-serif"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque dolore
      reprehenderit quos.
    </div>

    <div
      class="max-w-screen-xl sm:w-10/12 mx-auto mt-10 flex flex-col justify-evenly sm:flex-row sm:flex-wrap"
    >
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=39"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=65"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=64"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=63"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=62"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
      <div class="relative my-12 mx-3">
        <img
          class="rounded"
          src="https://picsum.photos/500/550?image=59"
          alt="Interior Idea"
        />
        <button
          class="absolute border right-2 top-2 shadow rounded px-2 py-1 bg-bgColor text-xs uppercase tracking-wide"
        >
          shop this look
        </button>
      </div>
    </div>
    <ShopFooter />
  </div>
</template>

<script>
import ShopNav from "./ShopNav.vue";
import ShopFooter from "./ShopFooter.vue";

export default {
  components: {
    ShopNav,
    ShopFooter,
  },
};
</script>

<style scoped></style>
