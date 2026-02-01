import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
const DashBoard = () => {
  return (
    <div className="bg-gray-50">
      <Sidebar />
      <main className="ml-72">
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
