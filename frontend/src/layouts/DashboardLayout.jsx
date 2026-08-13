import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">

      <Sidebar />

      <div className="ml-[272px] flex min-h-screen flex-col">

        <Navbar />

        <main className="flex-1 bg-[#F7F4EE] px-6 py-8">

          <div className="w-full">
            <Outlet />
          </div>

        </main>

      </div>

    </div>
  );
}

export default DashboardLayout;