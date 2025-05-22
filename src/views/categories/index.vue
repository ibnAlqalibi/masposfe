<template>
  <!-- Bottom Section -->
  <div class="hidden md:flex items-center space-x-4 mb-3">
    <!-- Search Bar -->
    <div class="relative">
      <input
        v-model="ProductsStore.search"
        type="text"
        placeholder="Cari nama produk ..."
        class="font-sf w-[256px] bg-[#EDF0F2] px-4 py-2 pl-10 rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
        @input="filterProducts"
      />
      <MagnifyingGlassIcon
        class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#2C59E5]"
      />
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
      class="flex space-x-[16px] overflow-x-auto categories-scroll"
    >
      <button
        :key="'semua'"
        @click="setActiveCategory(null)"
        :class="
          activeCategory === null
            ? 'bg-[#2C59E5] text-white'
            : 'text-[#2C59E5] bg-blue-50'
        "
        class="px-[16px] h-[32px] rounded-lg text-sm whitespace-nowrap"
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
            ? 'bg-[#2C59E5] text-white'
            : 'text-[#2C59E5] bg-blue-50'
        "
        class="px-[16px] h-[32px] rounded-lg text-sm whitespace-nowrap"
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
        placeholder="Cari nama produk ..."
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
import { ref, watch } from "vue";
import { useCategoriesStore } from "@/stores/categories.store.js";
import { useProductsStore } from "@/stores/products.store.js";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default {
  components: {
    MagnifyingGlassIcon,
  },
  data() {
    return {
      CategoriesStore: useCategoriesStore(),
      ProductsStore: useProductsStore(),
      categoriesContainer: null,
      activeCategory: null,
    };
  },
  mounted() {
    this.CategoriesStore.fetch();
    this.categoriesContainer = document.querySelector(".categories-scroll");

    if (!this.categoriesContainer) {
      console.error("categoriesContainer element not found in the DOM");
    }

    this.setActiveCategory(this.CategoriesStore.category_id);

    this.ProductsStore.fetch().then(() => {
      this.filterProducts();
    });

    // Watcher menggunakan $watch
    this.$watch(
      () => this.CategoriesStore.category_id,
      () => {
        this.filterProducts();
      }
    );
  },
  methods: {
    setActiveCategory(id) {
      this.activeCategory = id;
      this.CategoriesStore.setCategoryId(id);
    },
    filterProducts() {
      this.ProductsStore.filteredProducts = this.ProductsStore.products.filter(
        (prod) => {
          const matchesCategory =
            !this.CategoriesStore.category_id ||
            prod.category_id === this.CategoriesStore.category_id;
          const matchesSearch = prod.name
            .toLowerCase()
            .includes(this.ProductsStore.search.toLowerCase());
          return matchesCategory && matchesSearch;
        }
      );
    },
    scrollLeft() {
      if (this.categoriesContainer) {
        this.categoriesContainer.scrollBy({
          left: -200,
          behavior: "smooth",
        });
      } else {
        console.warn("categoriesContainer is null");
      }
    },
    scrollRight() {
      if (this.categoriesContainer) {
        this.categoriesContainer.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      } else {
        console.warn("categoriesContainer is null");
      }
    },
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
