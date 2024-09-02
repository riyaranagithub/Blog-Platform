import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authlogin } from "../store/authSlice";
import { Button, Input } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authlogin(userData));
        console.log("Logged in. User data: ", userData);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-lg p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="iniline-block w-full max-w-[100px]">logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account ? &nbsp;
          <Link
            to="/singup"
            className="font-medium text-primary-transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      <form onSubmit={handleSubmit(login)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Email: "
            placeholder="Enter your email"
            type="Email"
            {...register("email", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                  "Email address must be valid",
              },
            })}
          />
          <Input
            label="Password: "
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true,
              validate: {
                matchPatern: (value) =>
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ||
                  "Password must be valid",
              },
            })}
          />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </div>
      </form>
      </div>

    
    </div>
  );
}

export default Login;


// login:

// An asynchronous function that handles the login process.
// It clears any existing error messages with setError("").
// Uses authService.login(data) to attempt login with the provided form data.
// If successful, it retrieves the user data with authService.getCurrentUser() and dispatches the authlogin action to the Redux store.
// It then navigates to the home page ("/").
// If an error occurs, it catches the error and sets the error state to the error message.