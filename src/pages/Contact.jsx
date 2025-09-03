// src/pages/Contact.jsx
import { useState } from "react";
import { sendContactMessage } from "../api/api";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import PageHeader from "../components/common/PageHeader";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendContactMessage(form);
      setStatus("✅ Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("❌ Failed to send message. Try again.");
    }
  };

  return (
    <>
     <PageHeader
        title="Contact Us"
        image="/assets/page-header.jpg"
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "Contact" }]}
      />
    <section className="bg-cream min-h-screen flex items-center justify-center py-16 px-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* LEFT: Contact Form */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-darkNavy mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue outline-none"
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue outline-none"
              required
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryBlue outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-primaryBlue text-white py-3 rounded-lg font-semibold hover:bg-accentOrange transition duration-300"
            >
              Send Message
            </button>
          </form>
          {status && <p className="mt-4 text-neutralDark">{status}</p>}
        </div>

        {/* RIGHT: Contact Info */}
        <div className="bg-primaryBlue text-white flex flex-col justify-center p-10 relative">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
          <p className="mb-6 text-cream">
            Have questions or need assistance? Reach out to us through the following ways:
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-accentOrange text-xl" />
              <span>123 Mall Street, Karachi, Pakistan</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-accentOrange text-xl" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-accentOrange text-xl" />
              <span>support@mallsystem.com</span>
            </div>
          </div>

          {/* Decorative Accent */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-accentOrange opacity-20 rounded-bl-full"></div>
        </div>
      </div>
    </section>
    </>
  );
};

export default Contact;
