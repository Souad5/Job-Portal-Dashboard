import { NavLink } from "react-router";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { MdSpaceDashboard, MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaUserTie, FaMoon } from "react-icons/fa";
import { MdWork, MdOutlineWbSunny } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const btnClass =
    "flex gap-4 items-center w-full py-2 px-2 h-14 text-xl font-bold opacity-90 hover:opacity-100 hover:bg-[#044635] transition duration-200 hover:text-white rounded-md";

  const hideText = open ? "hidden transition-all duration-150" : "";

  const isActive = ({ isActive }: { isActive: unknown }) =>
    `${btnClass} ${isActive ? "bg-[#044635] text-white" : ""}`;

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-150 ${
        open ? "w-20" : "w-72"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
        {/* Header */}
        <div className="p-4 flex justify-between items-center h-14">
          <NavLink
            to="/"
            className={`font-extrabold text-3xl text-[#044635] ${hideText}`}
          >
            6FigureJobs
          </NavLink>

          <button
            onClick={() => setOpen(!open)}
            className={`text-2xl cursor-pointer ${open ? "pl-2" : ""}`}
          >
            {open ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </button>
        </div>

        {/* Menu */}
        <div className="p-4 flex-1 space-y-4">
          <NavLink to="/dashboard" className={isActive}>
            <MdSpaceDashboard />
            <span className={hideText}>Dashboard</span>
          </NavLink>

          <NavLink to="/employer" className={isActive}>
            <FaUserTie />
            <span className={hideText}>Employers</span>
            <MdOutlineKeyboardArrowDown className={`ml-auto ${hideText}`} />
          </NavLink>

          <NavLink to="/job-post" className={isActive}>
            <MdWork />
            <span className={`${hideText} text-nowrap`}>Job Post</span>
          </NavLink>

          <NavLink to="/all-jobs" className={isActive}>
            <FaBriefcase />
            <span className={hideText}>All Jobs</span>
          </NavLink>
        </div>

        {/* Footer */}
        <div className="p-4 space-y-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex gap-4 items-center text-xl font-bold opacity-60 hover:opacity-100 pl-2"
          >
            {darkMode ? <MdOutlineWbSunny /> : <FaMoon />}
            <span className={hideText}>
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <NavLink to="/profile" className={isActive}>
            <CgProfile />
            <span className={hideText}>Profile</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
