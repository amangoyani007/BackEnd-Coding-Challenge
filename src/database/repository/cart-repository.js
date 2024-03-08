const mongoose = require("mongoose");
const { CartModel } = require("../models");

const { error } = require("console");
// const utils = require("../../utils");

//Dealing with data base operations
class CartRepository {

  async CartCreate(req) {
    try {
      const Cart = new CartModel(req);
      const CartRes = await Cart.save();
      return CartRes;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await CartModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async CartUpdate(userInputs) {
    try {

      const { userid } = userInputs
      const updatedCart = await CartModel.findOneAndUpdate({ userid: userid }, userInputs, { new: true, });

      return updatedCart;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async CartDelete(id) {
    try {

      const deleteCart = await CartModel.findByIdAndDelete(id);

      return deleteCart;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

}

module.exports = CartRepository;
