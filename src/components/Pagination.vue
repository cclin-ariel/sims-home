<template>
  <!-- start of pagination -->
  <nav aria-label="Page navigation example ">
    <ul class="pagination flex flex-row justify-center mt-8">
      <li
        class="page-item mx-1 px-3 py-2 text-gray-500 hover:text-secondaryColor"
        :class="{ disabled: !paginationFromProducts.has_pre }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="
            triggerGetProducts(paginationFromProducts.current_page - 1)
          "
        >
          <i class="fas fa-angle-double-left"></i>
        </a>
      </li>
      <li
        class="page-item mx-1 px-3 py-2 text-gray-700 hover:text-secondaryColor"
        v-for="page in paginationFromProducts.total_pages"
        :key="page"
        :class="{ active: paginationFromProducts.current_page === page }"
      >
        <a class="page-link" href="#" @click.prevent="triggerGetProducts(page)">
          {{ page }}
        </a>
      </li>
      <li
        class="page-item mx-1 px-3 py-2 text-gray-500 hover:text-secondaryColor"
        :class="{ disabled: !paginationFromProducts.has_next }"
      >
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="
            triggerGetProducts(paginationFromProducts.current_page + 1)
          "
        >
          <i class="fas fa-angle-double-right"></i>
        </a>
      </li>
    </ul>
  </nav>
  <!-- end of pagination -->
</template>
<script>
export default {
  props: ["paginationFromProducts"],
  methods: {
    triggerGetProducts(data) {
      this.$emit("trigger", data);
    },
  },
};
</script>
