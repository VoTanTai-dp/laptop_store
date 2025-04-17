const customersService = require("../services/customers.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createCustomer(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to create can not be empty`));
  }

  try {
    const customer = await customersService.createCustomer({ ...req.body });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${customer.id}`,
      })
      .json(
        JSend.success({
          customer,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the customer")
    );
  }
}

async function getCustomersByFilter(req, res, next) {
  let result = {
    customers: [],
    metadata: { totalRecords: 0, firstPage: 1, lastPage: 1, page: 1, limit: 5 },
  };

  try {
    result = await customersService.getManyCustomers(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while retrieving customers")
    );
  }

  return res.json(
    JSend.success({ customers: result.customers, metadata: result.metadata })
  );
}

async function getCustomer(req, res, next) {
  const { id } = req.params;

  try {
    const customer = await customersService.getCustomersById(id);
    if (!customer) {
      return next(new ApiError(404, "Customer not found"));
    }
    return res.json(JSend.success({ customer }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving customer with id: ${id}`));
  }
}

async function updateCustomer(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to update can not be empty`));
  }

  const { id } = req.params;

  try {
    const updated = await customersService.updateCustomer(id, { ...req.body });

    if (!updated) {
      return next(new ApiError(404, `Customer not found`));
    }

    return res.json(JSend.success({ customer: updated }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating customer with id: ${id}`));
  }
}

async function deleteCustomer(req, res, next) {
  const { id } = req.params;

  try {
    const deleted = await customersService.deleteCustomer(id);
    if (!deleted) {
      return next(new ApiError(404, `Customer not found`));
    }

    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error deleting customer with id: ${id}`));
  }
}

async function deleteAllCustomers(req, res, next) {
  try {
    await customersService.deleteAllCustomers();
    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all customers`)
    );
  }
}

module.exports = {
  getCustomersByFilter,
  deleteAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
