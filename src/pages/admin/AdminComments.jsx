import { useState, useEffect } from "react";
import { getAllComments, approveComment, deleteComment } from "../../api/api";
import AdminTable from "../../components/admin/AdminTable";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await getAllComments();
      console.log("Fetched comments successfully:", response);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch comments:");

      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }

      setError("Failed to fetch comments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleApprove = async (comment) => {
    try {
      console.log("Sending approve request for comment ID:", comment._id);
      console.log("Payload:", { status: "approved" });

      const res = await approveComment(comment._id, { status: "approved" });

      console.log("Approve response:", res);
      console.log("Updated comment:", res.data.comment);

      fetchComments(); // refresh table after approval
    } catch (err) {
      console.error("Approve failed:");

      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    }
  };

  const handleDelete = async (comment) => {
    try {
      console.log("Deleting comment ID:", comment._id);

      const res = await deleteComment(comment._id);

      console.log("Delete response:", res);

      fetchComments(); // refresh table after deletion
    } catch (err) {
      console.error("Delete failed:");

      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    }
  };

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
    <h1 className="text-2xl font-bold mb-4">Comments</h1>
    <AdminTable
      columns={[
        { key: "name", title: "Name" },
        { key: "email", title: "Email" },
        { key: "content", title: "Content" },
        { key: "status", title: "Status" },
        { key: "blog", title: "Blog", render: (blog) => blog?.title || "-" },
      ]}
      data={comments}
      actions={[
        {
          label: "Approve",
          color: "bg-green-500",
          onClick: handleApprove,
        },
        {
          label: "Delete",
          color: "bg-red-500",
          onClick: handleDelete,
        },
      ]}
    />
    </>
  );
};

export default AdminComments;
