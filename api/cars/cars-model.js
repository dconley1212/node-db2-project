const dbConfig = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return dbConfig("cars");
};

const getById = async (id) => {
  // DO YOUR MAGIC
  const carById = await dbConfig("cars").where("id", id).first();

  return carById;
};

const getByVin = async (vin) => {
  const selectedVin = await dbConfig("cars").where("vin", vin).first();

  return selectedVin;
};

const create = async (car) => {
  // DO YOUR MAGIC
  const newPost = await dbConfig("cars").insert(car);
  const getNewPost = await getById(newPost);
  return getNewPost;
};

module.exports = {
  getAll,
  getByVin,
  getById,
  create,
};
