import { Routes, Route } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";
import Notifications from "../pages/student/Notifications";
// Public Pages
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// Auth Pages
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// Student Pages
import Overview from "../pages/student/Overview";
import LostItems from "../pages/student/LostItems";
import FoundItems from "../pages/student/FoundItems";
import PostLost from "../pages/student/PostLost";
import PostFound from "../pages/student/PostFound";
import ItemDetails from "../pages/student/ItemDetails";
import MyReports from "../pages/student/MyReports";
import Claims from "../pages/student/Claims";
import Messages from "../pages/student/Messages";
import Profile from "../pages/student/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Reports from "../pages/admin/Reports";
import AdminClaims from "../pages/admin/Claims";

function AppRoutes() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Student Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Overview />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/post-lost" element={<PostLost />} />
        <Route path="/post-lost/:id" element={<PostLost />} />
        <Route path="/post-found" element={<PostFound />} />
        <Route path="/post-found/:id" element={<PostFound />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/my-reports" element={<MyReports />} />
        <Route path="/claims" element={<Claims />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/reports" element={<Reports />} />
      <Route path="/admin/claims" element={<AdminClaims />} />

    </Routes>
  );
}

export default AppRoutes;