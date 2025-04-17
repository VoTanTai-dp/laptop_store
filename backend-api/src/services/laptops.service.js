const knex = require("../database/knex");
const Paginator = require("./paginator");
const { unlink } = require("node:fs");

function laptopRepository() {
  return knex("laptops");
}

function readLaptop(payload) {
  return {
    L_BRAND: payload.L_BRAND,
    L_NAME: payload.L_NAME,
    L_MODEL: payload.L_MODEL,
    L_PRICE: payload.L_PRICE,
    L_CPU: payload.L_CPU,
    L_RAM: payload.L_RAM,
    L_STORAGE: payload.L_STORAGE,
    L_GPU: payload.L_GPU,
    L_SCREEN_SIZE: payload.L_SCREEN_SIZE,
    L_WEIGHT: payload.L_WEIGHT,
    L_DESCRIPTION: payload.L_DESCRIPTION,
    L_IMAGE: payload.L_IMAGE,
    L_QUANTITY: payload.L_QUANTITY,
  };
}

// Define functions for accessing the database
async function createLaptop(payload) {
  const laptop = readLaptop(payload);
  const [id] = await laptopRepository().insert(laptop);
  return { id, ...laptop };
}

async function getManyLaptops(query) {
  const {
    L_NAME,
    L_MODEL,
    L_CPU,
    L_RAM,
    L_STORAGE,
    L_GPU,
    L_SCREEN_SIZE,
    L_WEIGHT,
    page = 1,
    limit = 5,
  } = query;
  const paginator = new Paginator(page, limit);

  let results = await laptopRepository()
    .where((builder) => {
      if (L_NAME) {
        builder.where("L_NAME", "like", `%${L_NAME}%`);
      }
      if (L_MODEL) {
        builder.where("L_MODEL", "like", `%${L_MODEL}%`);
      }
      if (L_CPU) {
        builder.where("L_CPU", "like", `%${L_CPU}%`);
      }
      if (L_RAM) {
        builder.where("L_RAM", "like", `%${L_RAM}%`);
      }
      if (L_STORAGE) {
        builder.where("L_STORAGE", "like", `%${L_STORAGE}%`);
      }
      if (L_GPU) {
        builder.where("L_GPU", "like", `%${L_GPU}%`);
      }
      if (L_SCREEN_SIZE) {
        builder.where("L_SCREEN_SIZE", "like", `%${L_SCREEN_SIZE}%`);
      }
      if (L_WEIGHT) {
        builder.where("L_WEIGHT", `%${L_WEIGHT}%`);
      }
    })
    .select(
      knex.raw("count(L_ID) OVER() AS recordCount"),
      "L_ID",
      "L_BRAND",
      "L_NAME",
      "L_MODEL",
      "L_PRICE",
      "L_CPU",
      "L_RAM",
      "L_STORAGE",
      "L_GPU",
      "L_SCREEN_SIZE",
      "L_WEIGHT",
      "L_DESCRIPTION",
      "L_IMAGE",
      "L_QUANTITY"
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
    laptops: results,
  };
}

async function getLaptopsById(id) {
  return laptopRepository().where("L_ID", id).select("*").first();
}

async function updateLaptop(id, payload) {
  const updatedLaptop = await laptopRepository()
    .where("L_ID", id)
    .select("*")
    .first();

  if (!updatedLaptop) {
    return null;
  }

  const update = readLaptop(payload);
  if (!update.L_IMAGE) {
    delete update.L_IMAGE;
  }

  await laptopRepository().where("L_ID", id).update(update);

  if (
    update.L_IMAGE &&
    updatedLaptop.L_IMAGE &&
    update.L_IMAGE !== updatedLaptop.L_IMAGE &&
    updatedLaptop.L_IMAGE.startsWith("/public/uploads")
  ) {
    unlink(`.${updatedLaptop.L_IMAGE}`, (err) => {});
  }

  return { ...updatedLaptop, ...update };
}

async function deleteLaptop(id) {
  const deletedLaptop = await laptopRepository()
    .where("L_ID", id)
    .select("L_IMAGE")
    .first();

  if (!deletedLaptop) {
    return null;
  }

  await laptopRepository().where("L_ID", id).del();

  if (
    deletedLaptop.L_IMAGE &&
    deletedLaptop.L_IMAGE.startsWith("/public/uploads")
  ) {
    unlink(`.${deletedLaptop.L_IMAGE}`, (err) => {});
  }

  return deletedLaptop;
}

async function deleteAllLaptops() {
  const laptops = await laptopRepository().select("L_IMAGE");
  await laptopRepository().del();

  laptops.forEach((laptop) => {
    if (laptop.L_IMAGE && laptop.L_IMAGE.startsWith("/public/uploads")) {
      unlink(`.${laptop.L_IMAGE}`, (err) => {});
    }
  });
}

module.exports = {
  // Export defined functions
  createLaptop,
  getManyLaptops,
  getLaptopsById,
  updateLaptop,
  deleteLaptop,
  deleteAllLaptops,
};
