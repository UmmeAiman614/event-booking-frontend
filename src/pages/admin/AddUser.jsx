// src/pages/admin/AddUser.jsx
import React, { useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import { createUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("User created successfully!");
      navigate("/admin/users"); // redirect to users table
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create user");
    }
  };

  const userFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "password", label: "Password", type: "password", required: true },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["user", "admin", "speaker"],
      required: true,
    },
  ];

  return (
    <div className="p-6">
      <AdminForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        submitLabel="Add User"
        fields={userFields}
        showSchedules={false} // hide schedules
      />
    </div>
  );
};

export default AddUser;
