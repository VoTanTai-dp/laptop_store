<script setup>
defineProps({
  laptops: { type: Array, default: () => [] }
});

const $emit = defineEmits(['submit:addCart']);

function addCart(id) {
  $emit('submit:addCart', id);
}

function convertPrice(price) {
  const number = parseInt(price, 10);
  const formattedPrice = number.toLocaleString('vi-VN');

  return formattedPrice;
}
</script>

<template>
  <div class="row">
    <div
      class="col-md-2 mb-4"
      v-for="(laptop, index) in laptops"
      :key="laptop.L_ID"
    >
      <div class="card h-100 p-1 d-flex flex-column">
        <router-link
          :to="`/laptop/${laptop.L_ID}`"
          class="text-decoration-none"
        >
          <img
            :src="laptop.L_IMAGE"
            class="card-img-top"
            alt="Laptop Image"
          />
          <div class="card-body text-center">
            <h5
              class="card-title"
              style="height: 60px"
            >
              {{ laptop.L_NAME }}
            </h5>
            <h6 class="text-danger fw-bold">{{ convertPrice(laptop.L_PRICE) }} VND</h6>
          </div>
        </router-link>
        <div class="card-footer text-center mt-auto">
          <button
            class="btn btn-outline-primary"
            @click="addCart(laptop.L_ID)"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  transform: scale(1.05); /* Slight zoom on hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Shadow effect */
  cursor: pointer;
}
</style>
