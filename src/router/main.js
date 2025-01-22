import HomeView from "@/views/home/index.vue";
import UserView from "@/views/user/index.vue";
import UserCreateView from "@/views/user/create.vue";
import UserUpdateView from "@/views/user/update.vue";
import ProductsView from "@/views/products/index.vue";
import CartView from "@/views/cart/index.vue";
import CheckoutView from "@/views/cart/checkout.vue";
import ProductsCreateView from "@/views/products/create.vue";
import ProductsUpdateView from "@/views/products/update.vue";

import ExampleLayout from "@/layouts/ExampleLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

// middleware
import AuthMiddleware from "@/middleware/auth.middleware.js";

export default [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
      layout: MainLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    meta: {
      title: "User",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/user/create",
    name: "user.create",
    component: UserCreateView,
    meta: {
      title: "User Create",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/user/update",
    name: "user.update",
    component: UserUpdateView,
    meta: {
      title: "User Update",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/products",
    name: "products",
    component: ProductsView,
    meta: {
      title: "Products",
      layout: MainLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
    meta: {
      title: "Cart",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutView,
    meta: {
      title: "checkout",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/products/create",
    name: "products.create",
    component: ProductsCreateView,
    meta: {
      title: "Products Create",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/products/update",
    name: "products.update",
    component: ProductsUpdateView,
    meta: {
      title: "Products Update",
      layout: ExampleLayout,
      middleware: [AuthMiddleware],
    },
  },
];
