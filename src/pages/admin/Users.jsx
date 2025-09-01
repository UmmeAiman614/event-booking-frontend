// src/pages/admin/Users.jsx
import React, { useEffect, useState } from "react";
import AdminTable from "../../components/admin/AdminTable";
import { getAllUsers, deleteUser } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      console.log(data);
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setUsers([]);
      alert("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
  if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
    try {
      await deleteUser(user._id);
      alert("User deleted successfully");
      fetchUsers();
    } catch (error) {
      console.error("Delete error:", error); // 🔥 log actual error
      alert(error.message || "Failed to delete user");
    }
  }
};


  const columns = [
    { key: "name", title: "Name" },
    { key: "email", title: "Email" },
    { key: "role", title: "Role" },
    {
      key: "createdAt",
      title: "Created At",
      render: (val) => new Date(val).toLocaleString(),
    },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: (user) => navigate(`/admin/users/edit/${user._id}`),
      color: "bg-accentOrange",
    },
    { label: "Delete", onClick: handleDelete, color: "bg-red-500" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-darkNavy">Users</h1>
        <button
          onClick={() => navigate("/admin/users/add")}
          className="bg-primaryBlue text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <AdminTable columns={columns} data={users} actions={actions} />
    </div>
  );
};

export default Users;
