import { FaBriefcase } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { FaBusinessTime } from "react-icons/fa6";

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
      name: "IT Jobs",
      number: "200+",
      color: "#48A9F8",
    },
    {
      icon: <FaBusinessTime />,
      name: "BBA Jobs",
      number: "50+",
      color: "#1BD084",
    },
    {
      icon: <FaRegMessage />,
      name: "Message",
      number: "20+",
      color: "#8BC740",
    },
  ];
  return (
    <section className="w-full p-4">
      <div className="flex justify-between items-start">
        <h1 className="font-bold text-2xl">Job Portal</h1>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"
          alt="profile-image"
          className="w-16 h-16"
        />
      </div>
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
    </section>
  );
};

export default HomePage;
