<template>
  <div class="flex justify-between items-center">
    <h1 class="font-semibold text-lg">Bayar</h1>
  </div>

  <h1>Pembayaran Berhasil</h1>
  <ButtonPrimary @click="$router.push('/products')"> Kembali </ButtonPrimary>
</template>

<script>
import { useCartStore } from "@/stores/cart.store.js";

export default {
  data() {
    return {
      CartStore: useCartStore(),
    };
  },
  mounted() {
    this.CartStore.clear();
  },
};
</script>
