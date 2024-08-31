import { Route, Routes } from "react-router-dom";
import Header from "./pages/header/Header";
import DashBoard from "./pages/dashboard/DashBoard";
import PostUser from "./pages/Employee/PostUser";
import UpdateUser from "./pages/Employee/UpdateUser";

export default function App() {
  return (
    <div className="body">
      <Header />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/employee" element={<PostUser />} />
        <Route path="/employee/:id" element={<UpdateUser />} />
      </Routes>
    </div>
  );
}
