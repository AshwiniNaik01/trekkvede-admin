import {
  FaMountain,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Treks",
      value: 12,
      icon: <FaMountain className="text-3xl text-blue-500" />,
      bg: "bg-blue-100",
    },
    {
      title: "Bookings",
      value: 89,
      icon: <FaClipboardList className="text-3xl text-green-500" />,
      bg: "bg-green-100",
    },
    {
      title: "Users",
      value: 340,
      icon: <FaUsers className="text-3xl text-purple-500" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 bg-white`}
          >
            <div
              className={`p-4 rounded-full ${stat.bg} flex items-center justify-center`}
            >
              {stat.icon}
            </div>
            <div>
              <h3 className="text-gray-500 font-medium">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
