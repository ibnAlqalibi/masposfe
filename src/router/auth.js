import LoginView from "@/views/auth/login/index.vue";

// middleware
import GuestMiddleware from "@/middleware/guest.middleware.js";

export default [
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Login",
      middleware: [GuestMiddleware],
    },
  },
];
