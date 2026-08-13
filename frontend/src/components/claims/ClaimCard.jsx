import {
    FaUser,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaCheck,
    FaTimes,
  } from "react-icons/fa";
  import API from "../../api/axios";
  function ClaimCard({ claim, onStatusUpdate }) {
    const badgeColor =
      claim.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : claim.status === "Approved"
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700";
        const updateStatus = async (status) => {
          try {
            const token = localStorage.getItem("token");
        
            await API.put(
              `/claims/${claim.id}`,
              { status },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
        
            alert(`Claim ${status.toLowerCase()} successfully!`);
        
            if (onStatusUpdate) {
              onStatusUpdate();
            }
          } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong.");
          }
        };
    return (
      <div className="rounded-3xl border border-[#E8DCCA] bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
  
        {/* Header */}
        <div className="flex items-start justify-between">
  
          <div>
            <h2 className="text-xl font-bold text-[#111827]">
              {claim.item}
            </h2>
  
            <div className="mt-3">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
              >
                {claim.status}
              </span>
            </div>
          </div>
  
        </div>
  
        {/* Details */}
        <div className="mt-6 space-y-4 text-sm text-[#64748B]">
  
          <p className="flex items-center gap-3">
            <FaUser className="text-[#1E3A8A]" />
            {claim.claimant}
          </p>
  
          <p className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-[#1E3A8A]" />
            {claim.location}
          </p>
  
          <p className="flex items-center gap-3">
            <FaCalendarAlt className="text-[#1E3A8A]" />
            {claim.date}
          </p>
  
          <p className="rounded-xl bg-[#F7F4EE] p-3 leading-relaxed">
            {claim.reason}
          </p>
  
        </div>
  
        {/* Buttons */}
  
        {claim.status === "Pending" ? (
  
          <div className="mt-6 flex gap-3">
  
  <button
  onClick={() => updateStatus("Rejected")}
  className="flex-1 rounded-xl border border-red-200 py-3 font-medium text-red-600 transition hover:bg-red-50"
>
              <FaTimes className="mr-2 inline" />
              Reject
            </button>
  
            <button
  onClick={() => updateStatus("Approved")}
  className="flex-1 rounded-xl bg-[#1E3A8A] py-3 font-medium text-white transition hover:bg-[#17317A]"
>
              <FaCheck className="mr-2 inline" />
              Approve
            </button>
  
          </div>
  
        ) : (
  
          <button className="mt-6 w-full rounded-xl border border-[#E8DCCA] py-3 font-medium hover:bg-[#F7F4EE]">
            View Details
          </button>
  
        )}
  
      </div>
    );
  }
  
  export default ClaimCard;