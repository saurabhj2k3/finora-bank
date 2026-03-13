import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminLogin() {

 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const navigate = useNavigate();

 const handleLogin = async () => {

  try {

   const res = await API.post("/admin/auth/login", {
    email,
    password
   });

   // store admin token
   localStorage.setItem("adminToken", res.data.token);

   alert("Admin login successful");

   navigate("/admin");

  } catch (err) {

   alert("Invalid admin credentials");

  }

 };

 return (

  <div style={{
   height: "100vh",
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   background: "#0f172a",
   color: "white"
  }}>

   <div style={{
    background: "#1e293b",
    padding: "40px",
    borderRadius: "10px",
    width: "320px"
   }}>

    <h2 style={{textAlign:"center"}}>Admin Login</h2>

    <input
     type="email"
     placeholder="Admin Email"
     value={email}
     onChange={(e)=>setEmail(e.target.value)}
     style={{
      width:"100%",
      padding:"10px",
      margin:"10px 0",
      borderRadius:"5px",
      border:"none"
     }}
    />

    <input
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     style={{
      width:"100%",
      padding:"10px",
      margin:"10px 0",
      borderRadius:"5px",
      border:"none"
     }}
    />

    <button
     onClick={handleLogin}
     style={{
      width:"100%",
      padding:"10px",
      background:"#3b82f6",
      border:"none",
      color:"white",
      borderRadius:"5px",
      marginTop:"10px"
     }}
    >
     Login
    </button>

   </div>

  </div>

 );

}

export default AdminLogin;