import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../common/Input";
import { registerUser } from "../../api/api";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      await registerUser({ name: form.name, email: form.email, password: form.password });
      setLoading(false);
      navigate("/signIn");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream py-20">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-darkNavy text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>
          <Input label="Email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="********" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>
          <Input label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="********" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>

          <button type="submit" disabled={loading} className="w-full py-3 bg-accentOrange text-white rounded-lg">{loading ? "Signing Up..." : "Sign Up"}</button>
        </form>

        <p className="mt-6 text-center text-white">
          Already have an account? <Link to="/signIn" className="text-accentOrange font-semibold">Sign In</Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
