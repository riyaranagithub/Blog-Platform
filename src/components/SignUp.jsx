import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const signup = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const user = await authService.getCurrentUser();
        if (user) dispatch(authService.login(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 border border-gray-200">
        <div className="text-center mb-6">
          <span className="inline-block w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl">
            Logo
          </span>
          <h2 className="text-3xl font-semibold mt-4">
            Create Your New Account
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Already have an account? &nbsp;
            <Link
              to="/login"
              className="text-blue-500 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              type="text"
              {...register("name", {
                required: "Name is required",
              })}
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
            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
