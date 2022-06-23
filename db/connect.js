const mongoose = require("mongoose");
require("dotenv").config();

const connectFunction = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_URL);
    console.log("Connection Successful");
  } catch (e) {
    console.log("Connection Failed");
  }
};

connectFunction();
