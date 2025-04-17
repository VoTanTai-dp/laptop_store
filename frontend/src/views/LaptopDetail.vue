<script setup>
import { ref, onMounted, inject } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { useRouter, useRoute } from 'vue-router';
import DetailSection from '@/components/DetailSection.vue';
import LaptopForm from '@/components/LaptopForm.vue';
import laptopService from '@/services/laptop.service';
import cartService from '@/services/cart.service';

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const laptop = ref({});
const state = ref(false);

const authentication = inject('authentication');
const currentDate = new Date();
const dateTimeNow = currentDate.toLocaleString('vi-VN');
const cart = ref({
  C_ID: authentication.value.id,
  L_ID: id,
  CAR_DATE: dateTimeNow,
  CAR_QUANTITY: 1
});

// Mutation for fetching laptop data by ID
const { mutate: fetchLaptop } = useMutation({
  mutationFn: async (id) => await laptopService.fetchLaptop(id),
  onSuccess: (data) => {
    laptop.value = data;
  },
  onError: (error) => {
    console.error('Error fetching laptop:', error);
  }
});

// Mutation for adding laptop to cart
const { mutate: addCart } = useMutation({
  mutationFn: async (cart) => await cartService.createCart(cart),
  onSuccess: () => {
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  },
  onError: (error) => {
    console.error('Error fetching laptop:', error);
  }
});

// Mutation for updating laptop data
const { mutate: updateLaptop } = useMutation({
  mutationFn: async (laptop) => {
    return await laptopService.updateLaptop(id, laptop);
  },
  onSuccess: () => {
    state.value = 0;
    alert('Laptop được cập nhật thành công.');
  },
  onError: (error) => {
    console.error('Error updating contact:', error);
  }
});

// Mutation for deleting laptop data
const { mutate: deleteLaptop } = useMutation({
  mutationFn: async (id) => {
    return await laptopService.deleteLaptop(id);
  },
  onSuccess: () => {
    alert('Sản phẩm đã được xóa thành công!');
    router.push({ name: 'laptopstore' });
  },
  onError: (error) => {
    console.error('Error deleting contact:', error);
  }
});

function handleAddCart() {
  if (authentication.value.logedIn) {
    const formData = new FormData();

    formData.append('C_ID', cart.value.C_ID);
    formData.append('L_ID', cart.value.L_ID);
    formData.append('CAR_DATE', cart.value.CAR_DATE);
    formData.append('CAR_QUANTITY', cart.value.CAR_QUANTITY);

    addCart(formData);
  } else {
    alert('Bạn cần đăng nhập/đăng kí tài khoản trước!');
    router.push({ name: 'login' });
  }
}

function updateLaptopState() {
  state.value = !state.value;
}

function handleUpdateLaptop(formData) {
  updateLaptop(formData);
}

function handleDeleteLaptop() {
  if (confirm('Bạn muốn xóa thông tin Laptop này?')) {
    deleteLaptop(id);
  }
}

// Fetch the laptop data when the component is mounted
onMounted(() => {
  fetchLaptop(id);
});
</script>

<template>
  <div class="d-flex justify-content-center">
    <DetailSection
      class="me-3"
      :laptop="laptop"
      @submit:addCart="handleAddCart"
      @submit:update="updateLaptopState"
      @submit:delete="handleDeleteLaptop"
    />

    <LaptopForm
      v-if="state"
      :laptop="laptop"
      @submit:updateLaptop="handleUpdateLaptop"
    />
  </div>
</template>
