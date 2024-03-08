const mongoose = require("mongoose");
const { UserModel } = require("../models");

const { error } = require("console");
// const utils = require("../../utils");

//Dealing with data base operations
class UserRepository {

  async UserCreate(req) {
    try {
      const User = new UserModel(req);
      const UserRes = await User.save();
      return UserRes;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async GetPipelineData(pipeline) {
    try {

      const data = await UserModel.aggregate(pipeline);

      return data || []
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async UserUpdate(userInputs) {
    try {

      const { id } = userInputs
      const updatedUser = await UserModel.findByIdAndUpdate(id, userInputs, { new: true, });

      return updatedUser;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

  async UserDelete(id) {
    try {

      const deleteUser = await UserModel.findByIdAndDelete(id);

      return deleteUser;
    } catch (err) {
      console.log(err);
      return { error: err };
    }
  }

}

module.exports = UserRepository;
