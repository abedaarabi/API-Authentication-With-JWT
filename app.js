const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();
const routerAuth = require("./router/auth");
const postRoute = require("./router/posts");

// Connect to DB
mongoose.connect(
  process.env.DATA_BASE,

  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to DB ...");
  }
);
//MiddleWare
app.use(express.json());

app.use("/", routerAuth);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/api/posts", postRoute);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
