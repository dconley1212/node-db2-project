const { OPEN_READWRITE } = require("sqlite3");
const { getByVin, getById } = require("./cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const carById = await getById(id);
    if (carById) {
      req.body = carById;
      next();
    } else {
      next({ status: 404, message: `car with id ${id} is not found` });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin) {
    next({ status: 400, message: "vin is missing" });
  } else if (!make) {
    next({ status: 400, message: "make is missing" });
  } else if (!model) {
    next({ status: 400, message: "model is missing" });
  } else if (!mileage) {
    next({ status: 400, message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const isValidVin = await vinValidator.validate(vin);
    if (isValidVin === true) {
      next();
    } else {
      next({ status: 400, message: `vin ${vin} is invalid` });
    }
  } catch (err) {
    next(err);
  }

  // if (typeof vin === "string") {
  //   next();
  // } else {
  //   next({ status: 400, message: `vin ${vin} is invalid` });
  // }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const carByVin = await getByVin(vin);
    if (carByVin) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
