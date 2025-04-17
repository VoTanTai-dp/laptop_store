<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import customersService from '@/services/customer.service';

const router = useRouter();
const route = useRoute();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const customers = ref([]);
const authentication = inject('authentication');

const { mutate: fetchCustomers, isLoading } = useMutation({
  mutationFn: () => customersService.fetchCustomers(),
  onSuccess: (chunk) => {
    customers.value = chunk.customers;
  },
  onError: (error) => {
    console.error('Error fetching customers:', error);
  }
});

async function handleLogin() {
  // Kiểm tra trước khi tìm kiếm
  if (customers.value.length === 0) {
    alert('Không tìm thấy tài khoản khách hàng, vui lòng kiểm tra lại!');
    return;
  }

  const authenticatedCustomer = customers.value.find(
    (customer) =>
      customer.C_EMAIL.trim() === email.value.trim() &&
      customer.C_PASSWORD.trim() === password.value.trim()
  );

  if (authenticatedCustomer) {
    authentication.value.logedIn = 1;
    authentication.value.id = authenticatedCustomer.C_ID;
    authentication.value.email = authenticatedCustomer.C_EMAIL;
    authentication.value.password = authenticatedCustomer.C_PASSWORD;
    authentication.value.role = authenticatedCustomer.C_ROLE;

    errorMessage.value = '';
    router.push({ name: 'laptopstore' });
  } else {
    console.error('Invalid credentials');
    errorMessage.value = 'Sai tài khoản hoặc mật khẩu, vui lòng kiểm tra lại!';
  }
}

onMounted(() => {
  fetchCustomers();
});
</script>

<template>
  <div class="container mt-3">
    <div class="d-flex justify-content-center">
      <div
        class="card shadow-lg p-4"
        style="width: 500px"
      >
        <h3 class="text-center mb-4">Login</h3>

        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              v-model="email"
              required
            />
            <label for="floatingEmail">Email address</label>
          </div>

          <!-- Password Input -->
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              v-model="password"
              required
            />
            <label for="floatingPassword">Password</label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary w-100 btn-lg"
          >
            Sign In
          </button>

          <!-- Divider -->
          <hr class="my-4" />

          <!-- Additional Links -->
          <div class="text-center">
            <RouterLink :to="`/register`">
              <a
                href="#"
                class="text-decoration-none"
              >
                Don't have an account? Sign up
              </a>
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
    <h5
      class="text-center mt-3"
      style="color: red"
    >
      {{ errorMessage }}
    </h5>
  </div>
</template>

<style>
.card {
  border-radius: 12px;
}
.form-floating label {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>
