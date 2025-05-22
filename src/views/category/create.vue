<script>
import { useCategoriesStore } from "@/stores/categories.store.js";

export default {
  data() {
    return {
      categoriesStore: useCategoriesStore(),
      formData: {
        name: null,
      },
      errors: {
        name: null,
      },
    };
  },
  mounted() {
    this.categoriesStore.fetch();
  },
  computed: {
    isNameDuplicate() {
      return this.categoriesStore.categories.some(
        (category) => category.name === this.formData.name
      );
    },
  },
  methods: {
    async create() {
      this.errors.name = null;

      if (!this.formData.name) {
        this.errors.name = "Nama Kategori Wajib Diisi.";
        return;
      }

      if (this.isNameDuplicate) {
        this.errors.name = "Nama Kategori Sudah ada.";
        return;
      }

      let cat = await this.categoriesStore.add(this.formData);

      if (cat) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<template>
  <div class="w-full flex justify-center bg-[#ecf0f2] py-12">
    <div class="w-full max-w-md bg-white rounded-[16px] shadow overflow-hidden">
      <div class="w-full bg-[#F5F5F5] p-[24px]">
        <span class="regular text-[20px] font-[500]">Tambah Kategori</span>
      </div>

      <form action="" @submit.prevent="create">
        <div class="p-[24px]">
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Nama Kategori</label
          >
          <input
            v-model="formData.name"
            type="text"
            id="name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Produk"
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{
            errors.name
          }}</span>
        </div>

        <div class="flex space-x-4 border-t border-gray-200 p-[24px]">
          <button
            type="button"
            @click="$router.push('/')"
            class="flex-1 px-4 py-2 text-blue-600 bg-white border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none"
          >
            Batal
          </button>
          <button
            type="submit"
            class="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Tambah
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
