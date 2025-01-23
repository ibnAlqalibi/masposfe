import { defineStore } from "pinia";
import { axiosWrapper } from "@/helper/axios-wrapper.js";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const useProductsStore = defineStore({
  id: "products",
  state: () => ({
    products: [],
    filteredProducts: [],
    search: "",
  }),
  actions: {
    async fetch() {
      let url = `${baseUrl}/product`;

      const products = await axiosWrapper.get(url);

      if (products) {
        this.products = products.data;
      }
    },
    async add(data) {
      const product = await axiosWrapper.post(
        `${baseUrl}/product`,
        data,
        true,
        "multipart/form-data"
      );

      this.product = product.data;

      return product;
    },
    async update(id, data) {
      return await axiosWrapper.put(`${baseUrl}/product/${id}`, data, true);
    },
    async delete(id) {
      await axiosWrapper.delete(`${baseUrl}/product/${id}`, {}, true);
      this.filteredProducts = this.filteredProducts.filter(
        (product) => product.id !== id
      );
      this.products = this.products.filter((product) => product.id !== id);
    },
  },
});
