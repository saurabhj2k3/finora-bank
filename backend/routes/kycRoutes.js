const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

router.post(
 "/upload",
 authenticateToken,
 upload.single("document"),
 async (req, res) => {

  try {

   const userId = req.user.userId;
   const documentType = req.body.document_type;
   const filePath = req.file.path;

   await pool.query(
    `INSERT INTO kyc (user_id, document_type, document_image)
     VALUES ($1,$2,$3)`,
    [userId, documentType, filePath]
   );

   res.json({
    message: "KYC uploaded successfully",
    status: "pending"
   });

  } catch (error) {

   console.error(error);

   res.status(500).json({
    error: "KYC upload failed"
   });

  }

 });

module.exports = router;