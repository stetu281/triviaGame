const express = require("express");
const helmet = require("helmet");
const serverless = require("serverless-http");
const pool = require("./db").pool;
const bodyParser = require("body-parser");
const cors = require("cors");
const { body, validationResult } = require("express-validator");

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

//post score
function NameValidation() {
  return [
    body("username")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long")
      .isLength({ max: 16 })
      .withMessage("Name must be less than 17 characters long")
      .exists()
      .withMessage("Please enter a name")
      .trim()
      .matches(/^(?:[A-Za-z]+)(?:[A-Za-z0-9 _]*)$/)
      .withMessage(
        "Name can contain letters, numbers and whitespace (First char must be a letter)"
      )
      .escape(),
  ];
}

router.post("/score", NameValidation(), (req, res) => {
  const { username, score, avatar } = req.body;

  const nameCheck = `SELECT 1 FROM highscores WHERE username = ?`;
  const name = [username];
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(nameCheck, name, (err, result) => {
        if (err) throw err;

        if (result.length != 0) {
          res.status(422).json({
            errors: "Username already exists, please choose a different one",
          });
        } else {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const sql =
            "INSERT INTO highscores (username, score, avatar) VALUES (?, ?, ?)";
          const values = [username, score, avatar];
          connection.query(sql, values, (err, result) => {
            if (err) throw err;
            res.status(200).json({ message: "Thanks, score added" });
            connection.release();
          });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
});

api.use("/api/", router);

module.exports.handler = serverless(api);
