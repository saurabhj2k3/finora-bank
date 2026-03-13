import { useState } from "react";
import API from "../services/api";

function SendMoney(){

 const [account,setAccount] = useState("");
 const [amount,setAmount] = useState("");

 const send = async () => {

  try{

   const token = localStorage.getItem("token");

   await API.post("/transactions/send",
   {
    receiverAccount: account,
    amount: amount
   },
   {
    headers:{
     Authorization:`Bearer ${token}`
    }
   });

   alert("Transfer successful");

  }catch(err){

   alert("Transfer failed");

  }

 };

 return(

  <div style={{
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"100vh",
    background:"#0f172a",
    color:"white"
  }}>

   <h1>💸 Send Money</h1>

   <div style={{
    background:"#1e293b",
    padding:"30px",
    borderRadius:"10px",
    width:"300px",
    textAlign:"center"
   }}>

   <input
    placeholder="Receiver Account"
    onChange={(e)=>setAccount(e.target.value)}
   />

   <br/><br/>

   <input
    placeholder="Amount (₹)"
    onChange={(e)=>setAmount(e.target.value)}
   />

   <br/><br/>

   <button onClick={send}>
    Send ₹
   </button>

   </div>

  </div>

 );

}

export default SendMoney;