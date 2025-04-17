<script setup>
import { ref, inject } from 'vue';

const model = ref('');
const authentication = inject('authentication');
const emit = defineEmits(['submit']);

function submitSearch() {
  emit('submit', model.value);
}

function handleLogout() {
  authentication.logedIn = 0;
  authentication.id = 0;
  authentication.email = '';
  authentication.password = '';
  authentication.role = 0;

  window.location.reload();
}
</script>

<template>
  <nav class="navbar navbar-expand navbar-custom py-3">
    <div class="container-fluid">
      <!-- Left Section: Logo -->
      <router-link
        to="/"
        class="navbar-brand text-white d-flex align-items-center"
      >
        <i class="fa-solid fa-laptop"></i>
        <span class="ms-2"><strong>LaptopStore</strong></span>
      </router-link>

      <!-- Center Section: Search Bar -->
      <div class="d-flex flex-grow-1 me-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Nhập sản phẩm bạn cần tìm..."
            v-model="model"
            @keyup.enter="submitSearch"
          />
          <button
            class="btn btn-search btn-outline-secondary"
            type="button"
            @click="submitSearch"
          >
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>

      <!-- Right Section: Cart Icon -->
      <router-link :to="`/carts`">
        <div class="d-flex align-items-center mx-3 text-white">
          <a><i class="fas fa-shopping-cart fa-2x"></i></a>
        </div>
      </router-link>

      <!-- Right Section: Database Icon -->
      <router-link
        v-if="authentication.role === 1"
        :to="`/data`"
      >
        <div class="d-flex align-items-center mx-3 text-white">
          <a><i class="fa-solid fa-database fa-2x"></i></a>
        </div>
      </router-link>

      <!-- Right Section: Login/Logout Icon -->
      <router-link
        v-if="authentication.logedIn === 0"
        :to="`/login`"
      >
        <div class="d-flex align-items-center mx-3 text-white">
          <a><i class="fa-solid fa-user-group fa-2x"></i></a>
        </div>
      </router-link>

      <router-link
        v-if="authentication.logedIn === 1"
        :to="`/`"
        @click.native="handleLogout"
      >
        <div class="d-flex align-items-center mx-3 text-white">
          <a><i class="fa-solid fa-power-off fa-2x"></i></a>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<style>
.navbar-custom {
  /* header color */
  background-color: darkblue;
}
.navbar-custom .btn-search {
  background-color: white;
  border: none;
}
.navbar-custom .form-control:focus {
  box-shadow: none;
  border: none;
}
</style>
