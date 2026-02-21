import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 relative">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Main */}
      <main
        className={`
          transition-all duration-300 min-h-screen
          ml-0 md:${open ? "ml-20" : "ml-72"}
        `}
      >
        <h1 className="relative p-2">
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className="absolute top-4 left-6 md:hidden font-semibold"
          >
            <GiHamburgerMenu size={25} />
          </button>

          <div className="mt-6 md:mt-0 md:ml-2">
            <Outlet />
          </div>
        </h1>
      </main>
    </div>
  );
};

export default DashBoardLayout;
