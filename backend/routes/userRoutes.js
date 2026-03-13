const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/profile", authenticateToken, async (req,res)=>{

 try{

  const result = await pool.query(
   `SELECT 
      id,
      name,
      email,
      balance,
      account_status,
      kyc_status,
      account_number
    FROM users
    WHERE id=$1`,
   [req.user.userId]
  );

  res.json(result.rows[0]);

 }catch(err){

  console.log(err);
  res.status(500).json({error:"Failed to fetch profile"});

 }

});

module.exports = router;