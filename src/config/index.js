const { production } = require("../misc/consts");

module.exports = {
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  apiUrl: process.env.NODE_ENV === production ? process.env.API_URL_PROD : process.env.API_URL_DEV,
  clientUrl: process.env.NODE_ENV === production ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV,
  
  privateSecret: process.env.PRIVATE_SECRET,

  mongodbString: process.env.MONGODB_STRING,

  streambyClientId: process.env.STREAMBY_CLIENT_ID,
  streambyClientSecret: process.env.STREAMBY_CLIENT_SECRET,
}