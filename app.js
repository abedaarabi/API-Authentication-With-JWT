const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();
const routerAuth = require("./router/auth");
const postRoute = require("./router/posts");
const path = require("path");

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

app.use("/", routerAuth);
app.get("/", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "client/index.html");
  res.sendFile(indexFilePath);
});

app.get("/login", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "client/login.html");
  res.sendFile(indexFilePath);
});
app.use("/api/posts", postRoute);

function startServer() {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
