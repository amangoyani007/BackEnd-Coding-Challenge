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

module.exports = {
  CreateProductValidator,
  UpdateProductValidator
};
