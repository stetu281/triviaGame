const express = require("express");
const helmet = require("helmet");
const serverless = require("serverless-http");
const pool = require("./db").pool;
const bodyParser = require("body-parser");
const cors = require("cors");

const api = express();
const router = express.Router();

api.use(helmet());
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

//get Scores
router.get("/score/:limit", (req, res) => {
  let sql;
  const limit = req.params.limit;

  if (limit === "all" || isNaN(limit)) {
    sql = "SELECT * FROM highscores ORDER BY score DESC, createdAt ASC)";
  } else {
    sql = `SELECT * FROM highscores ORDER BY score DESC, createdAt ASC LIMIT ${limit}`;
  }

  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(sql, (err, result) => {
        if (err) throw err;

        res.status(200).json({ scores: result });
        connection.release();
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

api.use("/api/", router);

module.exports.handler = serverless(api);
