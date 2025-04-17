const knex = require("../database/knex");
const Paginator = require("./paginator");

function customerRepository() {
  return knex("customers");
}

function readCustomer(payload) {
  return {
    C_ID: payload.C_ID,
    C_NAME: payload.C_NAME,
    C_EMAIL: payload.C_EMAIL,
    C_PASSWORD: payload.C_PASSWORD,
    C_PHONE: payload.C_PHONE,
    C_ROLE: payload.C_ROLE,
  };
}

// Define functions for accessing the database
async function createCustomer(payload) {
  const customer = readCustomer(payload);
  const [id] = await customerRepository().insert(customer);
  return { id, ...customer };
}

async function getManyCustomers(query) {
  const { C_NAME, C_EMAIL, C_PHONE, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await customerRepository()
    .where((builder) => {
      if (C_NAME) {
        builder.where("C_NAME", "like", `%${C_NAME}%`);
      }
      if (C_EMAIL) {
        builder.where("C_EMAIL", "like", `%${C_EMAIL}%`);
      }
      if (C_PHONE) {
        builder.where("C_PHONE", "like", `%${C_PHONE}%`);
      }
    })
    .select(
      knex.raw("count(C_ID) OVER() AS recordCount"),
      "C_ID",
      "C_NAME",
      "C_EMAIL",
      "C_PASSWORD",
      "C_PHONE",
      "C_ROLE"
    )
    .limit(paginator.limit)
    .offset(paginator.offset);

  let totalRecords = 0;
  results = results.map((result) => {
    totalRecords = result.recordCount;
    delete result.recordCount;
    return result;
  });

  return {
    metadata: paginator.getMetadata(totalRecords),
    customers: results,
  };
}

async function getCustomersById(id) {
  return customerRepository().where("C_ID", id).select("*").first();
}

async function updateCustomer(id, payload) {
  const updatedCustomer = await customerRepository()
    .where("C_ID", id)
    .select("*")
    .first();

  if (!updatedCustomer) {
    return null;
  }

  const update = readCustomer(payload);

  await customerRepository().where("C_ID", id).update(update);

  return { ...updatedCustomer, ...update };
}

async function deleteCustomer(id) {
  const deletedCustomer = await customerRepository()
    .where("C_ID", id)
    .select("*")
    .first();

  if (!deletedCustomer) {
    return null;
  }

  await customerRepository().where("C_ID", id).del();

  return deletedCustomer;
}

async function deleteAllCustomers() {
  await customerRepository().del();
}

module.exports = {
  // Export defined functions
  createCustomer,
  getManyCustomers,
  getCustomersById,
  updateCustomer,
  deleteCustomer,
  deleteAllCustomers,
};
