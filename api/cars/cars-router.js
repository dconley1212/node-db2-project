// DO YOUR MAGIC
const express = require("express");
const dbConfig = require("../../data/db-config");
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Cars.getAll()
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch(next);
});

router.get("/:id", checkCarId, (req, res, next) => {
  res.status(200).json(req.body);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
