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

  // Add Sorting, Pagination and Serching in Cart List
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
            { username: searchex },
            { "product.name": searchex },
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
            username: 1,
            userid: 1,
            product: 1,
            note: 1,
            totalprice: 1,
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