<script setup>
import { inject } from 'vue';

const authentication = inject('authentication');
const $emit = defineEmits(['submit:addCart', 'submit:update', 'submit:delete']);

defineProps({
  laptop: { type: Object, required: true }
});

function convertPrice(price) {
  const number = parseInt(price, 10);
  const formattedPrice = number.toLocaleString('vi-VN');

  return formattedPrice;
}

function addCart() {
  $emit('submit:addCart');
}

function updateLaptop() {
  $emit('submit:update');
}

function deleteLaptop() {
  $emit('submit:delete');
}
</script>

<template>
  <div class="col-sm-6">
    <div class="border border-secondary rounded p-4 d-flex justify-content-center">
      <div class="col-sm-6">
        <img
          :src="laptop.L_IMAGE"
          class="imageSize card-img-top mb-3"
          alt="Laptop Image"
        />
        <p class="mx-4 my-2">
          - Model: {{ laptop.L_MODEL }} <br />
          - CPU: {{ laptop.L_CPU }} <br />
          - RAM: {{ laptop.L_RAM }} <br />
          - Bộ nhớ: {{ laptop.L_STORAGE }} <br />
          - GPU: {{ laptop.L_GPU }} <br />
          - Kích thước màn hình: {{ laptop.L_SCREEN_SIZE }} <br />
          - Trọng lượng: {{ laptop.L_WEIGHT }} kg <br />
          - Mô tả: {{ laptop.L_DESCRIPTION }}
        </p>
      </div>
      <div class="col-sm-6">
        <h2>
          <strong>{{ laptop.L_NAME }}</strong>
        </h2>
        <p>Hãng: {{ laptop.L_BRAND }} | ID: {{ laptop.L_ID }}</p>

        <h4
          class="my-4"
          style="color: blue"
        >
          <strong>{{ convertPrice(laptop.L_PRICE) }} VND</strong>
        </h4>

        <hr />

        <button
          type="button"
          class="btn btn-primary w-100 btn-lg"
          @click="addCart"
        >
          Thêm vào giỏ
        </button>

        <div
          v-if="authentication.role === 1"
          class="d-flex justify-content-center my-2"
        >
          <button
            type="button"
            class="btn btn-success w-50 btn-lg"
            @click="updateLaptop"
          >
            Hiệu chỉnh
          </button>
          <button
            type="button"
            class="btn btn-danger w-50 btn-lg ms-2"
            @click="deleteLaptop"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.imageSize {
  width: 350px;
  height: 250px;
}
</style>
