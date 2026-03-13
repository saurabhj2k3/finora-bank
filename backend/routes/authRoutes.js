const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {

 try {

  const {
   name,
   email,
   phone,
   dob,
   pan_number,
   address,
   city,
   state,
   pincode,
   password
  } = req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  await pool.query(
   `INSERT INTO users
   (name,email,phone,password,dob,pan_number,address,city,state,pincode,account_status,kyc_status,balance)
   VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'pending','pending',0)`,
   [
    name,
    email,
    phone,
    hashedPassword,
    dob,
    pan_number,
    address,
    city,
    state,
    pincode
   ]
  );

  res.json({
   message:"Application submitted successfully"
  });

 } catch(err) {

  console.log(err);
  res.status(500).json({
   error:"Registration failed"
  });

 }

});
//Login user
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      "finora_secret_key",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Login failed"
    });

  }

});

module.exports = router;