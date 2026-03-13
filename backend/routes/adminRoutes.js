const express = require("express");
const router = express.Router();
const pool = require("../config/db");

/*
====================================
GET PENDING KYC REQUESTS
====================================
*/

router.get("/kyc/pending", async (req, res) => {

 try {

  const result = await pool.query(`
   SELECT 
     k.user_id,
     u.name,
     u.email,
     u.pan_number,
     u.city,
     k.document_type,
     k.document_image,
     k.status
   FROM kyc k
   JOIN users u ON k.user_id = u.id
   WHERE k.status = 'pending'
  `);

  res.json(result.rows);

 } catch (error) {

  console.error(error);

  res.status(500).json({
   error: "Failed to fetch KYC requests"
  });

 }

});


/*
====================================
APPROVE KYC
====================================
*/

router.post("/kyc/approve", async (req, res) => {

 try {

  const { userId } = req.body;

//Reject KYC

router.post("/kyc/reject", async (req,res)=>{

 try{

  const {userId} = req.body;

  await pool.query(
   `UPDATE users
    SET account_status='rejected',
        kyc_status='rejected'
    WHERE id=$1`,
   [userId]
  );

  await pool.query(
   `UPDATE kyc
    SET status='rejected'
    WHERE user_id=$1`,
   [userId]
  );

  res.json({message:"KYC rejected"});

 }catch(err){

  console.log(err);
  res.status(500).json({error:"Rejection failed"});

 }

});

  /*
  ------------------------------------
  Generate next account number
  ------------------------------------
  */

  const result = await pool.query(
   "SELECT account_number FROM users WHERE account_number IS NOT NULL ORDER BY account_number DESC LIMIT 1"
  );

  let newAccountNumber = 501001000001;

  if (result.rows.length > 0) {
   newAccountNumber = Number(result.rows[0].account_number) + 1;
  }

  /*
  ------------------------------------
  Update users table
  ------------------------------------
  */

  await pool.query(
   `UPDATE users
    SET 
      account_status = 'active',
      kyc_status = 'approved',
      account_number = $1
    WHERE id = $2`,
   [newAccountNumber, userId]
  );

  /*
  ------------------------------------
  Update kyc table
  ------------------------------------
  */

  await pool.query(
   `UPDATE kyc
    SET status = 'approved'
    WHERE user_id = $1`,
   [userId]
  );

  res.json({
   message: "Account approved and account number generated",
   account_number: newAccountNumber
  });

 } catch (error) {

  console.error(error);

  res.status(500).json({
   error: "Approval failed"
  });

 }

});

// credit route
router.post("/credit", async (req, res) => {

 try {

  const { accountNumber, amount } = req.body;

  // find user
  const userResult = await pool.query(
   "SELECT id,balance FROM users WHERE account_number = $1",
   [accountNumber]
  );

  if (userResult.rows.length === 0) {
   return res.status(404).json({ error: "Account not found" });
  }

  const user = userResult.rows[0];

  // update balance
  await pool.query(
   `UPDATE users
    SET balance = balance + $1
    WHERE account_number = $2`,
   [amount, accountNumber]
  );

  // record transaction
  await pool.query(
   `INSERT INTO transactions
    (sender_id, receiver_id, amount, status)
    VALUES ($1, $2, $3, 'credit')`,
   [null, user.id, amount]
  );

  res.json({
   message: "Money credited successfully"
  });

 } catch (err) {

  console.log(err);

  res.status(500).json({
   error: "Credit failed"
  });

 }

});

module.exports = router;