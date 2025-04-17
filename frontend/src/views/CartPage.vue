<script setup>
import { ref, onMounted, inject } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import cartService from '@/services/cart.service';
import laptopService from '@/services/laptop.service';

const cartItems = ref([]);
const authentication = inject('authentication');
const total = ref(0);

function calculateTotal() {
  total.value = cartItems.value.reduce((sum, item) => {
    return sum + (item.laptop ? item.laptop.L_PRICE * item.CAR_QUANTITY : 0);
  }, 0);
}

// Fetch cart items
const { mutate: fetchCarts } = useMutation({
  mutationFn: async () => await cartService.fetchCarts(),
  onSuccess: (data) => {
    cartItems.value = data.carts
      .filter((item) => item.C_ID === authentication.value.id)
      .map((item) => ({ ...item, laptop: null }));

    cartItems.value.forEach((item) => {
      fetchLaptop(item);
    });
  },
  onError: (error) => {
    console.error('Error fetching cart items:', error);
  }
});

// Fetch laptop details for a cart item
const { mutate: fetchLaptop } = useMutation({
  mutationFn: async (item) => {
    const laptopData = await laptopService.fetchLaptop(item.L_ID);
    return { laptopData, item };
  },
  onSuccess: ({ laptopData, item }) => {
    const cartItem = cartItems.value.find((ci) => ci.L_ID === item.L_ID);
    if (cartItem) {
      cartItem.laptop = laptopData;
      calculateTotal(); // Recalculate total after updating each item
    }
  },
  onError: (error) => {
    console.error('Error fetching laptop details:', error);
  }
});

// Update cart item
const { mutate: updateCart } = useMutation({
  mutationFn: async ({ id, cart }) => {
    return await cartService.updateCart(id, cart);
  },
  onSuccess: () => {
    fetchCarts();
  },
  onError: (error) => {
    console.error('Error updating cart:', error);
  }
});

// Delete cart item
const { mutate: deleteCart } = useMutation({
  mutationFn: async (id) => await cartService.deleteCart(id),
  onSuccess: (_, id) => {
    cartItems.value = cartItems.value.filter((item) => item.CAR_ID !== id);
    calculateTotal(); // Recalculate total after deleting an item
    console.log('Delete successfully');
  },
  onError: (error) => {
    console.error('Error deleting cart item:', error);
  }
});

// Delete cart item
const { mutate: deleteAllCarts } = useMutation({
  mutationFn: async () => await cartService.deleteAllCarts(),
  onSuccess: () => {
    total.value = 0;
    fetchCarts();
  },
  onError: (error) => {
    console.error('Error deleting cart item:', error);
  }
});

function decreaseQuantity(cartItem) {
  if (cartItem.CAR_QUANTITY > 1) {
    const updatedItem = { ...cartItem, CAR_QUANTITY: cartItem.CAR_QUANTITY - 1 };

    let formData = new FormData();
    for (let key in updatedItem) {
      if (updatedItem[key] !== undefined) {
        formData.append(key, updatedItem[key]);
      }
    }

    updateCart({
      id: updatedItem.CAR_ID,
      cart: formData
    });

    calculateTotal(); // Update total after decreasing quantity
  }
}

function increaseQuantity(cartItem) {
  const updatedItem = { ...cartItem, CAR_QUANTITY: cartItem.CAR_QUANTITY + 1 };

  let formData = new FormData();
  for (let key in updatedItem) {
    if (updatedItem[key] !== undefined) {
      formData.append(key, updatedItem[key]);
    }
  }

  updateCart({
    id: updatedItem.CAR_ID,
    cart: formData
  });

  calculateTotal(); // Update total after increasing quantity
}

function handlePay() {
  if (confirm('Bạn muốn thanh toán đơn hàng này?')) {
    alert('Đã thanh toán thành công! Cảm ơn quý khách đã mua hàng.');
    deleteAllCarts();
  }
}

function convertPrice(price) {
  const number = parseInt(price, 10);
  const formattedPrice = number.toLocaleString('vi-VN');

  return formattedPrice;
}

// Fetch the cart data when the component is mounted
onMounted(() => {
  if (authentication && authentication.value.logedIn === 1) {
    fetchCarts();
  }
});
</script>

<template>
  <!-- If not logged in -->
  <div
    v-if="authentication.logedIn === 0"
    class="text-center"
  >
    <p>
      Trang này cần bạn đăng nhập trước.
      <span>
        <RouterLink to="/login"><a> Đăng nhập</a></RouterLink>
      </span>
    </p>
  </div>

  <!-- If logged in -->
  <div
    v-if="authentication.logedIn === 1"
    class="d-flex justify-content-center"
  >
    <div class="border border-secondary rounded col-sm-8 p-4">
      <h2>Danh sách Giỏ hàng:</h2>
      <div
        v-if="cartItems.length === 0"
        class="text-center"
      >
        <p>Hiện không có sản phẩm nào trong giỏ hàng</p>
      </div>
      <div
        v-else
        v-for="(cartItem, cartIndex) in cartItems"
        :key="cartIndex"
        class="mb-4"
      >
        <div
          v-if="cartItem.laptop"
          class="row align-items-center shadow-sm p-3"
        >
          <div class="col-3 text-center">
            <img
              :src="cartItem.laptop.L_IMAGE"
              class="img-fluid"
              style="max-width: 180px; max-height: 120px"
              alt="Laptop Image"
            />
          </div>

          <div class="col-3">
            <RouterLink :to="`/laptop/${cartItem.laptop.L_ID}`">
              <h5 class="card-title text-primary">{{ cartItem.laptop.L_NAME }}</h5>
            </RouterLink>
            <div class="text-muted">{{ cartItem.CAR_DATE }}</div>
          </div>

          <div class="col-2 text-danger">
            <h5>{{ convertPrice(cartItem.laptop.L_PRICE * cartItem.CAR_QUANTITY) }} VND</h5>
          </div>

          <div class="col-2 d-flex align-items-center justify-content-center">
            <button
              class="btn btn-sm btn-outline-danger me-2"
              @click="decreaseQuantity(cartItem)"
            >
              -
            </button>
            <span>
              <strong>{{ cartItem.CAR_QUANTITY }}</strong>
            </span>
            <button
              class="btn btn-sm btn-outline-primary ms-2"
              @click="increaseQuantity(cartItem)"
            >
              +
            </button>
          </div>

          <div class="col-2 text-center">
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteCart(cartItem.CAR_ID)"
            >
              Xóa
            </button>
          </div>
        </div>

        <div v-else>
          <p>Loading laptop details...</p>
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h3>
            Tổng tiền: <span style="color: red">{{ convertPrice(total) }} VND</span>
          </h3>
        </div>
        <div v-if="total > 0">
          <button
            type="button"
            class="btn btn-primary btn-lg"
            @click="handlePay"
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
