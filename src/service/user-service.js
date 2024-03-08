const { response } = require("express");
const { UserRepository } = require("../database");
const { ObjectId } = require('mongodb');
const utils = require('../utils')

// All Business logic will be here
class UserService {

  constructor() {
    this.repository = new UserRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async UserCreate(userInputs) {
    try {
      const { email, password, is_admin } = userInputs;
      const pipeline = [{
        $match: {
          email: email,
          password: password
        },
      }];
      const existingUser = await this.repository.GetPipelineData(pipeline);

      if ((existingUser.length == 0)) {
        const response = await this.repository.UserCreate(userInputs);

        let tokenArr = {
          email: response.email,
          password: response.password,
        }
        var jwtToken = await utils.GenerateSignature(tokenArr, is_admin);

        var successmsg = await utils.ResponseMessage("datainsert");
        var errormsg = await utils.ResponseMessage("nodatainsert");
        var apires = await utils.FormateData({response: response, jwtToken: jwtToken}, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("dataexist");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async UserUpdate(userInputs) {

    try {

      const { id } = userInputs;
      const pipeline = [{
        $match: {
          _id: new ObjectId(id),
        },
      }];
      const existingUser = await this.repository.GetPipelineData(pipeline);

      if ((existingUser.length != 0)) {
        const response = await this.repository.UserUpdate(userInputs);
        var successmsg = await utils.ResponseMessage("dataupdate");
        var errormsg = await utils.ResponseMessage("nodataupdate");
        var apires = await utils.FormateData(response, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("nodatafound");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

  async GetAllData() {

    try {

      const pipeline = [
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
            username: 1,
            email: 1,
            password: 1,
            mobile: 1,
            address: 1,
            order_history: 1,
            is_admin: 1,
            note: 1,
            lastupdate: "$updatedAt"
          },
        },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {
        var successmsg = await utils.ResponseMessage("datafound");
        var errormsg = await utils.ResponseMessage("nodatafound");
        var apires = await utils.FormateData(find, successmsg, errormsg);
        return apires;
      }
      return [];
    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }
  }

  async UserDelete(id) {

    try {

      const pipeline = [{
        $match: {
          _id: new ObjectId(id),
        },
      }];
      const existingUser = await this.repository.GetPipelineData(pipeline);

      if ((existingUser.length != 0)) {
        const response = await this.repository.UserDelete(id);
        var successmsg = await utils.ResponseMessage("datadeleted");
        var errormsg = await utils.ResponseMessage("nodatadeleted");
        var apires = await utils.FormateData(response, successmsg, errormsg);
        return apires;
      }
      else {
        this.resdata.message = await utils.ResponseMessage("nodatafound");
        this.resdata.statuscode = 409;
        this.resdata.data = [];
      }
      return this.resdata;

    } catch (err) {
      console.log({ error: err });
      return ({ error: err });
    }

  }

}

module.exports = UserService;