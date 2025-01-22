<!-- <template>
  <div class="flex items-center">
    <h1 class="font-semibold text-lg">Add Product Page</h1>
    <ButtonPrimary @click="$router.push('/products/create')">
      Add Product
    </ButtonPrimary>
    <ButtonPrimary @click="$router.push('/user/create')">
      Add Category
    </ButtonPrimary>
  </div>

  <div class="flex gap-2 mt-4">
    <input
      v-model="search"
      type="text"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
      placeholder="Search products..."
      @input="filterProducts"
    />
    <CategoriesView />
  </div>

  <div class="relative overflow-x-auto mt-5">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prod in filteredProducts"
          :key="prod.id"
          class="bg-white border-b"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.name }}
          </th>
          <td class="px-6 py-4">
            <ButtonPrimary @click="updateData(prod)">
              <i class="ri-edit-box-line"></i>
            </ButtonPrimary>
            <ButtonDanger class="ml-2" @click="deleteData(prod.id)">
              <i class="ri-delete-bin-line"></i>
            </ButtonDanger>
            <buttonPrimary class="ml-2" @click="addToCart(prod)">
              <i>+</i>
            </buttonPrimary>
          </td>
        </tr>
        <tr v-if="filteredProducts.length === 0">
          <td colspan="2" class="px-6 py-4 text-center text-gray-500">
            No products found.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template> -->

<!-- <script>
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
      search: "",
      filteredProducts: [],
    };
  },
  mounted() {
    // Fetch produk initial
    this.ProductsStore.fetch().then(() => {
      this.filterProducts();
    });

    // useEffect/LaunchedEffect/sideEffect
    this.$watch(
      () => this.CategoriesStore.category_id,
      () => {
        this.filterProducts();
      }
    );
  },
  methods: {
    filterProducts() {
      this.filteredProducts = this.ProductsStore.products.filter((prod) => {
        const matchesCategory =
          !this.CategoriesStore.category_id ||
          prod.category_id === this.CategoriesStore.category_id;
        const matchesSearch = prod.name
          .toLowerCase()
          .includes(this.search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
    addToCart(prod) {
      const cartData = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        qty: 1,
        subtotal: prod.price,
      };
      this.CartStore.add(cartData);
    },
    async deleteData(id) {
      const confirm = await this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        await this.ProductsStore.delete(id);
        this.ProductsStore.fetch().then(() => {
          this.filterProducts();
        });
      }
    },
    updateData(prod) {
      this.ProductsStore.cat = prod;
      this.$router.push("/products/update");
    },
  },
};
</script> -->

<!-- ProductList.vue -->
<template>
  <div class="max-w-7xl mx-auto pt-6">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      <!-- Product Card -->
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <!-- Product Image -->
        <!-- Product Image Container -->
        <div class="relative aspect-square">
          <img
            :src="product.picture_url"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <!-- Action Buttons -->
          <div class="absolute bottom-2 right-2 flex gap-2">
            <!-- Edit Button -->
            <button
              class="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50"
              @click="handleEdit(product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <!-- Delete Button -->
            <button
              class="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50"
              @click="deleteData(product.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 text-red-500"
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
        <div class="p-3">
          <h3 class="text-sm font-medium">{{ product.name }}</h3>
          <p class="text-blue-600 font-semibold mt-1">
            Rp {{ product.price.toLocaleString() }}
          </p>

          <!-- Add to Cart Button -->
          <button
            class="w-full mt-2 bg-blue-600 text-white py-1.5 px-3 rounded-lg text-sm flex items-center justify-center gap-1"
          >
            <span>+</span>
            Keranjang
          </button>
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
      search: "",
      filteredProducts: [],
    };
  },
  mounted() {
    // Fetch produk initial
    this.ProductsStore.fetch().then(() => {
      this.filterProducts();
    });

    // useEffect/LaunchedEffect/sideEffect
    this.$watch(
      () => this.CategoriesStore.category_id,
      () => {
        this.filterProducts();
      }
    );
  },
  methods: {
    filterProducts() {
      this.filteredProducts = this.ProductsStore.products.filter((prod) => {
        const matchesCategory =
          !this.CategoriesStore.category_id ||
          prod.category_id === this.CategoriesStore.category_id;
        const matchesSearch = prod.name
          .toLowerCase()
          .includes(this.search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    },
    addToCart(prod) {
      const cartData = {
        id: prod.id,
        name: prod.name,
        price: prod.price,
        qty: 1,
        subtotal: prod.price,
      };
      this.CartStore.add(cartData);
    },
    async deleteData(id) {
      const confirm = await this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        await this.ProductsStore.delete(id);
        this.ProductsStore.fetch().then(() => {
          this.filterProducts();
        });
      }
    },
    updateData(prod) {
      this.ProductsStore.cat = prod;
      this.$router.push("/products/update");
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
