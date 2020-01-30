const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { registerValidation } = require("../validation");

//router
router.post("/register", async (req, res) => {
  //LET'S VALIDATE THE DATA BEFORE WE MAKE USER
  const { error } = registerValidation(req.body);
  // const error = registerValidation(req.body).error;

  if (error) return res.status(400).send(error.details[0].message);

  //CHECK IN USER ALRADY IN DATABASE
  const userExist = await User.findOne({ email: req.body.email });

  if (userExist) {
    return res.status(400).send("USER ALRADY EXIST!");
  }

  //CREATE NEW USER!
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
