const ordersService = require("../services/orders.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createOrder(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to update can not be empty`));
  }

  try {
    const order = await ordersService.createOrder({ ...req.body });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${order.id}`,
      })
      .json(
        JSend.success({
          order,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the order")
    );
  }
}

async function getOrdersByFilter(req, res, next) {
  let result = {
    orders: [],
    metadata: { totalRecords: 0, firstPage: 1, lastPage: 1, page: 1, limit: 5 },
  };

  try {
    result = await ordersService.getManyOrders(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occured while retrieving orders"));
  }

  return res.json(
    JSend.success({ orders: result.orders, metadata: result.metadata })
  );
}

async function getOrder(req, res, next) {
  const { id } = req.params;

  try {
    const order = await ordersService.getOrdersById(id);
    if (!order) {
      return next(new ApiError(404, "Order not found"));
    }
    return res.json(JSend.success({ order }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving order with id: ${id}`));
  }
}

async function updateOrder(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to update can not be empty`));
  }

  const { id } = req.params;

  try {
    const updated = await ordersService.updateOrder(id, { ...req.body });

    if (!updated) {
      return next(new ApiError(404, `Order not found`));
    }

    return res.json(JSend.success({ order: updated }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating order with id: ${id}`));
  }
}

async function deleteOrder(req, res, next) {
  const { id } = req.params;

  try {
    const deleted = ordersService.deleteOrder(id);

    if (!deleted) {
      return next(new ApiError(404, `Order not found`));
    }

    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error deleting order with id: ${id}`));
  }
}

async function deleteAllOrders(req, res, next) {
  try {
    await ordersService.deleteAllOrders();
    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all orders`)
    );
  }
}

module.exports = {
  getOrdersByFilter,
  deleteAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
