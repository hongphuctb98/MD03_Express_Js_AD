const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../ultils/database");
const cors = require("cors");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cors());
//get all
router.get("/", async (req, res) => {
  let query = "SELECT * FROM user";
  const { sort, order } = req.query;

  try {
    if (sort && order) {
      query += ` ORDER BY ${order} ${sort}`;
    }
    const users = await db.execute(query);
    res.json({ users: users[0] });
  } catch (error) {
    res.json({ error: error });
  }
});

//get one
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM user WHERE id = ${id}`;
    const user = await db.execute(query);
    if (user[0].length > 0) {
      res.json({ user: user[0][0] });
    } else {
      res.json({ error: "user not found" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//post
router.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const query = `INSERT INTO user (name, description) VALUES ('${name}', '${description}')`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "create user success", status: 200 });
    } else {
      res.json({ error: "create user failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//patch
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  let { name, description } = req.body;
  try {
    let query = `UPDATE user SET name = '${name}', description = '${description}' WHERE id = ${id}`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "update user success" });
    } else {
      res.json({ error: "update user failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM user WHERE id = ${id}`;
    const result = await db.execute(query);
    if (result[0].affectedRows > 0) {
      res.json({ message: "delete user success" });
    } else {
      res.json({ error: "delete user failed" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

module.exports = router;
