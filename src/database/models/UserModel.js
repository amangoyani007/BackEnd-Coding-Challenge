const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    mobile: { type: String },
    address: { type: String },
    order_history: { type: Number },
    note: { type: String }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserModel);
