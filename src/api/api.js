// src/api/api.js
import axios from "axios";

// Base instance
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://event-booking-backend-eight.vercel.app/api",
  withCredentials: true, // if you use cookies/sessions
});

// Add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
/* ===========================
   Public / User Routes
   =========================== */

// -------- Events --------
export const getAllEvents = () => api.get("/events");
export const getEventById = (id) => api.get(`/events/${id}`);

// -------- Bookings --------
export const bookEvent = (eventId, data) => api.post(`/bookings}`, data);
export const getMyBookings = () => api.get("/my-bookings");
export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);

// -------- Blogs --------
export const getAllBlogs = () => api.get("/blogs");
export const getBlogById = (id) => api.get(`/blogs/${id}`);
export const postComment = (blogId, data) =>
  api.post(`/blogs/${blogId}/comments`, data);
export const getCommentsByBlogId = (blogId) => api.get(`/blogs/${blogId}/comments`);


// -------- About --------
export const getAbout = () => api.get("/about");

// -------- Contact --------
export const sendContact = (data) => api.post("/contact", data);

/* ===========================
   Admin Routes (Backend)
   =========================== */

   // src/api/api.js

// -------- Users --------

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data; // <-- only return the array
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/admin/users", userData); // ✅ correct endpoint
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};


// Update a user by ID
export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(`/admin/users/${id}`, updatedData);
    return response.data; // <-- only return data
  } catch (error) {
    throw error.response?.data || error;
  }
};
export const getUsersCount = () => api.get("/admin/users/count");

// -------- Auth --------
export const registerUser = ({ name, email, password }) =>
  api.post("/auth/register", { name, email, password });

export const loginUser = ({ email, password }) =>
  api.post("/auth/login", { email, password });
// -------- Events --------
// src/api/api.js

// createEvent.js
// api.js
export const createEvent = (data) =>
  api.post("/admin/events", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateEvent = (id, data) =>
  api.put(`/admin/events/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });



export const deleteEvent = (id) => api.delete(`/admin/events/${id}`);
export const addEventSchedule = (eventId, data) =>
  api.post(`/admin/events/${eventId}/schedules`, data);
export const updateEventSchedule = (eventId, scheduleId, data) =>
  api.put(`/admin/events/${eventId}/schedules/${scheduleId}`, data);
export const deleteEventSchedule = (eventId, scheduleId) =>
  api.delete(`/admin/events/${eventId}/schedules/${scheduleId}`);
export const getEventsCount = () => api.get("/admin/events/count");


// -------- Speakers --------
export const getAllSpeakers = () => api.get("/speakers");
export const getSpeakerById = (id) => api.get(`/speakers/${id}`); // <-- ADD THIS
// api.js
export const createSpeaker = (data) =>
  api.post("/admin/speakers", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });


export const updateSpeaker = (id, data) => api.put(`/speakers/${id}`, data);
export const deleteSpeaker = (id) => api.delete(`/admin/speakers/${id}`);
export const addSpeakerSchedule = (speakerId, data) =>
  api.post(`/admin/speakers/${speakerId}/schedules`, data);
export const updateSpeakerSchedule = (speakerId, scheduleId, data) =>
  api.put(`/admin/speakers/${speakerId}/schedules/${scheduleId}`, data);
export const deleteSpeakerSchedule = (speakerId, scheduleId) =>
  api.delete(`/admin/speakers/${speakerId}/schedules/${scheduleId}`);
export const getSpeakersCount = () => api.get("/admin/speakers/count");


// -------- Bookings --------
export const getAllBookings = () => api.get("/admin/bookings");
export const approveBooking = (id) => api.put(`/admin/bookings/${id}/approve`);
export const rejectBooking = (id) => api.put(`/admin/bookings/${id}/reject`);
export const getBookingsCount = () => api.get("/admin/bookings/count");

// -------- Blogs --------
export const createBlog = (data) => api.post("/admin/blogs", data);
export const updateBlog = (id, data) => api.put(`/admin/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/admin/blogs/${id}`);
export const getBlogsCount = () => api.get("/admin/blogs/count");


// -------- Comments --------
export const deleteComment = (id) => api.delete(`/admin/comments/${id}`);
export const getAllComments = () => api.get(`/admin/comments`);
// api.js
export const approveComment = (id, data) =>
  api.put(`/admin/comments/${id}/approve`, data, {
    headers: { "Content-Type": "application/json" },
  });
export const getCommentsCount = () => api.get("/admin/comments/count");


// -------- About --------

// Get about (frontend)
// export const getAbout = () => api.get("admin/about");

// Create about (admin)
export const createAbout = (data) => api.post("/admin/about", data);

// Update about (admin)
export const updateAbout = (data) => api.put("/admin/about", data);
export const getAboutCount = () => api.get("/admin/about/count");

// Delete about (admin - optional)
export const deleteAbout = () => api.delete("/admin/about");


// User submits contact form
export const sendContactMessage = (data) => api.post("/contact", data);

// -------- ADMIN --------

// Get all contacts (requires admin)
export const getAllContacts = () => api.get("/admin/contacts");

// Delete a contact (requires admin)
export const deleteContact = (id) => api.delete(`/admin/contacts/${id}`);

// Mark message as read (requires admin)
export const markMessageAsRead = (id) => api.put(`/admin/contacts/${id}/read`);
export const getContactsCount = () => api.get("/admin/contacts/count");







export default api;
