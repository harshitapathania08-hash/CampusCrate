import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";

import { useEffect, useState } from "react";
import API from "../../api/axios";

function Dashboard() {
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
  
        const { data } = await API.get("/items/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchStats();
  }, []);
  return (
    <DashboardLayout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor CampusCrate activity."
      />

<div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
<StatCard title="Lost Items" value={stats.lostItems} />
<StatCard title="Found Items" value={stats.foundItems} />
<StatCard title="Pending Claims" value={stats.pendingClaims} />
<StatCard title="Returned Items" value={stats.returnedItems} />
</div>
    </DashboardLayout>
  );
}

export default Dashboard;