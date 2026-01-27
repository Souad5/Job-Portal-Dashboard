import { NavLink } from "react-router";
import { GoSidebarExpand } from "react-icons/go";
import { RiAdminLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa6";

const Sidebar = () => {
  const btnClass =
    "flex gap-4 items-center w-full py-2 hover:bg-gray-100 text-xl font-bold opacity-60";
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-lg">
        <div className="p-4 pb-2 flex justify-between items-center gap-2">
          <h1 className="font-extrabold text-4xl">DASHBOARD</h1>
          <GoSidebarExpand className=" top-0 right-0 text-2xl cursor-pointer" />
        </div>
        <div className="p-4 flex flex-col justify-center items-center space-y-4">
          <NavLink to="/admin" className={btnClass}>
            <RiAdminLine />
            Admin
          </NavLink>
          <NavLink to="/employer" className={btnClass}>
            <FaUserTie />
            Employer
          </NavLink>
          <NavLink to="/job-post" className={btnClass}>
            <MdWork /> Add Job Post
          </NavLink>
          <NavLink to="/all-jobs" className={btnClass}>
            <FaBriefcase />
            All Jobs
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
