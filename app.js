const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();
const routerAuth = require("./router/auth");
const postRoute = require("./router/posts");
const getRoute = require("./router/get");
const path = require("path");
const axios = require("axios");

const app = express();
// Connect to DB
mongoose.connect(
  process.env.DATA_BASE,

  { useUnifiedTopology: true, useNewUrlParser: true },
  error => {
    console.log(error);
    console.log("Connected to DB ...");
    startServer();
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(express.json()); */

app.use(express.static("client"));
app.use("/api/posts", postRoute);
app.use("/", routerAuth);
app.use("/", getRoute);

function startServer() {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
