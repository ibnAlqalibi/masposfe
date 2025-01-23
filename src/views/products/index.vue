<!-- ProductList.vue -->
<template>
  <div class="max-w-7xl mx-auto pt-6 px-2">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4">
      <!-- Product Card -->
      <div
        v-for="product in ProductsStore.filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden min-w-0"
      >
        <!-- Product Image Container -->
        <div class="relative aspect-square">
          <img
            :src="product.picture_url"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <!-- Action Buttons -->
          <div class="absolute bottom-2 right-2 flex gap-1 sm:gap-2">
            <!-- Delete Button -->
            <button
              class="p-1 sm:p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50"
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

        <!-- Product Info -->
        <div class="p-2 sm:p-3">
          <!-- sesuaikan padding -->
          <h3 class="text-xs sm:text-sm font-medium truncate">
            {{ product.name }}
          </h3>
          <p
            class="text-blue-600 font-semibold mt-0.5 sm:mt-1 text-xs sm:text-sm"
          >
            Rp {{ product.price.toLocaleString() }}
          </p>

          <!-- Add to Cart Button -->
          <button
            v-if="!CartStore.cart.find((cart) => cart.id === product.id)"
            class="w-full mt-1.5 sm:mt-2 bg-blue-600 text-white py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1"
            @click="addToCart(product)"
          >
            <span>+</span>
            Keranjang
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
</template>

<script>
import { useProductsStore } from "@/stores/products.store.js";
import { useCategoriesStore } from "@/stores/categories.store.js";
import { useCartStore } from "@/stores/cart.store.js";
import CategoriesView from "@/views/categories/index.vue";

export default {
  components: {
    CategoriesView,
  },
  data() {
    return {
      ProductsStore: useProductsStore(),
      CategoriesStore: useCategoriesStore(),
      CartStore: useCartStore(),
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
    async deleteData(id) {
      const confirm = await this.$swal({
        title: "Konfirmasi hapus",
        text: "Anda yakin ingin menghapus produk ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya",
      });

      if (confirm.isConfirmed) {
        await this.ProductsStore.delete(id);
      }
    },
    updateData(prod) {
      this.ProductsStore.cat = prod;
      this.$router.push("/products/update");
    },
  },
};
</script>
