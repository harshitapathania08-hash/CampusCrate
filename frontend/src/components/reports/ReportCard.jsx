import { useNavigate } from "react-router-dom";
import {
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaEye,
    FaEdit,
    FaTrash,
  } from "react-icons/fa";
  
  function ReportCard({ report, onDelete }) {
    const navigate = useNavigate();
    const badgeColor =
      report.status === "Pending"
        ? "bg-yellow-100 text-yellow-700"
        : report.status === "Returned"
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700";
  
    return (
        <div className="rounded-3xl border border-[#E8DCCA] bg-white px-6 py-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

{/* Header */}

<div>

<h2 className="text-lg font-semibold text-[#111827] leading-snug">
  {report.name}
</h2>

  <div className="mt-3">
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
    >
      {report.status}
    </span>
  </div>

</div>
  
        {/* Details */}
        <div className="mt-6 space-y-4 text-sm text-[#64748B]">
  
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#1E3A8A] shrink-0" />
            <span>{report.location}</span>
          </p>
  
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-[#1E3A8A] shrink-0" />
            <span>{report.date}</span>
          </p>
  
          <p>
            <span className="font-medium text-[#111827]">Type:</span>{" "}
            {report.type}
          </p>
  
        </div>
  
        {/* Buttons */}
        <div className="mt-8 flex gap-2">
  
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DCCA] hover:bg-[#F7F4EE]">
  <FaEye />
</button>

<button
  onClick={() =>
    navigate(
      report.type === "Lost"
        ? `/post-lost/${report.id}`
        : `/post-found/${report.id}`
    )
  }
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DCCA] hover:bg-[#F7F4EE]"
>
  <FaEdit />
</button>

<button
  onClick={() => onDelete(report.id)}
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-200 text-red-600 hover:bg-red-50"
>
  <FaTrash />
</button>
  
        </div>
  
      </div>
    );
  }
  
  export default ReportCard;