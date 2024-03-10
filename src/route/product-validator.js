var { body } = require("express-validator");

const CreateProductValidator = [

  body("name")
    .notEmpty()
    .withMessage("Please Provide Product Name"),

  body("img")
    .notEmpty()
    .withMessage("Please Provide IMG url")
    .matches(/^(ftp|http|https):\/\/[^ "]+$/)
    .withMessage('Invalid URL format'),

  body("supplier_mobile")
    .notEmpty()
    .withMessage("Please Provide Mobile Number")
    .matches(/^[0-9]{10}$/)
    .withMessage('Invalid mobile number format'),

  body("type")
    .notEmpty()
    .withMessage("Last Name is requires"),

  body("price")
    .notEmpty()
    .withMessage("Please Provide Price"),

  body("quantity_available")
    .notEmpty()
    .withMessage("Please Provide Quantity")

];

const UpdateProductValidator = [

  body("id")
    .notEmpty()
    .withMessage("Please Provide ID"),
];

const List = [
  body("sortby")
    .if(body("sortby").exists())
    .notEmpty()
    .withMessage("sortby is required"),

  body("sortorder")
    .if(body("sortorder").exists())
    .notEmpty()
    .withMessage("sortorder is required"),

  body("search")
    .if(body("search").exists())
    .notEmpty()
    .withMessage("search cannot be empty"),

  body("nextpage")
    .if(body("nextpage").exists())
    .notEmpty()
    .withMessage("nextpage is required"),

  body("perpage")
    .if(body("perpage").exists())
    .notEmpty()
    .withMessage("perpage is required"),

];

module.exports = {
  CreateProductValidator,
  UpdateProductValidator,
  List
};
