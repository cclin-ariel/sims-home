<template>
  <div class="w-full max-w-1600px flex justify-center flex-col sm:w-10/12">
    <!-- start of breadcrumb -->
    <div class="w-full flex flex-row pl-5 sm:w-10/12 sm:pl-24 my-8 md:pl-32">
      <router-link
        class="hover:text-gray-400 text-sm sm:text-base font-serif capitalize"
        to="/sims_home/shop_by_category"
        >product</router-link
      >
      <div class="mx-3 flex self-center">
        <i class="fas fa-chevron-right fa-xs"></i>
      </div>
      <router-link
        class="hover:text-gray-400 text-sm sm:text-base font-serif capitalize"
        to="/sims_home/shop_by_category"
        >bedding</router-link
      >
      <div class="mx-3 flex self-center">
        <i class="fas fa-chevron-right fa-xs"></i>
      </div>
      <router-link
        class="hover:text-gray-400 text-sm sm:text-base font-serif capitalize"
        to="/sims_home/shop_by_category"
        >double bed</router-link
      >
    </div>
    <!-- end of breadcrumb -->

    <div class="w-full flex flex-col md:grid md:grid-flow-col auto-rows-min">
      <!-- start of carousel -->
      <div class="relative slide mt-3 pb-20 order-2 md:order-1 md:row-span-3 md:col-span-3"
      >
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
          <div class="carousel-inner relative overflow-hidden w-10/12 mx-auto flex flex-row"
          >
            <div
              v-for="(img, i) in images"
              :id="`slide-${i}`"
              :key="i"
              :class="`${active === i ? 'active' : 'left-full'}`"
              class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
            >
              <img
                class="block min-w-365px sm:w-10/12 mx-auto rounded sm:flex sm:justify-center"
                :src="img"
                alt="First slide"
              />
            </div>
          </div>
      </div>
      <!-- end of carousel -->

      <!-- start of product detail -->
      <!-- start of product title -->
      <div class="mx-auto w-11/12 order-1 md:order-2 md:col-span-1 md:h-10 md:pl-3"
      >
        <div class="underline px-5 tracking-widest sm:px-0 sm:w-10/12">
          new!
        </div>
        <div
          class="w-full capitalize font-serif text-xl pl-5 tracking-widest sm:px-0 sm:w-10/12 mt-1 mb-3"
        >
          double bed
        </div>
      </div>
      <!-- end of product title -->

      <div class="order-3 md:col-span-1 md:row-span-2 flex flex-col">
        <!-- division line -->
        <div class="flex self-center border-b-2 w-11/12 sm:hidden"></div>

        <div class="mt-8 w-10/12 flex self-center flex-col ">
          <div class="text-gray-500 tracking-wider">$338.00</div>
          <div class="text-gray-500 tracking-wider uppercase mt-5">
            size: <span class="text-gray-500">Full/Queen</span>
          </div>
          <!-- start of QTY -->
          <div class="flex flex-row mt-5">
            <div class="text-gray-500 flex self-center">QTY:</div>
            <div class="pl-3">
              <div
                class="flex flex-row border h-10 w-24 border-gray-400 relative"
              >
                <button
                  class="border-r bg-gray-300 hover:bg-bgColor text-white border-gray-400 h-full w-20 flex focus:outline-none cursor-pointer"
                >
                  <span class="m-auto">-</span>
                </button>
                <input
                  type="hidden"
                  class="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center"
                  readonly
                  name="custom-input-number"
                />
                <div
                  class="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default"
                >
                  <span class="text-gray-500">2</span>
                </div>

                <button
                  class="border-l bg-gray-300 hover:bg-bgColor text-white border-gray-400 h-full w-20 flex focus:outline-none cursor-pointer"
                >
                  <span class="m-auto">+</span>
                </button>
              </div>
            </div>
          </div>
          <!-- end of QTY -->

          <button
            class="uppercase rounded px-3 py-2 m-1 shadow-lg bg-secondaryColor text-white my-10 tracking-widest max-w-xs"
          >
            add to bag
          </button>
        </div>
        <!-- division line -->
        <div class="flex self-center border-b-2 w-11/12"></div>

        <div class="mt-8 w-10/12 flex self-center flex-col">
          <div class="uppercase text-gray-500 tracking-wider">description</div>
          <div class="text-gray-400 text-sm tracking-wider mt-3 mb-16">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Necessitatibus cum aut dolore iste. Saepe quia odit esse ducimus rem
            hic inventore fugiat voluptate, modi eius temporibus quas! Eligendi
            ipsam, rerum quisquam eius officiis alias in recusandae temporibus
            possimus id, modi reprehenderit porro ipsum optio debitis quae ut
            quas nobis ad?
          </div>
        </div>
      </div>
    </div>

    <!-- end of product detail -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        "https://picsum.photos/500/500?image=88",
        "https://picsum.photos/500/500?image=82",
        "https://picsum.photos/500/500?image=83",
        "https://picsum.photos/500/500?image=70",
        "https://picsum.photos/500/500?image=79",
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
    }, 4000);
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
