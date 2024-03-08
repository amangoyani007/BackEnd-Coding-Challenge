const { validationResult } = require("express-validator");
const { CreateUserValidator, UpdateUserValidator } = require("../route/user-validator.js");
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
  app.get("/user", SuperUserAuth, async (req, res, next) => {
    const errors = validationResult(req);

    try {

      apiresponse = await service.GetAllData(req.body);
      // console.log(apiresponse);

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
