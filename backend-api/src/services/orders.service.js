const knex = require("../database/knex");
const Paginator = require("./paginator");

function orderRepository() {
  return knex("orders");
}

function readOrder(payload) {
  return {
    O_ID: payload.O_ID,
    O_DATE: payload.O_DATE,
    O_TOTAL: payload.O_TOTAL,
    O_SHIPPING_ADDRESS: payload.O_SHIPPING_ADDRESS,
  };
}

// Define functions for accessing the database
async function createOrder(payload) {
  const order = readOrder(payload);
  const [id] = await orderRepository().insert(order);
  return { id, ...order };
}

async function getManyOrders(query) {
  const { O_ID, O_DATE, page = 1, limit = 5 } = query;
  const paginator = new Paginator(page, limit);

  let results = await orderRepository()
    .where((builder) => {
      if (O_ID) {
        builder.where("O_ID", `%${O_ID}%`);
      }
      if (O_DATE) {
        builder.where("O_DATE", `%${O_DATE}%`);
      }
    })
    .select(
      knex.raw("count(O_ID) OVER() AS recordCount"),
      "O_ID",
      "O_DATE",
      "O_TOTAL",
      "O_SHIPPING_ADDRESS"
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
    orders: results,
  };
}

async function getOrdersById(id) {
  return orderRepository().where("O_ID", id).select("*").first();
}

async function updateOrder(id, payload) {
  const updatedOrder = await orderRepository()
    .where("O_ID", id)
    .select("*")
    .first();

  if (!updatedOrder) {
    return null;
  }

  const update = readOrder(payload);

  await orderRepository().where("O_ID", id).update(update);

  return { ...updatedOrder, ...update };
}

async function deleteOrder(id) {
  const deletedOrder = await orderRepository()
    .where("O_ID", id)
    .select("*")
    .first();

  if (!deletedOrder) {
    return null;
  }

  await orderRepository().where("O_ID", id).del();

  return deletedOrder;
}

async function deleteAllOrders() {
  await orderRepository().del();
}

module.exports = {
  // Export defined functions
  createOrder,
  getManyOrders,
  getOrdersById,
  updateOrder,
  deleteOrder,
  deleteAllOrders,
};
