import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login(){

 const navigate = useNavigate();

 const [email,setEmail] = useState("");
 const [password,setPassword] = useState("");

 const login = async () => {

  try{

   const res = await API.post("/auth/login",{
    email,
    password
   });

   localStorage.setItem("token",res.data.token);

   navigate("/dashboard");

  }catch(err){

   alert("Invalid email or password");

  }

 };

 return(

  <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    background:"#0f172a",
    color:"white"
  }}>

   <div style={{
    background:"#1e293b",
    padding:"40px",
    borderRadius:"10px",
    width:"350px",
    textAlign:"center"
   }}>

    <h2>Finora Bank Login</h2>

    <input
      style={{width:"100%",margin:"10px 0",padding:"10px"}}
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
    />

    <input
      style={{width:"100%",margin:"10px 0",padding:"10px"}}
      type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
    />

    <button
      style={{
        width:"100%",
        padding:"10px",
        background:"#3b82f6",
        color:"white",
        border:"none",
        borderRadius:"5px",
        marginTop:"10px"
      }}
      onClick={login}
    >
      Login
    </button>

    <p style={{marginTop:"15px"}}>
      Don't have an account?
      <Link to="/register" style={{color:"#3b82f6"}}> Create Account</Link>
    </p>

   </div>

  </div>

 );

}

export default Login;