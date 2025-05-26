<!-- ProductList.vue -->
<template>
  <div class="max-w-7xl mx-auto pt-6 px-2 3xl:px-[2px]">
    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-[8px] gap-y-[24px]"
    >
      <!-- Product Card -->
      <div
        v-for="product in ProductsStore.filteredProducts"
        :key="product.id"
        class="bg-white h-[298px] rounded-[16px] border border-[#d6d6d6] overflow-hidden min-w-0"
      >
        <!-- Product Image Container -->
        <div class="relative w-[200px] h-[177px] p-[8px]">
          <img
            :src="product.picture_url"
            :alt="product.name"
            class="w-full h-full object-cover rounded-[8px]"
          />
          <!-- Action Buttons -->
          <div class="absolute bottom-[14px] right-[14px] flex gap-1 sm:gap-2">
            <!-- Delete Button -->
            <DeleteButton @delete="deleteData(product.id)" />
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-2 sm:p-3">
          <!-- sesuaikan padding -->
          <h3 class="regular text-[#0F0F0F] text-xs sm:text-[16px] font-[500]">
            {{ product.name }}
          </h3>
          <p
            class="regular text-[#23A948] font-[700] mt-0.5 sm:mt-1 sm:text-[16px]"
          >
            Rp {{ product.price.toLocaleString() }}
          </p>

          <!-- Add to Cart Button -->
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
            <span class="text-xs sm:text-sm">{{
              CartStore.cart.find((cart) => cart.id === product.id).qty
            }}</span>
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

<script>
import { useProductsStore } from "@/stores/products.store.js";
import { useCategoriesStore } from "@/stores/categories.store.js";
import { useCartStore } from "@/stores/cart.store.js";
import CategoriesView from "@/views/categories/index.vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import ConfirmDeleteModal from "@/utils/components/deleteModal.vue";
import DeleteButton from "@/utils/components/deleteButton.vue";

export default {
  components: {
    CategoriesView,
    PlusIcon,
    ConfirmDeleteModal,
  },
  data() {
    return {
      ProductsStore: useProductsStore(),
      CategoriesStore: useCategoriesStore(),
      CartStore: useCartStore(),
      showConfirm: false,
      deleteId: null,
    };
  },
  methods: {
    filterProducts() {
      this.ProductsStore.filteredProducts = this.ProductsStore.products.filter(
        (prod) => {
          const matchesCategory =
            !this.CategoriesStore.category_id ||
            prod.category_id === this.CategoriesStore.category_id;
          const matchesSearch = prod.name
            .toLowerCase()
            .includes(this.ProductStore.search.toLowerCase());
          return matchesCategory && matchesSearch;
        }
      );
    },
    addToCart(prod) {
      const cartData = {
        id: prod.id,
        picture_url: prod.picture_url,
        name: prod.name,
        price: prod.price,
        qty: 1,
        subtotal: prod.price,
      };
      this.CartStore.add(cartData);
    },
    deleteData(id) {
      this.deleteId = id;
      this.showConfirm = true;
    },
    async handleConfirmDelete() {
      await this.ProductsStore.delete(this.deleteId);
      this.showConfirm = false;
    },
    updateData(prod) {
      this.ProductsStore.cat = prod;
      this.$router.push("/products/update");
    },
  },
};
</script>
