import React, { useEffect, useState } from "react";
import API_URL from "../api/config";
import axios from "axios";
import Link from "next/link";

const domain = `${API_URL}`;
const signinUrl = `${domain}/register/api/signin/`;
const logoutUrl = `${domain}/register/api/logout/`;

function signIn() {
  const [signIn, setSignIn] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  };

  const submitSigninForm = () => {
    if (
      signUpData.first_name != 0 &&
      signUpData.last_name != 0 &&
      signUpData.password &&
      signUpData.confirmed_password
    ) {
      const contantFormData = new FormData();
      contantFormData.append("username", signUpData.username);
      contantFormData.append("password", signUpData.password);
      contantFormData.append(
        "confirmed_password",
        signUpData.confirmed_password
      );
      const reloadPageAndNavigate = () => {
        window.location.reload();
      };

      axios
        .post(signinUrl, contantFormData)
        .then((res) => {
          localStorage.setItem("Token", `Token ${res.data.token}`);
          reloadPageAndNavigate();
        })
        .catch((e) => {
          setSignUpStatus("error");
        });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-40">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign In
        </h2>

        <form onSubmit={submitSigninForm} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-primary-color hover:bg-dark-primary-color text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          <>
            Don't have an account?{" "}
            <Link
              href="/register/signUp"
              className="text-blue-500 hover:underline"
            >
              Sign Up
            </Link>
          </>
        </p>
      </div>
    </div>
  );
}

export default signIn;
