import { NavLink } from "react-router";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [darkNightToggle, setDarkNightToggle] = useState(false);

  const darkNightToggleButton = () => {
    setDarkNightToggle(!darkNightToggle);
  };

  const sidebarToggle = () => {
    setOpenSidebar(!openSidebar);
  };

  const btnClass = `flex gap-4 justify-baseline items-center w-full py-2 hover:bg-blue-100 hover:rounded-md text-xl font-bold opacity-60 hover:opacity-100 px-2 h-14`;

  return (
    <aside className={`h-screen`}>
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 flex justify-between items-center gap-2 h-14">
          <NavLink
            to="/"
            className={`font-extrabold text-4xl ${openSidebar ? "hidden" : ""}`}
          >
            <span>Dashboard</span>
          </NavLink>
          <button
            onClick={sidebarToggle}
            className="text-2xl cursor-pointer pl-2"
          >
            {openSidebar ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </button>
        </div>
        <div className="p-4 flex-1 flex-col justify-center items-center space-y-4">
          <NavLink to="/admin" className={`${btnClass}`}>
            <RiAdminLine />
            <span className={`${openSidebar ? "hidden " : ""}`}>Admin</span>
          </NavLink>
          <NavLink to="/employer" className={btnClass}>
            <FaUserTie />

            <span className={`${openSidebar ? "hidden" : ""}`}>Employer</span>
          </NavLink>
          <NavLink to="/job-post" className={btnClass}>
            <MdWork />
            <span className={`${openSidebar ? "hidden" : ""}`}>
              Add Job Post
            </span>
          </NavLink>
          <NavLink to="/all-jobs" className={btnClass}>
            <FaBriefcase />

            <span className={`${openSidebar ? "hidden" : ""}`}>All Jobs</span>
          </NavLink>
        </div>
        <div className="p-4">
          <div
            className={`flex gap-4 items-center pl-2 text-xl font-bold opacity-60 hover:opacity-100`}
          >
            <button
              className="cursor-pointer h-14"
              onClick={darkNightToggleButton}
            >
              {darkNightToggle ? <MdOutlineWbSunny /> : <FaMoon />}
            </button>
            <button>
              <span className={`${openSidebar ? "hidden" : ""} h-14`}>
                {darkNightToggle ? "Light Mode" : " Dark Mode"}
              </span>
            </button>
          </div>
          <NavLink to="profile" className={btnClass}>
            <CgProfile />

            <span className={`${openSidebar ? "hidden" : ""}`}>Profile</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
