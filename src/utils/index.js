const jwt = require("jsonwebtoken");
const {
  APP_SECRET_SUPER_USER,
  APP_SECRET
} = require("../config");


// Function for Formate at service level
module.exports.FormateData = async (data, successmsg = '', errormsg = '', custmsg = '', limit) => {
  let res = {};
  if (data.length != 0 && (!data.error)) {
    res.message = await this.ResponseMessage("success");
    res.data = data;
    if (limit) {
      res.loadmore = (data.length < limit) ? 0 : 1;
    }
    res.apistatus = true;
    res.statuscode = 200;
    if (successmsg != '') {
      res.message = successmsg;
    }
  } else if (data.error) {
    res.message = await this.ResponseMessage("error");
    res.data = [];
    res.apistatus = false;
    res.statuscode = 404;
  } else {
    res.message = await this.ResponseMessage("failed");
    res.data = [];
    res.apistatus = false;
    res.statuscode = 200;
    if (errormsg != '') {
      res.message = errormsg;
    }
  }
  if (custmsg != '') {
    res.message = custmsg;
  }
  return res;
};

// Function for Formate at API Response
module.exports.GetApiResponse = async (
  { data, message = "", statuscode = 200, apistatus = true }) => {
  try {
    if (data.length == 0) {
      var data = {
        success: apistatus,
        message: "Data Not found",
        data: [],
      };
    } else {
      var data = {
        success: apistatus,
        message: "Data Get Succesfully",
        data: data,
      };
    }
    if (message != "") data["message"] = message;
    if (statuscode != 200) data["success"] = apistatus;
    return await data;
  } catch (error) {
    return error;
  }
};

module.exports.ResponseMessage = (message_type) => {
  try {
    const messages = {
      datafound: "Data Found",
      datainsert: "Data Inserted",
      dataupdate: "Data Updated",
      dataexist: "Data Exist",
      nodatafound: "No Data Found",
      requirederror: "Please Fill all Required Field",
      nodataupdate: "No Data Updated",
      nodatainsert: "Data not Inserted Successfuly",
      datapresent: "Already present in database",
      error: "Something went wrong",
      success: "Data found",
      datadeleted: "Data deleted sucessfully",
      nodatadeleted: "Delete Opration failed"
    };
    return messages[message_type];
  } catch (error) {
    return error;
  }
};

// Token Validation for User
module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    var payload = jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {

    try {
      const signature = req.get("Authorization");
      var payload = jwt.verify(signature.split(" ")[1], APP_SECRET_SUPER_USER);
      return true;

    } catch (error) {

      return false;
    }
  }
};

// Token Validation for Admin
module.exports.ValidateSignatureOVsuperUser = async (req) => {
  try {
    const signature = req.get("Authorization");
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET_SUPER_USER);
    req.user = payload;
    return true;
  } catch (error) {
    return false;
  }
};

// JWT Token Create
module.exports.GenerateSignature = async (payload, adminkey) => {
  try {
    if (adminkey == 1) {
      return await jwt.sign(payload, APP_SECRET_SUPER_USER, { expiresIn: "30d" });
    }
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.GetPagination = async (page, size) => {
  if (page == undefined || page == "") {
    page = 1;
  } else {
    page = parseInt(page);
  }
  if (size == undefined || size == "") {
    size = 25;
  } else {
    size = parseInt(size);
  }
  skip = size * (page - 1);
  limit = size;
  return { limit, skip };
};

module.exports.GetSortByFromRequest = async (orderbycolumnname, orderby) => {
  try {
    if (orderbycolumnname != undefined && orderby != undefined && orderbycolumnname != "" && orderby != "") {
      var columnname = orderbycolumnname;
      var orderby = orderby;
      sortarray = {
        [columnname]: +orderby,
      };
    } else {
      orderbycolumnname = "createdAt";
      orderby = -1;
    }
    return { orderbycolumnname, orderby };
  } catch (error) {
    return error;
  }
};