import { Link } from "react-router-dom";

function AdminLayout({ children }) {

 return (

  <div style={{ display: "flex", height: "100vh" }}>

   {/* Sidebar */}

   <div style={{
    width: "220px",
    background: "#1e293b",
    color: "white",
    padding: "20px"
   }}>

    <h2>Finora Admin</h2>

    <nav style={{ marginTop: "30px" }}>

     <Link style={linkStyle} to="/admin">KYC Requests</Link>

     <Link style={linkStyle} to="/admin/users">Users</Link>

     <Link style={linkStyle} to="/admin/transactions">Transactions</Link>

    </nav>

   </div>

   {/* Main Content */}

   <div style={{
    flex: 1,
    background: "#0f172a",
    color: "white",
    padding: "30px"
   }}>

    {children}

   </div>

  </div>

 );

}

const linkStyle = {
 display: "block",
 margin: "10px 0",
 color: "white",
 textDecoration: "none"
};

export default AdminLayout;