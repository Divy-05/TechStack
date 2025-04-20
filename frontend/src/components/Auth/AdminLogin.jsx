// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   FaUserShield,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";
// import { useForm } from "react-hook-form";
// import { toast, ToastContainer } from "react-toastify";
// import axios from "axios";

// const AdminLogin = () => {
//   const { register, handleSubmit } = useForm();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [theme, setTheme] = useState("light");
//   const navigate = useNavigate();

//   const submitHandler = async (data) => {
//     try {
//       console.log("data to be send to backend is : ", data);

//       const res = await axios.post("/AppAdmin/login", data);
//       console.log("response from backend is : ", res);
//       if (res?.status === 200) {
//         toast.success(`Login Successful.\nWelcome ${res.data.name}`);
//         setTimeout(() => {
//           navigate("/admin");
//         }, 2000);
//       } else {
//         console.log("error in login");
//         toast.error("Login Failed");
//       }
//     } catch (error) {
//       console.log("error in login");
//       toast.error("Login Failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="logo-container">
//           <img
//             src="/teechtrackLogo.png"
//             alt="Company Logo"
//             className="login-logo"
//           />
//         </div>

//         <div className="login-header">
//           <div className="admin-title">
//             <FaUserShield className="admin-icon" />
//             <h1>Admin Login</h1>
//           </div>
//           <p>Access your administration dashboard</p>
//         </div>

//         <form onSubmit={handleSubmit(submitHandler)} className="login-form">
//           {error && <div className="error-message">{error}</div>}

//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <div className="input-wrapper">
//               <FaUserShield className="input-icon" />
//               <input
//                 id="email"
//                 type="text"
//                 {...register("email", { required: true })}
//                 placeholder="Enter admin email"
//               />
//             </div>
//           </div>

//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-wrapper">
//               <FaLock className="input-icon" />
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 {...register("password", { required: true })}
//                 placeholder="Enter your password"
//                 required
//               />
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShowPassword(!showPassword)}
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>

//           <button type="submit" className="login-button" disabled={isLoading}>
//             {isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {/* <div className="login-footer">
//           <a href="/forgot-password" className="forgot-password">
//             Forgot password?
//           </a>
//         </div> */}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default AdminLogin;

// // CSS Styles
// const styles = `
//   :root {
//     --primary-color: #3498db;
//     --secondary-color: #7f8c8d;
//     --text-color: #2c3e50;
//     --background-color: #f5f7fa;
//     --card-bg: #ffffff;
//     --shadow-color: rgba(0, 0, 0, 0.1);
//     --border-color: #e0e0e0;
//     --input-border: #ddd;
//     --input-bg: #fff;
//     --button-bg: #3498db;
//     --button-text: #fff;
//     --hover-bg: #2980b9;
//     --link-color: #3498db;
//   }

//   [data-theme="dark"] {
//     --primary-color: #3498db;
//     --secondary-color: #bdc3c7;
//     --text-color: #ecf0f1;
//     --background-color: #1a1a1a;
//     --card-bg: #2d2d2d;
//     --shadow-color: rgba(0, 0, 0, 0.3);
//     --border-color: #444;
//     --input-border: #555;
//     --input-bg: #3d3d3d;
//     --button-bg: #3498db;
//     --button-text: #fff;
//     --hover-bg: #2980b9;
//     --link-color: #3498db;
//   }

//   .login-container {
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: var(--background-color);
//     transition: all 0.3s ease;
//     position: relative;
//     padding: 20px;
//   }

//   .theme-toggle {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     cursor: pointer;
//     color: var(--primary-color);
//     transition: transform 0.2s;
//   }

//   .theme-toggle:hover {
//     transform: scale(1.1);
//   }

//   .login-card {
//     background-color: var(--card-bg);
//     border-radius: 10px;
//     box-shadow: 0 4px 20px var(--shadow-color);
//     padding: 40px;
//     width: 100%;
//     max-width: 450px;
//     transition: all 0.3s ease;
//     border: 1px solid var(--border-color);
//   }

//   .logo-container {
//     display: flex;
//     justify-content: center;
//     margin-bottom: 20px;
//   }

//   .login-logo {
//     width: 80px;
//     height: 80px;
    
//   }

//   .login-header {
//     text-align: center;
//     margin-bottom: 30px;
//   }

//   .admin-title {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 10px;
//   }

//   .login-header h1 {
//     color: var(--primary-color);
//     margin: 0;
//     font-size: 28px;
//   }

//   .login-header p {
//     color: var(--secondary-color);
//     font-size: 14px;
//     margin-top: 8px;
//   }

//   .admin-icon {
//     color: var(--primary-color);
//     font-size: 24px;
//   }

//   .login-form {
//     display: flex;
//     flex-direction: column;
//     gap: 20px;
//   }

//   .input-group {
//     display: flex;
//     flex-direction: column;
//     gap: 8px;
//   }

//   .input-group label {
//     color: var(--text-color);
//     font-weight: 500;
//     font-size: 14px;
//   }

//   .input-wrapper {
//     position: relative;
//     display: flex;
//     align-items: center;
//   }

//   .input-icon {
//     position: absolute;
//     left: 15px;
//     color: var(--secondary-color);
//   }

//   .input-wrapper input {
//     width: 100%;
//     padding: 12px 15px 12px 45px;
//     border-radius: 6px;
//     border: 1px solid var(--input-border);
//     background-color: var(--input-bg);
//     color: var(--text-color);
//     font-size: 15px;
//     transition: border 0.3s;
//   }

//   .input-wrapper input:focus {
//     outline: none;
//     border-color: var(--primary-color);
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
//   }

//   .password-toggle {
//     position: absolute;
//     right: 15px;
//     background: none;
//     border: none;
//     cursor: pointer;
//     color: var(--secondary-color);
//     transition: color 0.2s;
//   }

//   .password-toggle:hover {
//     color: var(--primary-color);
//   }

//   .login-button {
//     background-color: var(--button-bg);
//     color: var(--button-text);
//     border: none;
//     padding: 12px;
//     border-radius: 6px;
//     font-size: 16px;
//     font-weight: 500;
//     cursor: pointer;
//     transition: background-color 0.3s;
//     margin-top: 10px;
//   }

//   .login-button:hover {
//     background-color: var(--hover-bg);
//   }

//   .login-button:disabled {
//     background-color: var(--secondary-color);
//     cursor: not-allowed;
//   }

//   .login-footer {
//     text-align: center;
//     margin-top: 20px;
//   }

//   .forgot-password {
//     color: var(--link-color);
//     text-decoration: none;
//     font-size: 14px;
//     transition: color 0.2s;
//   }

//   .forgot-password:hover {
//     text-decoration: underline;
//   }

//   .error-message {
//     color: #dc3545;
//     background-color: rgba(220, 53, 69, 0.1);
//     padding: 10px 15px;
//     border-radius: 6px;
//     font-size: 14px;
//     text-align: center;
//   }
// `;

// // Inject styles
// document.head.appendChild(document.createElement("style")).textContent = styles;
import React from 'react'

const AdminLogin = () => {
  return (
    <div>
      
    </div>
  )
}

export default AdminLogin
