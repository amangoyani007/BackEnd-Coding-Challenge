const { response } = require("express");
const { ProductRepository } = require("../database");
const { ObjectId } = require('mongodb');
const utils = require('../utils')

// All Business logic will be here
class ProductService {

  constructor() {
    this.repository = new ProductRepository();
    this.resdata = {
      message: 'invalid Request',
      apistatus: false,
      statuscode: 400
    };
  }

  async ProductCreate(userInputs) {
    try {
      const { name, supplier_mobile } = userInputs;
      const pipeline = [{
        $match: {
          name: name,
          supplier_mobile
        },
      }];
      const existingProduct = await this.repository.GetPipelineData(pipeline);

      if ((existingProduct.length == 0)) {
        const response = await this.repository.ProductCreate(userInputs);
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

  async ProductUpdate(userInputs) {

    try {

      const { id } = userInputs;
      const pipeline = [{
        $match: {
          _id: new ObjectId(id),
        },
      }];
      const existingProduct = await this.repository.GetPipelineData(pipeline);

      if ((existingProduct.length != 0)) {
        const response = await this.repository.ProductUpdate(userInputs);
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
            name: 1,
            description: 1,
            supplier_mobile: 1,
            img: 1,
            type: 1,
            price: 1,
            quantity_available: 1,
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

}

module.exports = ProductService;