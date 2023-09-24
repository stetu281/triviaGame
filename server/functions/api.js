const express = require("express");
const serverless = require("serverless-http");
const pool = require("./db").pool;
const bodyParser = require("body-parser");
const cors = require("cors");

const api = express();
const router = express.Router();

api.use(bodyParser.json());
api.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

//Test
router.get("/", (req, res) => {
  res.status(200).send("Hello");
});

api.use("/api/", router);

module.exports.handler = serverless(api);
