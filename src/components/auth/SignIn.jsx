import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Input from "../common/Input";
import { loginUser } from "../../api/api";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const { data } = await loginUser(form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("userLoggedIn"));

      setLoading(false);
      navigate(location.state?.from || "/");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-cream py-20">
      <div className="w-full max-w-md p-8 rounded-3xl shadow-2xl bg-darkNavy text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        {error && <p className="text-red-400 mb-3">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="Email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} placeholder="********" labelColor="text-white" inputColor="text-white" bgColor="bg-darkNavy"/>

          <button type="submit" disabled={loading} className="w-full py-3 bg-accentOrange text-white rounded-lg">{loading ? "Signing In..." : "Sign In"}</button>
        </form>

        <p className="mt-6 text-center text-white">
          Don't have an account? <Link to="/signUp" className="text-accentOrange font-semibold">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
