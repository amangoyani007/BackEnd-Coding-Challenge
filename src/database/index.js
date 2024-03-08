// database related modules
module.exports = {

  databaseConnection: require('./connection'),
  
  ProductRepository: require('./repository/product-repository.js'),
  UserRepository: require('./repository/user-repository.js'),
  CartRepository: require('./repository/cart-repository.js'),

}