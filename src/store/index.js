import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    products: [],
    categories: [],
    categoriesOfInspiration: [],
    cart: [],
    totalAmount: {},
    isLoading: false,
  },
  actions: {
    getProducts(context) {
      context.commit("ISLOADING", true);
      const api = `https://vue-course-api.hexschool.io/api/cclin/products/all`;
      axios.get(api).then((response) => {
        context.commit("PRODUCTS", response.data.products);
        context.commit("CATEGORIES", response.data.products);
        context.commit("CATEGORIESOFINSPIRATION", response.data.products);
        // console.log("Vuex getProducts", response.data);
        window.scrollTo(0, 0);
        context.commit("ISLOADING", false);
      });
    },
    getCart(context) {
      context.commit("ISLOADING", true);
      const api = `https://vue-course-api.hexschool.io/api/cclin/cart`;
      axios.get(api).then((response) => {
        context.commit("CART", response.data.data.carts);
        context.commit("TOTALAMOUNT", response.data.data);
        window.scrollTo(0, 0);

        context.commit("ISLOADING", false);
      });
    },
  },
  mutations: {
    ISLOADING(state, payload) {
      state.isLoading = payload;
    },
    PRODUCTS(state, payload) {
      state.products = payload;
    },
    CART(state, payload) {
      state.cart = payload;
    },
    TOTALAMOUNT(state, payload) {
      state.totalAmount = payload;
    },
    CATEGORIES(state, payload) {
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    },
    CATEGORIESOFINSPIRATION(state, payload) {
      const categoriesOfInspiration = new Set();
      payload.forEach((item) => {
        if (item.category == "plants & DÉCOR") return; //plants & DÉCOR is not a cate of inspiration
        categoriesOfInspiration.add(item.category);
      });
      state.categoriesOfInspiration = Array.from(categoriesOfInspiration);
    },
  },
  getters: {
    cartsAmount(state) {
      return state.cart.length;
    },
  },
});
