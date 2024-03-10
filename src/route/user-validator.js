var { body } = require("express-validator");

const CreateUserValidator = [

  body("username")
    .notEmpty()
    .withMessage("Please Provide User Name"),

  body("name")
    .notEmpty()
    .withMessage("Please Provide Name"),

  body("mobile")
    .notEmpty()
    .withMessage("Please Provide Mobile Number")
    .matches(/^[0-9]{10}$/)
    .withMessage('Invalid mobile number format'),

  body("email")
    .notEmpty()
    .withMessage("Please Provide Email"),

  body("password")
    .notEmpty()
    .withMessage("Please Provide Password"),

  body("address")
    .notEmpty()
    .withMessage("Please Provide Address"),

  body("is_admin")
    .notEmpty()
    .withMessage("Please Provide Admin Status"),

];

const UpdateUserValidator = [

  body("id")
    .notEmpty()
    .withMessage("Please Provide ID")
    .isMongoId()
    .withMessage("invalid ID"),
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

const UserRole = [
  body("is_admin")
    .notEmpty()
    .withMessage("Please Provide User Role"),

];

module.exports = {
  CreateUserValidator,
  UpdateUserValidator,
  List,
  UserRole,
};
