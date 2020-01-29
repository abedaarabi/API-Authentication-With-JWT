const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Joi = require("joi");

//VALIDATION

const schema = {
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email({ minDomainAtoms: 2 }),
  password: Joi.string()
    .min(6)
    .required()
};

//router
router.post("/register", async (req, res) => {
  //LET'S VALIDATE THE DATA BEFORE WE MAKE USER
  const { error } = Joi.validate(req.body, schema);

  // res.send(error.details[0].message);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
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
