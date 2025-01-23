<template>
  <div class="max-w-7xl mx-auto pt-6 px-2">
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Gambar</th>
          <th scope="col" class="px-6 py-3">Nama</th>
          <th scope="col" class="px-6 py-3">Harga</th>
          <th scope="col" class="px-6 py-3">Qty</th>
          <th scope="col" class="px-6 py-3">Subtotal</th>
          <th scope="col" class="px-6 py-3"></th>
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
            <img
              :src="prod.picture_url"
              alt="Product"
              class="w-auto h-20 object-cover rounded-lg"
            />
          </td>
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
            <div class="flex items-center justify-between mt-1.5 sm:mt-2">
              <button
                class="bg-gray-200 text-gray-800 py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
                @click="CartStore.updateQty(prod.id, 'decrement')"
              >
                -
              </button>
              <span class="text-xs sm:text-sm">{{
                CartStore.cart.find((cart) => cart.id === prod.id).qty
              }}</span>
              <button
                class="bg-gray-200 text-gray-800 py-1 sm:py-1.5 px-2 sm:px-3 rounded-lg text-xs sm:text-sm"
                @click="CartStore.updateQty(prod.id, 'increment')"
              >
                +
              </button>
            </div>
          </td>
          <td
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
          >
            {{ prod.subtotal }}
          </td>

          <td class="px-6 py-4">
            <a
              class="ml-2 cursor-pointer text-red-500"
              @click="CartStore.delete(prod.id)"
            >
              Hapus
            </a>
          </td>
        </tr>
        <tr v-if="CartStore.cart.length === 0" class="bg-white border-b">
          <td colspan="6" class="px-6 py-4 text-center text-gray-500">
            No products found.
          </td>
        </tr>
      </tbody>
      <tfoot v-if="CartStore.cart.length > 0">
        <tr class="bg-white">
          <td
            colspan="6"
            class="px-6 py-4 text-right font-medium text-gray-900"
          >
            Grand total:
            {{ CartStore.cart.reduce((acc, prod) => acc + prod.subtotal, 0) }}
          </td>
        </tr>
        <tr class="bg-white border-b">
          <td colspan="6" class="px-6 py-4 text-right">
            <ButtonPrimary @click="bayar"> Bayar </ButtonPrimary>
          </td>
        </tr>
      </tfoot>
    </table>
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
    async bayar() {
      const confirm = await this.$swal({
        title: "Bayar",
        text: "Apakah anda yakin ingin melanjutkan pembayaran?",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Ya",
      });

      if (confirm.isConfirmed) {
        this.CartStore.clear();

        await this.$swal({
          title: "Pembayaran Berhasil",
          text: "Terima kasih telah melakukan pembayaran!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    },
  },
};
</script>
