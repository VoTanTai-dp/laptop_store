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

function makeCustomersService() {
  const baseUrl = '/api/v1/customers';

  async function fetchCustomers() {
    let url = `${baseUrl}`;
    const data = await efetch(url);
    data.customers = data.customers.map((customer) => {
      return {
        ...customer
      };
    });
    return data;
  }

  async function fetchCustomer(id) {
    const { customer } = await efetch(`${baseUrl}/${id}`);
    return {
      ...customer
    };
  }

  async function createCustomer(customer) {
    return efetch('/api/v1/customers', {
      method: 'POST',
      body: customer
    });
  }

  async function deleteAllCustomers() {
    return efetch(baseUrl, {
      method: 'DELETE'
    });
  }

  async function updateCustomer(id, customer) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'PUT',
      body: customer
    });
  }

  async function deleteCustomer(id) {
    return efetch(`${baseUrl}/${id}`, {
      method: 'DELETE'
    });
  }

  return {
    fetchCustomers,
    fetchCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomers
  };
}

export default makeCustomersService();
