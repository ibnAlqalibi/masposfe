<template>
  <div class="max-w-7xl mx-auto pt-6 px-2 3xl:px-[2px]">
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[8px] gap-y-[24px]"
    >
      <div
        v-for="product in ProductsStore.filteredProducts"
        :key="product.id"
        class="bg-white h-[298px] rounded-[16px] border border-[#d6d6d6] overflow-hidden min-w-0"
      >
        <div class="relative w-[200px] h-[177px] p-[8px]">
          <img
            :src="product.picture_url"
            :alt="product.name"
            class="w-full h-full object-cover rounded-[8px]"
          />
          <div class="absolute bottom-[14px] right-[14px] flex gap-1 sm:gap-2">
            <button
              class="p-1 sm:p-1.5 bg-white/50 backdrop-blur-[30px] rounded-[4px] border border-white/50 hover:bg-gray-50"
              @click="deleteData(product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-3 w-3 sm:h-4 sm:w-4 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div class="p-2 sm:p-3">
          <h3 class="regular text-[#0F0F0F] text-xs sm:text-[16px] font-[500]">
            {{ product.name }}
          </h3>
          <p
            class="regular text-[#23A948] font-[700] mt-0.5 sm:mt-1 sm:text-[16px]"
          >
            Rp {{ product.price.toLocaleString() }}
          </p>

          <button
            v-if="!CartStore.cart.find((cart) => cart.id === product.id)"
            class="regular w-full h-[39px] mt-1.5 sm:mt-[12px] sm:mb-[8px] bg-[#2C59E5] text-[#F5F5F5] px-2 sm:px-3 rounded-[8px] flex items-center justify-center gap-1"
            @click="addToCart(product)"
          >
            <PlusIcon class="w-[16px] h-[16px] text-white" />
            <span class="text-[16px]">Keranjang</span>
          </button>

          <div v-else class="flex items-center justify-between mt-1.5 sm:mt-2">
            <button
              class="bg-gray-200 text-gray-800 py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
              @click="CartStore.updateQty(product.id, 'decrement')"
            >
              -
            </button>
            <span class="text-xs sm:text-sm">
              {{ CartStore.cart.find((cart) => cart.id === product.id).qty }}
            </span>
            <button
              class="bg-gray-200 text-gray-800 py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
              @click="CartStore.updateQty(product.id, 'increment')"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ConfirmDeleteModal
    :isOpen="showConfirm"
    @close="showConfirm = false"
    @confirm="handleConfirmDelete"
  />
</template>

<script setup>
import { ref } from "vue";
import { useProductsStore } from "@/stores/products.store.js";
import { useCartStore } from "@/stores/cart.store.js";
import { PlusIcon } from "@heroicons/vue/24/solid";
import ConfirmDeleteModal from "@/utils/components/deleteModal.vue";

// Store
const ProductsStore = useProductsStore();
const CartStore = useCartStore();

// State
const showConfirm = ref(false);
const deleteId = ref(null);

// Methods
function addToCart(prod) {
  const cartData = {
    id: prod.id,
    picture_url: prod.picture_url,
    name: prod.name,
    price: prod.price,
    qty: 1,
    subtotal: prod.price,
  };
  CartStore.add(cartData);
}

function deleteData(id) {
  deleteId.value = id;
  showConfirm.value = true;
}

async function handleConfirmDelete() {
  await ProductsStore.delete(deleteId.value);
  showConfirm.value = false;
}
</script>
