// DO YOUR MAGIC
const express = require("express");
// const db = require("../../data/db-config");
const server = require("../server");

const router = express.Router();

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
