import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
const DashBoard = () => {
  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashBoard;
