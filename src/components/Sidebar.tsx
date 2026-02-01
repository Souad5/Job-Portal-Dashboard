import { NavLink } from "react-router";
import { GoSidebarExpand } from "react-icons/go";
import { GoSidebarCollapse } from "react-icons/go";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

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

  const btnClass = `flex gap-4 justify-baseline items-center w-full py-2 hover:bg-blue-100 hover:rounded-md text-xl font-bold opacity-60 hover:opacity-100 px-2 h-14 hover:scale-102 transition-transform duration-100`;

  const openSideBarClass = openSidebar ? "hidden" : "";

  return (
    <aside className={`fixed top-0 left-0 h-screen`}>
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 flex justify-between items-center gap-2 h-14">
          <NavLink
            to="/"
            className={`font-extrabold text-4xl ${openSideBarClass}`}
          >
            <span>6FigureJobs</span>
          </NavLink>
          <button
            onClick={sidebarToggle}
            className="text-2xl cursor-pointer pl-2"
          >
            {openSidebar ? <GoSidebarCollapse /> : <GoSidebarExpand />}
          </button>
        </div>

        <div className="p-4 flex-1 flex-col justify-center items-center space-y-4">
          {/* Dashboard */}

          <div>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${btnClass} ${isActive ? "bg-blue-100 rounded-md" : ""}`
              }
            >
              <MdSpaceDashboard />
              <span className={`${openSideBarClass}`}>Dashboard</span>
            </NavLink>
          </div>

          {/* Employer */}
          <div className={`${btnClass}`}>
            <div className="flex justify-between items-center gap-2 w-full">
              <div className="flex justify-center items-center gap-2">
                <FaUserTie />
                <span className={`${openSideBarClass}`}>Employers</span>
              </div>
              <div>
                <MdOutlineKeyboardArrowDown className={`${openSideBarClass}`} />
              </div>
            </div>
          </div>

          {/* Add job post */}

          <NavLink
            to="/job-post"
            className={({ isActive }) =>
              `${btnClass} ${isActive ? "bg-blue-100 rounded-md" : ""}`
            }
          >
            <MdWork />
            <span className={`${openSideBarClass}`}>Add Job Post</span>
          </NavLink>
          <NavLink
            to="/all-jobs"
            className={({ isActive }) =>
              `${btnClass} ${isActive ? "bg-blue-100 rounded-md" : ""}`
            }
          >
            <FaBriefcase />

            <span className={`${openSideBarClass}`}>All Jobs</span>
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
              <span className={`${openSideBarClass} h-14`}>
                {darkNightToggle ? "Light Mode" : " Dark Mode"}
              </span>
            </button>
          </div>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `${btnClass} ${isActive ? "bg-blue-100 rounded-md" : ""}`
            }
          >
            <CgProfile />

            <span className={`${openSideBarClass}`}>Profile</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
