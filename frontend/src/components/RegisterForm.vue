<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const validationSchema = toTypedSchema(
  z.object({
    C_NAME: z
      .string()
      .min(2, { message: 'Tên phải ít nhất 2 ký tự.' })
      .max(50, { message: 'Tên có nhiều nhất 50 ký tự.' }),
    C_EMAIL: z
      .string()
      .email({ message: 'E-mail không hợp lệ.' })
      .max(50, { message: 'E-mail tối đa 50 ký tự.' }),
    C_PASSWORD: z.string().min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự.' }),
    C_PHONE: z.string().regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g, {
      message: 'Số điện thoại không hợp lệ.'
    })
  })
);

const $emit = defineEmits(['submit:register']);

function submitRegister(values) {
  let formData = new FormData();
  for (let key in values) {
    if (values[key] !== undefined) {
      formData.append(key, values[key]);
    }
  }
  formData.append('C_ROLE', 0);
  $emit('submit:register', formData);
}
</script>

<template>
  <div class="form-container shadow-lg">
    <Form
      :validation-schema="validationSchema"
      @submit="submitRegister"
    >
      <h2 class="text-center mb-4">Register</h2>

      <div class="mb-3">
        <label
          for="C_NAME"
          class="form-label"
        >
          Name:
        </label>
        <Field
          id="C_NAME"
          name="C_NAME"
          type="text"
          class="form-control"
          placeholder="Fullname"
        />
        <ErrorMessage
          name="C_NAME"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="C_EMAIL"
          class="form-label"
        >
          E-mail:
        </label>
        <Field
          id="C_EMAIL"
          name="C_EMAIL"
          type="C_EMAIL"
          class="form-control"
          placeholder="Your Email address"
        />
        <ErrorMessage
          name="C_EMAIL"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="C_PASSWORD"
          class="form-label"
        >
          Password:
        </label>
        <Field
          id="C_PASSWORD"
          name="C_PASSWORD"
          type="password"
          class="form-control"
          placeholder="Your password"
        />
        <ErrorMessage
          name="C_PASSWORD"
          class="error-feedback"
        />
      </div>

      <div class="mb-3">
        <label
          for="C_PHONE"
          class="form-label"
        >
          Phone Number:
        </label>
        <Field
          id="C_PHONE"
          name="C_PHONE"
          type="tel"
          class="form-control"
          placeholder="Your phone number"
        />
        <ErrorMessage
          name="C_PHONE"
          class="error-feedback"
        />
      </div>

      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-primary btn-block"
        >
          <i class="fas fa-user-plus"></i> Register
        </button>
      </div>
    </Form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-weight: 600;
  color: #495057;
}

.form-control {
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn {
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
}

.error-feedback {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
