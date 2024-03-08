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
    .withMessage("Please Provide Address")

];

const UpdateUserValidator = [

  body("id")
    .notEmpty()
    .withMessage("Please Provide ID")
    .isMongoId()
    .withMessage("invalid ID"),
];

module.exports = {
  CreateUserValidator,
  UpdateUserValidator
};
