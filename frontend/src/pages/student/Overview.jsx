import { useEffect, useState } from "react";
import API from "../../api/axios";
import StatCard from "../../components/common/StatCard";
import {
  FaSearch,
  FaBoxOpen,
  FaHandshake,
  FaCheckCircle,
} from "react-icons/fa";

function Overview() {
  const [stats, setStats] = useState({
    lostItems: 0,
    foundItems: 0,
    pendingClaims: 0,
    returnedItems: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
  
        console.log("Token:", token);
  
        const { data } = await API.get("/items/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Dashboard Response:", data);
  
        setStats(data.stats);
  
      } catch (error) {
        console.log("Status:", error.response?.status);
        console.log("Error:", error.response?.data);
      }
    };
  
    fetchStats();
  }, []);
  return (
    <div className="space-y-12 px-2">

      <div className="mb-14">
      <h1 className="text-2xl font-bold text-[#111827]">
  Dashboard
</h1>

<p className="mt-2 text-base text-[#64748B]">
          Welcome back. Here's an overview of CampusCrate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">

        <StatCard
          title="Lost Items"
          value={stats.lostItems}
          subtitle="+12 This Week"
          icon={<FaSearch className="text-4xl text-red-600" />}
          color="bg-red-50"
        />

        <StatCard
          title="Found Items"
          value={stats.foundItems}
          subtitle="+9 Today"
          icon={<FaBoxOpen className="text-4xl text-green-600" />}
          color="bg-green-50"
        />

        <StatCard
          title="Pending Claims"
          value={stats.pendingClaims}
          subtitle="Needs Review"
          icon={<FaHandshake className="text-4xl text-amber-600" />}
          color="bg-amber-50"
        />

        <StatCard
          title="Returned Items"
          value={stats.returnedItems}
          subtitle="Completed"
          icon={<FaCheckCircle className="text-4xl text-blue-600" />}
          color="bg-blue-50"
        />

      </div>

    </div>
  );
}

export default Overview;