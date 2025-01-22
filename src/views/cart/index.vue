<template>
  <div class="relative overflow-x-auto mt-5">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3">Harga</th>
          <th scope="col" class="px-6 py-3">Qty</th>
          <th scope="col" class="px-6 py-3">Subtotal</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="prod in CartStore.cart"
          :key="prod.id"
          class="bg-white border-b"
        >
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.name }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.price }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.qty }}
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.subtotal }}
          </td>

          <td class="px-6 py-4">
            <ButtonDanger class="ml-2" @click="CartStore.delete(prod.id)">
              <i class="ri-delete-bin-line"></i>
            </ButtonDanger>
            <ButtonDanger
              class="ml-2"
              @click="CartStore.updateQty(prod.id, `decrement`)"
            >
              <i>-</i>
            </ButtonDanger>
            <ButtonPrimary
              class="ml-2"
              @click="CartStore.updateQty(prod.id, `increment`)"
            >
              <i>+</i>
            </ButtonPrimary>
          </td>
        </tr>
        <tr v-if="CartStore.cart.length === 0">
          <td colspan="5" class="px-6 py-4 text-center text-gray-500">
            No products found.
          </td>
        </tr>
      </tbody>
    </table>
    <i class="flex justify-end mt-5"
      >Grand total:
      {{ CartStore.cart.reduce((acc, prod) => acc + prod.subtotal, 0) }}</i
    >
    <div class="flex justify-end mt-5">
      <ButtonPrimary @click="$router.push('/checkout')"> Bayar </ButtonPrimary>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart.store.js";
import CategoriesView from "@/views/categories/index.vue";

export default {
  components: {
    CategoriesView,
  },
  data() {
    return {
      CartStore: useCartStore(),
    };
  },
  methods: {
    async deleteData(id) {
      const confirm = await this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (confirm.isConfirmed) {
        await this.CartStore.delete(id);
        this.CartStore.fetch().then(() => {
          this.filterProducts();
        });
      }
    },
    updateData(prod) {
      this.CartStore.cat = prod;
      this.$router.push("/products/update");
    },
  },
};
</script>
