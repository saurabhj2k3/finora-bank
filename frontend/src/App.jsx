import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import UploadKYC from "./pages/UploadKYC";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminTransactions from "./pages/AdminTransactions";
import AdminLogin from "./pages/AdminLogin";

function App() {

 return (

  <BrowserRouter>

   <Routes>

    <Route path="/" element={<Login />} />

    <Route path="/register" element={<Register />} />

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/send-money" element={<SendMoney />} />

    <Route path="/upload-kyc" element={<UploadKYC />} />

    <Route path="/admin" element={<AdminDashboard />} />

    <Route path="/admin/users" element={<AdminUsers />} />

    <Route path="/admin/transactions" element={<AdminTransactions />} />

    <Route path="/admin-login" element={<AdminLogin />} />
    
    

   </Routes>

  </BrowserRouter>

 );

}

export default App;