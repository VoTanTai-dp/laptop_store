<script setup>
import { useRouter } from 'vue-router';
import RegisterForm from '@/components/RegisterForm.vue';
import customerService from '@/services/customer.service';

import { useMutation } from '@tanstack/vue-query';

const router = useRouter();

const { mutate: createCustomer, isLoading } = useMutation({
  mutationFn: (customer) => customerService.createCustomer(customer),
  onSuccess: () => {
    alert('Tạo tài khoản thành công!');
    router.push({ name: 'login' });
  },
  onError: (error) => {
    console.error('Error creating customer:', error);
    alert('Đã xảy ra lỗi trong quá trình tạo tài khoản khách hàng');
  }
});

async function registerHandle(formData) {
  createCustomer(formData);
}
</script>

<template>
  <div>
    <RegisterForm @submit:register="registerHandle" />
  </div>
</template>
