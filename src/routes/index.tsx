import { Route, Routes } from "react-router-dom";
import EditBill from "../pages/EditBill";
import EditProfile from "../pages/EditProfile";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<EditProfile />} />
      <Route path="/home" element={<Home />} />
      <Route path="/editProfile" element={<EditProfile />} />
      <Route path="/add" element={<EditBill />} />
      <Route path="/edit/:id" element={<EditBill />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
