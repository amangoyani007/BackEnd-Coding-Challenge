const { validationResult } = require("express-validator");
const { CreateUserValidator, UpdateUserValidator, List } = require("../route/user-validator.js");
const UserService = require("../service/user-service");
const utils = require('../utils')
const { UserAuth, SuperUserAuth } = require('./middlewares/auth.js');

module.exports = (app) => {
  const service = new UserService();
  let apiresponse = { statuscode: 400, message: "Bad Request", data: [], apistatus: false };

  // User Create
  app.post("/usercreate", CreateUserValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.UserCreate(req.body);
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

  // User List
  app.get("/user", List, SuperUserAuth, async (req, res, next) => {
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

  // User Update
  app.put("/userupdate", UserAuth, UpdateUserValidator, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.UserUpdate(req.body);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

  // Delete User
  app.delete("/userdelete/:id", SuperUserAuth, async (req, res, next) => {
    const errors = validationResult(req);

    try {
      if (!errors.isEmpty()) {
        apiresponse.message = await utils.ResponseMessage("requirederror");
        apiresponse.data = errors.array();
        apiresponse.statuscode = 400
        console.log(errors);
      }
      else {
        apiresponse = await service.UserDelete(req.params.id);
      }
      var response = await utils.GetApiResponse(apiresponse);
      return res.status(apiresponse.statuscode).json(response);
    } catch (err) {
      res.status(200).json(err);
    }
  });

};
