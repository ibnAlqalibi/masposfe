import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => ({
    cart: JSON.parse(sessionStorage.getItem("cart")) || [],
  }),
  actions: {
    async add(productData) {
      const existingProduct = this.cart.find(
        (product) => product.id === productData.id
      );
      if (existingProduct) {
        existingProduct.qty += 1;
        existingProduct.subtotal = existingProduct.price * existingProduct.qty;
      } else {
        productData.qty = 1;
        productData.subtotal = productData.price * productData.qty;
        this.cart = [...this.cart, productData];
      }
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    },
    async updateQty(id, change) {
      const product = this.cart.find((product) => product.id === id);
      if (change === "increment") {
        product.qty += 1;
      } else {
        product.qty -= 1;
        if (product.qty <= 0) {
          this.cart = this.cart.filter((product) => product.id !== id);
          sessionStorage.setItem("cart", JSON.stringify(this.cart));
          return;
        }
      }
      product.subtotal = product.price * product.qty;
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    },
    async delete(id) {
      this.cart = this.cart.filter((product) => product.id !== id);
      sessionStorage.setItem("cart", JSON.stringify(this.cart));
    },
    async clear() {
      this.cart = [];
      sessionStorage.removeItem("cart");
    },
  },
});
