const { validationResult } = require("express-validator");
const { CreateProductValidator, UpdateProductValidator, List } = require("../route/product-validator");
const ProductService = require("../service/product-services");
const utils = require('../utils')
const { UserAuth } = require('./middlewares/auth.js');

module.exports = (app) => {
  const service = new ProductService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  // Product Create
  app.post("/productcreate", UserAuth, CreateProductValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.ProductCreate(req.body);
        console.log(apiresponse);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  // Product List
  app.get("/product", UserAuth, List, async (req, res, next) => {
    const errors = validationResult(req);
    var lodemore = 0

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        const apires = await service.GetAllData(req.body);
        lodemore = apires.data.lodemore

        apiresponse.data = apires.data
        apiresponse.message = apires.message;
        apiresponse.apistatus = apires.apistatus;
        statuscode = apires.statuscode;
      }

      var response = await utils.GetApiResponse(apiresponse);

      return res.status(apiresponse.statuscode).json(response);

    } catch (err) {
      console.log(err);
      res.json(err)
      next(err);
    }
  });

  // Product Update
  app.put("/productupdate", UserAuth, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.ProductUpdate(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

};
