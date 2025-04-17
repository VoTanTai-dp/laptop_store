const knex = require("../database/knex");
const Paginator = require("./paginator");

function cartRepository() {
  return knex("carts");
}

function readCart(payload) {
  return {
    CAR_ID: payload.CAR_ID,
    C_ID: payload.C_ID,
    L_ID: payload.L_ID,
    CAR_DATE: payload.CAR_DATE,
    CAR_QUANTITY: payload.CAR_QUANTITY,
  };
}

// Define functions for accessing the database
async function createCart(payload) {
  const cart = readCart(payload);
  const [id] = await cartRepository().insert(cart);
  return { id, ...cart };
}

async function getManyCarts(query) {
  const { C_ID, L_ID, CAR_DATE, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await cartRepository()
    .where((builder) => {
      if (C_ID) {
        builder.where("C_ID", `%${C_ID}%`);
      }
      if (L_ID) {
        builder.where("L_ID", `%${L_ID}%`);
      }
      if (CAR_DATE) {
        builder.where("CAR_DATE", "like", `%${CAR_DATE}%`);
      }
    })
    .select(
      knex.raw("count(CAR_ID) OVER() AS recordCount"),
      "CAR_ID",
      "C_ID",
      "L_ID",
      "CAR_DATE",
      "CAR_QUANTITY"
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
    carts: results,
  };
}

async function getCartsById(id) {
  return cartRepository().where("CAR_ID", id).select("*").first();
}

async function updateCart(id, payload) {
  const updatedCart = await cartRepository()
    .where("CAR_ID", id)
    .select("*")
    .first();

  if (!updatedCart) {
    return null;
  }

  const update = readCart(payload);

  await cartRepository().where("CAR_ID", id).update(update);

  return { ...updatedCart, ...update };
}

async function deleteCart(id) {
  const deletedCart = await cartRepository()
    .where("CAR_ID", id)
    .select("*")
    .first();

  if (!deletedCart) {
    return null;
  }

  await cartRepository().where("CAR_ID", id).del();

  return deletedCart;
}

async function deleteAllCarts() {
  await cartRepository().del();
}

module.exports = {
  // Export defined functions
  createCart,
  getManyCarts,
  getCartsById,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
