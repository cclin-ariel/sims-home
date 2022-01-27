<template>
<div>
  <div class="uppercase font-mono pl-2 flex justify-center text-xl tracking-wide mt-14">find some idea...</div>
  <div class="relative slide mt-10 pb-20">
    <div
      class="carousel-indicators absolute bottom-0 flex h-24 w-full justify-center items-center"
    >
      <ol class="z-50 flex w-4/12 justify-center">
        <li
          v-for="(img, i) in images"
          :key="i"
          class="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full cursor-pointer mx-2"
        ></li>
      </ol>
    </div>
    <div class="carousel-inner relative overflow-hidden w-10/12 mx-auto flex flex-row">
      <div
        v-for="(img, i) in images"
        :id="`slide-${i}`"
        :key="i"
        :class="`${active === i ? 'active' : 'left-full'}`"
        class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
      >
        <img class="block min-w-365px sm:w-10/12 mx-auto rounded sm:flex sm:justify-center" :src="img" alt="First slide" />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        "https://picsum.photos/500/400?image=1",
        "https://picsum.photos/500/400?image=2",
        "https://picsum.photos/500/400?image=3",
        "https://picsum.photos/id/238/1024/800",
        "https://picsum.photos/id/239/1024/800",
      ],
      active: 0,
    };
  },
  mounted() {
    let i = 0;
    setInterval(() => {
      if (i > this.images.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 3000);
  },
};
</script>
<style scoped>
.left-full {
  left: -100%;
}

.carousel-item {
  /* float: left; */
  /* position: relative; */
  display: block;
  width: 100%;
  margin-right: -100%;
  backface-visibility: hidden;
}

.carousel-item.active {
  left: 0;
}
</style>
