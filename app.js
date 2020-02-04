const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const result = dotenv.config();
const routerAuth = require("./router/auth");
const postRoute = require("./router/posts");
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

app.use("/", routerAuth);
app.get("/register", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "client/index.html");
  res.sendFile(indexFilePath);
});
app.get("/profile", (req, res) => {
  const token = req.headers["auth-token"];
  if (token) {
    const indexFilePathProfile = path.resolve(__dirname, "client/profile.html");
    res.sendFile(indexFilePathProfile);
  } else {
    res.redirect("login");
  }
});

app.get("/login", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "client/login.html");
  res.sendFile(indexFilePath);
});

app.get("/data", async (req, res) => {
  const hubId = "b.c65ce02f-8304-4d1d-8684-e55abb2f54a0";
  const projectId = "b.a57e2068-aca9-4ee0-b5a9-08097e9c6f0d";
  const url = `https://developer.api.autodesk.com/project/v1/hubs/${hubId}/projects/${projectId}/topFolders`;

  const token = process.env.TOKEN;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = response.data;
  res.send(data);
});

app.use("/api/posts", postRoute);

function startServer() {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
