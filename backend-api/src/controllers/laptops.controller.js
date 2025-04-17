const laptopsService = require("../services/laptops.service");
const ApiError = require("../api-error");
const JSend = require("../jsend");

async function createLaptop(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to update can not be empty`));
  }

  try {
    const laptop = await laptopsService.createLaptop({
      ...req.body,
      L_IMAGE: req.file ? `/public/uploads/${req.file.filename}` : null,
    });
    return res
      .status(201)
      .set({
        Location: `${req.baseUrl}/${laptop.id}`,
      })
      .json(
        JSend.success({
          laptop,
        })
      );
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the laptop")
    );
  }
}

async function getLaptopsByFilter(req, res, next) {
  let result = {
    laptops: [],
    metadata: { totalRecords: 0, firstPage: 1, lastPage: 1, page: 1, limit: 5 },
  };

  try {
    result = await laptopsService.getManyLaptops(req.query);
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, "An error occured while retrieving laptops"));
  }

  return res.json(
    JSend.success({ laptops: result.laptops, metadata: result.metadata })
  );
}

async function getLaptop(req, res, next) {
  const { id } = req.params;

  try {
    const laptop = await laptopsService.getLaptopsById(id);
    if (!laptop) {
      return next(new ApiError(404, "Laptop not found"));
    }
    return res.json(JSend.success({ laptop }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error retrieving laptop with id: ${id}`));
  }
}

async function updateLaptop(req, res, next) {
  if (Object.keys(req.body).length === 0 && !req.file) {
    return next(new ApiError(400, `Data to update can not be empty`));
  }

  const { id } = req.params;

  try {
    const updated = await laptopsService.updateLaptop(id, {
      ...req.body,
      image: req.file ? `/public/uploads/${req.file.filename}` : null,
    });

    if (!updated) {
      return next(new ApiError(404, `Laptop not found`));
    }

    return res.json(JSend.success({ laptop: updated }));
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error updating laptop with id: ${id}`));
  }
}

async function deleteLaptop(req, res, next) {
  const { id } = req.params;

  try {
    const deleted = laptopsService.deleteLaptop(id);

    if (!deleted) {
      return next(new ApiError(404, `Laptop not found`));
    }

    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(new ApiError(500, `Error deleting laptop with id: ${id}`));
  }
}

async function deleteAllLaptops(req, res, next) {
  try {
    await laptopsService.deleteAllLaptops();
    return res.json(JSend.success());
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `An error occurred while removing all laptops`)
    );
  }
}

module.exports = {
  getLaptopsByFilter,
  deleteAllLaptops,
  getLaptop,
  createLaptop,
  updateLaptop,
  deleteLaptop,
};
