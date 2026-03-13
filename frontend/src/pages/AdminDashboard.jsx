import { useEffect, useState } from "react";
import API from "../services/api";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {

 const [users, setUsers] = useState([]);

 useEffect(() => {
  fetchPending();
 }, []);

 const fetchPending = async () => {
  try {
   const res = await API.get("/admin/kyc/pending");
   setUsers(res.data);
  } catch (err) {
   console.log(err);
  }
 };

 const approve = async (userId) => {
  try {

   await API.post("/admin/kyc/approve", { userId });

   // remove approved user from UI
   setUsers(users.filter(u => u.user_id !== userId));

  } catch (err) {
   alert("Approval failed");
  }
 };

 const reject = async (userId) => {
  try {

   await API.post("/admin/kyc/reject", { userId });

   // remove rejected user from UI
   setUsers(users.filter(u => u.user_id !== userId));

  } catch (err) {
   alert("Rejection failed");
  }
 };

 return (

  <AdminLayout>

   <h1>Pending KYC Applications</h1>

   {users.length === 0 && <p>No pending requests</p>}

   {users.map(user => (

    <div
     key={user.user_id}
     style={{
      background: "#1e293b",
      padding: "20px",
      margin: "15px 0",
      borderRadius: "8px"
     }}
    >

     <p><b>Name:</b> {user.name}</p>
     <p><b>Email:</b> {user.email}</p>
     <p><b>PAN:</b> {user.pan_number}</p>
     <p><b>City:</b> {user.city}</p>

     {/* DOCUMENT PREVIEW */}

     <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>

      {user.pan_card && (
       <img
        src={`http://localhost:5000/uploads/${user.pan_card}`}
        alt="PAN"
        width="120"
       />
      )}

      {user.aadhaar_card && (
       <img
        src={`http://localhost:5000/uploads/${user.aadhaar_card}`}
        alt="Aadhaar"
        width="120"
       />
      )}

      {user.address_proof && (
       <img
        src={`http://localhost:5000/uploads/${user.address_proof}`}
        alt="Address"
        width="120"
       />
      )}

     </div>

     {/* ACTION BUTTONS */}

     <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

      <button
       onClick={() => approve(user.user_id)}
       style={{
        background: "#22c55e",
        border: "none",
        padding: "10px 15px",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer"
       }}
      >
       Approve
      </button>

      <button
       onClick={() => reject(user.user_id)}
       style={{
        background: "#ef4444",
        border: "none",
        padding: "10px 15px",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer"
       }}
      >
       Reject
      </button>

     </div>

    </div>

   ))}

  </AdminLayout>

 );

}

export default AdminDashboard;