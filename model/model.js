const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, "Name must have atleast 3 letters"],
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  society: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: [6, "Password must have atleast 6 characters"],
    required: true,
  },
  confirmPassword: {
    type: String,
    minLength: [6, "Password must have atleast 6 characters"],
    required: true,
  },
  entries: [{ entry: String }],
  exits: [{ exit: String }],
});

UserSchema.methods.hashPassword = async function () {
  // arrow func have no this
  try {
    if (this.isModified()) {
      const salt = await bcryptjs.genSalt(10);
      this.password = await bcryptjs.hash(this.password, salt);
      this.confirmPassword = this.password;
    }
  } catch (e) {
    console.log(e);
  }
};

UserSchema.methods.generateToken = async function () {
  try {
    return await jwt.sign({ _id: this._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
  } catch (e) {
    console.log(e);
  }
};

const UserData = mongoose.model("UserData", UserSchema);

module.exports = UserData;
