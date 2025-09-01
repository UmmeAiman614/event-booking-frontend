// src/pages/admin/UpdateUser.jsx
import React, { useEffect, useState } from "react";
import AdminForm from "../../components/admin/AdminForm";
import { updateUser, getAllUsers } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [formData, setFormData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getAllUsers();
        const user = users.find((u) => u._id === id);
        if (!user) {
          alert("User not found");
          navigate("/admin/users");
        } else {
          setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
          });
        }
      } catch (error) {
        console.error(error);
        alert("Failed to fetch user data");
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, formData);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update user");
    }
  };

  if (!formData) return <p>Loading...</p>;

  const userFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
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
        submitLabel="Update User"
        fields={userFields}
        showSchedules={false} // hide schedules
      />
    </div>
  );
};

export default UpdateUser;
