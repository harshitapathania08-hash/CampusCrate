import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

function LostItemCard({ item }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#E8DCCA] bg-white p-4 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-6">

        {/* Image */}
        <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-[#F7F4EE]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm text-[#94A3B8]">
              No Image
            </span>
          )}
        </div>

        {/* Details */}
        <div>
          <h2 className="text-xl font-semibold text-[#111827]">
            {item.title}
          </h2>

          <div className="mt-4 space-y-2 text-[#64748B]">

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt />
              {item.location}
            </p>

            <p className="flex items-center gap-3">
              <FaCalendarAlt />
              {new Date(item.date).toLocaleDateString()}
            </p>

            <p className="flex items-center gap-3">
              <FaTag />
              {item.category}
            </p>

          </div>
        </div>

      </div>

      {/* Right */}
      <div className="flex flex-col items-end gap-4">

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            item.status === "Open"
              ? "bg-red-100 text-red-600"
              : item.status === "Claimed"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {item.status}
        </span>

        <button
          onClick={() => navigate(`/item/${item._id}`)}
          className="rounded-xl bg-[#1E3A8A] px-5 py-2.5 font-medium text-white transition hover:bg-[#17317A]"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default LostItemCard;