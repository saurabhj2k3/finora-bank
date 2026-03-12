const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/kyc/pending", async (req, res) => {

 try {

  const result = await pool.query(`
   SELECT k.id, u.name, u.email, k.document_type, k.document_image
   FROM kyc k
   JOIN users u ON k.user_id = u.id
   WHERE k.status = 'pending'
  `);

  res.json(result.rows);

 } catch (error) {

  console.error(error);
  res.status(500).json({ error: "Failed to fetch KYC requests" });

 }

});

router.post("/kyc/approve", async (req, res) => {

 try {

  const { userId } = req.body;

  await pool.query("BEGIN");

  const accountResult = await pool.query(
   "SELECT nextval('finora_account_seq') AS account_number"
  );

  const accountNumber = accountResult.rows[0].account_number;

  await pool.query(
   `UPDATE users
    SET account_number=$1,
        account_status='active',
        kyc_status='approved'
    WHERE id=$2`,
   [accountNumber, userId]
  );

  await pool.query(
   `UPDATE kyc
    SET status='approved'
    WHERE user_id=$1`,
   [userId]
  );

  await pool.query("COMMIT");

  res.json({
   message: "KYC approved",
   account_number: accountNumber
  });

 } catch (error) {

  await pool.query("ROLLBACK");

  console.error(error);
  res.status(500).json({ error: "KYC approval failed" });

 }

});
module.exports = router;