<template>
  <div
    class="flex justify-center gap-[24px] items-center h-screen bg-[#EDF0F2] p-[32px]"
  >
    <div class="h-full w-full">
      <div
        class="relative flex flex-col h-full w-full rounded-[40px] bg-[radial-gradient(circle,_#4288F2,_#113E82)] overflow-hidden pt-[100px]"
      >
        <div
          class="bg-[#EDF0F2] overflow-hidden rounded-[8px] w-[400px] 3xl:w-[500px] flex flex-col items-center justify-center absolute -left-1 3xl:top-[200px]"
        >
          <img src="@/assets/ssan.jpg" alt="Logo" class="w-full" />
        </div>
        <div
          class="w-full h-full flex flex-col items-center justify-end px-[24px] gap-[24px]"
        >
          <P
            class="pr-[100px] 3xl:mb-[100px] regular text-[#F5F5F5] text-[15px] 3xl:text-[28px] font-[500] w-full"
          >
            Desain yang user-friendly membuat navigasi cepat dan mudah, bahkan
            bagi pemula.
          </P>
          <div class="flex justify-center items-center gap-[8px] mb-[24px]">
            <font-awesome-icon icon="circle" class="text-[#819CEF] w-[10px]" />
            <font-awesome-icon icon="circle" class="text-[#F5F5F5] w-[10px]" />
            <font-awesome-icon icon="circle" class="text-[#F5F5F5] w-[10px]" />
          </div>
        </div>
      </div>
    </div>
    <div class="h-full w-full p-[24px]">
      <h2 class="regular text-right text-3xl font-bold mb-6 text-[#1963D2]">
        MASPOS
      </h2>
      <div class="w-full h-full flex flex-col justify-center">
        <P class="regular mb-[8px] font-[500] text-[32px]">
          Selamat Datang di MASPOS
        </P>
        <P class="regular mb-[24px] font-[400] text-[20px]">
          Masuk untuk mengelola bisnis Anda dengan mudah dan efisien. MASPOS
          menghadirkan solusi point-of-sale terbaik untuk kemudahan operasional
          sehari-hari.
        </P>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label
              for="email"
              class="regular text-[12px] block font-bold mb-2 text-gray-700"
              >Email</label
            >
            <input
              id="email"
              v-model="formData.email"
              type="email"
              class="regular text-[16px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]"
              placeholder="Username"
              required
            />
          </div>
          <div class="mb-[32px]">
            <label
              for="password"
              class="regular text-[12px] block font-bold mb-2 text-gray-700"
              >Password</label
            >
            <div class="relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="formData.password"
                :class="[
                  'regular text-[16px] w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#2c59e5]',
                  errors.name ? 'border-red-500' : 'border-gray-800',
                ]"
                placeholder="Password"
                required
              />
              <span v-if="errors.name" class="text-red-500 text-sm">{{
                errors.name
              }}</span>
              <button
                type="button"
                @click="toggleShowPassword"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                ></i>
              </button>
            </div>
          </div>
          <button
            type="submit"
            class="regular w-full bg-[#2c59e5] text-white py-2 px-4 rounded-md hover:bg-[#1e45b2] focus:outline-none"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.store.js";
import router from "@/router/index.js";

export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        email: "",
        password: "",
      },
      errors: {
        name: null,
      },
      showPassword: false,
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.authStore.login(this.formData);

        if (response.status !== 200) {
          this.errors.name = "Email atau password salah.";
        } else {
          this.errors.name = null;
          router.push("/");
        }
      } catch (error) {
        this.errors.name = "Terjadi kesalahan saat login.";
        console.error(error);
      }
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
