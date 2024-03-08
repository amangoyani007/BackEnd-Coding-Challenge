var { body } = require("express-validator");

const CreateCartValidator = [

  body("userid")
    .notEmpty()
    .withMessage("Please Provide User ID"),

  body("username")
    .notEmpty()
    .withMessage("Please Provide User Name"),

    body("product")
    .notEmpty().withMessage("product"),

  body("product.*.id")
    .if(body("product.*.id").exists())
    .isMongoId()
    .withMessage("invalid ID"),

  body("product.*.name")
    .if(body("product.*.name").exists())
    .notEmpty()
    .withMessage("Please Provide Product Name"),

  body("product.*.price")
    .if(body("product.*.price").exists())
    .notEmpty()
    .withMessage("Please Provide Product Price"),

];

const UpdateCartValidator = [

  body("id")
    .notEmpty()
    .withMessage("Please Provide ID")
    .isMongoId()
    .withMessage("invalid ID"),

  body("product")
    .notEmpty().withMessage("product"),

  body("product.*.id")
    .if(body("product.*.id").exists())
    .isMongoId()
    .withMessage("invalid ID"),

  body("product.*.name")
    .if(body("product.*.name").exists())
    .notEmpty()
    .withMessage("Please Provide Product Name"),

  body("product.*.price")
    .if(body("product.*.price").exists())
    .notEmpty()
    .withMessage("Please Provide Product Price"),
];

module.exports = {
  CreateCartValidator,
  UpdateCartValidator
};
