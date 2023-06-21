import { createWebHistory, createRouter } from "vue-router";

import about from "./components/about"
import home from "./components/home"
import shop from "./components/shop"
import contact from "./components/contact"
import mypage from "./components/management"
import singUp from "./components/singUp"
import oderman from "./components/ordermanager.vue"
import membership from "./components/membership.vue"
import admin from "./components/admin.vue"
import sangseS from "./components/sangseS.vue"
import cart from "./components/Cart.vue"
import payment from "./components/paymentT.vue"
import iteminfo from "./components/iteminfo.vue"
import memberManagement from "./components/memberManagement"




const routes = [
  {
    path: "/about",
    component: about,
  },
  {
    path: "/",
    component: home,
  },
  {
    path: "/shop/:condition/:page",
    component: shop,
  },  
  {
    path: "/contact",
    component: contact,
  },
  {
    path: "/mypage",
    component: mypage,
  },
  {
    path: "/singUp",
    component: singUp,
  },
  {
    path: "/oderman",
    component: oderman,
  },
  {
    path: "/membership",
    component: membership,
  },
  {
    path: "/admin",
    component: admin,
  },
  {
    path: "/product/:num",
    component: sangseS,
  },
  {
    path: "/cart",
    component: cart,
  },
  {
    path: "/payment/:proid/:count",
    component: payment,
  },
  {
    path: "/iteminfo",
    component: iteminfo,
  },
  {
    path: "/memberManagement",
    component: memberManagement,
  },



];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 