<template>
  <div class="flex justify-center items-center h-screen bg-[#2c59e5]">
    <div class="w-full max-w-md bg-white p-8 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-6 text-[#2c59e5]">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block font-bold mb-2 text-gray-700"
            >Email</label
          >
          <input
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]"
            placeholder="Enter your username"
            required
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block font-bold mb-2 text-gray-700"
            >Password</label
          >
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="formData.password"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              @click="toggleShowPassword"
              class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-[#2c59e5] text-white py-2 px-4 rounded-md hover:bg-[#1e45b2] focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    login() {
      this.authStore.login(this.formData);
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
