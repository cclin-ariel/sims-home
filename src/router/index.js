import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/pages/Login.vue";
import Products from "../components/pages/Products.vue";
import OrderList from "../components/pages/OrderList.vue";
import CouponList from "../components/pages/CouponList.vue";
import DashBoard from "../components/DashBoard.vue";

// customer page
import Home from "../components/customer/Home.vue";

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

  // customer order

  // {
  //   path: '/',
  //   name: 'Dashboard',
  //   component: Dashboard,
  //   children: [
  //     {
  //       path: 'customer_orders',
  //       name: 'customerOrders',
  //       component: CustomerOrders
  //     },
  //     {
  //       path: 'customer_checkout/:orderId',
  //       name: 'customerCheckout',
  //       component: CustomerCheckout
  //     }
  //   ]
  // },
  { 
    path: '/sims_home', 
    name: 'Home', 
    component: Home }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
