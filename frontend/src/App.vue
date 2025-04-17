<script setup>
import StoreHeader from '@/components/StoreHeader.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { provide } from 'vue';

const router = useRouter();
const searchText = ref('');
const authentication = ref({
  logedIn: 0,
  id: 0,
  email: '',
  password: '',
  role: 0
});

provide('authentication', authentication);

function handleSearch(data) {
  searchText.value = data;
  router.push({ name: 'laptopstore', query: { searchText: searchText.value } });
}
</script>

<template>
  <StoreHeader @submit="handleSearch" />

  <div class="container-fluid mt-3">
    <router-view />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
