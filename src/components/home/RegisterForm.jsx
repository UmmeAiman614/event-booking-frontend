import { useState } from "react";
import Input from "../common/Input";
import { FaPlane } from "react-icons/fa";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side */}
          <div className="bg-darkNavy text-white flex flex-col items-center justify-center gap-8 py-12 px-6">
            {/* Circular Icon */}
            <div className="flex items-center justify-center w-44 h-44 rounded-full bg-primaryBlue">
              <FaPlane className="w-32 h-32 text-accentOrange -rotate-45" />
            </div>

            {/* Text */}
            <p className="text-lg text-center max-w-md leading-relaxed">
              Take off with us and be part of the event of the year.  
              Fly into new opportunities, connect with industry leaders,  
              and elevate your network.
            </p>
          </div>

          {/* Right Side Form */}
          <div className="bg-cream p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-darkNavy mb-8 text-center">
              Register Now
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

              <button
                type="submit"
                className="w-full py-3 bg-accentOrange text-white rounded-lg font-semibold hover:bg-primaryBlue transition shadow-lg"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
