import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/pages/Login.vue";
import Products from "../components/pages/Products.vue";
import OrderList from "../components/pages/OrderList.vue";
import CouponList from "../components/pages/CouponList.vue";
import DashBoard from "../components/DashBoard.vue";

// customer page
import Home from "../components/customer/Home.vue";
import TopPage from "../components/customer/TopPage.vue";
import ShopInspirationIdea from "../components/customer/ShopInspirationIdea.vue";
import ShopByCategory from "../components/customer/ShopByCategory.vue";
import ShopThisInspiration from "../components/customer/ShopThisInspiration.vue";
import ShopByKeyword from "../components/customer/ShopByKeyword.vue";
import ShopProduct from "../components/customer/ShopProduct.vue";
import ShopCart from "../components/customer/ShopCart";
import ShopCheckout from "../components/customer/ShopCheckout";

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "login", // path
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    name: "DashBoard",
    component: DashBoard,
    children: [
      {
        path: "products",
        name: "products",
        component: Products,
        meta: { requiresAuth: true }, // router info
      },
      {
        path: "order_list",
        name: "orderList",
        component: OrderList,
        meta: { requiresAuth: true }, // router info
      },
      {
        path: "coupon_list",
        name: "couponList",
        component: CouponList,
        meta: { requiresAuth: true }, // router info
      },
    ],
  },

  {
    path: "/sims_home",
    name: "Home",
    component: Home,
    children: [
      {
        path: "",
        name: "TopPage",
        component: TopPage,
      },
      {
        path: "shop_inspiration_idea/:inspirationItem?",
        name: "ShopInspirationIdea",
        component: ShopInspirationIdea,
      },
      {
        path: "shop_by_category",
        name: "ShopByCategory",
        component: ShopByCategory,
      },
      {
        path: "/sims_home/shop_this_inspiration",
        name: "ShopThisInspiration",
        component: ShopThisInspiration,
      },
      {
        path: "/sims_home/shop_by_keyword",
        name: "ShopByKeyword",
        component: ShopByKeyword,
      },

      {
        path: "/sims_home/shop_product/",
        name: "ShopProduct",
        component: ShopProduct,
      },
      // Shop order
      {
        path: "shop_cart",
        name: "ShopCart",
        component: ShopCart,
      },
      {
        path: "shop_checkout/:orderId",
        name: "ShopCheckout",
        component: ShopCheckout,
      },
    ],
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
