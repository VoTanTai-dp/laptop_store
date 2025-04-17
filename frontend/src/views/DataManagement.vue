<script setup>
import { ref, computed, watch, inject } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import LaptopTable from '@/components/LaptopTable.vue';
import laptopService from '@/services/laptop.service';
import LaptopAdd from '@/components/LaptopAdd.vue';
import MainPagination from '@/components/MainPagination.vue';

const route = useRoute();
const router = useRouter();
const authentication = inject('authentication');

const laptops = ref([]);
const formState = ref(false);
const totalPages = ref(1);
const currentPage = computed(() => {
  const page = Number(route.query?.page);
  return Number.isNaN(page) || page < 1 ? 1 : page;
});

// Fetch laptops data
const { mutate: fetchLaptops } = useMutation({
  mutationFn: async (page) => await laptopService.fetchLaptops(page),
  onSuccess: (chunk) => {
    totalPages.value = chunk.metadata.lastPage ?? 1;
    laptops.value = chunk.laptops;
  },
  onError: (error) => {
    console.error('Error fetching contacts:', error);
  }
});

const { mutate: createLaptop } = useMutation({
  mutationFn: async (laptop) => await laptopService.createLaptop(laptop),
  onSuccess: (chunk) => {
    console.log(chunk.laptop);
    fetchLaptops();
    alert('Đã thêm Laptop mới thành công.');
  },
  onError: (error) => {
    console.error('Error fetching contacts:', error);
  }
});

const { mutate: deleteAllLaptops } = useMutation({
  mutationFn: async () => await laptopService.deleteAllLaptops(),
  onSuccess: () => {
    laptops.value = [];
    alert('Đã xóa tất cả thành công.');
  },
  onError: (error) => {
    console.error('Error fetching contacts:', error);
  }
});

function handleDeleteAllLaptops() {
  if (confirm('Bạn có muốn xóa toàn bộ dữ liệu?')) {
    deleteAllLaptops();
  }
}

function handleCreateLaptopBtn() {
  formState.value = !formState.value;
  console.log(formState.value);
}

function handleCreateLaptop(formData) {
  createLaptop(formData);
}

function changeCurrentPage(page) {
  router.push({ name: 'datamanagement', query: { page } });
}

watch(
  currentPage,
  () => {
    fetchLaptops(currentPage.value);
  },
  { immediate: true }
);
</script>

<template>
  <div
    v-if="authentication.logedIn === 1 && authentication.role === 1"
    class="d-flex justify-content-center"
  >
    <div class="container mt-2 border border-secondary rounded col-sm-8 p-4">
      <LaptopTable
        :laptops="laptops"
        @submit:deleteAllLaptops="handleDeleteAllLaptops"
        @submit:createLaptop="handleCreateLaptopBtn"
      />

      <MainPagination
        class="mt-3 d-flex flex-wrap justify-content-center align-items-center"
        :total-pages="totalPages"
        :current-page="currentPage"
        @update:current-page="changeCurrentPage"
      />
    </div>

    <LaptopAdd
      v-if="formState"
      @submit:createLaptop="handleCreateLaptop"
    />
  </div>

  <div
    v-else
    class="text-center"
  >
    <p>
      Bạn cần phải <RouterLink to="/login"><a> đăng nhập</a></RouterLink> vào tài khoản quản trị
      viên để truy cập trang này.
    </p>
  </div>
</template>
