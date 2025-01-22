<!-- Header.vue -->
<template>
  <div class="bg-[#ecf0f2] min-h-screen pt-6">
    <header class="bg-white p-2 rounded-lg shadow-md max-w-7xl mx-auto">
      <div class="px-4 sm:px-6 lg:px-8">
        <!-- Top Section -->
        <div class="flex items-center justify-between h-16 mb-2">
          <!-- Logo -->
          <div class="flex items-center">
            <h1 class="text-blue-600 text-xl font-bold">MASPOS</h1>
          </div>

          <!-- Action Buttons and Profile -->
          <div class="flex items-center space-x-4">
            <!-- Add Category Button -->
            <button
              class="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              + Tambah Kategori
            </button>

            <!-- Add Product Button -->
            <button
              class="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
            >
              + Tambah Produk
            </button>

            <!-- Cart -->
            <div class="relative">
              <button class="flex items-center">
                <div class="bg-blue-50 p-2 rounded-lg relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span
                    class="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    5
                  </span>
                </div>
                <div class="ml-2 flex flex-col md:flex-row md:items-center">
                  <span class="text-xs text-gray-500"> Total Tagihan </span>
                  <span class="font-semibold text-sm md:ml-2">Rp 224.000</span>
                </div>
              </button>
            </div>

            <!-- Profile -->
            <div class="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
              <div class="flex items-center space-x-2">
                <div
                  class="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                >
                  <img
                    src="path-to-avatar"
                    alt="Profile"
                    class="w-7 h-7 rounded-full"
                  />
                </div>
                <span class="text-sm">Aldean</span>
              </div>
            </div>
          </div>
        </div>
        <CatComponent />
      </div>
    </header>
    <slot></slot>
  </div>
</template>

<script>
import CatComponent from "@/views/categories/index.vue";
import { Car } from "lucide-vue-next";

export default {
  components: {
    CatComponent,
  },
};
</script>
