const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModel = new Schema(
  {
    name: { type: String },
    description: { type: String },
    supplier_mobile: { type: String },
    img: { type: String },
    type: { type: String },
    price: { type: Number },
    quantity_available: { type: Number },
    note: { type: String }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductModel);
