const express = require("express");
const router = express.Router();
const verify = require("./verifyTkoen");

router.get("/profile", verify, (req, res) => {
  res.send(req.name);
});

module.exports = router;
