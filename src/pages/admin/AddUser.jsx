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
  console.log("📤 Sending formData:", formData); // ADD THIS
  console.log("📤 Password length:", formData.password.length); // ADD THIS
  try {
    await createUser(formData);
    alert("User created successfully!");
    navigate("/admin/users");
  } catch (error) {
    console.error(error);
    alert(error.message || "Failed to create user");
  }
};

  const userFields = [
  { 
    name: "name", 
    label: "Name", 
    type: "text", 
    required: true, 
    minLength: 2, 
    maxLength: 50 
  },
  { 
    name: "email", 
    label: "Email", 
    type: "email", 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // basic email regex
  },
  { 
    name: "password", 
    label: "Password", 
    type: "password", 
    required: true, 
    minLength: 6, 
  },
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
