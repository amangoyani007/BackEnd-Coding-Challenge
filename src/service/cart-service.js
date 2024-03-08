const { response } = require("express");
const { CartRepository } = require("../database");
const { ObjectId } = require('mongodb');
const utils = require('../utils')

// All Business logic will be here
class CartService {

  constructor() {
    this.repository = new CartRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async CartCreate(userInputs) {
    try {
      const { userid } = userInputs;
      const pipeline = [{
        $match: {
          userid: userid,
        },
      }];
      const existingCart = await this.repository.GetPipelineData(pipeline);

      if ((existingCart.length == 0)) {
        const response = await this.repository.CartCreate(userInputs);
        var successmsg = await utils.ResponseMessage("datainsert");
        var errormsg = await utils.ResponseMessage("nodatainsert");
        var apires = await utils.FormateData(response, successmsg, errormsg);
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

  async CartUpdate(userInputs) {

    try {

      const { id } = userInputs;
      const pipeline = [{
        $match: {
          _id: new ObjectId(id),
        },
      }];
      const existingCart = await this.repository.GetPipelineData(pipeline);

      if ((existingCart.length != 0)) {
        const response = await this.repository.CartUpdate(userInputs);
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

  async GetAllData(userInputs) {

    try {

      const pipeline = [
        {
          $project: {
            _id: 0,
            id: "$_id",
            username: 1,
            userid: 1,
            product: 1,
            note: 1,
            totalprice: 1,
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

  async CartDelete(id) {

    try {

      const pipeline = [{
        $match: {
          _id: new ObjectId(id),
        },
      }];
      const existingCart = await this.repository.GetPipelineData(pipeline);

      if ((existingCart.length != 0)) {
        const response = await this.repository.CartDelete(id);
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

module.exports = CartService;