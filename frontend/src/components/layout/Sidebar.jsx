import {
  FaHome,
  FaSearch,
  FaBoxOpen,
  FaPlusCircle,
  FaClipboardList,
  FaHandHoldingHeart,
  FaComments,
  FaUser,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Lost Items",
      path: "/lost-items",
      icon: <FaSearch />,
    },
    {
      name: "Found Items",
      path: "/found-items",
      icon: <FaBoxOpen />,
    },
    {
      name: "Post Lost",
      path: "/post-lost",
      icon: <FaPlusCircle />,
    },
    {
      name: "Post Found",
      path: "/post-found",
      icon: <FaPlusCircle />,
    },
    {
      name: "My Reports",
      path: "/my-reports",
      icon: <FaClipboardList />,
    },
    {
      name: "Claims",
      path: "/claims",
      icon: <FaHandHoldingHeart />,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: <FaComments />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[272px] flex-col bg-[#0F172A] text-white">

      {/* Logo */}
      <div className="flex h-[162px] shrink-0 items-center border-b border-white/10 px-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1E3A8A] text-2xl">
            <FaBoxOpen />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              CampusCrate
            </h1>

            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.25em] text-slate-400">
              Lost & Found
              <br />
              System
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <div className="space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex h-[68px] items-center gap-5 rounded-2xl px-4 text-[17px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#E8DCCA] text-[#111827] shadow-sm"
                    : "text-white hover:bg-white/10"
                }`
              }
            >
              <span className="flex w-7 justify-center text-lg">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}

        </div>

      </nav>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 px-6 py-6">

        <p className="text-xs font-medium text-slate-400">
          CampusCrate v1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;