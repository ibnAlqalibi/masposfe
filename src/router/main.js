import CategoryCreateView from "@/views/category/create.vue";
import ProductsView from "@/views/products/index.vue";
import CartView from "@/views/cart/index.vue";
import ProductsCreateView from "@/views/products/create.vue";

import MainLayout from "@/layouts/MainLayout.vue";

// middleware
import AuthMiddleware from "@/middleware/auth.middleware.js";

export default [
  {
    path: "/",
    name: "home",
    component: ProductsView,
    meta: {
      title: "Home",
      layout: MainLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/category/create",
    name: "category.create",
    component: CategoryCreateView,
    meta: {
      title: "category Create",
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
      layout: MainLayout,
      middleware: [AuthMiddleware],
    },
  },
  {
    path: "/products/create",
    name: "products.create",
    component: ProductsCreateView,
    meta: {
      title: "Products Create",
      layout: MainLayout,
      middleware: [AuthMiddleware],
    },
  },
];
