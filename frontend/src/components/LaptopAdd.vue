<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { ref, useTemplateRef } from 'vue';

let laptopImageInput = useTemplateRef('laptop-image-input');
let laptopImage = ref(null);
const $emit = defineEmits(['submit:createLaptop']);

// Define the validation schema
const validationSchema = toTypedSchema(
  z.object({
    L_BRAND: z.string().min(1, { message: 'Brand is required.' }),
    L_NAME: z.string().min(1, { message: 'Name is required.' }),
    L_MODEL: z.string().min(1, { message: 'Model is required.' }),
    L_PRICE: z.number().min(0, { message: 'Price must be a positive number.' }),
    L_CPU: z.string().min(1, { message: 'CPU is required.' }),
    L_RAM: z.string().min(1, { message: 'RAM is required.' }),
    L_STORAGE: z.string().min(1, { message: 'Storage is required.' }),
    L_GPU: z.string().min(1, { message: 'GPU is required.' }),
    L_SCREEN_SIZE: z.string().min(1, { message: 'Screen size is required.' }),
    L_WEIGHT: z.number().min(0, { message: 'Weight must be a positive number.' }),
    L_DESCRIPTION: z.string().optional(),
    L_QUANTITY: z.number().min(1, { message: 'Quantity must be greater than 0.' })
  })
);

function previewImageFile(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (evt) => {
    laptopImage.value = evt.target.result;
  };
  reader.readAsDataURL(file);
}

// Form submit handler
function submitCreate(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }

  // Check if there is a file input
  const fileInput = laptopImageInput.value;
  if (fileInput && fileInput.files.length > 0) {
    formData.append('L_IMAGE', fileInput.files[0]);
  }

  $emit('submit:createLaptop', formData);
}
</script>

<template>
  <div class="container mt-2 border border-secondary rounded col-sm-4 p-4 ms-2">
    <Form
      :validation-schema="validationSchema"
      @submit="submitCreate"
    >
      <h2 class="text-center mb-4"><strong>Thêm Laptop</strong></h2>

      <!-- Hãng -->
      <div class="mb-3">
        <label
          for="L_BRAND"
          class="form-label"
          >Hãng</label
        >
        <Field
          id="L_BRAND"
          name="L_BRAND"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_BRAND"
          class="error-feedback"
        />
      </div>

      <!-- Tên Laptop -->
      <div class="mb-3">
        <label
          for="L_NAME"
          class="form-label"
          >Tên Laptop</label
        >
        <Field
          id="L_NAME"
          name="L_NAME"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_NAME"
          class="error-feedback"
        />
      </div>

      <!-- Model -->
      <div class="mb-3">
        <label
          for="L_MODEL"
          class="form-label"
          >Model</label
        >
        <Field
          id="L_MODEL"
          name="L_MODEL"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_MODEL"
          class="error-feedback"
        />
      </div>

      <!-- Giá -->
      <div class="mb-3">
        <label
          for="L_PRICE"
          class="form-label"
          >Giá (VND)</label
        >
        <Field
          id="L_PRICE"
          name="L_PRICE"
          type="number"
          class="form-control"
        />
        <ErrorMessage
          name="L_PRICE"
          class="error-feedback"
        />
      </div>

      <!-- CPU -->
      <div class="mb-3">
        <label
          for="L_CPU"
          class="form-label"
          >CPU</label
        >
        <Field
          id="L_CPU"
          name="L_CPU"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_CPU"
          class="error-feedback"
        />
      </div>

      <!-- RAM -->
      <div class="mb-3">
        <label
          for="L_RAM"
          class="form-label"
          >RAM</label
        >
        <Field
          id="L_RAM"
          name="L_RAM"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_RAM"
          class="error-feedback"
        />
      </div>

      <!-- Dung Lượng Lưu Trữ -->
      <div class="mb-3">
        <label
          for="L_STORAGE"
          class="form-label"
          >Dung Lượng Lưu Trữ</label
        >
        <Field
          id="L_STORAGE"
          name="L_STORAGE"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_STORAGE"
          class="error-feedback"
        />
      </div>

      <!-- GPU -->
      <div class="mb-3">
        <label
          for="L_GPU"
          class="form-label"
          >GPU</label
        >
        <Field
          id="L_GPU"
          name="L_GPU"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_GPU"
          class="error-feedback"
        />
      </div>

      <!-- Kích Thước Màn Hình -->
      <div class="mb-3">
        <label
          for="L_SCREEN_SIZE"
          class="form-label"
          >Kích Thước Màn Hình</label
        >
        <Field
          id="L_SCREEN_SIZE"
          name="L_SCREEN_SIZE"
          type="text"
          class="form-control"
        />
        <ErrorMessage
          name="L_SCREEN_SIZE"
          class="error-feedback"
        />
      </div>

      <!-- Trọng Lượng -->
      <div class="mb-3">
        <label
          for="L_WEIGHT"
          class="form-label"
          >Trọng Lượng (kg)</label
        >
        <Field
          id="L_WEIGHT"
          name="L_WEIGHT"
          type="number"
          class="form-control"
        />
        <ErrorMessage
          name="L_WEIGHT"
          class="error-feedback"
        />
      </div>

      <!-- Mô Tả -->
      <div class="mb-3">
        <label
          for="L_DESCRIPTION"
          class="form-label"
          >Mô Tả</label
        >
        <Field
          id="L_DESCRIPTION"
          name="L_DESCRIPTION"
          as="textarea"
          class="form-control"
          rows="4"
        />
        <ErrorMessage
          name="L_DESCRIPTION"
          class="error-feedback"
        />
      </div>

      <!-- Hình Ảnh -->
      <div class="mb-3 w-100 h-50">
        <label
          for="L_IMAGE"
          class="form-label"
          >Hình Ảnh</label
        >
        <img
          class="img-fluid img-thumbnail"
          :src="laptopImage"
          alt=""
          @click="laptopImageInput.click()"
        />
        <Field
          name="L_IMAGE"
          v-slot="{ handleChange }"
        >
          <input
            id="L_IMAGE"
            type="file"
            class="form-control"
            ref="laptop-image-input"
            @change="
              (event) => {
                handleChange(event);
                previewImageFile(event);
              }
            "
          />
          <ErrorMessage
            name="L_IMAGE"
            class="error-feedback"
          />
        </Field>
      </div>

      <!-- Số lượng -->
      <div class="mb-3">
        <label
          for="L_QUANTITY"
          class="form-label"
          >Số Lượng</label
        >
        <Field
          id="L_QUANTITY"
          name="L_QUANTITY"
          type="number"
          class="form-control"
        />
        <ErrorMessage
          name="L_QUANTITY"
          class="error-feedback"
        />
      </div>

      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-primary"
        >
          Thêm
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.error-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
