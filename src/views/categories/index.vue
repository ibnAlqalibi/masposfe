<template>
  <!-- Bottom Section -->
  <div class="hidden md:flex items-center space-x-4 mb-3">
    <!-- Search Bar -->
    <div class="relative">
      <input
        v-model="ProductsStore.search"
        type="text"
        placeholder="Cari nama produk..."
        class="w-64 px-4 py-2 pl-10 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500"
        @input="filterProducts"
      />
      <span class="absolute inset-y-0 left-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
    </div>

    <button
      @click="scrollLeft"
      class="py-2 text-blue-600 rounded-lg text-sm whitespace-nowrap hover:bg-blue-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <!-- Categories -->
    <div
      ref="categoriesContainer"
      class="flex space-x-2 overflow-x-auto categories-scroll px-10"
    >
      <button
        :key="'semua'"
        @click="setActiveCategory(null)"
        :class="
          activeCategory === null
            ? 'bg-blue-600 text-white'
            : 'text-blue-600 hover:bg-blue-50'
        "
        class="px-4 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        Semua
      </button>

      <!-- Tombol Kategori -->
      <button
        v-for="category in CategoriesStore.categories"
        :key="category.id"
        @click="setActiveCategory(category.id)"
        :class="
          activeCategory === category.id
            ? 'bg-blue-600 text-white'
            : 'text-blue-600 hover:bg-blue-50'
        "
        class="px-4 py-2 rounded-lg text-sm whitespace-nowrap"
      >
        {{ category.name }}
      </button>
    </div>

    <button
      @click="scrollRight"
      class="py-2 text-blue-600 rounded-lg text-sm whitespace-nowrap hover:bg-blue-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>

  <!-- Mobile menu -->
  <div class="md:hidden">
    <div class="px-2 pt-2 pb-3 space-y-1">
      <input
        v-model="ProductsStore.search"
        type="text"
        placeholder="Cari nama produk..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 mb-2"
        @input="filterProducts"
      />
      <div class="flex overflow-x-auto space-x-2 pb-2">
        <button
          :key="'semua'"
          @click="setActiveCategory(null)"
          :class="
            activeCategory === null
              ? 'bg-blue-600 text-white'
              : 'text-blue-600 hover:bg-blue-50'
          "
          class="px-4 py-2 rounded-lg text-sm whitespace-nowrap"
        >
          Semua
        </button>
        <button
          v-for="category in CategoriesStore.categories"
          :key="category.id"
          @click="setActiveCategory(category.id)"
          :class="
            activeCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'text-blue-600 hover:bg-blue-50'
          "
          class="px-4 py-2 rounded-lg whitespace-nowrap"
        >
          {{ category.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories.store.js";
import { useProductsStore } from "@/stores/products.store.js";
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    // Inisialisasi store
    const CategoriesStore = useCategoriesStore();
    const ProductsStore = useProductsStore();

    // Referensi ke elemen DOM
    const categoriesContainer = ref(null);

    // Properti reaktif untuk menyimpan ID kategori aktif
    const activeCategory = ref(null);

    // Fungsi untuk mengubah kategori aktif
    const setActiveCategory = (id) => {
      activeCategory.value = id;
      CategoriesStore.setCategoryId(id);
    };

    // Lifecycle hook untuk memastikan DOM siap
    onMounted(() => {
      CategoriesStore.fetch();
      // Elemen sudah tersedia di DOM
      categoriesContainer.value = document.querySelector(".categories-scroll");
      if (!categoriesContainer.value) {
        console.error("categoriesContainer element not found in the DOM");
      }

      setActiveCategory(CategoriesStore.category_id);

      //   // Fetch produk initial
      ProductsStore.fetch().then(() => {
        filterProducts();
      });

      // useEffect/LaunchedEffect/sideEffect
      watch(
        () => CategoriesStore.category_id,
        () => {
          filterProducts();
        }
      );
    });

    const filterProducts = () => {
      ProductsStore.filteredProducts = ProductsStore.products.filter((prod) => {
        const matchesCategory =
          !CategoriesStore.category_id ||
          prod.category_id === CategoriesStore.category_id;
        const matchesSearch = prod.name
          .toLowerCase()
          .includes(ProductsStore.search.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    };

    // Metode untuk scroll
    const scrollLeft = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: -200,
          behavior: "smooth",
        });
      } else {
        console.warn("categoriesContainer is null");
      }
    };

    const scrollRight = () => {
      if (categoriesContainer.value) {
        categoriesContainer.value.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      } else {
        console.warn("categoriesContainer is null");
      }
    };

    // Kembalikan properti dan metode ke template
    return {
      CategoriesStore,
      categoriesContainer,
      scrollLeft,
      scrollRight,
      activeCategory,
      setActiveCategory,
      filterProducts,
      ProductsStore,
    };
  },
};
</script>

<style scoped>
.categories-scroll {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scroll-behavior: smooth;
}

.categories-scroll::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>
