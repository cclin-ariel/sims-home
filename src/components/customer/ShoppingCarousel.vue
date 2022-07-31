<template>
  <div>
    <div
      class="capitalize font-mono pl-2 flex justify-center text-xl tracking-wide mt-14"
    >
      find some idea...
    </div>
    <div class="relative slide mt-10 pb-20">
      <div
        class="carousel-indicators absolute bottom-0 flex h-24 w-full justify-center items-center"
      >
        <ol class="z-50 flex w-4/12 justify-center">
          <li
            v-for="(product, i) in filterProductList"
            :key="i"
            class="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full cursor-pointer mx-2"
          ></li>
        </ol>
      </div>
      <div
        class="carousel-inner relative overflow-hidden w-full sm:w-10/12 mx-auto flex flex-row"
      >
        <div
          v-for="(product, i) in filterProductList"
          :id="`slide-${i}`"
          :key="i"
          :class="`${active === i ? 'active' : 'left-full'}`"
          class="carousel-item inset-0 relative w-full transform transition-all duration-500 ease-in-out"
        >
          <img
            class="block w-full max-w-4xl sm:w-10/12 mx-auto rounded sm:flex sm:justify-center"
            :src="product.imageUrl"
            :alt="product.title"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    let i = 0;
    setInterval(() => {
      if (i > this.filterProductList.length - 1) {
        i = 0;
      }
      this.active = i;
      i++;
    }, 3000);
  },
  created() {
    this.getProducts();
  },
  computed: {
    filterProductList() {
      return this.$store.state.products.filter((product) => {
        return product.is_enabled == 1 && product.content === "inspiration";
      });
    },
  },
  methods: {
    ...mapActions(["getProducts"]),
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
