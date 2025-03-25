import React, { useEffect, useState } from "react";
import API_URL from "../api/config";
import axios from "axios";
import Link from "next/link";

const domain = `${API_URL}`;
const signupUrl = `${domain}/api/register/signup/`;
const logoutUrl = `${domain}/api/register/logout/`;

function signUp() {
  const [signUpStatus, setSignUpStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    first_name: "",
    last_name: "",
    // age: "",
    // address: "",
    username: "",
    email: "",
    password: "",
    // confirmed_password: "",
  });

  const handleChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };
  console.log(signUpData);

  const submitSignupForm = (e) => {
    e.preventDefault();
    if (
      signUpData.username.trim() &&
      signUpData.password.trim() &&
      signUpData.first_name.trim() &&
      signUpData.last_name.trim()
    ) {
      const contantFormData = new FormData();
      contantFormData.append("username", signUpData.username);
      contantFormData.append("first_name", signUpData.first_name);
      contantFormData.append("last_name", signUpData.last_name);
      // contantFormData.append("age", signUpData.age);
      // contantFormData.append("address", signUpData.address);
      contantFormData.append("email", signUpData.email);
      contantFormData.append("password", signUpData.password);
      // contantFormData.append(
      //   "confirmed_password",
      //   signUpData.confirmed_password
      // );
      // const reloadPageAndNavigate = () => {
      //   window.location.reload();
      // };

      axios
        .post(signupUrl, contantFormData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) =>
          localStorage.setItem("Token1", `Token ${res.data.token}`)
        )
        .catch((e) => {
          console.error("Signup error", e.response?.data || e.message);
          setSignUpStatus("error");
          if (e.response && e.response.data && e.response.data.error) {
            setErrorMessage(e.response.data.error);
          } else {
            setErrorMessage("An unexpected error occurred. Please try again.");
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-40">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2>
        <p className="text-red-500">{errorMessage}</p>
        <form onSubmit={submitSignupForm} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="User name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {/* <input
            type="number"
            name="age"
            placeholder="Age"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          /> */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {/* <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          /> */}

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          {/* <input
            type="password"
            name="confirmed_password"
            placeholder="confirmed Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          /> */}
          <button
            type="submit"
            className="w-full bg-primary-color hover:bg-dark-primary-color text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          <>
            Already have an account?{" "}
            <Link
              href="/register/signIn"
              className="text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </>
        </p>
      </div>
    </div>
  );
}

export default signUp;
