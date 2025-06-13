require("dotenv").config();

const config = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  jwt_token_secret: process.env.JWT_TOKEN_SECRET,
};

module.exports = config;
