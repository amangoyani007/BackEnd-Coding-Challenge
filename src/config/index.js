require('dotenv').config();
const dotEnv = require("dotenv");

// get connection link from env
if (process.env.NODE_ENV !== "prod") {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}
// get connection link from env
// console.log(process.env.MONGODB_URI);
// get config vars from env
module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};
