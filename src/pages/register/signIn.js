import React, { useEffect, useState } from "react";
import API_URL from "../api/config";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

const domain = `${API_URL}`;
const signinUrl = `${domain}/api/register/signin/`;
const logoutUrl = `${domain}/api/register/logout/`;

function signIn() {
  const [signInStatus, setSignInStatus] = useState(false);
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const router = useRouter();
  // const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };
  // console.log("signInData", signInData);
  const submitSigninForm = async (e) => {
    e.preventDefault();
    // if (signInData.username && signInData.password) {
    try {
      const contantFormData = new FormData();
      contantFormData.append("username", signInData.username);
      contantFormData.append("password", signInData.password);
      const res = await axios.post(signinUrl, contantFormData);

      console.log("Sign-in successful:", signInData);
      localStorage.setItem("Token1", `Token ${res.data.token}`);
      localStorage.setItem("UserRole", res.data.role);

      setSignInStatus(true);
      if (
        localStorage.getItem("UserRole") === "admin" ||
        localStorage.getItem("UserRole") === "doctor_profile"
      ) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Request setup error:", err.message);
      }
      // setSignInStatus("error");
    }
    // }
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
