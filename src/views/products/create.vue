<template>
  <div class="min-h-screen w-full flex justify-center bg-[#ecf0f2] py-12">
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow">
      <h2 class="text-lg font-medium mb-4">Tambah Produk</h2>
      <form action="" @submit.prevent="create">
        <input
          type="file"
          ref="fileInput"
          class="hidden"
          @change="handleFileUpload"
        />
        <div
          v-if="!imagePreview"
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-4 text-center cursor-pointer"
          @click="triggerFileInput"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
          :class="{ 'border-blue-600 bg-blue-50': isDragging }"
        >
          <div
            class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p class="text-sm text-gray-600">
            Seret & Letakkan atau Klik Untuk Unggah
          </p>
          <p class="text-xs text-gray-500 mt-1">
            Format yang didukung: jpg, png
          </p>
        </div>

        <!-- Pratinjau Gambar -->
        <div
          v-else
          class="relative border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4 text-center cursor-pointer"
          @click="triggerFileInput"
          @dragover.prevent="onDragOver"
          @dragleave="onDragLeave"
          @drop="onDrop"
        >
          <img
            :src="imagePreview"
            alt="Preview"
            class="max-h-40 mx-auto rounded-lg"
          />
          <p class="text-xs text-gray-500 mt-2">
            Klik atau seret dan letakkan file baru untuk mengganti file
          </p>
        </div>

        <!-- Pesan Error Gambar -->
        <p v-if="errors.picture" class="text-red-500 text-xs mt-1">
          {{ errors.picture }}
        </p>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Produk</label
            >
            <input
              v-model="formData.name"
              @input="formData.name = $event.target.value"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Produk"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Harga</label
            >
            <input
              v-model="formData.price"
              @input="formData.price = parseInt($event.target.value)"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Harga"
            />
            <p v-if="errors.price" class="text-red-500 text-xs mt-1">
              {{ errors.price }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Pilih Kategori</label
            >
            <select
              @change="formData.category_id = $event.target.value"
              id="data-select"
              v-model="formData.category_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="" disabled selected>Pilih kategori</option>
              <option
                v-for="cat in categoriesStore.categories"
                :key="cat.id"
                :value="cat.id"
              >
                {{ cat.name }}
              </option>
            </select>
            <p v-if="errors.category_id" class="text-red-500 text-xs mt-1">
              {{ errors.category_id }}
            </p>
          </div>

          <div class="flex space-x-4 pt-2">
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
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useProductsStore } from "@/stores/products.store.js";
import { useCategoriesStore } from "@/stores/categories.store.js";

export default {
  setup() {
    // Store
    const productsStore = useProductsStore();
    const categoriesStore = useCategoriesStore();
    const router = useRouter();

    // Data reaktif
    const formData = ref({
      category_id: "",
      name: "",
      price: null,
      picture: null, // Untuk menyimpan file gambar
    });

    const imagePreview = ref(null); // Untuk pratinjau gambar
    const fileInput = ref(null); // Referensi ke elemen input file
    const isDragging = ref(false);
    const errors = ref({}); // Untuk menyimpan pesan kesalahan

    // Fetch data kategori saat komponen dimount
    onMounted(() => {
      categoriesStore.fetch();
    });

    // Fungsi untuk membuat produk
    const create = async () => {
      if (!validate()) return;

      const form = new FormData();

      // Menambahkan data ke FormData
      form.append("category_id", formData.value.category_id);
      form.append("name", formData.value.name);
      form.append("price", formData.value.price);

      // Menambahkan gambar jika ada
      if (formData.value.picture) {
        form.append("picture", formData.value.picture);
      }

      // Mengirim data ke store
      const result = await productsStore.add(form);

      if (result) {
        // Redirect setelah berhasil
        router.push("/");
      }
    };

    // Fungsi untuk menangani perubahan file gambar
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          processFile(file);
        } else {
          errors.value.picture = "Format file harus jpg atau png";
        }
      }
    };

    // Drag and Drop Event Handlers
    const onDragOver = (event) => {
      isDragging.value = true; // Menandai bahwa elemen sedang di-drag
    };

    const onDragLeave = () => {
      isDragging.value = false; // Menghapus tanda drag jika pointer keluar
    };

    const onDrop = (event) => {
      event.preventDefault(); // Mencegah perilaku default browser
      isDragging.value = false; // Menghapus tanda drag
      const file = event.dataTransfer.files[0]; // Mendapatkan file dari drag and drop
      if (file) {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          processFile(file); // Memproses file
        } else {
          errors.value.picture = "Format file harus jpg atau png";
        }
      }
    };

    const processFile = (file) => {
      formData.value.picture = file; // Menyimpan file ke formData.picture
      imagePreview.value = URL.createObjectURL(file); // Menampilkan pratinjau
      errors.value.picture = null; // Menghapus pesan kesalahan jika ada
    };

    // Fungsi untuk men-trigger klik pada input file
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };

    // Fungsi untuk validasi input
    const validate = () => {
      errors.value = {};

      if (!formData.value.name) {
        errors.value.name = "Nama produk wajib diisi";
      }

      if (!formData.value.price) {
        errors.value.price = "Harga produk wajib diisi";
      } else if (formData.value.price < 1) {
        errors.value.price = "Harga produk minimal 1";
      }

      if (!formData.value.category_id) {
        errors.value.category_id = "Kategori produk wajib dipilih";
      }

      if (!formData.value.picture) {
        errors.value.picture = "Gambar produk wajib diunggah";
      }

      return Object.keys(errors.value).length === 0;
    };

    // Kembalikan properti dan metode ke template
    return {
      productsStore,
      categoriesStore,
      formData,
      imagePreview,
      fileInput,
      create,
      handleFileUpload,
      triggerFileInput,
      onDragOver,
      onDragLeave,
      onDrop,
      router,
      errors,
    };
  },
};
</script>
