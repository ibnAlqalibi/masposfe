<template>
  <div class="w-screen h-[75px] bg-blue-200 flex justify-center items-center">
    <router-link to="/products" class="link">Products</router-link>
    <router-link to="/cart" class="link">Cart</router-link>
    <div class="link" @click="authStore.logout()">Logout</div>
  </div>
  <div class="p-5">
    <slot />
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  name: "ExampleLayout",
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
};
</script>

<style>
.link {
  @apply px-2 cursor-pointer hover:text-red-400;
}
</style>
