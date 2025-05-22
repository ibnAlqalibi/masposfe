<template>
  <div class="max-w-7xl mx-auto pt-6 px-2 pb-[32px]">
    <div class="rounded-lg border bg-white overflow-hidden">
      <table class="min-w-full text-sm text-left text-gray-500">
        <thead class="regular text-[16px] text-[#0F0F0F] bg-white border-b">
          <tr>
            <th scope="col" class="px-6 py-3 font-[400]">Produk</th>
            <th scope="col" class="px-6 py-3 font-[400]">Nama</th>
            <th scope="col" class="px-6 py-3 font-[400]">Harga</th>
            <th scope="col" class="px-6 py-3 font-[400]">Jumlah</th>
            <th scope="col" class="px-6 py-3 font-[400]">Subtotal</th>
            <th scope="col" class="px-6 py-3 font-[400]"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prod in CartStore.cart" :key="prod.id" class="bg-white">
            <td
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              <img
                :src="prod.picture_url"
                alt="Product"
                class="w-[185px] h-[120px] object-cover rounded-[8px]"
              />
            </td>
            <td
              scope="row"
              class="regular px-6 py-4 text-[20px] text-gray-900 whitespace-nowrap"
            >
              {{ prod.name }}
            </td>
            <td
              scope="row"
              class="regular px-6 py-4 text-[20px] text-gray-900 whitespace-nowrap"
            >
              {{ formatRupiah(prod.price) }}
            </td>
            <td
              scope="row"
              class="px-6 py-4 text-[20px] text-gray-900 whitespace-nowrap"
            >
              <div class="flex items-center gap-[16px] mt-1.5 sm:mt-2">
                <button
                  class="bg-[#E8E8E8] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
                  @click="CartStore.updateQty(prod.id, 'decrement')"
                >
                  <MinusIcon class="w-[14px] h-[14px] text-[#0F0F0F]" />
                </button>
                <span class="regular text-[20px] font-[500]">{{
                  CartStore.cart.find((cart) => cart.id === prod.id).qty
                }}</span>
                <button
                  class="bg-[#E8E8E8] rounded-[4px] w-[24px] h-[24px] flex items-center justify-center"
                  @click="CartStore.updateQty(prod.id, 'increment')"
                >
                  <PlusIcon class="w-[14px] h-[14px] text-[#0F0F0F]" />
                </button>
              </div>
            </td>
            <td
              scope="row"
              class="regular px-6 py-4 text-[20px] font-[700] text-gray-900 whitespace-nowrap"
            >
              {{ formatRupiah(prod.subtotal) }}
            </td>
            <td class="px-6 py-4">
              <a
                class="regular ml-2 font-[16px] cursor-pointer text-red-500"
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
        <tfoot class="shadow-top h-[80px]">
          <tr class="bg-white">
            <!-- <td
                colspan="6"
                class="px-6 py-4 text-right text-[20px] text-gray-900"
              >
                Grand total:
                {{ CartStore.cart.reduce((acc, prod) => acc + prod.subtotal, 0) }}
              </td> -->
          </tr>
          <tr class="bg-white border-b">
            <td colspan="6" class="px-6 py-4">
              <div class="flex justify-end gap-4">
                <Button
                  class="regular bg-white text-[#2C59E5] w-[120px] h-[48px] rounded-[8px] font-[500] text-[16px] border-[1px] border-[#2C59E5] hover:bg-[#2C59E5] hover:text-white hover:border-[#2C59E5] transition-all duration-200 ease-in-out"
                  @click="$router.push('/')"
                >
                  Kembali
                </Button>
                <Button
                  v-if="CartStore.cart.length > 0"
                  class="regular bg-[#2C59E5] text-white w-[120px] h-[48px] rounded-[8px] font-[500] text-[16px] border-[1px] border-[#2C59E5] hover:bg-blue-800 hover:text-white hover:border-[#2C59E5] transition-all duration-200 ease-in-out"
                  @click="bayar"
                >
                  Bayar
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "@/stores/cart.store.js";
import CategoriesView from "@/views/categories/index.vue";
import { formatRupiah } from "@/utils/formatRupiah";
import { PlusIcon, MinusIcon } from "@heroicons/vue/24/solid";

export default {
  components: {
    CategoriesView,
    PlusIcon,
    MinusIcon,
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
    formatRupiah(value) {
      return formatRupiah(value);
    },
  },
};
</script>
<style>
.shadow-top {
  box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
}
</style>
