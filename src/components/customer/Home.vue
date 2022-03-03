<template>
    <div class="max-w-screen flex flex-col items-center">
        <ShopNav :categoriesDataFromHome="categories" :productsFromHome="products" ref="topPageInspiration" />
        <div class="md:h-32 h-20"></div>
        <router-view :categoriesDataFromHome="categories" :productsFromHome="products" ref="topPageInspiration" />
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
    data() {
        return {
            products: [],
            categories: [
                "bedroom",
                "bath",
                "kitchen",
                "living",
                "dining",
                "outdoor",
                "LIGHT & DECOR",
                "ART",
            ],
        };
    },
    created() {
        this.getProducts();
    },
    methods: {
        parentEvent() {
            // console.log("pass the categoriesData");
        },
        getProducts() {
            const api = `https://vue-course-api.hexschool.io/api/cclin/products/all`;
            const vm = this;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
                // console.log(response.data);
                // vm.isLoading = false;
                vm.products = response.data.products;
            });
        },
    },
};
</script>
