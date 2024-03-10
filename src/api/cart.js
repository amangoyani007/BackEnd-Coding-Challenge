const { validationResult } = require("express-validator");
const { CreateCartValidator, UpdateCartValidator, List } = require("../route/cart-validator");
const CartService = require("../service/cart-service");
const utils = require('../utils')
const { UserAuth } = require('./middlewares/auth.js');

module.exports = (app) => {
  const service = new CartService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  // Cart Create
  app.post("/cartcreate", UserAuth, CreateCartValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.CartCreate(req.body);
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

  // Cart List
  app.get("/cart", List, UserAuth, async (req, res, next) => {
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

  // Cart Update
  app.put("/cartupdate", UserAuth, UpdateCartValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.CartUpdate(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  // Delete Cart
  app.delete("/cartdelete/:id", UserAuth, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.CartDelete(req.params.id);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

};
