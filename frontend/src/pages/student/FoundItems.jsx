import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import FoundItemCard from "../../components/found/FoundItemCard";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function FoundItems() {
  const navigate = useNavigate();

  const [foundItems, setFoundItems] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFoundItems = async (searchValue = "") => {
    try {
      setLoading(true);

      const { data } = await API.get("/items", {
        params: {
          type: "Found",
          search: searchValue,
        },
      });

      setFoundItems(data.items || []);
    } catch (error) {
      console.error("Error fetching found items:", error);
      setFoundItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Load found items when page opens
  useEffect(() => {
    fetchFoundItems();
  }, []);

  // Search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchFoundItems(search.trim());
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">
            Found Items
          </h1>

          <p className="mt-1 text-sm text-[#64748B]">
            Browse all reported found items across campus.
          </p>
        </div>

        <button
          onClick={() => navigate("/post-found")}
          className="rounded-xl bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#17317A]"
        >
          + Report Found Item
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
          placeholder="Search found items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 flex-1 bg-transparent px-4 text-[#111827] outline-none placeholder:text-[#94A3B8]"
        />
      </div>

      {/* Items */}
      <div className="mt-4">
        {loading ? (
          <div className="rounded-2xl border border-[#E8DCCA] bg-white p-8 text-center text-[#64748B]">
            Loading found items...
          </div>
        ) : foundItems.length === 0 ? (
          <div className="rounded-2xl border border-[#E8DCCA] bg-white p-8 text-center text-[#64748B]">
            No found items available.
          </div>
        ) : (
          foundItems.map((item) => (
            <FoundItemCard
              key={item._id}
              item={item}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FoundItems;