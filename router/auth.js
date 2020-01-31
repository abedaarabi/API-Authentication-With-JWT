const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");

//router
router.post("/register", async (req, res) => {
  // LET'S VALIDATE THE DATA BEFORE WE MAKE USER
  const { error } = registerValidation(req.body);
  // const error = registerValidation(req.body).error;

  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IN USER ALRADY IN DATABASE
  const emailExist = await User.findOne({ email: req.body.email });
  // const userExist = await User.findOne({ name: req.body.name });

  if (emailExist) {
    return res.status(400).send("EMAIL ALRADY EXIST!");
  }
  // if (userExist) {
  //   return res.status(400).send("USER ALRADY EXIST!");
  // }

  // HACH PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hachedPassword = await bcrypt.hash(req.body.password, salt);
  //CREATE NEW USER!
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hachedPassword
  });
  try {
    const savedUser = await user.save();
    res.send({ ID: user._id }); //ADD OBJ FROM LINE 30
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
  const valiPass = await bcrypt.compare(req.body.password, userExist.password);

  if (!valiPass) {
    return res.status(400).send("WRONG PASSWORD");
  }
  res.send("SECCESS");
});

module.exports = router;
