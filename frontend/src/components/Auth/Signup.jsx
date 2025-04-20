import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import zxcvbn from "zxcvbn";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Building,
  Phone,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

// Validation schema for Signup
const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email")
    .max(100, "Email cannot exceed 100 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .test(
      "password-strength",
      "Password is too weak",
      (value) => value && zxcvbn(value).score > 2
    ),

  institution_name: yup
    .string()
    .required("Institution name is required")
    .min(2, "Institution name must be at least 2 characters")
    .max(100, "Institution name cannot exceed 100 characters"),

  contact_number: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid phone number format")
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number cannot exceed 15 digits"),

  // address: yup.string().required("Address is required"),
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur",
  });
  console.log("Errors: ", errors);

  // Watch password field to evaluate strength
  const watchPassword = watch("password", "");

  // Update password strength score when password changes
  React.useEffect(() => {
    if (watchPassword) {
      const result = zxcvbn(watchPassword);
      setPasswordScore(result.score);
    } else {
      setPasswordScore(0);
    }
  }, [watchPassword]);

  // Get password strength feedback
  const getPasswordStrengthLabel = (score) => {
    if (isDarkMode) {
      switch (score) {
        case 0:
          return { label: "Very Weak", color: "bg-red-600" };
        case 1:
          return { label: "Weak", color: "bg-orange-600" };
        case 2:
          return { label: "Fair", color: "bg-yellow-600" };
        case 3:
          return { label: "Good", color: "bg-emerald-600" };
        case 4:
          return { label: "Strong", color: "bg-green-600" };
        default:
          return { label: "Very Weak", color: "bg-red-600" };
      }
    } else {
      switch (score) {
        case 0:
          return { label: "Very Weak", color: "bg-red-500" };
        case 1:
          return { label: "Weak", color: "bg-orange-500" };
        case 2:
          return { label: "Fair", color: "bg-yellow-500" };
        case 3:
          return { label: "Good", color: "bg-lime-500" };
        case 4:
          return { label: "Strong", color: "bg-green-500" };
        default:
          return { label: "Very Weak", color: "bg-red-500" };
      }
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form submission
  const submitHandler = async (data) => {
    console.log("Data to be sent to backend is: ", data);
    try {
      // Sanitize input data to prevent XSS
      const sanitizedData = {
        name: DOMPurify.sanitize(data.name), // Fix: 'name' instead of 'fullName'
        email: DOMPurify.sanitize(data.email),
        password: data.password, // Don't sanitize password
        institution_name: DOMPurify.sanitize(data.institution_name), // Fix field name
        contact_number: DOMPurify.sanitize(data.contact_number), // Fix field name
        // address: DOMPurify.sanitize(data.address),
      };
      
      console.log("Sanitized Data: ", sanitizedData);

      // Simulating API call with a delay
      const res = await axios.post("/TuitionAdmin/register", sanitizedData);
      console.log("Response from backend is: ", res.data);
      if (res?.status === 201) {
        setTimeout(() => {
          toast.success("Account created successfully!");
        }, 2000);

        // Redirect to dashboard after successful signup
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Get password strength feedback
  const { label: strengthLabel, color: strengthColor } =
    getPasswordStrengthLabel(passwordScore);

  // Custom styles based on theme
  const themeStyles = {
    container: `min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center transition-colors duration-300`,
    card: `max-w-md w-full rounded-xl shadow-lg overflow-hidden transition-colors duration-300`,
    inputClass: `pl-10 appearance-none block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm transition-colors duration-300`,
    buttonClass: `w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300`,
    linkClass: `font-medium hover:underline transition-colors duration-300`,
    iconClass: `h-5 w-5 transition-colors duration-300`,
    formGroup: `flex flex-col space-y-1`,
  };

  return (
    <>
      <div
        className={themeStyles.container}
        style={{
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <ToastContainer
          position="top-right"
          autoClose={5000}
          theme={isDarkMode ? "dark" : "light"}
        />

        <div
          className={themeStyles.card}
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "0 10px 15px -3px var(--shadow-color)",
          }}
        >
          {/* Logo Section */}
          <div className="flex justify-center pt-8">
            <Link to="/">
              <img
                src="/teechtrackLogo.png"
                alt="TeechTrack Logo"
                className="h-16 w-auto rounded-lg"
              />
            </Link>
          </div>

          <div className="px-6 py-8 sm:px-10">
            <div className="mb-6 text-center">
              <h1
                className="text-3xl font-extrabold"
                style={{ color: "var(--text-color)" }}
              >
                Tuition Signup
              </h1>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-6"
              noValidate
            >
              {/* Full Name Field */}
              <div className={themeStyles.formGroup}>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <input
                    id="fullName"
                    type="text"
                    autoComplete="name"
                    className={themeStyles.inputClass}
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--text-color)",
                      borderColor: errors.fullName
                        ? "var(--accent-color)"
                        : "var(--input-border)",
                      borderWidth: "1px",
                    }}
                    placeholder="John Doe"
                    {...register("name")}

                  />
                </div>
                {errors.fullName && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className={themeStyles.formGroup}>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={themeStyles.inputClass}
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--text-color)",
                      borderColor: errors.email
                        ? "var(--accent-color)"
                        : "var(--input-border)",
                      borderWidth: "1px",
                    }}
                    placeholder="you@example.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className={themeStyles.formGroup}>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={themeStyles.inputClass}
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--text-color)",
                      borderColor: errors.password
                        ? "var(--accent-color)"
                        : "var(--input-border)",
                      borderWidth: "1px",
                      paddingRight: "2.5rem",
                    }}
                    placeholder="••••••••"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-80"
                    style={{ color: "var(--secondary-color)" }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {/* Password strength meter */}
                {watchPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-color)" }}
                      >
                        Password strength:
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--text-color)" }}
                      >
                        {strengthLabel}
                      </span>
                    </div>
                    <div
                      className="w-full bg-gray-200 rounded-full h-2"
                      style={{
                        backgroundColor: isDarkMode ? "#2a3a50" : "#e2e8f0",
                      }}
                    >
                      <div
                        className={`${strengthColor} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(passwordScore + 1) * 20}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Institution Name Field */}
              <div className={themeStyles.formGroup}>
                <label
                  htmlFor="institutionName"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Institution Name
                </label>
                <div className="relative">
                  <Building
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <input
                    id="institutionName"
                    type="text"
                    className={themeStyles.inputClass}
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--text-color)",
                      borderColor: errors.institutionName
                        ? "var(--accent-color)"
                        : "var(--input-border)",
                      borderWidth: "1px",
                    }}
                    placeholder="University or Company"
                    {...register("institution_name")}
                  />
                </div>
                {errors.institution_name && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {errors.institution_name.message}
                  </p>
                )}
              </div>

              {/* Contact Number Field */}
              <div className={themeStyles.formGroup}>
                <label
                  htmlFor="contactNumber"
                  className="block text-sm font-medium"
                  style={{ color: "var(--text-color)" }}
                >
                  Contact Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5"
                    style={{ color: "var(--secondary-color)" }}
                  />
                  <input
                    id="contactNumber"
                    type="tel"
                    autoComplete="tel"
                    className={themeStyles.inputClass}
                    style={{
                      backgroundColor: "var(--input-bg)",
                      color: "var(--text-color)",
                      borderColor: errors.contact_number
                        ? "var(--accent-color)"
                        : "var(--input-border)",
                      borderWidth: "1px",
                    }}
                    placeholder="+1 234 567 8900"
                    {...register("contact_number")}
                  />
                </div>
                {errors.contact_number && (
                  <p
                    className="text-sm mt-1"
                    style={{ color: "var(--accent-color)" }}
                  >
                    {errors.contact_number.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              
              {/* <button
  type="submit"
  disabled={isSubmitting}
  className={`${themeStyles.buttonClass} hover:bg-[var(--button-bg-hover)]`}
  style={{
    backgroundColor: "var(--button-bg)",
    color: "var(--button-text)",
    borderColor: "var(--button-bg)",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    opacity: isSubmitting ? 0.6 : 1,
    transition:
      "opacity 0.2s ease-in-out, background-color 0.2s ease-in-out, transform 0.1s ease-in-out",
  }}
>Sign Up</button> */}
<button>Submit</button>

              
            </form>

            {/* Link to Login Page */}
            <div className="mt-6 text-center">
              <p
                className="text-sm"
                style={{ color: "var(--secondary-color)" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className={themeStyles.linkClass}
                  style={{ color: "var(--link-color)" }}
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
