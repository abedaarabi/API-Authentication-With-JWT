const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routerAuth = require("./router/auth");

// Connect to DB
mongoose.connect(
  "mongodb+srv://abed:abed123@cluster0-hbkdn.mongodb.net/test?retryWrites=true&w=majority",

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

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
