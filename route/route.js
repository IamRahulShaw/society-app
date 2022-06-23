const express = require("express");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserData = require("../model/model");

let otp;

const router = express.Router();

const passwordMatch = async (mobileNumber, password) => {
  try {
    const { password: hashPassword } = await UserData.findOne({
      mobileNumber,
    }).select({ password: 1 });
    return await bcryptjs.compare(password, hashPassword);
  } catch (e) {
    return 0;
  }
};

const userExistFunc = async (data) => {
  try {
    const { _id } = await jwt.verify(data, process.env.SECRET);
    return await UserData.exists({ _id });
  } catch (error) {
    return null;
  }
};

router.post("/register", async (req, res) => {
  try {
    switch (true) {
      case !validator.isMobilePhone(req.body.mobileNumber, "en-IN"):
        res.status(400).json({ msg: "Invalid mobile number" });
        break;

      case req.body.password !== req.body.confirmPassword:
        res
          .status(403)
          .json({ msg: "Password & Confirm Password are not matched" });
        break;

      case !!(await UserData.exists({ mobileNumber: req.body.mobileNumber })):
        res.status(409).json({ msg: "Mobile Number already exists" });
        break;

      default:
        const doc = new UserData(req.body);
        await doc.hashPassword();
        await doc.save();
        otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });
        res.status(201).json({ msg: "Register Successful", otp });
        break;
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occurer" });
  }
});

router.post("/login", async (req, res) => {
  try {
    switch (true) {
      case !req.body.mobileNumber || !req.body.password:
        res.status(400).json({ msg: "Invalid Input" });
        break;

      case !(await UserData.exists({ mobileNumber: req.body.mobileNumber })):
        res.status(400).json({ msg: "Register First" });
        break;

      case !(await passwordMatch(req.body.mobileNumber, req.body.password)):
        res.status(400).json({ msg: "Invalid Credentials" });
        break;

      default:
        const doc = await UserData.findOne({
          mobileNumber: req.body.mobileNumber,
        }).select({ _id: 1 });
        const token = await doc.generateToken();
        const { _id } = doc;
        res.status(200).json({ _id, token });
        break;
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
  }
});

router.delete("/verify", async (req, res) => {
  try {
    if (otp != req.body.otp) {
      await UserData.deleteOne({ mobileNumber: req.body.mobileNumber });
      res.status(400).json({ msg: "Verification Unsuccessful" });
    } else {
      res.status(200).json({ msg: "Verification Successful" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
  }
});

router.get("/logentry", async (req, res) => {
  try {
    const { _id } = await userExistFunc(
      req.headers.authorization.replace("Bearer ", "")
    );
    if (_id) {
      const currDate = new Date().toLocaleString("en-GB");
      await UserData.updateOne(
        { _id },
        {
          $push: {
            entries: {
              $each: [{ entry: currDate }],
              $sort: { entry: -1 },
              $slice: 30,
            },
          },
        }
      );
      const doc = await UserData.findOne({ _id });
      res.status(201).json({ msg: "Update Entries", doc });
    } else {
      res.status(400).json({ msg: "Login First" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
  }
});

router.get("/logexit", async (req, res) => {
  try {
    const { _id } = await userExistFunc(
      req.headers.authorization.replace("Bearer ", "")
    );
    if (_id) {
      const currDate = new Date().toLocaleString("en-GB");
      await UserData.updateOne(
        { _id },
        {
          $push: {
            exits: {
              $each: [{ exit: currDate }],
              $sort: { exit: -1 },
              $slice: 30,
            },
          },
        }
      );
      const doc = await UserData.findOne({ _id });
      res.status(201).json({ msg: "Update Exits", doc });
    } else {
      res.status(400).json({ msg: "Login First" });
    }
  } catch (e) {
    res.status(400).json({ msg: "Error Occured" });
  }
});

router.get("/auth", async (req, res) => {
  try {
    const { _id } = await userExistFunc(
      req.headers.authorization.replace("Bearer ", "")
    );
    // console.log(_id);
    if (_id) {
      const doc = await UserData.findOne({ _id });
      // console.log(doc);
      res.status(201).json({ doc });
    } else {
      res.status(400).json({ msg: "No Authentication" });
    }
  } catch (e) {}
});

module.exports = router;
