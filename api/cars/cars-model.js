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

const create = async (id, car) => {
  // DO YOUR MAGIC
  const createNewPost = await dbConfig("cars").insert(car);
  const newPost = await getById(createNewPost);
  return newPost;
};

module.exports = {
  getAll,
  getById,
  create,
};
