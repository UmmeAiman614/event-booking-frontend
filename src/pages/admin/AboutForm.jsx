// src/components/admin/AboutForm.jsx
import { useState, useEffect } from "react";
import { getAbout, updateAbout } from "../../api/api";

const AboutForm = () => {
  const [form, setForm] = useState({
    heading: "",
    description: "",
    mission: "",
    vision: "",
  });

  // Load data from DB
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await getAbout();
        if (res.data) {
          setForm({
            heading: res.data.heading || "",
            description: res.data.description || "",
            mission: res.data.mission || "",
            vision: res.data.vision || "",
          });
        }
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAbout(form);
      alert("About updated successfully!");
    } catch (err) {
      console.error("Error updating about:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-accentOrange p-6 rounded-lg shadow"
    >
      <h2 className="text-xl font-bold">Manage About Page</h2>

      <div>
        <label className="block font-semibold">Heading</label>
        <input
          type="text"
          name="heading"
          value={form.heading}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Mission</label>
        <input
          type="text"
          name="mission"
          value={form.mission}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Vision</label>
        <input
          type="text"
          name="vision"
          value={form.vision}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-primaryBlue text-white px-4 py-2 rounded hover:bg-darkNavy"
      >
        Save
      </button>
    </form>
  );
};

export default AboutForm;
