"use client";

import { userRegisterValidation } from "@/libs/formValidation";
import axios from "axios";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [loading, setLoading] = useState();
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: userRegisterValidation,
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("/api/register", values)
        .then(() => {
          setLoading(false);
          toast.success("Verification Email sent! Check mail box");
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoading(false);
        });
    },
  });
  return (
    <div className="lg:mt-16 md:mt-10 mt-6 mb-8 sm:max-w-[70%] max-w-[80%] lg:max-w-[40%] mx-auto md:text-lg text-sm bg-blue-200 text-black py-6 sm:px-12 px-4 rounded-3xl shadow-md shadow-black/80 outline-none">
      <h1 className=" text-2xl md:text-3xl mb-4 font-bold  mx-auto text-center">
        Register to your account
      </h1>
      <form className="text-lg" onSubmit={handleSubmit}>
        <div className="mb-3 flex flex-col">
          <label htmlFor="username" className="ml-2">
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            className="rounded-xl text-sm  text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            value={values.username}
            onChange={handleChange}
          />
          {errors.username && touched.username ? (
            <p className="text-sm ml-[10px] mt-[3px] text-red-600">
              {errors.username}
            </p>
          ) : null}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="email" className="ml-2">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            className="rounded-xl text-sm text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && touched.email ? (
            <p className="text-sm ml-[10px] mt-[3px] text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="password" className="ml-2">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            className="rounded-xl text-sm text-gray-800 py-2 px-3 shadow  shadow-black/80 outline-1 outline-red-500"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && touched.password ? (
            <p className="text-sm ml-[10px] mt-[3px] text-red-600">
              {errors.password}
            </p>
          ) : null}
        </div>
        <div className="mx-auto w-max ">
          <button
            type="submit"
            className="bg-red-500 text-blue-50 rounded-xl py-1 px-10 mt-3 hover:outline hover:outline-1 hover:outline-black hover:bg-transparent hover:text-black duration-300 transition-color ease-in-out"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
      <div className="flex justify-center  items-center text-red-600 text-sm my-3">
        <hr className="w-full bg-red-500" />
        <span className="mx-2 ">Or</span>
        <hr className="w-full" />
      </div>
      <div className="flex items-center justify-center my-1 ">
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex items-center justify-center shadow  shadow-black/80 rounded-xl hover:bg-gray-200 bg-white py-1 sm:px-4 px-2 duration-300 transition-color ease-in-out"
        >
          <FcGoogle className="sm:mr-4 mr-2" size={25} />
          Register with Google
        </button>
      </div>
      <div className=" mt-4 text-md flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <Link
            href="/pages/login  "
            className="text-red-500 hover:text-red-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
