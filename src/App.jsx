// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import SpeakersPage from "./pages/Speakers";
import SpeakerDetail from "./pages/SpeakerDetail";
import SchedulePage from "./pages/SchedulePage";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import GetTickets from "./pages/GetTickets";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Bookings from "./pages/Bookings";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import Speaker from "./pages/admin/Speaker";
import AddSpeaker from "./pages/admin/AddSpeaker";
import UpdateSpeaker from "./pages/admin/UpdateSpeaker";
import Events from "./pages/admin/Events";
import AddEvent from "./pages/admin/AddEvent";
import UpdateEvent from "./pages/admin/UpdateEvent";
import Blogs from "./pages/admin/Blogs";
import AddBlog from "./pages/admin/AddBlog";
import UpdateBlog from "./pages/admin/UpdateBlog";
import AboutForm from "./pages/admin/AboutForm";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminComments from "./pages/admin/AdminComments";
import AdminContacts from "./pages/admin/AdminContacts";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Website */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="get-tickets"
            element={
              <ProtectedRoute>
                <GetTickets />
              </ProtectedRoute>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="speakers" element={<SpeakersPage />} />
          <Route path="speakers/:id" element={<SpeakerDetail />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Only Admins can access everything */}
          <Route
            path="dashboard"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <Dashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <Users />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="users/add"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AddUser />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="users/edit/:id"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <UpdateUser />
              </AdminProtectedRoute>
            }
          />

          {/* Speakers → only admins and speaker role allowed */}
          <Route
            path="speakers"
            element={
              <AdminProtectedRoute allowedRoles={["admin", "speaker"]}>
                <Speaker />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="speakers/add"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AddSpeaker />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="speakers/edit/:id"
            element={
              <AdminProtectedRoute allowedRoles={["admin", "speaker"]}>
                <UpdateSpeaker />
              </AdminProtectedRoute>
            }
          />

          {/* Admin-only sections */}
          <Route
            path="events"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <Events />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="events/add"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AddEvent />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="events/edit/:id"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <UpdateEvent />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="blogs"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <Blogs />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="blogs/add"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AddBlog />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="blogs/edit/:id"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <UpdateBlog />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="about"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AboutForm />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="bookings"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AdminBookings />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="comments"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AdminComments />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="contacts"
            element={
              <AdminProtectedRoute allowedRoles={["admin"]}>
                <AdminContacts />
              </AdminProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
