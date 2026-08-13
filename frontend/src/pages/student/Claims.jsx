import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import API from "../../api/axios";
import ClaimCard from "../../components/claims/ClaimCard";
function Claims() {
  const [claims, setClaims] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const fetchClaims = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
    
      const { data } = await API.get("/claims/my-claims", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
      console.log("Claims Response:", data);
    
      setClaims(data.claims);
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log(error);
    }
  };
  useEffect(() => {
 
  
    fetchClaims();
  }, []);
  const filteredClaims = claims.filter((claim) => {
    const query = search.toLowerCase();
  
    const matchesSearch =
      claim.item?.title?.toLowerCase().includes(query) ||
      claim.claimant?.fullName?.toLowerCase().includes(query) ||
      claim.message?.toLowerCase().includes(query);
  
    const matchesStatus =
      statusFilter === "All Status" ||
      claim.status === statusFilter;
  
    return matchesSearch && matchesStatus;
  });
  return (
    <div className="space-y-8">

      {/* Heading */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold text-[#111827]">
            Claims
          </h1>

          <p className="mt-2 text-base text-[#64748B]">
            Review and manage ownership claims.
          </p>

        </div>

      </div>
{/* Summary */}

<div className="overflow-hidden rounded-3xl border border-[#E8DCCA] bg-white shadow-sm">

  <div className="grid grid-cols-4">

    <div className="flex flex-col items-center justify-center py-7">
      <p className="text-sm text-[#64748B]">Total Claims</p>
      <h2 className="mt-2 text-4xl font-bold text-[#111827]">
  {claims.length}
</h2>
    </div>

    <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
      <p className="text-sm text-[#64748B]">Pending</p>
      <h2 className="mt-2 text-4xl font-bold text-yellow-500">
  {claims.filter((c) => c.status === "Pending").length}
</h2>
    </div>

    <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
      <p className="text-sm text-[#64748B]">Approved</p>
      <h2 className="mt-2 text-4xl font-bold text-green-500">
  {claims.filter((c) => c.status === "Approved").length}
</h2>
    </div>

    <div className="flex flex-col items-center justify-center border-l border-[#E8DCCA] py-7">
      <p className="text-sm text-[#64748B]">Rejected</p>
      <h2 className="mt-2 text-4xl font-bold text-red-500">
  {claims.filter((c) => c.status === "Rejected").length}
</h2>
    </div>

  </div>

</div>
      {/* Search */}

      <div className="flex gap-4">

        <div className="flex flex-1 items-center overflow-hidden rounded-2xl border border-[#E8DCCA] bg-white">

          <div className="flex h-12 w-12 items-center justify-center">
            <FaSearch className="text-[#94A3B8]" />
          </div>

          <div className="h-6 w-px bg-[#E8DCCA]" />

          <input
  type="text"
  placeholder="Search claims..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="h-12 flex-1 bg-transparent px-4 outline-none"
/>

        </div>

        <select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
  className="rounded-2xl border border-[#E8DCCA] bg-white px-5 outline-none"
>

          <option>All Status</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>

        </select>

      </div>

      {/* Claims */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

      {filteredClaims.map((claim) => (
        <ClaimCard
  key={claim._id}
  claim={{
    id: claim._id,
    item: claim.item?.title,
    claimant: claim.claimant?.fullName,
    location: claim.item?.location,
    date: new Date(claim.createdAt).toLocaleDateString(),
    reason: claim.message,
    status: claim.status,
  }}
  onStatusUpdate={fetchClaims}
/>
))}

      </div>

    </div>
  );
}

export default Claims;