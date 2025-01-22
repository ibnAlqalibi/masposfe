<template>
  <div class="flex gap-2">
    <div
      v-for="cat in CategoriesStore.categories"
      :key="cat.id"
      :class="[
        'px-4 py-2 rounded-full cursor-pointer',
        'bg-blue-500 text-white',
      ]"
      @click="CategoriesStore.setCategoryId(cat.id)"
    >
      {{ cat.name }}
    </div>
  </div>
</template>

<script>
import { useCategoriesStore } from "@/stores/categories.store.js";

export default {
  data() {
    return {
      CategoriesStore: useCategoriesStore(),
    };
  },
  mounted() {
    this.CategoriesStore.fetch();
  },
  methods: {
    async deleteData(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.CategoriesStore.delete(id);

          this.CategoriesStore.fetch();
        }
      });
    },
    updateData(user) {
      this.CategoriesStore.user = user;

      this.$router.push("/user/update");
    },
  },
};
</script>
