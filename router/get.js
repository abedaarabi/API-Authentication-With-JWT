const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const axios = require("axios");
//=====================================================
//Forge API's
const { hub_Id } = process.env;
const { project_Id } = process.env;
const { issue_ID } = process.env;
//=====================================================
router.get("/register", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "../client/index.html");
  res.sendFile(indexFilePath);
});

router.get("/profile", (req, res) => {
  const token = req.headers["auth-token"];
  if (token) {
    const indexFilePathProfile = path.resolve(
      __dirname,
      "./client/profile.html"
    );
    res.sendFile(indexFilePathProfile);
  } else {
    res.redirect("login");
  }
});

router.get("/login", (req, res) => {
  const indexFilePath = path.resolve(__dirname, "../client/login.html");
  res.sendFile(indexFilePath);
});

//FORGE AXIOS META_DATA

router.get("/test_project", async (req, res) => {
  const url = `https://developer.api.autodesk.com/project/v1/hubs/${hub_Id}/projects/${project_Id}`;

  const token = process.env.TOKEN;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = response.data;
  res.send(data);
});

router.get("/hub_id", async (req, res) => {
  try {
    const url = `	https://developer.api.autodesk.com/project/v1/hubs/${hub_Id}`;
    const token = process.env.TOKEN;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = response.data;
    res.send(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/projects", async (req, res) => {
  try {
    const url = `https://developer.api.autodesk.com/project/v1/hubs/${hub_Id}/projects`;
    const token = process.env.TOKEN;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = response;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
router.get("/formats", async (req, res) => {
  try {
    const url =
      "	https://developer.api.autodesk.com/modelderivative/v2/designdata";

    const token = process.env.TOKEN;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { data } = response;
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
