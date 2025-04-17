<script setup>
defineProps({
  laptops: { type: Array, default: () => [] }
});

const $emit = defineEmits(['submit:deleteAllLaptops', 'submit:createLaptop']);

function handleDeleteAllLaptops() {
  $emit('submit:deleteAllLaptops');
}

function handleCreateLaptop() {
  $emit('submit:createLaptop');
}
</script>

<template>
  <div>
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="mb-3">Danh sách Laptop</h2>
      <div>
        <button
          type="button"
          class="btn btn-success me-2"
          @click="handleCreateLaptop"
        >
          Thêm Laptop
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click="handleDeleteAllLaptops"
        >
          Xóa tất cả
        </button>
      </div>
    </div>

    <div v-if="laptops.length > 0">
      <table class="table table-hover table-bordered align-middle">
        <thead class="table-primary text-center">
          <tr>
            <th
              scope="col"
              style="width: 10%"
            >
              STT
            </th>
            <th
              scope="col"
              style="width: 50%"
            >
              Tên Laptop
            </th>
            <th
              scope="col"
              style="width: 20%"
            >
              Số lượng
            </th>
            <th
              scope="col"
              style="width: 20%"
            >
              Chi tiết
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(laptop, index) in laptops"
            :key="laptop.L_ID"
          >
            <th
              scope="row"
              class="text-center"
            >
              {{ index + 1 }}
            </th>
            <td>{{ laptop.L_NAME }}</td>
            <td class="text-center">{{ laptop.L_QUANTITY }}</td>
            <td class="text-center">
              <RouterLink :to="`/laptop/${laptop.L_ID}`">
                <button
                  type="button"
                  class="btn btn-primary btn-sm"
                >
                  Xem chi tiết
                </button>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-else
      class="text-center"
    >
      <p>Hiện không có Laptop nào được lưu trong CSDL.</p>
    </div>
  </div>
</template>

<style scoped>
.table {
  margin: auto;
}
</style>
