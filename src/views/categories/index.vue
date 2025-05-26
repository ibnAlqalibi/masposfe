<template>
  <!-- Bottom Section -->
  <div class="hidden md:flex items-center space-x-4 mb-3">
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

    <div
      ref="categoriesContainer"
      class="flex space-x-[16px] overflow-x-auto categories-scroll"
    >
      <CategoryButton
        name="Semua"
        :isActive="activeCategory === null"
        @click="setActiveCategory(null)"
      />
      <CategoryButton
        v-for="category in CategoriesStore.categories"
        :key="category.id"
        :name="category.name"
        :isActive="activeCategory === category.id"
        @click="setActiveCategory(category.id)"
      />
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

  <!-- Mobile -->
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

<script setup>
import { ref, onMounted, watch } from "vue";
import { useCategoriesStore } from "@/stores/categories.store";
import { useProductsStore } from "@/stores/products.store";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";
import CategoryButton from "@/utils/components/categoryButton.vue";

const CategoriesStore = useCategoriesStore();
const ProductsStore = useProductsStore();
const categoriesContainer = ref(null);
const activeCategory = ref(null);

const setActiveCategory = (id) => {
  activeCategory.value = id;
  CategoriesStore.setCategoryId(id);
};

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

const scrollLeft = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: -200, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (categoriesContainer.value) {
    categoriesContainer.value.scrollBy({ left: 200, behavior: "smooth" });
  }
};

onMounted(async () => {
  await CategoriesStore.fetch();
  setActiveCategory(CategoriesStore.category_id);

  await ProductsStore.fetch();
  filterProducts();
});

watch(
  () => CategoriesStore.category_id,
  () => {
    filterProducts();
  }
);
</script>

<style scoped>
.categories-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}
.categories-scroll::-webkit-scrollbar {
  display: none;
}
</style>
