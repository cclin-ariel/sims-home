<template>
    <div @click="getData">
        <!-- section fo INSPIRATION DELIVERED -->
        <SaleSection />
        <!-- division line -->
        <div class="border-b w-full lg:w-10/12 mx-auto"></div>
        <ShopByInspiration :categories="categoriesDataFromHome" :productList="productsFromHome" ref="topPageInspiration" />
        <!-- division line -->
        <div class="border-b w-full md:w-10/12"></div>
        <ShoppingCarousel :productList="productsFromHome" ref="topPageInspiration" />
    </div>
</template>

<script>
import SaleSection from "./SaleSection.vue";
import ShopByInspiration from "./ShopByInspiration.vue";
import ShoppingCarousel from "./ShoppingCarousel.vue";
export default {
    components: {
        SaleSection,
        ShopByInspiration,
        ShoppingCarousel,
    },
    props: ["categoriesDataFromHome", "productsFromHome"],

    data() {
        return {};
    },
    created() {
        // this.getProducts();
    },
    methods: {
        parentEvent() {
            // console.log("pass the categoriesData");
        },

        getData() {
            console.log(this.$parent.categoriesDataFromHome);
            console.log(this.$parent.productsFromHome);
            this.$parent.parentEvent();
        },
    },
};
</script>
