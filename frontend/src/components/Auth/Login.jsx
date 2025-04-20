import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { create } from "zustand";
// import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LogIn,
  Mail,
  Lock,
  Key,
  UserPlus,
  Loader2,
  Users,
  CreditCard,
  BarChart2,
} from "lucide-react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

// Zustand Store for Auth
const useAuthStore = create((set) => ({
   
 
  user: null,
  login: async (data) => {
   
    set({ loading: true, error: null });
   
    try {
      // Sanitize inputs before sending to the backend
      const sanitizedData = {
        email: sanitizeInput(data.email),
        password: sanitizeInput(data.password),
      };
console.log("Sanitized Data to be send to backend is : ",sanitizedData)
      // Send login request
      const res = await axios.post("/AppAdmin/login", sanitizedData)
      console.log("Response Data from API : ",res.data)
      // , {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true,
      // });

      if (res?.status === 201) {
        toast.success("Login successful! Redirecting...");
        console.log("Login Successful");
        
        // Store user data in state
        set({ user: res.data, loading: false });
        
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/dashboard"; // Alternative to navigate
        }, 2000);
        return; // Add return to prevent further execution
      }
      
      // If we get here, something went wrong
      throw new Error("Login failed");
      
    } catch (error) {
      set({ error: "Invalid credentials. Please try again.", loading: false });
      toast.error("Invalid credentials. Please try again.");
    }
  },
  logout: () => set({ user: null }),
  loading: false,
  error: null,
}));

// Input Sanitization Function
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input.replace(/[^\w@.-]/gi, ""));
};

// Validation Schema (Yup)
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .matches(/^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/, "Invalid email format"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+]{6,}$/,
      "Password must contain only letters, numbers, and special characters"
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { login, loading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    await login(data);
    // Navigation will be handled in the store
  };

  return (
    <>
      {/* <Helmet>
        <title>Login - TeechTrack: Streamline Tuition Management & Student Progress</title>
        <meta name="description" content="Login to TeechTrack, the ultimate tuition management platform. Manage students, track progress, collect fees, and generate reports effortlessly." />
        <meta name="keywords" content="TeechTrack, login, tuition management, student management" />
        <link rel="canonical" href="https://www.teechtrack.com/login" />
      </Helmet> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="min-h-screen flex flex-col lg:flex-row transition-colors duration-300" 
           style={{ backgroundColor: "var(--background-color)" }}>
        {/* Login Form (3/12) */}
        <div className="w-full lg:w-3/12 flex items-center justify-center p-6 lg:p-8 shadow-lg"
             style={{ backgroundColor: "var(--card-bg)" }}>
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-6">
  {/* Logo */}
  <Link to="/" className="flex flex-col items-center justify-center">
  <img 
    src="https://cdn-icons-png.flaticon.com/128/187/187868.png" 
    alt="Logo" 
    className="w-12 h-12 lg:w-16 lg:h-16 object-contain mb-2" 
  />
</Link>

  {/* Welcome Text */}
  <h2 
    className="text-2xl lg:text-3xl font-bold text-center" 
    style={{ color: "var(--text-color)" }}
  >
    Welcome Back
  </h2>
</div>

            <p className="mb-6 text-center" style={{ color: "var(--secondary-color)" }}>Sign in to continue to TeechTrack</p>

            {/* Show Error Message */}
            {error && (
              <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{DOMPurify.sanitize(error)}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block font-medium mb-1" style={{ color: "var(--text-color)" }}>Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3" size={18} style={{ color: "var(--secondary-color)" }} />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full pl-10 pr-4 py-2.5 border rounded-lg outline-none transition-all"
                    style={{ 
                      backgroundColor: "var(--input-bg)", 
                      borderColor: "var(--input-border)",
                      color: "var(--text-color)",
                      boxShadow: "0 2px 4px var(--shadow-color)"
                    }}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{DOMPurify.sanitize(errors.email.message)}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label className="block font-medium mb-1" style={{ color: "var(--text-color)" }}>Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3" size={18} style={{ color: "var(--secondary-color)" }} />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className="w-full pl-10 pr-10 py-2.5 border rounded-lg outline-none transition-all"
                    style={{ 
                      backgroundColor: "var(--input-bg)", 
                      borderColor: "var(--input-border)",
                      color: "var(--text-color)",
                      boxShadow: "0 2px 4px var(--shadow-color)"
                    }}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 hover:opacity-75 transition-opacity"
                    style={{ color: "var(--secondary-color)" }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{DOMPurify.sanitize(errors.password.message)}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 font-medium rounded-lg transition-all shadow-md hover:shadow-lg"
                style={{ 
                  backgroundColor: "var(--button-bg)",
                  color: "var(--button-text)"
                }}
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : <LogIn size={18} />}
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Forgot Password & Signup */}
            <div className="text-center mt-6">
              <Link to="/forgot-password" className="text-sm flex items-center justify-center gap-1 hover:underline"
                    style={{ color: "var(--link-color)" }}>
                <Key size={16} /> Forgot password?
              </Link>
              <p className="mt-3 text-sm" style={{ color: "var(--secondary-color)", display: "inline-block" }}>
  Don't have an account?{" "}
  <Link 
    to="/signup" 
    className="font-medium hover:underline flex items-center gap-1" 
    style={{ color: "var(--link-color)", display: "inline-flex" }}
  >
    <UserPlus size={16} /> Create account
  </Link>
</p>
            </div>
          </div>
        </div>

        {/* TeechTrack Info (9/12) - Hidden on small screens */}
        <div className="hidden lg:flex w-full lg:w-9/12 flex-col justify-center items-center p-8 lg:p-12"
             style={{ background: "linear-gradient(to bottom right, var(--primary-color), var(--accent-color))" }}>
          <div className="max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ color: "var(--button-text)" }}>
                TeechTrack
              </h1>
              <div className="h-1 w-20 mx-auto rounded-full opacity-50" style={{ backgroundColor: "var(--button-text)" }}></div>
            </div>
            
            <p className="text-lg lg:text-xl text-center mb-10 max-w-2xl mx-auto leading-relaxed" 
               style={{ color: "var(--button-text)", opacity: 0.9 }}>
              Streamline your tuition management with our all-in-one platform. Track progress, manage payments, and gain valuable insights.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="p-5 rounded-xl backdrop-blur-sm"
                   style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                <Users style={{ color: "var(--button-text)", opacity: 0.8 }} className="mb-2" size={24} />
                <h3 className="font-bold text-xl mb-2" style={{ color: "var(--button-text)" }}>
                  Student Management
                </h3>
                <p style={{ color: "var(--button-text)", opacity: 0.8 }}>
                  Track attendance, progress, and performance with ease.
                </p>
              </div>
              <div className="p-5 rounded-xl backdrop-blur-sm"
                   style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                <CreditCard style={{ color: "var(--button-text)", opacity: 0.8 }} className="mb-2" size={24} />
                <h3 className="font-bold text-xl mb-2" style={{ color: "var(--button-text)" }}>
                  Fee Collection
                </h3>
                <p style={{ color: "var(--button-text)", opacity: 0.8 }}>
                  Manage payments, generate invoices, and send reminders.
                </p>
              </div>
              <div className="p-5 rounded-xl backdrop-blur-sm"
                   style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}>
                <BarChart2 style={{ color: "var(--button-text)", opacity: 0.8 }} className="mb-2" size={24} />
                <h3 className="font-bold text-xl mb-2" style={{ color: "var(--button-text)" }}>
                  Reports & Analytics
                </h3>
                <p style={{ color: "var(--button-text)", opacity: 0.8 }}>
                  Gain insights with detailed reports and visualizations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;