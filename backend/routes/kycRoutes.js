const express = require("express");
const router = express.Router();

const pool = require("../config/db");
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../config/multerConfig");

router.post(
 "/upload",
 authenticateToken,
 upload.fields([
  { name:"pan_card",maxCount:1 },
  { name:"aadhaar_card",maxCount:1 },
  { name:"address_proof",maxCount:1 }
 ]),
 async (req,res)=>{

  try{

   const userId = req.user.userId;

   const pan = req.files.pan_card[0].filename;
   const aadhaar = req.files.aadhaar_card[0].filename;
   const address = req.files.address_proof[0].filename;

   await pool.query(
    `INSERT INTO kyc
    (user_id,pan_card,aadhaar_card,address_proof,status)
    VALUES($1,$2,$3,$4,'pending')`,
    [userId,pan,aadhaar,address]
   );

   res.json({
    message:"KYC uploaded successfully"
   });

  }catch(err){

   console.log(err);

   res.status(500).json({
    error:"KYC upload failed"
   });

  }

});
module.exports = router;