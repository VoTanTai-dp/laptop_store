<script setup>
const $emit = defineEmits(['submit:laptop']);

function submitLaptop(event) {
  event.preventDefault(); // Ngăn submit mặc định của form
  const form = event.target;
  let formData = new FormData(form);

  // Gửi dữ liệu form qua sự kiện submit
  $emit('submit:laptop', formData);
}
</script>

<template>
  <form
    @submit="submitLaptop"
    class="border border-secondary rounded p-3"
  >
    <div class="mb-2">
      <label
        for="L_NAME"
        class="form-label"
        >Tên Laptop:</label
      >
      <input
        id="L_NAME"
        name="L_NAME"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_MODEL"
        class="form-label"
        >Model:</label
      >
      <input
        id="L_MODEL"
        name="L_MODEL"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_CPU"
        class="form-label"
        >CPU:</label
      >
      <input
        id="L_CPU"
        name="L_CPU"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_RAM"
        class="form-label"
        >RAM:</label
      >
      <input
        id="L_RAM"
        name="L_RAM"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_STORAGE"
        class="form-label"
        >Dung lượng bộ nhớ:</label
      >
      <input
        id="L_STORAGE"
        name="L_STORAGE"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_GPU"
        class="form-label"
        >Card Đồ họa:</label
      >
      <input
        id="L_GPU"
        name="L_GPU"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_SCREEN_SIZE"
        class="form-label"
        >Kích thước màn hình:</label
      >
      <input
        id="L_SCREEN_SIZE"
        name="L_SCREEN_SIZE"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <label
        for="L_WEIGHT"
        class="form-label"
        >Trọng lượng:</label
      >
      <input
        id="L_WEIGHT"
        name="L-WEIGHT"
        type="text"
        class="form-control"
      />
    </div>

    <div class="mb-2">
      <button
        type="submit"
        class="btn btn-primary"
      >
        <i class="fa-sharp fa-solid fa-filter"></i> Lọc
      </button>
    </div>
  </form>
</template>
