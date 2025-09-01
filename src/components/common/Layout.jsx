// src/components/common/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow pt-20">
        <Outlet />  {/* <-- This is where your page content renders */}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
