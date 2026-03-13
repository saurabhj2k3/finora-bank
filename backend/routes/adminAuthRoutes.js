const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
=====================================
ADMIN LOGIN
=====================================
*/

router.post("/login", async (req, res) => {

 try {

  const { email, password } = req.body;

  // check admin exists
  const result = await pool.query(
   "SELECT * FROM admins WHERE email = $1",
   [email]
  );

  if (result.rows.length === 0) {
   return res.status(401).json({
    error: "Invalid admin credentials"
   });
  }

  const admin = result.rows[0];

  // verify password
  const validPassword = await bcrypt.compare(password, admin.password);

  if (!validPassword) {
   return res.status(401).json({
    error: "Invalid admin credentials"
   });
  }

  // generate JWT token
  const token = jwt.sign(
   {
    adminId: admin.id,
    role: "admin"
   },
   "SECRET_KEY",
   { expiresIn: "8h" }
  );

  res.json({
   message: "Admin login successful",
   token
  });

 } catch (err) {

  console.error(err);

  res.status(500).json({
   error: "Admin login failed"
  });

 }

});


module.exports = router;