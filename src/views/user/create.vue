<template>
  <div class="flex justify-between items-center">
    <h1 class="font-semibold text-lg">Add User Page</h1>
  </div>

  <form action="" @submit.prevent="create">
    <div class="mb-6">
      <label for="name" class="block mb-2 text-sm font-medium text-gray-900"
        >Name <span class="text-red-600">*</span></label
      >
      <input
        v-model="formData.name"
        type="name"
        id="name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="John Doe"
        required
      />
    </div>
    <ButtonPrimary :type="'submit'"> Submit </ButtonPrimary>
    <ButtonDanger @click="$router.push('/user')" class="ml-3">
      Cancel
    </ButtonDanger>
  </form>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories.store.js";

export default {
  data() {
    return {
      categoriesStore: useCategoriesStore(),
      formData: {
        name: null,
      },
    };
  },
  methods: {
    async create() {
      let cat = await this.categoriesStore.add(this.formData);

      if (cat) {
        this.$router.push("/products");
      }
    },
  },
};
</script>
