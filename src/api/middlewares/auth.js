const { ValidateSignature, ValidateSignatureOVsuperUser } = require('../../utils');

module.exports.UserAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignature(req);
  // return next();

  if (isAuthorized) return next();

  return res.status(401).json({ message: "Unauthorized Request" });
};

module.exports.SuperUserAuth = async (req, res, next) => {
  const isAuthorized = await ValidateSignatureOVsuperUser(req);
  // return next();

  if (isAuthorized) return next();

  return res.status(401).json({ message: "Only Admin Can View This Page" });
};