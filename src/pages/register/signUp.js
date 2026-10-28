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

const signupUrl = `${API_URL}/api/register/signup/`;

const initialValues = {
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().trim().required("Enter your first name"),
  last_name: Yup.string().trim().required("Enter your last name"),
  username: Yup.string()
    .trim()
    .min(3, "At least 3 characters")
    .matches(/^[\w.@+-]+$/, "Use letters, numbers and . @ + - _ only")
    .required("Choose a username"),
  email: Yup.string().email("Enter a valid email"),
  password: Yup.string().min(8, "At least 8 characters").required("Choose a password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Repeat your password"),
});

const FIELD_NAMES = Object.keys(initialValues);

function SignUp() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setError("");
    try {
      const res = await axios.post(signupUrl, {
        first_name: values.first_name.trim(),
        last_name: values.last_name.trim(),
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      // The new account is signed in straight away.
      localStorage.setItem("Token1", `Token ${res.data.token}`);
      localStorage.setItem("UserRole", res.data.role);
      localStorage.setItem("UserName", res.data.username);
      router.push("/");
    } catch (err) {
      const data = err.response?.data;
      if (err.response?.status === 400 && data && typeof data === "object" && !Array.isArray(data)) {
        // Show server messages next to the right box (e.g. "username already exists").
        const fieldErrors = {};
        Object.entries(data).forEach(([key, val]) => {
          if (FIELD_NAMES.includes(key)) fieldErrors[key] = Array.isArray(val) ? val.join(" ") : `${val}`;
        });
        if (Object.keys(fieldErrors).length) setErrors(fieldErrors);
        else setError(apiErrorText(err));
      } else {
        setError(apiErrorText(err));
      }
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Create Account | Luxury Dental Clinic</title>
      </Head>
      <p className="eyebrow mb-3">Join us</p>
      <h1 className="mb-2 text-4xl text-main-color">Create your account</h1>
      <p className="mb-8 text-main-color/60">It only takes a minute.</p>

      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form noValidate>
              <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                <TextField name="first_name" label="First name" required autoComplete="given-name" />
                <TextField name="last_name" label="Last name" required autoComplete="family-name" />
                <TextField name="username" label="Username" required full autoComplete="username" />
                <TextField name="email" label="Email" type="email" full autoComplete="email" hint="Optional" />
                <PasswordField
                  name="password"
                  label="Password"
                  required
                  full
                  autoComplete="new-password"
                  hint="At least 8 characters. Avoid common or all-number passwords."
                />
                <PasswordField name="confirm_password" label="Repeat password" required full autoComplete="new-password" />
              </div>
              {error && (
                <p className="mb-0 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-primary-color py-3 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
              >
                {isSubmitting ? "Creating account…" : "Create account"}
                {!isSubmitting && <FaArrowRight size={11} />}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <p className="mt-6 text-center text-sm text-main-color/70">
        Already have an account?{" "}
        <Link href="/register/signIn" className="font-medium text-primary-color no-underline hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default SignUp;
