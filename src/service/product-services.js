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

  // Add Sorting, Pagination and Serching in Product List
  async GetAllData(userInputs) {

    try {
      let { search, startdate, enddate, sortby, sortorder, nextpage, perpage } = userInputs;
      var lodemore = -1

      sortorder = sortorder ?? 1;

      if (!search) { search = '' }
      var searchex = new RegExp(search.replace(/\+/g, ''), 'i');
      var { skip, limit } = await utils.GetPagination(nextpage, perpage);
      var { orderbycolumnname, orderby } = await utils.GetSortByFromRequest(sortby, +sortorder);
      var dateflt = [], fltand = [], fltsearch = [];
      fltand.push({ is_delete: { $ne: 1 } });

      if (startdate != undefined && enddate != undefined) {
        dateflt = { fltdate: { $gte: startdate, $lte: enddate }, };
      } else if (startdate != undefined) {
        dateflt = { fltdate: { $eq: startdate } };
      } else if (enddate != undefined) {
        dateflt = { fltdate: { $eq: enddate } };
      }
      if (searchex.length != 0) {
        fltsearch = {
          $or: [
            { name: searchex },
            { description: searchex },
            { supplier_mobile: searchex },
            { price: searchex },
            { note: searchex },
          ]
        }
        fltand.push(fltsearch);
      }
      if (dateflt.length != 0) {
        fltand.push(dateflt);
      }

      const pipeline = [
        {
          $sort: {
            sortby: +sortorder,
          },
        },
        {
          $addFields: {
            fltdate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "Asia/Kolkata",
              },
            },
          },
        },
        { $match: { $and: fltand }, },
        { $sort: { [orderbycolumnname]: orderby } },
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
          }
        },
        { $skip: skip },
        { $limit: limit },
      ];

      const find = await this.repository.GetPipelineData(pipeline);

      if (find) {
        if (find.length < limit) {
          lodemore = 0
        }
        find.lodemore = lodemore;

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