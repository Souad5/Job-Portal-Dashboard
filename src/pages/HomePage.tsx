import { FaBriefcase, FaMessage, FaBusinessTime } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import BiaxiaLineChart from "../components/Dashboard/HiringTrends";
import { ApplicationChart } from "../components/Dashboard/ApplicationsChart";
import { RecentActivity } from "../components/Dashboard/RecentlyActivities";
import Notification from "../components/Dashboard/Notification";
import RecentJobs from "../components/Dashboard/RecentJobs";
import { IoPeopleOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";

const stats = [
  {
    icon: <FaBriefcase size={20} />,
    label: "Total Jobs",
    value: "500+",
    accent: "indigo",
  },
  {
    icon: <MdEngineering size={20} />,
    label: "Pending Jobs",
    value: "200+",
    accent: "yellow",
  },
  {
    icon: <FaBusinessTime size={20} />,
    label: "Approved Jobs",
    value: "50+",
    accent: "emerald",
  },
  {
    icon: <FaMessage size={20} />,
    label: "Rejected Jobs",
    value: "10+",
    accent: "rose",
  },
  {
    icon: <IoPeopleOutline size={20} />,
    label: "Total Recruiter",
    value: "10+",
    accent: "amber",
  },
];

const HomePage = () => {
  return (
    <section className="px-4 py-6 space-y-10 dark:bg-slate-900 transition-colors duration-500 ease-in-out">
      {/* Header */}
      <header className="flex flex-row items-start justify-between gap-4">
        <div>
          <h1 className="md:text-3xl text-xl font-semibold text-[#044635] dark:text-[#0af0b4]">
            Dashboard
          </h1>
          <p className="opacity-80 dark:opacity-100">
            Overview of your hiring activity
          </p>
        </div>

        <div
          className="flex items-center gap-6 p-3 cursor-pointer "
          title="Notifications"
        >
          <div className="relative inline-flex items-center">
            {/* Bell */}
            <IoIosNotifications
              size={24}
              className="text-slate-700 dark:text-white animate-bell opacity-70 hover:opacity-105 transition-hover duration-200"
            />

            {/* Badge */}
            <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-semibold animate-pulse opacity-100 text-white">
              1
            </span>
          </div>
          <div>
            <p
              className="font-medium text-slate-900 cursor-pointer opacity-70 dark:opacity-80 hover:opacity-105"
              title="Logout"
            >
              <IoIosLogOut size={25} className="dark:text-white" />
            </p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 dark:bg-slate-800">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`
               rounded-2xl p-6
              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
              ring-1 ring-slate-200/70
              transition hover:-translate-y-1 hover:shadow-lg
            `}
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center
              bg-${s.accent}-100 text-${s.accent}-600 mb-4`}
            >
              {s.icon}
            </div>
            <p className="text-sm">{s.label}</p>
            <h2 className="text-2xl font-semibold">{s.value}</h2>
          </div>
        ))}
      </section>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Hiring Trends */}
        <div className="xl:col-span-7 dark:bg-slate-800 rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-lg font-semibold mb-4">Hiring Trends</h3>
          <BiaxiaLineChart />
        </div>

        {/* Quick Insights */}
        <div className="xl:col-span-5 space-y-6">
          <ApplicationChart />
          <Notification />
        </div>

        {/* Bottom Section */}
        <div className="xl:col-span-7">
          <RecentActivity />
        </div>

        <div className="xl:col-span-5">
          <RecentJobs />
        </div>
      </section>
    </section>
  );
};

export default HomePage;
