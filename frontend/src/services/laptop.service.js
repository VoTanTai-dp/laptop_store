import { DEFAULT_AVATAR } from '@/constants';

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

function makeLaptopsService() {
  const baseUrl = '/api/v1/laptops';

  async function fetchLaptops(page, limit = 12) {
    let url = `${baseUrl}?page=${page}&limit=${limit}`;
    const data = await efetch(url);
    data.laptops = data.laptops.map((laptop) => {
      return {
        ...laptop,
        L_IMAGE: laptop.L_IMAGE ?? DEFAULT_AVATAR
      };
    });
    return data;
  }

  async function fetchLaptop(id) {
    const response = await efetch(`${baseUrl}/${id}`);
    const { laptop } = response;
    return {
      ...laptop,
      L_IMAGE: laptop.L_IMAGE ?? DEFAULT_AVATAR
    };
  }

  async function createLaptop(laptop) {
    return efetch('/api/v1/laptops', {
      method: 'POST',
      body: laptop
    });
  }

  async function updateLaptop(id, laptop) {
    return efetch(`/api/v1/laptops/${id}`, {
      method: 'PUT',
      body: laptop
    });
  }

  async function deleteAllLaptops() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  async function deleteLaptop(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  return {
    fetchLaptops,
    fetchLaptop,
    createLaptop,
    updateLaptop,
    deleteLaptop,
    deleteAllLaptops
  };
}

export default makeLaptopsService();
