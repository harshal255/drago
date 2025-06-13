const mongoose = require("mongoose");
const config = require(".");

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("=====================Database Connected=====================");
  } catch (error) {
    console.log("=====================error from database connection", error);
  }
};

module.exports = connectDB;
