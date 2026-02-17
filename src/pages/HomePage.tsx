import { FaBriefcase, FaRegMessage, FaBusinessTime } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import BiaxiaLineChart from "../components/Dashboard/HiringTrends";
import { ApplicationChart } from "../components/Dashboard/ApplicationsChart";
import { RecentActivity } from "../components/Dashboard/RecentlyActivities";
import Notification from "../components/Dashboard/Notification";
import RecentJobs from "../components/Dashboard/RecentJobs";
import { IoPeopleOutline } from "react-icons/io5";

const stats = [
  {
    icon: <FaBriefcase />,
    label: "Total Jobs",
    value: "500+",
    accent: "indigo",
    color: "#40189D",
  },
  {
    icon: <MdEngineering />,
    label: "Pending Jobs",
    value: "200+",
    accent: "blue",
    color: "#48A9F8",
  },
  {
    icon: <FaBusinessTime />,
    label: "Approved Jobs",
    value: "50+",
    accent: "emerald",
    color: "#1BD084",
  },
  {
    icon: <FaRegMessage />,
    label: "Rejected Jobs",
    value: "10+",
    accent: "rose",
  },
  {
    icon: <IoPeopleOutline />,
    label: "Total Recruiter",
    value: "10+",
    accent: "rose",
    color: "#8BC740",
  },
];

const HomePage = () => {
  return (
    <section className="px-4 md:px-8 py-6 space-y-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Overview of your hiring activity</p>
        </div>

        <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm ring-1 ring-slate-200">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-medium text-slate-900">Mr. Souad</p>
            <p className="text-xs text-slate-500">Employer</p>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            style={{ background: s.color }}
            className={`
              bg-white rounded-2xl p-6
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
        <div className="xl:col-span-7 bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
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
