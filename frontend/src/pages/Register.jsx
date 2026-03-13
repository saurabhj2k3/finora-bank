import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register(){

 const navigate = useNavigate();

 const [form,setForm] = useState({
  name:"",
  email:"",
  phone:"",
  dob:"",
  pan_number:"",
  address:"",
  city:"",
  state:"",
  pincode:"",
  password:""
 });

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]:e.target.value
  });
 };

 const register = async () => {

  try{

   await API.post("/auth/register",form);

   alert("Application submitted successfully");
   navigate("/");

  }catch(err){

   alert("Registration failed");

  }

 };

 return(

  <div style={{
   minHeight:"100vh",
   background:"#0f172a",
   color:"white",
   display:"flex",
   justifyContent:"center",
   paddingTop:"40px"
  }}>

  <div style={{
   background:"#1e293b",
   padding:"40px",
   borderRadius:"10px",
   width:"500px"
  }}>

  <h2 style={{textAlign:"center"}}>Finora Bank Account Opening</h2>

  {/* PERSONAL DETAILS */}

  <h3>Personal Details</h3>

  <input name="name" placeholder="Full Name"
   onChange={handleChange} required style={inputStyle} />

  <input name="email" placeholder="Email"
   onChange={handleChange} required style={inputStyle} />

  <input name="phone" placeholder="Phone"
   onChange={handleChange} required style={inputStyle} />

  <input type="date" name="dob"
   onChange={handleChange} required style={inputStyle} />

  <input name="pan_number" placeholder="PAN Number"
   onChange={handleChange} required style={inputStyle} />

  {/* ADDRESS DETAILS */}

  <h3>Address Details</h3>

  <input name="address" placeholder="Full Address"
   onChange={handleChange} required style={inputStyle} />

  <input name="city" placeholder="City"
   onChange={handleChange} required style={inputStyle} />

  <input name="state" placeholder="State"
   onChange={handleChange} required style={inputStyle} />

  <input name="pincode" placeholder="Pincode"
   onChange={handleChange} required style={inputStyle} />

  {/* PASSWORD */}

  <h3>Account Security</h3>

  <input type="password" name="password"
   placeholder="Create Password"
   onChange={handleChange}
   required
   style={inputStyle}
  />

  <button onClick={register} style={buttonStyle}>
   Submit Application
  </button>

  </div>
  </div>

 );

}

const inputStyle={
 width:"100%",
 padding:"10px",
 margin:"8px 0",
 borderRadius:"5px",
 border:"none"
};

const buttonStyle={
 width:"100%",
 padding:"12px",
 marginTop:"20px",
 background:"#3b82f6",
 border:"none",
 color:"white",
 borderRadius:"6px",
 cursor:"pointer"
};

export default Register;