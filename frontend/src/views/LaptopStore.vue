<script setup>
import { ref, computed, watch, inject } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useMutation } from '@tanstack/vue-query';
import LaptopFilter from '@/components/LaptopFilter.vue';
import LaptopList from '@/components/LaptopList.vue';
import MainPagination from '@/components/MainPagination.vue';
import laptopsService from '@/services/laptop.service';
import cartService from '@/services/cart.service';

const router = useRouter();
const route = useRoute();
const totalPages = ref(1);
const currentPage = computed(() => {
  const page = Number(route.query?.page);
  return Number.isNaN(page) || page < 1 ? 1 : page;
});
const laptops = ref([]);
const searchText = ref(''); // Changed to ref
const filterCriteria = ref({});
const authentication = inject('authentication');
const currentDate = new Date();
const dateTimeNow = currentDate.toLocaleString('vi-VN');
const cart = ref({
  C_ID: authentication.value.id,
  L_ID: 0,
  CAR_DATE: dateTimeNow,
  CAR_QUANTITY: 1
});

const searchableLaptops = computed(() =>
  laptops.value.map((laptop) => {
    const {
      L_ID,
      L_BRAND,
      L_NAME,
      L_MODEL,
      L_PRICE,
      L_QUANTITY,
      L_DESCRIPTION,
      L_CPU,
      L_RAM,
      L_STORAGE,
      L_GPU,
      L_SCREEN_SIZE,
      L_WEIGHT
    } = laptop;
    return [
      L_ID,
      L_BRAND,
      L_NAME,
      L_MODEL,
      L_PRICE,
      L_QUANTITY,
      L_DESCRIPTION,
      L_CPU,
      L_RAM,
      L_STORAGE,
      L_GPU,
      L_SCREEN_SIZE,
      L_WEIGHT
    ]
      .join(' ')
      .toLowerCase();
  })
);

function applyLaptopFilter(formData) {
  filterCriteria.value = Object.fromEntries(formData.entries());
  searchText.value = filterCriteria.value.search || '';
}

const filteredLaptops = computed(() => {
  return laptops.value.filter((laptop, index) => {
    const isMatchingSearch =
      !searchText.value || searchableLaptops.value[index].includes(searchText.value.toLowerCase());
    const isMatchingCriteria = Object.keys(filterCriteria.value).every((key) => {
      return (
        !filterCriteria.value[key] || laptop[key]?.toString().includes(filterCriteria.value[key])
      );
    });
    return isMatchingSearch && isMatchingCriteria;
  });
});

const { mutate: fetchLaptops } = useMutation({
  mutationFn: async (page) => await laptopsService.fetchLaptops(page),
  onSuccess: (chunk) => {
    totalPages.value = chunk.metadata.lastPage ?? 1;
    laptops.value = chunk.laptops;
  },
  onError: (error) => {
    console.error('Error fetching contacts:', error);
  }
});

const { mutate: addCart } = useMutation({
  mutationFn: async (cart) => await cartService.createCart(cart),
  onSuccess: () => {
    alert('Sản phẩm đã được thêm vào giỏ hàng');
  },
  onError: (error) => {
    console.error('Error fetching laptop:', error);
  }
});

function changeCurrentPage(page) {
  router.push({ name: 'laptopstore', query: { page } });
}

function handleAddCart(id) {
  if (authentication.value.logedIn) {
    cart.value.L_ID = id;

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

watch(
  () => route.query.searchText,
  (newSearchText) => {
    searchText.value = newSearchText || '';
  },
  { immediate: true }
);

watch(
  currentPage,
  () => {
    fetchLaptops(currentPage.value);
  },
  { immediate: true }
);
</script>

<template>
  <div class="d-flex justify-content-between">
    <div class="col-sm-2">
      <LaptopFilter @submit:laptop="applyLaptopFilter" />
    </div>
    <div class="col-sm-10">
      <div class="border border-secondary rounded p-3 ms-3">
        <LaptopList
          v-if="filteredLaptops.length > 0"
          :laptops="filteredLaptops"
          @submit:addCart="handleAddCart"
        />
        <p v-else>Không có sản phẩm nào.</p>
        <div class="mt-3 d-flex flex-wrap justify-content-center align-items-center">
          <MainPagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @update:current-page="changeCurrentPage"
          />
        </div>
      </div>
    </div>
  </div>
</template>
