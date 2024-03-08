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