import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import LostItemCard from "../../components/lost/LostItemCard";

function LostItems() {
  const navigate = useNavigate();

  const [lostItems, setLostItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLostItems = async (searchValue = "") => {
    try {
      setLoading(true);

      const { data } = await API.get("/items", {
        params: {
          type: "Lost",
          search: searchValue,
        },
      });

      setLostItems(data.items || []);
    } catch (error) {
      console.error("Error fetching lost items:", error);
      setLostItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load lost items
  useEffect(() => {
    fetchLostItems();
  }, []);

  // Search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLostItems(search.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Lost Items
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Browse items reported lost across campus.
          </p>
        </div>

        <button
          onClick={() => navigate("/post-lost")}
          className="rounded-xl bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17317A]"
        >
          + Report Lost Item
        </button>
      </div>

      {/* Search */}
      <div className="mt-4 flex items-center overflow-hidden rounded-2xl border border-[#E8DCCA] bg-white">
        <div className="flex h-12 w-12 items-center justify-center">
          <FaSearch className="text-[#94A3B8]" />
        </div>

        <div className="h-6 w-px bg-[#E8DCCA]" />

        <input
          type="text"
          placeholder="Search lost items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 flex-1 bg-transparent px-4 text-[#111827] outline-none placeholder:text-[#94A3B8]"
        />
      </div>

      {/* Cards */}
      <div className="mt-4 space-y-4 rounded-3xl bg-[#F7F4EE] p-2">
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-[#64748B]">
            Loading lost items...
          </div>
        ) : lostItems.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-[#64748B]">
            No lost items found.
          </div>
        ) : (
          lostItems.map((item) => (
            <LostItemCard
              key={item._id}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LostItems;