import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import API_URL from "../api/config";
import AuthLayout from "../../components/AuthLayout";
import { TextField, PasswordField, apiErrorText } from "../../components/FormKit";

const signinUrl = `${API_URL}/api/register/signin/`;

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Enter your username"),
  password: Yup.string().required("Enter your password"),
});

function SignIn() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      const res = await axios.post(signinUrl, {
        username: values.username.trim(),
        password: values.password,
      });
      localStorage.setItem("Token1", `Token ${res.data.token}`);
      localStorage.setItem("UserRole", res.data.role);
      localStorage.setItem("UserName", res.data.username);
      // Doctors and admins go to the dashboard, everyone else to the website.
      const staff = res.data.role === "admin" || res.data.role === "doctor";
      router.push(staff ? "/dashboard" : "/");
    } catch (err) {
      setError(
        err.response?.status === 400
          ? "Incorrect username or password. Please try again."
          : apiErrorText(err)
      );
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Sign In | Luxury Dental Clinic</title>
      </Head>
      <p className="eyebrow mb-3">Welcome back</p>
      <h1 className="mb-2 text-4xl text-main-color">Sign in</h1>
      <p className="mb-8 text-main-color/60">Enter your details to access your account.</p>

      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Formik initialValues={{ username: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form noValidate className="space-y-5">
              <TextField name="username" label="Username" autoComplete="username" autoFocus />
              <PasswordField name="password" label="Password" autoComplete="current-password" />
              {error && (
                <p className="mb-0 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-primary-color py-3 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
              >
                {isSubmitting ? "Signing in…" : "Sign in"}
                {!isSubmitting && <FaArrowRight size={11} />}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <p className="mt-6 text-center text-sm text-main-color/70">
        Don't have an account?{" "}
        <Link href="/register/signUp" className="font-medium text-primary-color no-underline hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignIn;
