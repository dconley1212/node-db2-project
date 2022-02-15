const { OPEN_READWRITE } = require("sqlite3");
const { getAll } = require("./cars-model");

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next({ status: 404, message: `car with id ${id} is not found` });
  } else {
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: `${vin} is missing` });
  } else if (!make) {
    next({ status: 400, message: `${make} is missing` });
  } else if (!model) {
    next({ status: 400, message: `${model} is missing` });
  } else if (!mileage) {
    next({ status: 400, message: `${mileage} is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (typeof vin !== "string") {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const cars = await getAll();
    cars.forEach((car) => {
      if (car.vin === vin) {
        next({ status: 400, message: `vin ${vin} already exists` });
      } else {
        next();
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
