import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ReportCard from "../../components/reports/ReportCard";



function MyReports() {
  const navigate = useNavigate();

const [reports, setReports] = useState([]);
const [search, setSearch] = useState("");
const [filter, setFilter] = useState("All");
const [showMenu, setShowMenu] = useState(false);
useEffect(() => {
  const fetchReports = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/items/my-reports", {
       
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setReports(data.items);
      console.log("Reports:", data.items);
    } catch (error) {
      console.error(error);
    }
  };

  fetchReports();
}, []);
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this report?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(`/items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setReports((prev) => prev.filter((item) => item._id !== id));
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Unable to delete report.");
  }
};

const filteredReports = reports.filter((report) => {
  const searchTerm = search.toLowerCase();

  const matchesSearch =
    report.title?.toLowerCase().includes(searchTerm) ||
    report.location?.toLowerCase().includes(searchTerm) ||
    report.category?.toLowerCase().includes(searchTerm) ||
    report.type?.toLowerCase().includes(searchTerm) ||
    report.status?.toLowerCase().includes(searchTerm);

  const matchesFilter =
    filter === "All" ||
    report.type === filter ||
    report.status === filter;

  return matchesSearch && matchesFilter;
});
  return (
    <div className="space-y-8">

      {/* Heading */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            My Reports
          </h1>

          <p className="mt-2 text-base text-[#64748B]">
            Manage all your lost and found reports.
          </p>
        </div>

        <div className="relative">
  <button
    onClick={() => setShowMenu(!showMenu)}
    className="rounded-2xl bg-[#1E3A8A] px-6 py-3 font-semibold text-white transition hover:bg-[#17317A]"
  >
    + New Report
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-[#E8DCCA] bg-white shadow-lg">

      <button
       onClick={() => {
        setShowMenu(false);
        navigate("/post-lost");
      }}
        className="block w-full px-5 py-4 text-left hover:bg-[#F7F4EE]"
      >
        📍 Report Lost Item
      </button>

      <button
       onClick={() => {
        setShowMenu(false);
        navigate("/post-found");
      }}
        className="block w-full px-5 py-4 text-left hover:bg-[#F7F4EE]"
      >
        📍 Report Found Item
      </button>

    </div>
  )}
</div>

      </div>

      {/* Summary Cards */}
   {/* Summary */}

<div className="overflow-hidden rounded-3xl border border-[#E8DCCA] bg-white shadow-sm">

<div className="grid grid-cols-4">

  <div className="flex flex-col items-center justify-center py-7">
    <p className="text-sm text-[#64748B]">Total Reports</p>
    <h2 className="mt-2 text-4xl font-bold text-[#111827]">{reports.length}</h2>
  </div>

  <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
    <p className="text-sm text-[#64748B]">Lost</p>
    <h2 className="mt-2 text-4xl font-bold text-red-500">{reports.filter((r) => r.type === "Lost").length}</h2>
  </div>

  <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
    <p className="text-sm text-[#64748B]">Found</p>
    <h2 className="mt-2 text-4xl font-bold text-green-500">{reports.filter((r) => r.type === "Found").length}</h2>
  </div>

  <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
    <p className="text-sm text-[#64748B]">Returned</p>
    <h2 className="mt-2 text-4xl font-bold text-blue-500">{reports.filter((r) => r.status === "Returned").length}</h2>
  </div>

</div>

</div>

      {/* Search + Filter */}
      <div className="flex gap-4">

        <div className="flex flex-1 items-center overflow-hidden rounded-2xl border border-[#E8DCCA] bg-white">

          <div className="flex h-12 w-12 items-center justify-center">
            <FaSearch className="text-[#94A3B8]" />
          </div>

          <div className="h-6 w-px bg-[#E8DCCA]"></div>

          <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder="Search reports..."
  className="h-12 flex-1 bg-transparent px-4 outline-none"
/>

        </div>

        <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
  className="rounded-2xl border border-[#E8DCCA] bg-white px-5 outline-none"
>
  <option value="All">All Reports</option>
  <option value="Lost">Lost</option>
  <option value="Found">Found</option>
  <option value="Pending">Pending</option>
  <option value="Returned">Returned</option>
</select>
      </div>

      {/* Reports */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {filteredReports.map((report) => (
  <ReportCard
  key={report._id}
  report={{
    id: report._id,
    name: report.title,
    location: report.location,
    date: new Date(report.date).toLocaleDateString(),
    type: report.type,
    status: report.status,
    category: report.category,
    description: report.description,
  }}
  onDelete={handleDelete}
/>
))}

</div>

    </div>
  );
}

export default MyReports;