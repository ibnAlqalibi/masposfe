<template>
  <div class="bg-white rounded-lg shadow-sm overflow-hidden">
    <img
      :src="product.image"
      :alt="product.name"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="font-medium mb-2">{{ product.name }}</h3>
      <div class="flex items-center justify-between">
        <span class="text-gray-900">Rp {{ formatPrice(product.price) }}</span>
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
        >
          <PlusIcon class="w-4 h-4" />
          Keranjang
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from "lucide-vue-next";

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      image: "",
      name: "",
      price: 0,
    }),
  },
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};
</script>
