import { FaBriefcase } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa6";
import BiaxiaLineChart from "../components/Dashboard/HiringTrends";
import { NavLink } from "react-router";
import Button from "../components/ui/Button";
import { ApplicationChart } from "../components/Dashboard/ApplicationsChart";
import { RecentActivity } from "../components/Dashboard/RecentlyActivities";

const HomePage = () => {
  const data = [
    {
      icon: <FaBriefcase />,
      name: "Total Jobs",
      number: "500+",
      color: "#40189D",
    },
    {
      icon: <MdEngineering />,
      name: "Pending Jobs",
      number: "200+",
      color: "#48A9F8",
    },
    {
      icon: <FaBusinessTime />,
      name: "Approved Jobs",
      number: "50+",
      color: "#1BD084",
    },
    {
      icon: <FaRegMessage />,
      name: "Rejected Jobs",
      number: "10+",
      color: "#8BC740",
    },
  ];
  return (
    <section className="w-full p-4">
      {/* header part dashboard name and profile picture */}

      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-extrabold text-4xl">Dashboard</h1>
        </div>
        <div>
          <h1 className="font-semibold text-xl">Welcome back </h1>
        </div>
        <div className="flex justify-center items-center gap-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
            alt="profile-image"
            className="w-16 h-16"
          />
          <div>
            <h1 className="font-bold =">Mr. Souad</h1>
            <p className="opacity-70">User: Employer</p>
          </div>
        </div>
      </div>

      {/* cart sections here is cart content */}

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            style={{ backgroundColor: d.color }}
            className="hover:shadow-xl text-white p-6 text-2xl flex justify-between items-center w-full rounded-xl"
          >
            <div className="border p-2 rounded-lg border-white">{d.icon}</div>
            <div className="flex flex-col items-end">
              <p>{d.name}</p>
              <h1 className="font-bold text-3xl">{d.number}</h1>
            </div>
          </div>
        ))}
      </div>

      {/* features jobs sections */}

      <div className="grid grid-cols-3 grid-rows-5 gap-4 mt-10">
        {/*Hiring trends Charts  */}
        <div className="col-span-2 row-span-2 bg-white p-6 border border-gray-200 rounded-xl">
          <h1 className="font-bold text-xl mb-4">Hiring Trends</h1>
          <BiaxiaLineChart />
        </div>

        {/* Applications Status */}

        <div className="row-span-2 col-start-1 row-start-3 bg-white rounded-xl h-0">
          <ApplicationChart />
        </div>

        {/* Recent Activities */}

        <div className="row-span-2 col-start-2 row-start-3">
          {" "}
          <RecentActivity />{" "}
        </div>

        {/* Quick Actions */}
        <div className="col-start-3 row-start-1 bg-white rounded-xl flex flex-col justify-center items-start gap-6 border border-gray-200">
          <div className="pl-8">
            <h1 className="font-bold text-xl">Quick Actions</h1>
          </div>
          <div className="flex justify-center gap-4 w-full">
            <NavLink to="/job-post">
              <Button value={"Job Post"} />
            </NavLink>
            <NavLink to="/profile">
              <Button value={"Profile"} />
            </NavLink>
          </div>
        </div>

        <div className="row-span-2 col-start-3 row-start-2 border">5</div>

        <div className="row-span-2 col-start-3 row-start-4 border">6</div>
      </div>
    </section>
  );
};

export default HomePage;
