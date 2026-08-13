import {
    FaSearch,
    FaBoxOpen,
    FaHandshake,
    FaCheckCircle,
  } from "react-icons/fa";
  
  const activities = [
    {
      title: "New Lost Item Report",
      description: "Black Wallet reported near Library",
      time: "10 mins ago",
      icon: <FaSearch />,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Item Found",
      description: "Water Bottle found in Cafeteria",
      time: "30 mins ago",
      icon: <FaBoxOpen />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Claim Approved",
      description: "Student ID successfully claimed",
      time: "1 hour ago",
      icon: <FaHandshake />,
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Item Returned",
      description: "Laptop returned to owner",
      time: "Today",
      icon: <FaCheckCircle />,
      color: "bg-blue-100 text-blue-600",
    },
  ];
  
  function RecentActivity() {
    return (
      <div className="rounded-3xl border border-[#E8DCCA] bg-white p-8 shadow-sm">
  
        <h2 className="mb-6 text-2xl font-bold text-[#111827]">
          Recent Activity
        </h2>
  
        <div className="space-y-5">
  
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-[#F2E8DA] p-4 transition hover:bg-[#FAF8F5]"
            >
              <div className="flex items-center gap-4">
  
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.color}`}
                >
                  {activity.icon}
                </div>
  
                <div>
                  <h3 className="font-semibold text-[#111827]">
                    {activity.title}
                  </h3>
  
                  <p className="text-sm text-[#64748B]">
                    {activity.description}
                  </p>
                </div>
  
              </div>
  
              <span className="text-sm text-[#94A3B8]">
                {activity.time}
              </span>
  
            </div>
          ))}
  
        </div>
  
      </div>
    );
  }
  
  export default RecentActivity;