import React, { useState } from "react";
import Layout from "../../component/layout/Layout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        "https://ecommersebackend-pwe8.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      if (res && res.data.success) {
        toast.success("Login successful");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        localStorage.setItem("userRole", res.data.user.role);
        navigate(
          `/dashboard/${res.data.user.role === "Admin" ? "admin" : "user"}`
        );
      } else {
        toast.error(res.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google Sign-in Clicked");
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen  mt-6 mb-6">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <p className="text-gray-600 text-sm">Please enter your details</p>
          <h2 className="text-2xl font-bold mb-6">Welcome back</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Remember for 30 days
              </label>
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center border py-2 rounded-lg hover:bg-gray-100"
            >
              <img
                src="https://img.icons8.com/color/20/000000/google-logo.png"
                alt="Google Logo"
                className="mr-2"
              />
              Sign in with Google
            </button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => navigate("/register")}
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
