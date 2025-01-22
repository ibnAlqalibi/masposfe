<template>
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
