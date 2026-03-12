const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/profile", authenticateToken, async (req, res) => {

 const userId = req.user.userId;

 const result = await pool.query(
  "SELECT id,name,email,balance FROM users WHERE id=$1",
  [userId]
 );

 res.json(result.rows[0]);

});

module.exports = router;