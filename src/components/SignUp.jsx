import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Input } from "./index";
import authService from "../appwrite/auth";
import {useForm } from "react-hook-form";
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
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <span className="iniline-block w-full max-w-[100px]">logo</span>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account ? &nbsp;
          <Link
            to="/login"
            className="font-medium text-primary-transition-all duration-200 hover:underline"
          >
            Sign in
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
      </div>
      <form onSubmit={handleSubmit(signup)} className="mt-8">
        <div className="space-y-5">
          <Input
            label="Name: "
            placeholder="Enter your name"
            type="text"
            {...register("name", {
              required: true,
            })}
          />
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
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{8,}$/,
                message: "Password must be valid",
              },
            })}
          />
          <Button type="submit" className="w-full">
            create account
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
