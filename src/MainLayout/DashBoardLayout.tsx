import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";

const DashBoardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative transition-colors duration-300 ease-in-out">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        ></div>
      )}

      {/* Main */}
      <main
        className={`
          transition-all duration-300 min-h-screen ${open ? "md:ml-20" : "md:ml-72"}
        `}
      >
        <div className="relative">
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="absolute -top-2 left-6 md:hidden font-semibold cursor-pointer active:scale-95"
          >
            <GiHamburgerMenu size={25} />
          </button>

          <div className={`mt-4 md:mt-0`}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashBoardLayout;
