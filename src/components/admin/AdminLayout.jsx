// src/components/admin/AdminLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-cream">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 pt-24 md:pt-6 overflow-x-auto">
        <Outlet /> {/* This renders the nested route like Speakers */}
      </div>
    </div>
  );
};

export default AdminLayout;
