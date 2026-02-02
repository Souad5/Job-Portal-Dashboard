import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";

const DashBoardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50">
      <Sidebar open={open} setOpen={setOpen} />
      <main
        className={`transition-all duration-300 min-h-screen ${
          open ? "ml-20" : "ml-72"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoardLayout;
