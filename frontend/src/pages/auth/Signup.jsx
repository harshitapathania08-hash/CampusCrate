import loginBg from "../../assets/images/login-bg.jpeg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaBoxOpen,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      setLoading(true);
  
      const { data } = await API.post("/auth/register", {
        fullName,
        email,
        password,
      });
  
      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
  
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error:", error);
  
      alert(
        error.response?.data?.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#CEE5ED] flex items-center justify-center px-6 py-10">

<div className="w-full max-w-6xl min-h-[720px] overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(30,58,138,0.12)]">

<div className="grid min-h-[720px] lg:grid-cols-5">

          {/* Left Side */}

          <div className="relative col-span-2 overflow-hidden rounded-l-[32px]">
            
           {/* Background Image */}
  <img
    src={loginBg}
    alt="Campus"
    className="absolute inset-0 h-full w-full object-cover"
  />

  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-[#102A68]/85 via-[#1E3A8A]/70 to-[#244CB5]/60"></div>

  {/* Content */}
  <div className="relative z-10 flex h-full items-center justify-center px-16 py-16 text-white">

<div className="w-full max-w-sm translate-x-4">
{/* Logo */}

<div>

<h1 className="text-4xl font-bold">
    CampusCrate
  </h1>

  <p className="mt-3 text-sm tracking-[0.35em] uppercase text-blue-100">
    Lost & Found System
  </p>

</div>

{/* Main Content */}

<div className="mt-14">

<h2 className="text-4xl font-bold leading-tight">
Reconnect Students
<br />
With Their Belongings.
  </h2>

  <p className="mt-8 max-w-sm text-lg leading-8 text-blue-100">
    Report lost items, discover found belongings,
    and reconnect students through one secure
    campus platform.
  </p>

</div>

{/* Features */}

<div className="mt-12 space-y-5">

  <div className="flex items-center gap-4">
    <FaBoxOpen className="text-xl text-blue-100" />
    <p>Quick Lost Item Reporting</p>
  </div>

  <div className="flex items-center gap-4">
    <FaShieldAlt className="text-xl text-blue-100" />
    <p>Secure Claim Verification</p>
  </div>

  <div className="flex items-center gap-4">
    <FaHandshake className="text-xl text-blue-100" />
    <p>Helping Students Every Day</p>
  </div>

</div>

</div>
</div>
</div> 
          {/* Right Side */}

          <div className="col-span-3 flex items-center justify-center bg-[#FFFCF8] px-14">
          <div className="w-full max-w-md">

          <h2 className="text-4xl font-bold text-[#111827]">
  Create Account ✨
</h2>
<p className="mt-4 text-[#64748B]">
  Join CampusCrate and help build a safer campus community.
</p>

            {/* Email */}

            <div className="mt-12">

              <label className="mb-2 block font-medium text-[#111827]">
                Email
              </label>
              <div className="flex h-14 items-center rounded-2xl border border-[#E8DCCA] px-6 transition-all duration-300 hover:border-[#1E3A8A] focus-within:border-[#1E3A8A] focus-within:ring-4 focus-within:ring-[#1E3A8A]/10">

              <FaEnvelope className="text-[#94A3B8] text-lg mr-3" />
              <div className="mx-3 h-6 w-px bg-[#D8D8D8]"></div>

              <input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="h-14 flex-1 bg-transparent pl-5 outline-none placeholder:text-[#94A3B8]"
/>

</div>

            </div>

            {/* Full Name */}

<div className="mt-8">

<label className="mb-2 block font-medium text-[#111827]">
  Full Name
</label>

<div className="flex h-14 items-center rounded-2xl border border-[#E8DCCA] px-6 transition-all duration-300 hover:border-[#1E3A8A] focus-within:border-[#1E3A8A]">

  <FaUser className="text-[#94A3B8] text-lg" />

  <div className="mx-4 h-6 w-px bg-[#D8D8D8]"></div>

  <input
    type="text"
    placeholder="Enter your full name"
   className="h-14 flex-1 bg-transparent pl-5 outline-none placeholder:text-[#94A3B8]"
  />

</div>

</div>
{/* Student ID */}

<div className="mt-5">

  <label className="mb-2 block font-medium text-[#111827]">
    Student ID
  </label>

  <div className="flex h-14 items-center rounded-2xl border border-[#E8DCCA] px-6 transition-all duration-300 hover:border-[#1E3A8A] focus-within:border-[#1E3A8A]">

    <FaIdCard className="text-[#94A3B8] text-lg" />

    <div className="mx-4 h-6 w-px bg-[#D8D8D8]"></div>

    <input
  type="text"
  placeholder="Enter your full name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  className="h-14 flex-1 bg-transparent pl-5 outline-none placeholder:text-[#94A3B8]"
/>

  </div>

</div>

            {/* Password */}

            <div className="mt-5">

              <label className="mb-2 block font-medium text-[#111827]">
                Password
              </label>

              <div className="flex h-14 items-center rounded-2xl border border-[#E8DCCA] px-6">

<FaLock className="text-lg text-[#94A3B8]" />

<div className="mx-5 h-6 w-px bg-[#D8D8D8]"></div>

<input
  type={showPassword ? "text" : "password"}
  placeholder="Enter your password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="flex-1 bg-transparent px-4 text-[#111827] placeholder:text-[#A0AEC0] outline-none"
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="text-[#94A3B8] hover:text-[#1E3A8A] transition"
>
  {showPassword ? <FaEyeSlash /> : <FaEye />}
</button>

</div>

            </div>


            {/* Confirm Password */}

<div className="mt-5">

<label className="mb-2 block font-medium text-[#111827]">
  Confirm Password
</label>

<div className="flex h-14 items-center rounded-2xl border border-[#E8DCCA] px-6 transition-all duration-300 hover:border-[#1E3A8A] focus-within:border-[#1E3A8A]">

  <FaLock className="text-[#94A3B8] text-lg" />

  <div className="mx-4 h-6 w-px bg-[#D8D8D8]"></div>

  <input
  type={showPassword ? "text" : "password"}
  placeholder="Confirm your password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="h-14 flex-1 bg-transparent pl-5 outline-none placeholder:text-[#94A3B8]"
/>

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="text-[#94A3B8] hover:text-[#1E3A8A] transition"
  >
    {showPassword ? <FaEyeSlash /> : <FaEye />}
  </button>

</div>

</div>
<div className="mt-6 flex items-start gap-3">

  <input
    type="checkbox"
    className="mt-1 h-4 w-4 accent-[#1E3A8A]"
  />

  <p className="text-sm leading-6 text-[#64748B]">
    I agree to the{" "}
    <span className="cursor-pointer font-semibold text-[#1E3A8A] hover:underline">
      Terms of Service
    </span>{" "}
    and{" "}
    <span className="cursor-pointer font-semibold text-[#1E3A8A] hover:underline">
      Privacy Policy
    </span>.
  </p>

</div>
            {/* Remember */}

            <div className="mt-6 flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-[#64748B]">

              <input
  type="checkbox"
  className="h-4 w-4 accent-[#1E3A8A]"
/>

                Remember Me

              </label>

              <button className="text-sm font-medium text-[#1E3A8A] transition-colors duration-300 hover:text-[#17317A]">
  Forgot Password?
</button>

            </div>

            {/* Button */}

            <button
  onClick={handleSignup}
  disabled={loading}
  className="mt-10 w-full rounded-2xl bg-[#1E3A8A] py-4 text-lg font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#17317A] hover:shadow-xl disabled:opacity-50"
>
  {loading ? "Creating Account..." : "Create Account"}
</button>

            <p className="mt-8 text-center text-[#64748B]">

            Already have an account?{" "}

              <Link
                to="/signup"
               className="font-semibold text-[#1E3A8A] transition hover:text-[#17317A]"
              >
                 Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div></div> 
  
  );
}

export default Login;