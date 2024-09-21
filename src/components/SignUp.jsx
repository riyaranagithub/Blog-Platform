import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useSelector } from "react-redux";

function SignUp() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 

  const onSubmit = async (data) => {
    setError("");
    setLoading(true);
    
    try {
      // Create account
      const userData = await authService.createAccount(data);
      console.log(userData)
  
      if (userData) {
        // Check if the user is already logged in (i.e., if a session exists)
        const currentUser = await authService.getCurrentUser();
        
        if (!currentUser) {
          // If no session exists, log in the user
          await authService.login({
            email: data.email,
            password: data.password,
          });
        }
        dispatch(login(userData))
        // Navigate to the homepage
        navigate("/");
      }
    } catch (error) {
      if (error.message.includes("session is active")) {
        setError("A session is already active.");
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <span className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
            Logo
          </span>
          <h2 className="text-3xl font-semibold mt-4">
            Create Your New Account
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{8,}$/,
                  message: "Password must be at least 8 characters long and include both letters and numbers",
                },
              })}
            />
            <Button
              type="submit"
              className={`w-full ${loading ? "bg-gray-400" : "bg-blue-600"} text-white hover:bg-blue-700`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
