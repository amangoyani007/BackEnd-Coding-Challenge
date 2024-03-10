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
  CreateCartValidator,
  UpdateCartValidator,
  List
};
