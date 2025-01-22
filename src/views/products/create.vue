<template>
  <div class="flex justify-between items-center">
    <h1 class="font-semibold text-lg">Add User Page</h1>
  </div>

  <form action="" @submit.prevent="create">
    <div class="mb-6">
      <!-- Select Category -->
      <div>
        <label
          for="data-select"
          class="block mb-2 text-sm font-medium text-gray-900"
        >
          Kategori
        </label>
        <select
          @change="formData.category_id = $event.target.value"
          id="data-select"
          v-model="formData.category_id"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option
            v-for="cat in categoriesStore.categories"
            :key="cat.id"
            :value="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>

      <!-- Input Name -->
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >Name <span class="text-red-600">*</span></label
      >
      <input
        v-model="formData.name"
        @input="formData.name = $event.target.value"
        type="text"
        id="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="John Doe"
        required
      />

      <!-- Input Price -->
      <label for="price" class="block mb-2 text-sm font-medium text-gray-900"
        >Price <span class="text-red-600">*</span></label
      >
      <input
        v-model="formData.price"
        @input="formData.price = parseInt($event.target.value)"
        type="number"
        id="price"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="5000"
        required
      />

      <!-- Image Picker -->
      <label for="image" class="block mb-2 text-sm font-medium text-gray-900"
        >Upload Image</label
      >
      <input
        type="file"
        id="image"
        @change="onImageChange"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
      />
      <div v-if="imagePreview" class="mt-4">
        <p class="text-sm text-gray-500">Image Preview:</p>
        <img
          :src="imagePreview"
          alt="Image Preview"
          class="w-32 h-32 object-cover rounded-md border"
        />
      </div>
    </div>

    <!-- Submit and Cancel Buttons -->
    <ButtonPrimary :type="'submit'"> Submit </ButtonPrimary>
    <ButtonDanger @click="$router.push('/products')" class="ml-3">
      Cancel
    </ButtonDanger>
  </form>
</template>

<script>
import { useProductsStore } from "@/stores/products.store.js";
import { useCategoriesStore } from "@/stores/categories.store.js";

export default {
  data() {
    return {
      productsStore: useProductsStore(),
      categoriesStore: useCategoriesStore(),
      formData: {
        category_id: "",
        name: "",
        price: 0,
        picture: null, // Untuk menyimpan file gambar
      },
      imagePreview: null, // Untuk pratinjau gambar
    };
  },
  mounted() {
    this.categoriesStore.fetch();
  },
  methods: {
    async create() {
      const formData = new FormData();

      // Menambahkan data ke FormData
      formData.append("category_id", this.formData.category_id);
      formData.append("name", this.formData.name);
      formData.append("price", this.formData.price);

      // Menambahkan gambar jika ada
      if (this.formData.picture) {
        formData.append("picture", this.formData.picture);
      }

      // Mengirim data ke store
      const result = await this.productsStore.add(formData);

      if (result) {
        this.$router.push("/products");
      }
    },
    onImageChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.picture = file; // Menyimpan file ke formData.picture
        this.imagePreview = URL.createObjectURL(file); // Menampilkan pratinjau
      }
    },
  },
};
</script>
