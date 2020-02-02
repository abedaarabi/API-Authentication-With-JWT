const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const result = dotenv.config();

const ERROR_CODES = {
  EMAIL_ALREADY_EXIST: 1
};

if (result.error) {
  throw result.error;
}

// User.deleteMany().then((...args) => console.log(...args));

const { registerValidation, loginValidation } = require("../validation");

//router
router.post("/register", async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE MAKE USER

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IN USER ALRADY IN DATABASE
  console.log("before");
  const emailExist = await User.findOne({ email: req.body.email });
  console.log("after");
  // const userExist = await User.findOne({ name: req.body.name });

  if (emailExist) {
    return res.status(400).send({ error: ERROR_CODES.EMAIL_ALREADY_EXIST });
  }

  // HACH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hachedPassword = await bcrypt.hash(req.body.password, salt);
  //CREATE NEW USER!
  console.log("creating a new user");
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hachedPassword
  });
  try {
    const savedUser = await user.save();
    console.log("User saved", savedUser);
    res.status(201).send({ ID: user._id, email: user.email, name: user.name }); //ADD OBJ FROM LINE 30
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE MAKE USER
  const { error } = loginValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: req.body.email });

  if (!userExist) {
    return res.status(400).send("EMAIL OR PASSWORD NOT EXIST!");
  }
  const validPass = await bcrypt.compare(req.body.password, userExist.password);

  if (!validPass) return res.status(400).send("WRONG PASSWORD");
  //Create and assign token
  const token = jwt.sign({ ID: userExist._id }, process.env.TOKEN_SECRET_DB);
  res.header("auth-token", token).send(token);
});

module.exports = router;
