const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("../config");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    // console.log({ email, password });
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
      return res.status(400).json({ data: {}, message: "User Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const HashigPassword = await bcrypt.hash(password, salt);

    const userData = { fullName, email, password: HashigPassword };
    const newUser = new User(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, config.jwt_token_secret);

    res
      .status(200)
      .json({ data: { token, user }, message: "User Register Successful" });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ data: {}, message: "User Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, config.jwt_token_secret);
      return res.status(200).json({
        data: { token, user: { id: user._id, email: user.email } },
        message: "User Login Successful",
      });
    } else {
      return res.status(400).json({
        data: {},
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    next(error);
  }
};

const authUser = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findById(user_id).select("-password");
    return res.status(200).json({
      data: user,
      message: "User Login Successful",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { registerUser, loginUser, authUser };
