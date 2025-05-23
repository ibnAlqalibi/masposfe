<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-50 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="relative bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-full sm:max-w-md"
            >
              <div class="p-6">
                <div
                  class="flex items-center justify-center h-[68px] w-[68px] rounded-full bg-red-100"
                >
                  <div
                    class="flex items-center justify-center h-[48px] w-[48px] rounded-full bg-[#FF2928]"
                  >
                    <TrashIcon
                      class="w-[24px] h-[24px] text-white"
                      aria-hidden="true"
                    >
                    </TrashIcon>
                  </div>
                </div>
                <h3 class="regular text-[16px] font-[700] text-gray-900 mt-4">
                  Hapus Produk
                </h3>
                <p class="regular text-[16px] text-gray-500 mt-2">
                  Apakah Anda yakin ingin menghapus produk ini?
                </p>
                <div
                  class="mt-6 flex justify-center gap-[24px] border-t border-px border-[#D6D6D6] pt-4"
                >
                  <button
                    type="button"
                    class="regular text-[16px] px-4 py-2 h-[48px] w-full rounded-md border border-red-600 text-red-600 hover:bg-red-50 transition"
                    @click="close"
                  >
                    Batal
                  </button>
                  <button
                    type="button"
                    class="regular text-[16px] px-4 py-2 h-[48px] w-full bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    @click="confirm"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps(["isOpen"]);
const emit = defineEmits(["close", "confirm"]);

const close = () => emit("close");
const confirm = () => emit("confirm");
</script>
