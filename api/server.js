const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const carsRouter = require("./cars/cars-router");
const server = express();

// DO YOUR MAGIC
server.use(express.json());
server.use(cors());
server.use(morgan("tiny"));
server.use("/api/cars", carsRouter);

module.exports = server;
