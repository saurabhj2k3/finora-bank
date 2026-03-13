import { useState } from "react";
import API from "../services/api";

function UploadKYC(){

 const [pan,setPan] = useState(null);
 const [aadhaar,setAadhaar] = useState(null);
 const [addressProof,setAddressProof] = useState(null);

 const upload = async () => {

  try{

   const token = localStorage.getItem("token");

   const formData = new FormData();

   formData.append("pan_card",pan);
   formData.append("aadhaar_card",aadhaar);
   formData.append("address_proof",addressProof);

   await API.post("/kyc/upload",formData,{
    headers:{
     Authorization:`Bearer ${token}`
    }
   });

   alert("KYC submitted successfully");

  }catch(err){

   alert("Upload failed");

  }

 };

 return(

  <div style={{
   minHeight:"100vh",
   background:"#0f172a",
   color:"white",
   display:"flex",
   justifyContent:"center",
   alignItems:"center"
  }}>

  <div style={{
   background:"#1e293b",
   padding:"40px",
   borderRadius:"10px",
   width:"400px"
  }}>

  <h2>Upload KYC Documents</h2>

  <p>PAN Card</p>
  <input type="file"
   onChange={(e)=>setPan(e.target.files[0])} />

  <p>Aadhaar Card</p>
  <input type="file"
   onChange={(e)=>setAadhaar(e.target.files[0])} />

  <p>Address Proof</p>
  <input type="file"
   onChange={(e)=>setAddressProof(e.target.files[0])} />

  <button
   onClick={upload}
   style={{
    marginTop:"20px",
    padding:"10px",
    width:"100%",
    background:"#3b82f6",
    border:"none",
    color:"white",
    borderRadius:"5px"
   }}
  >
   Submit KYC
  </button>

  </div>
  </div>

 );

}

export default UploadKYC;