/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns Promise<Response>
 */
async function efetch(url, options = {}) {
  let result = {};
  let json = {};
  try {
    result = await fetch(url, options);
    json = await result.json();
  } catch (error) {
    throw new Error(error.message);
  }
  if (!result.ok || json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
}

function makeCartsService() {
  const baseUrl = '/api/v1/carts';

  async function fetchCarts() {
    let url = `${baseUrl}`;
    const data = await efetch(url);
    data.carts = data.carts.map((cart) => {
      return {
        ...cart
      };
    });
    return data;
  }

  async function fetchCart(id) {
    const { cart } = await efetch(`${baseUrl}/${id}`);
    return {
      ...cart
    };
  }

  async function createCart(cart) {
    return efetch('/api/v1/carts', {
      method: 'POST',
      body: cart
    });
  }

  async function deleteAllCarts() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  async function updateCart(id, cart) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      body: cart
    });
  }

  async function deleteCart(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  return {
    fetchCarts,
    fetchCart,
    createCart,
    updateCart,
    deleteCart,
    deleteAllCarts
  };
}

export default makeCartsService();
