import { useState } from "react";
import Cookies from "js-cookie";
import { loginAdmin } from "../api/adminApi";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (apiError) {
      setApiError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    setSuccessMessage("");

    try {
      // Create FormData object for API
      const loginData = new FormData();
      loginData.append("email", formData.email);
      loginData.append("password", formData.password);
      loginData.append("role", formData.role);

      // Call the API
      const response = await loginAdmin(loginData);

      // Handle successful login
      setSuccessMessage("Login successful! Redirecting...");

      // Store admin ID in cookies if login is successful
      if (response.success && response.data && response.data.admin) {
        const adminId = response.data.admin._id;
        // Store admin ID in cookie (expires in 7 days)
        Cookies.set("adminId", adminId, { expires: 7 });
        // Also store admin data in localStorage for reference
        localStorage.setItem("adminData", JSON.stringify(response.data.admin));
      }

      // Redirect to dashboard after 1.5 seconds
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    } catch (error) {
      // Handle API errors
      console.error("Login error:", error);

      if (error.message) {
        setApiError(error.message);
      } else if (error.error) {
        setApiError(error.error);
      } else {
        setApiError(
          "Login failed. Please check your credentials and try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-slow-zoom"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')",
          }}
        ></div>
      </div>

      {/* Mountain Silhouettes */}
      <div className="absolute bottom-0 left-0 right-0 h-96 opacity-30">
        <svg
          viewBox="0 0 1200 320"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#065f46"
            d="M0,160 L80,140 L160,100 L240,120 L320,80 L400,100 L480,60 L560,90 L640,50 L720,80 L800,40 L880,70 L960,30 L1040,60 L1120,20 L1200,50 L1200,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-h-screen flex items-center justify-center p-4 m-10">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Left Panel - Hero Image */}
          <div className="relative hidden md:block overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-emerald-600/90 to-teal-700/90 mix-blend-multiply z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
              alt="Mountain Trek"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay Content */}
            <div className="relative z-20 h-full flex flex-col justify-end p-12 text-white">
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 mb-6 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20 relative overflow-hidden">
                  {/* Sparkle effect overlay */}
                  <div className="absolute inset-0 animate-sparkle-sweep">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full"></div>
                  </div>

                  <svg
                    className="w-6 h-6 animate-sparkle-rotate text-yellow-400 relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  <span className="font-bold text-lg text-yellow-400 tracking-widest uppercase animate-sparkle-text relative z-10">
                    TrekVede
                  </span>
                </div>

                <h1 className="text-5xl font-black mb-4 leading-tight">
                  Your Journey
                  <br />
                  <span className="text-emerald-300">Begins Here</span>
                </h1>

                <p className="text-lg text-white/80 mb-6 leading-relaxed">
                  Access your trekking adventures, manage expeditions, and
                  explore the mountains like never before.
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70">12 Active Treks</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <span className="text-white/70">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-linear-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl">
            {/* Logo for Mobile */}
            <div className="md:hidden mb-8 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
                  {/* Sparkle effect */}
                  <div className="absolute inset-0 animate-sparkle-sweep">
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full"></div>
                  </div>
                  <svg
                    className="w-6 h-6 animate-sparkle-rotate relative z-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-black text-emerald-900 animate-sparkle-text">
                  TrekVede
                </span>
              </div>
            </div>

            <div className="max-w-md mx-auto w-full">
              {/* Header */}
              <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to continue your adventure
                </p>
              </div>

              {/* Success Message */}
              {successMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl">
                  <p className="text-emerald-700 text-sm font-semibold text-center">
                    {successMessage}
                  </p>
                </div>
              )}

              {/* Error Message */}
              {apiError && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-500 rounded-2xl">
                  <p className="text-red-700 text-sm font-semibold text-center">
                    {apiError}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Role Selection - SMALLER VERSION */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Role
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "user" }))
                      }
                      className={`py-4 px-6 rounded-2xl border-2 font-bold transition-all duration-300 ${
                        formData.role === "user"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30"
                          : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, role: "admin" }))
                      }
                      className={`py-4 px-6 rounded-2xl border-2 font-bold transition-all duration-300 ${
                        formData.role === "admin"
                          ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/30"
                          : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 mx-auto mb-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                        />
                      </svg>
                      Admin
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      disabled={loading}
                      className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="text-gray-700 font-medium">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-emerald-600 hover:text-emerald-700 font-bold"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-black rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/registration"
                    className="text-emerald-600 hover:text-emerald-700 font-bold"
                  >
                    Create one now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes slow-zoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.4; }
          50% { transform: translateY(-30px); opacity: 0.8; }
        }
        
        @keyframes sparkle-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes sparkle-rotate {
          0%, 100% { 
            transform: rotate(0deg) scale(1);
            filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
          }
          50% { 
            transform: rotate(180deg) scale(1.1);
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
          }
        }
        
        @keyframes sparkle-text {
          0%, 100% { 
            opacity: 1;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
          50% { 
            opacity: 1;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4);
          }
        }
        
        .animate-slow-zoom {
          animation: slow-zoom 30s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        .animate-sparkle-sweep {
          animation: sparkle-sweep 3s ease-in-out infinite;
        }
        
        .animate-sparkle-rotate {
          animation: sparkle-rotate 4s ease-in-out infinite;
        }
        
        .animate-sparkle-text {
          animation: sparkle-text 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   HiMail,
//   HiLockClosed,
//   HiUser,
//   HiShieldCheck,
//   HiSparkles,
//   HiArrowRight,
//   HiChevronRight
// } from "react-icons/hi";

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       console.log("Login data:", formData);
//       setLoading(false);
//       alert(`Logged in as ${formData.role}: ${formData.email}`);
//     }, 1500);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950 selection:bg-amber-500/30">
//       {/* Animated Background Layers - PRESERVED */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div
//           className="absolute top-0 left-0 w-full h-full bg-cover bg-center animate-slow-zoom"
//           style={{
//             backgroundImage:
//               "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070')",
//           }}
//         ></div>
//       </div>

//       {/* Mountain Silhouettes - PRESERVED background path */}
//       <div className="absolute bottom-0 left-0 right-0 h-96 opacity-30 pointer-events-none">
//         <svg
//           viewBox="0 0 1200 320"
//           className="w-full h-full"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="#065f46"
//             d="M0,160 L80,140 L160,100 L240,120 L320,80 L400,100 L480,60 L560,90 L640,50 L720,80 L800,40 L880,70 L960,30 L1040,60 L1120,20 L1200,50 L1200,320 L0,320 Z"
//           />
//         </svg>
//       </div>

//       {/* Floating Particles - PRESERVED */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-1 h-1 bg-white rounded-full opacity-40 animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${10 + Math.random() * 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Main Container */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center p-6 md:p-12">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//           className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.6)] relative"
//         >
//           {/* UNIQUE: Glowing Amber Left Border Accent */}
//           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 shadow-[4px_0_30px_rgba(245,158,11,0.6)] z-30 animate-pulse"></div>

//           {/* Left Panel - Hero Image PRESERVED */}
//           <div className="relative hidden md:block overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/70 via-teal-950/40 to-transparent z-10"></div>
//             <img
//               src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070"
//               alt="Mountain Trek"
//               className="absolute inset-0 w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-[20s] ease-out"
//             />

//             {/* Overlay Content */}
//             <div className="relative z-20 h-full flex flex-col justify-end p-16 text-white">
//               <motion.div variants={itemVariants} className="space-y-6">
//                 <div className="inline-flex items-center gap-3 bg-amber-500/10 backdrop-blur-md px-6 py-2.5 rounded-2xl border border-amber-500/20">
//                   <HiSparkles className="w-5 h-5 text-amber-400 animate-pulse" />
//                   <span className="font-black text-sm text-amber-400 tracking-[0.2em] uppercase italic">
//                     TrekVede Elite
//                   </span>
//                 </div>

//                 <h1 className="text-6xl font-black mb-4 leading-[1.1] tracking-tighter">
//                   Ascend to <br />
//                   <span className="text-amber-400 drop-shadow-sm">Grandeur.</span>
//                 </h1>

//                 <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-sm italic font-medium">
//                   "Every mountain top is within reach if you just keep climbing."
//                 </p>

//                 <div className="flex items-center gap-8 text-sm font-bold tracking-widest uppercase text-white/40">
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping"></div>
//                     <span>Live Tracking</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
//                     <span>24/7 Intel</span>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>

//           {/* Right Panel - Login Form */}
//           <div className="p-8 md:p-16 flex flex-col justify-center bg-white/[0.99] backdrop-blur-2xl relative">
//             {/* Logo for Mobile */}
//             <div className="md:hidden mb-10 text-center">
//               <div className="inline-flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
//                   <div className="absolute inset-0 animate-sparkle-sweep">
//                     <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full"></div>
//                   </div>
//                   <HiSparkles className="w-6 h-6 animate-sparkle-rotate relative z-10" />
//                 </div>
//                 <span className="text-2xl font-black text-emerald-900 animate-sparkle-text">
//                   TrekVede
//                 </span>
//               </div>
//             </div>

//             <div className="max-w-md mx-auto w-full">
//               {/* Header */}
//               <motion.div variants={itemVariants} className="mb-12">
//                 <h2 className="text-5xl font-black text-gray-900 mb-3 tracking-tighter">
//                   Welcome back
//                 </h2>
//                 <div className="h-1 w-12 bg-amber-500 rounded-full mb-4"></div>
//                 <p className="text-gray-500 font-semibold text-lg">
//                   Enter your credentials to access the summit.
//                 </p>
//               </motion.div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-8">
//                 <div className="space-y-6">
//                   {/* Email Field */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
//                       Satellite Identity (Email)
//                     </label>
//                     <div className="relative group">
//                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors">
//                         <HiMail className="w-6 h-6" />
//                       </div>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         placeholder="you@trekvede.com"
//                         required
//                         className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-amber-500/50 focus:bg-white focus:ring-8 focus:ring-amber-500/5 outline-none transition-all text-gray-900 placeholder:text-gray-300 font-bold text-lg"
//                       />
//                     </div>
//                   </motion.div>

//                   {/* Password Field */}
//                   <motion.div variants={itemVariants} className="space-y-2">
//                     <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
//                       Access Key (Password)
//                     </label>
//                     <div className="relative group">
//                       <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-amber-500 transition-colors">
//                         <HiLockClosed className="w-6 h-6" />
//                       </div>
//                       <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         placeholder="••••••••"
//                         required
//                         className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-[1.5rem] focus:border-amber-500/50 focus:bg-white focus:ring-8 focus:ring-amber-500/5 outline-none transition-all text-gray-900 placeholder:text-gray-300 font-bold text-lg"
//                       />
//                     </div>
//                   </motion.div>
//                 </div>

//                 {/* Role Selection */}
//                 <motion.div variants={itemVariants} className="space-y-3">
//                   <label className="block text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
//                     Station Role
//                   </label>
//                   <div className="grid grid-cols-2 gap-4 p-1 bg-gray-100/50 rounded-[1.25rem]">
//                     {[
//                       { id: "user", label: "Explorer", icon: HiUser },
//                       { id: "admin", label: "Command", icon: HiShieldCheck }
//                     ].map((role) => (
//                       <button
//                         key={role.id}
//                         type="button"
//                         onClick={() => setFormData((prev) => ({ ...prev, role: role.id }))}
//                         className={`py-4 px-6 rounded-[1rem] font-black transition-all duration-500 flex items-center justify-center gap-2.5 ${formData.role === role.id
//                             ? "bg-white text-emerald-900 shadow-sm ring-1 ring-black/5"
//                             : "text-gray-400 hover:text-gray-600"
//                           }`}
//                       >
//                         <role.icon className={`w-5 h-5 ${formData.role === role.id ? 'text-amber-500' : ''}`} />
//                         {role.label}
//                       </button>
//                     ))}
//                   </div>
//                 </motion.div>

//                 <motion.div variants={itemVariants} className="flex items-center justify-between text-sm px-1 font-bold">
//                   <label className="flex items-center gap-2.5 cursor-pointer group text-gray-400">
//                     <input
//                       type="checkbox"
//                       className="w-5 h-5 rounded-lg border-gray-200 text-amber-500 focus:ring-amber-500 focus:ring-offset-0 transition-all cursor-pointer"
//                     />
//                     <span className="group-hover:text-gray-600">Keep me logged in</span>
//                   </label>
//                   <a href="#" className="text-amber-600 hover:text-amber-700 transition-colors underline decoration-amber-500/20 underline-offset-4">
//                     Sync Issues?
//                   </a>
//                 </motion.div>

//                 {/* Submit Button */}
//                 <motion.button
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-6 bg-gradient-to-r from-emerald-700 to-emerald-900 text-white font-black rounded-[1.5rem] shadow-[0_20px_40px_-10px_rgba(6,78,59,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(6,78,59,0.4)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"></div>
//                   {loading ? (
//                     <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//                   ) : (
//                     <>
//                       <span className="tracking-widest uppercase">Initiate Session</span>
//                       <HiArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
//                     </>
//                   )}
//                 </motion.button>
//               </form>

//               {/* Sign Up Link */}
//               <motion.div variants={itemVariants} className="mt-12 text-center">
//                 <p className="text-gray-400 font-bold">
//                   New to the expedition?{" "}
//                   <a
//                     href="#"
//                     className="text-amber-600 hover:text-amber-700 font-black underline decoration-amber-500/30 underline-offset-8 transition-all hover:decoration-amber-500"
//                   >
//                     Register Ascent
//                   </a>
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <style>{`
//         @keyframes slow-zoom {
//           0%, 100% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//         }

//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.4; }
//           50% { transform: translateY(-40px) rotate(180deg); opacity: 0.8; }
//         }

//         @keyframes sparkle-sweep {
//           0% { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }

//         @keyframes sparkle-rotate {
//           0%, 100% {
//             transform: rotate(0deg) scale(1);
//             filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.5));
//           }
//           50% {
//             transform: rotate(180deg) scale(1.2);
//             filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.8));
//           }
//         }

//         @keyframes sparkle-text {
//           0%, 100% {
//             opacity: 1;
//             text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
//           }
//           50% {
//             opacity: 1;
//             text-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
//           }
//         }

//         .animate-slow-zoom {
//           animation: slow-zoom 40s ease-in-out infinite;
//         }

//         .animate-float {
//           animation: float 20s ease-in-out infinite;
//         }

//         .animate-sparkle-sweep {
//           animation: sparkle-sweep 3s ease-in-out infinite;
//         }

//         .animate-sparkle-rotate {
//           animation: sparkle-rotate 4s ease-in-out infinite;
//         }

//         .animate-sparkle-text {
//           animation: sparkle-text 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
