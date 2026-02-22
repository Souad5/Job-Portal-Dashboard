import { NavLink } from "react-router";
import { GoSidebarExpand, GoSidebarCollapse } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { FaUserTie, FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

type SidebarProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const btnClass = `flex items-center w-full py-2 h-14 text-xl font-bold
  opacity-90 hover:opacity-100 hover:bg-[#3c7365]
  transition duration-200 hover:text-white rounded-md
  ${open ? "md:justify-center md:px-0 justify-start gap-4 px-2" : "gap-4 px-2 justify-start"}
`;

  const hideText = open ? "md:hidden transition-all duration-150 " : "";

  const isActive = ({ isActive }: { isActive: boolean }) =>
    `${btnClass} ${isActive ? "bg-[#044635] text-white " : ""}`;

  return (
    <aside
      className={`
    fixed top-0 left-0 h-screen z-40 
    transition-all duration-200
    bg-white
    ${open ? " md:w-20" : "md:w-72"}
    ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0 "}
  `}
    >
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
        {/* Header */}
        <div className="p-4 flex justify-between  items-center gap-2 h-14">
          <h1
            className={`font-extrabold text-3xl text-[#044635] ${hideText} relative`}
          >
            6FigureJobs
          </h1>

          {/* Mobile close button */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-2xl text-gray-700"
          >
            <TbLayoutSidebarLeftCollapse size={30} />
          </button>

          {/* Desktop collapse button */}
          <button
            onClick={() => setOpen(!open)}
            className={`text-2xl cursor-pointer hidden md:block ${open ? "pl-2" : ""}`}
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

          <NavLink to="/recruiter-page" className={isActive}>
            <FaUserTie />
            <span className={hideText}>Recruiters</span>
          </NavLink>

          <NavLink to="/all-jobs" className={isActive}>
            <FaBriefcase />
            <span className={hideText}>All Jobs</span>
          </NavLink>
        </div>

        {/* Footer */}
        <div className="p-4 space-y-4">
          <button onClick={() => setDarkMode(!darkMode)} className={btnClass}>
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
