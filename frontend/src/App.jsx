import React from "react";
import axios from "axios";
import NotFound from "./pages/NotFound";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import { useEffect } from "react";
import Demo from "./Extra/Demo";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import Sidebar from "./components/Dashboard/Sidebar";
import AdminLogin from "./components/Auth/AdminLogin";
// import ViewPricingPage from "./Extra/ViewPricingPage";

const App = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <ThemeToggle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/demo" element={<Demo />} />
        {/* <Route path='/admin/dashboard' element={<AdminDashboard></AdminDashboard>}/> */}
        {/* <Route path='/pricing' element={<ViewPricingPagye/>}/> */}
        <Route path="/admin" element={<Sidebar></Sidebar>} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* <Route path='/' element={</>}/>*/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
