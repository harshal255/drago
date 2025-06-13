const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/User");

const authHandler = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {

    //401 for un-authorized
    res.status(401).json({ data: {}, message: "UnAuthorized" });
  }
  try {
    const decodeToken = jwt.verify(token, config.jwt_token_secret);
    const user = await User.findById(decodeToken.id).select("-password");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authHandler;
