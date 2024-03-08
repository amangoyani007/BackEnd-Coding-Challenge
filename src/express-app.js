const express = require("express");
const cors = require("cors");

const { SENTRY_URL } = require("./config");
const {
  product,

} = require("./api");
module.exports = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(cors());
  app.use(express.static(__dirname + "/public"));

  product(app);

};
