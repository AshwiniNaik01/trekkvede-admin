import { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", formData);
      setLoading(false);
      alert(`Logged in as ${formData.role}: ${formData.email}`);

      // For now, just log - you can add navigation later
      // window.location.href = formData.role === "admin" ? "/dashboard" : "/user-dashboard";
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950">
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
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-0 bg-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Left Panel - Hero Image */}
          <div className="relative hidden md:block overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/90 to-teal-700/90 mix-blend-multiply z-10"></div>
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
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full"></div>
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
          <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-xl">
            {/* Logo for Mobile */}
            <div className="md:hidden mb-8 text-center">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white relative overflow-hidden">
                  {/* Sparkle effect */}
                  <div className="absolute inset-0 animate-sparkle-sweep">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -translate-x-full"></div>
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
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
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400"
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
                      className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 placeholder:text-gray-400"
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
                      className={`py-2.5 px-4 rounded-xl border-2 font-semibold transition-all duration-300 text-sm ${
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
                      className={`py-2.5 px-4 rounded-xl border-2 font-semibold transition-all duration-300 text-sm ${
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
                      className="w-5 h-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-2"
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
                  className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-2xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
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
                    href="#"
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
