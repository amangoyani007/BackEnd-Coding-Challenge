const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartModel = new Schema(
  {
    userid: { type: String },
    username: { type: String },
    product: [],
    totalprice: { type: Number },
    note: { type: String }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cart", CartModel);
