const mongoose = require("mongoose");
const { ProductModel } = require("../models");

const { error } = require("console");
// const utils = require("../../utils");

//Dealing with data base operations
class ProductRepository {

  async ProductCreate(req) {
    try {
      const Product = new ProductModel(req);
      const ProductRes = await Product.save();
      return [ProductRes];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await ProductModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async ProductUpdate(userInputs) {
    try {

      const { Product } = userInputs
      const updatedProduct = await ProductModel.findOneAndUpdate({ Product: Product }, userInputs, { new: true, });

      return [updatedProduct];
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

}

module.exports = ProductRepository;
