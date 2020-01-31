const express = require("express");
const router = express.Router();
const verify = require("./verifyTkoen");

router.get("/", verify, (req, res) => {
  //   res.send("HEllo");
  res.json({
    posts: {
      type: "ARABIC",
      description: "from sryia"
    }
  });
});

module.exports = router;
