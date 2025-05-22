<template>
  <div class="bg-[#ecf0f2] min-h-screen pt-6">
    <header class="bg-white p-2 rounded-lg shadow-md w-[1260px] mx-auto">
      <div class="px-4 sm:px-6 lg:px-8">
        <!-- Top Section -->
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div
            class="flex items-center cursor-pointer"
            @click="$router.push('/')"
          >
            <h1 class="text-blue-600 text-xl font-bold title">MASPOS</h1>
          </div>

          <!-- Action Buttons and Profile -->
          <div class="flex items-center space-x-4">
            <!-- Add Category Button -->
            <button
              class="hidden md:flex h-[48px] items-center justify-center gap-1 px-4 py-2 bg-[#2C59E5] text-white rounded-lg text-[16px]"
              @click="$router.push('/category/create')"
            >
              <PlusIcon class="w-[16px] h-[16px] text-white" />Tambah Kategori
            </button>

            <!-- Add Product Button -->
            <button
              class="hidden md:flex h-[48px] items-center justify-center gap-1 px-4 py-2 bg-[#2C59E5] text-white rounded-lg text-[16px]"
              @click="$router.push('/products/create')"
            >
              <PlusIcon class="w-[16px] h-[16px] text-white" />Tambah Produk
            </button>

            <!-- Cart -->
            <div
              class="relative bg-[#E8EDFC] h-[47px] rounded-[8px] flex items-center justify-between cursor-pointer"
              @click="$router.push('/cart')"
            >
              <button class="flex items-center">
                <span
                  v-if="
                    CartStore.cart.reduce(
                      (total, item) => total + item.qty,
                      0
                    ) > 0
                  "
                  class="absolute -top-1 left-6 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {{
                    CartStore.cart.reduce((total, item) => total + item.qty, 0)
                  }}
                </span>
                <div
                  class="bg-[#2C59E5] p-2 rounded-[6px] h-[47px] w-[47px] flex items-center justify-center"
                >
                  <ShoppingCartIcon class="w-[18px] h-[18px] text-white" />
                </div>
                <div
                  v-if="
                    CartStore.cart.reduce(
                      (total, item) => total + item.qty,
                      0
                    ) > 0
                  "
                  class="flex flex-col md:flex-row md:items-center m-[8px]"
                >
                  <span class="text-[16px] text-[#2C59E5] font-[400]">
                    Total Tagihan
                  </span>
                  <span class="font-[700] text-[16px] text-[#2C59E5] md:ml-2"
                    >Rp
                    {{
                      CartStore.cart
                        .reduce((acc, prod) => acc + prod.subtotal, 0)
                        .toLocaleString()
                    }}</span
                  >
                </div>
              </button>
            </div>
            <div class="w-px h-[47px] bg-gray-200"></div>
            <!-- Profile -->
            <div
              class="flex items-center hover:bg-gray-50 mx-[8px] px-[8px] py-1.5 rounded-lg cursor-pointer"
              @click="AuthStore.logout"
            >
              <div class="flex items-center space-x-2">
                <div
                  class="w-[48px] h-[48px] rounded-full flex items-center justify-center"
                >
                  <img
                    :src="logourl"
                    alt="Logout"
                    class="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span class="regular text-[12px]">Aldean</span>
              </div>
            </div>
          </div>
        </div>
        <template v-if="$route.path === '/'">
          <div class="w-full h-px bg-gray-200 my-[12px]"></div>
          <CatComponent />
        </template>
      </div>
    </header>
    <slot></slot>

    <!-- Floating Action Buttons for Mobile -->
    <div class="fixed bottom-4 right-4 flex space-x-2 md:hidden">
      <button
        class="px-3 py-1 text-gray-200 bg-blue-800 rounded-full shadow-lg text-md"
        @click="$router.push('/category/create')"
      >
        + Kategori
      </button>
      <button
        class="px-3 py-1 text-gray-200 bg-blue-800 rounded-full shadow-lg text-md"
        @click="$router.push('/products/create')"
      >
        + Produk
      </button>
    </div>
  </div>
</template>

<script>
import CatComponent from "@/views/categories/index.vue";
import { useCartStore } from "@/stores/cart.store.js";
import { useAuthStore } from "@/stores/auth.store.js";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { ShoppingCartIcon } from "@heroicons/vue/24/outline";
import logo from "@/assets/pfp.jpg";

export default {
  components: {
    CatComponent,
    PlusIcon,
    ShoppingCartIcon,
  },
  data() {
    return {
      CartStore: useCartStore(),
      AuthStore: useAuthStore(),
      logourl: logo,
    };
  },
};
</script>
