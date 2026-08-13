import { useEffect, useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();

  // Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const { data } = await API.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(data.user);
      } catch (error) {
        console.error("Error fetching navbar user:", error);
      }
    };

    fetchUser();
  }, []);

  // Search items
  useEffect(() => {
    const searchItems = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        setSearching(true);

        const { data } = await API.get("/items", {
          params: {
            search: search.trim(),
          },
        });

        setResults(data.items || []);
      } catch (error) {
        console.error("Error searching items:", error);
        setResults([]);
      } finally {
        setSearching(false);
      }
    };

    const delay = setTimeout(() => {
      searchItems();
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  const handleItemClick = (item) => {
    setSearch("");
    setResults([]);

    navigate(`/item/${item._id}`);
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setShowProfileMenu(false);

    navigate("/login");
  };

  return (
    <div className="flex h-20 items-center justify-between rounded-3xl border border-[#E8DCCA] bg-[#FFFDF9] px-8 shadow-sm">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#111827]">
          Welcome Back 👋
        </h1>

        <p className="mt-1 text-sm text-[#64748B]">
          Manage lost and found items across the campus.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative hidden w-80 lg:block">

          <div className="flex items-center overflow-hidden rounded-2xl border border-[#E8DCCA] bg-white shadow-sm">

            <div className="flex h-12 w-12 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-[#94A3B8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                />
              </svg>
            </div>

            <div className="h-6 w-px bg-[#E8DCCA]" />

            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[#94A3B8]"
            />

          </div>

          {/* Search Results */}
          {search.trim() && (
            <div className="absolute left-0 right-0 top-14 z-50 max-h-80 overflow-y-auto rounded-2xl border border-[#E8DCCA] bg-white shadow-lg">

              {searching ? (
                <div className="p-4 text-center text-sm text-[#64748B]">
                  Searching...
                </div>
              ) : results.length > 0 ? (
                results.map((item) => (
                  <button
                    key={item._id}
                    onClick={() => handleItemClick(item)}
                    className="w-full border-b border-[#F1EADF] px-4 py-3 text-left transition hover:bg-[#F7F4EE]"
                  >
                    <p className="font-semibold text-[#111827]">
                      {item.title}
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      {item.type} • {item.category} • {item.location}
                    </p>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-[#64748B]">
                  No items found.
                </div>
              )}

            </div>
          )}

        </div>

        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8DCCA] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          <FaBell className="text-lg text-[#1E3A8A]" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 rounded-2xl border border-[#E8DCCA] bg-white px-4 py-2 shadow-sm transition hover:shadow-md"
          >
            <FaUserCircle className="text-5xl text-[#1E3A8A]" />

            <div className="text-left">
              <h3 className="font-semibold text-[#111827]">
                {user?.fullName || "User"}
              </h3>

              <p className="text-sm text-[#64748B]">
                {user?.role === "admin" ? "Admin" : "Student"}
              </p>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-16 z-50 w-52 rounded-2xl border border-[#E8DCCA] bg-white p-2 shadow-lg">

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  navigate("/profile");
                }}
                className="w-full rounded-xl px-4 py-3 text-left text-sm text-[#111827] transition hover:bg-[#F7F4EE]"
              >
                View Profile
              </button>

              <button
                onClick={handleSignOut}
                className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Sign Out
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Navbar;