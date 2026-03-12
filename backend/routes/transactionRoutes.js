const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");

// Send Money API
router.post("/send", authenticateToken, async (req, res) => {

  try {

    const senderId = req.user.userId;
    const { receiverAccount, amount } = req.body;

    await pool.query("BEGIN");

    // Get sender balance
    const senderResult = await pool.query(
      "SELECT balance FROM users WHERE id=$1",
      [senderId]
    );

    const senderBalance = senderResult.rows[0].balance;

    // Check balance
    if (senderBalance < amount) {
      await pool.query("ROLLBACK");
      return res.status(400).json({
        error: "Insufficient balance"
      });
    }

    // Find receiver using account number
    const receiverResult = await pool.query(
      "SELECT id FROM users WHERE account_number=$1",
      [receiverAccount]
    );

    if (receiverResult.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        error: "Receiver not found"
      });
    }

    const receiverId = receiverResult.rows[0].id;

    // Prevent self transfer
    if (senderId === receiverId) {
      await pool.query("ROLLBACK");
      return res.status(400).json({
        error: "Cannot transfer money to your own account"
      });
    }

    // Deduct from sender
    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE id=$2",
      [amount, senderId]
    );

    // Add to receiver
    await pool.query(
      "UPDATE users SET balance = balance + $1 WHERE id=$2",
      [amount, receiverId]
    );

    // Save transaction
    await pool.query(
      `INSERT INTO transactions(sender_id, receiver_id, amount)
       VALUES ($1,$2,$3)`,
      [senderId, receiverId, amount]
    );

    await pool.query("COMMIT");

    res.json({
      message: "Transfer successful"
    });

  } catch (error) {

    await pool.query("ROLLBACK");

    console.error(error);

    res.status(500).json({
      error: "Transfer failed"
    });

  }

});


// Get transaction history
router.get("/history", authenticateToken, async (req, res) => {

  try {

    const userId = req.user.userId;

    const result = await pool.query(
      `
      SELECT 
        t.id,
        t.amount,
        t.created_at,
        u1.name AS sender_name,
        u2.name AS receiver_name,
        t.sender_id,
        t.receiver_id
      FROM transactions t
      JOIN users u1 ON t.sender_id = u1.id
      JOIN users u2 ON t.receiver_id = u2.id
      WHERE t.sender_id=$1 OR t.receiver_id=$1
      ORDER BY t.created_at DESC
      `,
      [userId]
    );

    const transactions = result.rows.map(tx => {

      if (tx.sender_id === userId) {
        return {
          type: "sent",
          amount: tx.amount,
          to: tx.receiver_name,
          date: tx.created_at
        };
      } else {
        return {
          type: "received",
          amount: tx.amount,
          from: tx.sender_name,
          date: tx.created_at
        };
      }

    });

    res.json(transactions);

  } catch (error) {

    console.error(error);
    res.status(500).json({
      error: "Failed to fetch transactions"
    });

  }

});

module.exports = router;