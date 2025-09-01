// src/components/admin/AdminForm.jsx
import React from "react";

const AdminForm = ({
  formData = {},
  setFormData,
  onSubmit,
  submitLabel,
  fields = [],
  showSchedules = true,
}) => {
  const schedules = formData.schedules || [];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleScheduleChange = (idx, e) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[idx] = { ...updatedSchedules[idx], [e.target.name]: e.target.value };
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [...schedules, { title: "", description: "", startTime: "", endTime: "" }],
    });
  };

  const removeSchedule = (idx) => {
    const updatedSchedules = [...schedules];
    updatedSchedules.splice(idx, 1);
    setFormData({ ...formData, schedules: updatedSchedules });
  };

  if (!formData) return null;

  return (
    <div className="bg-cream p-4 md:p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-darkNavy mb-4">{submitLabel}</h2>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
              <label className="block text-neutralDark mb-1">{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  rows={field.rows || 3}
                  className="border border-neutralDark/50 rounded p-2 w-full bg-white text-darkNavy"
                  required={field.required}
                />
              ) : field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="border border-neutralDark/50 rounded p-2 w-full bg-white text-darkNavy"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.type !== "file" ? formData[field.name] || "" : undefined}
                  onChange={field.readOnly ? undefined : handleChange}
                  className={`border border-neutralDark/50 rounded p-2 w-full bg-white text-darkNavy ${
                    field.readOnly ? "bg-gray-200 cursor-not-allowed" : ""
                  }`}
                  required={field.required}
                  readOnly={field.readOnly || false}
                />
              )}
            </div>
          ))}
        </div>

        {/* Schedules Section */}
        {showSchedules && (
          <div>
            <h3 className="text-darkNavy font-semibold mb-2">Schedules</h3>
            <div className="space-y-4">
              {schedules.map((schedule, idx) => (
                <div
                  key={idx}
                  className="bg-primaryBlue/10 p-4 rounded relative space-y-2 flex flex-col sm:flex-col md:flex-col"
                >
                  <button
                    type="button"
                    onClick={() => removeSchedule(idx)}
                    className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>

                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                    {["title", "description", "startTime", "endTime"].map((key) => (
                      <div key={key}>
                        <label className="block text-neutralDark mb-1">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type={key.includes("Time") ? "datetime-local" : "text"}
                          name={key}
                          value={schedule[key] || ""}
                          onChange={(e) => handleScheduleChange(idx, e)}
                          className="border border-neutralDark/50 rounded p-2 w-full bg-white text-darkNavy"
                          required={key !== "description"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addSchedule}
              className="bg-accentOrange text-white px-4 py-2 rounded mt-2 w-full md:w-auto"
            >
              Add Schedule
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primaryBlue text-white px-6 py-2 rounded mt-4 w-full md:w-auto"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
