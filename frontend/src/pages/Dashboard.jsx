import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Dashboard(){

 const [user,setUser] = useState(null);
 const navigate = useNavigate();

 useEffect(()=>{

  const fetchUser = async () => {

   try{

    const token = localStorage.getItem("token");

    const res = await API.get("/user/profile",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    console.log("PROFILE DATA:",res.data); // debug

    setUser(res.data);

   }catch(err){

    console.log(err);

    alert("Session expired. Please login again.");

    navigate("/");

   }

  };

  fetchUser();

 },[]);


 const logout = () => {

  localStorage.removeItem("token");

  navigate("/");

 };


 if(!user){

  return(
   <div style={{
     height:"100vh",
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     background:"#0f172a",
     color:"white"
   }}>
    Loading...
   </div>
  );

 }


 /* ================================
    ACCOUNT NOT APPROVED
   ================================= */

 if(user.account_status !== "active"){

  return(

   <div style={{
     minHeight:"100vh",
     background:"#0f172a",
     color:"white",
     display:"flex",
     flexDirection:"column",
     justifyContent:"center",
     alignItems:"center"
   }}>

    <h1>🏦 Finora Bank</h1>

    <h3>Hello {user.name}</h3>

    <div style={{
      background:"#1e293b",
      padding:"30px",
      borderRadius:"12px",
      textAlign:"center",
      width:"350px",
      marginTop:"20px"
    }}>

     <h3>KYC Pending</h3>

     <p>Your account is waiting for admin approval.</p>

     <p>Please upload your KYC document.</p>

     <Link to="/upload-kyc">

      <button style={{
        padding:"10px 20px",
        background:"#22c55e",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}>
        Upload KYC
      </button>

     </Link>

    </div>

    <button
      onClick={logout}
      style={{
        marginTop:"30px",
        padding:"10px 20px",
        background:"#ef4444",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}
    >
      Logout
    </button>

   </div>

  );

 }


 /* ================================
    ACTIVE ACCOUNT DASHBOARD
   ================================= */

 return(

  <div style={{
    minHeight:"100vh",
    background:"#0f172a",
    color:"white",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    paddingTop:"40px"
  }}>

   <h1>🏦 Finora Bank</h1>

   <h3>Hello {user.name}</h3>


   {/* ACCOUNT CARD */}

   <div style={{
    background:"#1e293b",
    padding:"30px",
    borderRadius:"12px",
    width:"350px",
    textAlign:"center",
    marginTop:"30px"
   }}>

    <p><b>Account Number</b></p>

    <h3>{user.account_number}</h3>

    <h3>Account Balance</h3>

    <h2 style={{color:"#22c55e"}}>
      ₹ {user.balance}
    </h2>

   </div>


   {/* ACTION BUTTONS */}

   <div style={{
    marginTop:"30px",
    display:"flex",
    gap:"20px"
   }}>

    <Link to="/send-money">

      <button style={{
        padding:"12px 20px",
        background:"#3b82f6",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}>
        Send Money
      </button>

    </Link>


    <Link to="/upload-kyc">

      <button style={{
        padding:"12px 20px",
        background:"#22c55e",
        color:"white",
        border:"none",
        borderRadius:"6px"
      }}>
        Upload KYC
      </button>

    </Link>

   </div>


   {/* LOGOUT */}

   <button
    onClick={logout}
    style={{
      marginTop:"40px",
      padding:"10px 20px",
      background:"#ef4444",
      color:"white",
      border:"none",
      borderRadius:"6px"
    }}
   >
    Logout
   </button>


  </div>

 );

}

export default Dashboard;