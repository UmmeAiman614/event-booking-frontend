// src/pages/admin/AddSpeaker.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminForm from "../../components/admin/AdminForm";
import { createSpeaker } from "../../api/api";

const AddSpeaker = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    expertise: "",
    bio: "",
    photo: null, // store uploaded file
  });

 const speakerFields = [
  { 
    label: "Name", 
    name: "name", 
    type: "text", 
    required: true, 
    minLength: 2, 
    maxLength: 50 
  },
  { 
    label: "Username", 
    name: "username", 
    type: "text", 
    required: true, 
    minLength: 3, 
    maxLength: 30 
  },
  { 
    label: "Email", 
    name: "email", 
    type: "email", 
    required: true, 
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  { 
    label: "Password", 
    name: "password", 
    type: "password", 
    required: true, 
    minLength: 6, 
  },
  { 
    label: "Bio", 
    name: "bio", 
    type: "textarea", 
    fullWidth: true, 
    minLength: 10 
  },
  { 
    label: "Expertise", 
    name: "expertise", 
    type: "text", 
    minLength: 2 
  },
  { 
    label: "Photo", 
    name: "photo", 
    type: "file", 
    required: true, 
    validate: (file) => {
      if (!(file instanceof File)) return "Please upload a photo";
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) return "Only JPG/PNG allowed";
      if (file.size > 2 * 1024 * 1024) return "Photo must be under 2MB";
      return null;
    }
  },
];


const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData();
  for (const key in formData) {
    if (key === "schedules") {
      data.append("schedules", JSON.stringify(formData[key])); // stringify schedules
    } else if (formData[key] !== null) {
      data.append(key, formData[key]);
    }
  }

  data.append("role", "speaker"); // explicitly add role

  try {
    await createSpeaker(data); // send FormData to backend
    navigate("/admin/speakers"); // redirect after success
  } catch (err) {
    console.error("Error creating speaker:", err.response?.data || err.message);
    alert("Failed to add speaker");
  }
};


  // Handle normal inputs and file input
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <AdminForm
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      submitLabel="Add Speaker"
      fields={speakerFields}
      handleChange={handleChange} // pass custom handler for file support
    />
  );
};

export default AddSpeaker;
