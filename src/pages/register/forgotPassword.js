import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight, FaArrowLeft, FaEnvelopeOpenText } from "react-icons/fa";
import API_URL from "../api/config";
import AuthLayout from "../../components/AuthLayout";
import { TextField, apiErrorText } from "../../components/FormKit";

const forgotUrl = `${API_URL}/api/register/forgot-password/`;

const validationSchema = Yup.object({
  email: Yup.string().trim().email("Enter a valid email").required("Enter your email"),
});

function ForgotPassword() {
  const [sentTo, setSentTo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    setError("");
    try {
      await axios.post(forgotUrl, { email: values.email.trim() });
      setSentTo(values.email.trim());
    } catch (err) {
      setError(
        err.response?.status === 429
          ? "Too many attempts. Please wait a while and try again."
          : apiErrorText(err)
      );
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <Head>
        <title>Forgot Password | Luxury Dental Clinic</title>
      </Head>

      {sentTo ? (
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-color/15 text-primary-color">
            <FaEnvelopeOpenText size={24} />
          </div>
          <h1 className="mb-2 text-3xl text-main-color">Check your email</h1>
          <p className="mb-2 text-main-color/70">
            If an account uses <strong className="text-main-color">{sentTo}</strong>, we've sent a link to reset the
            password. It works for 1 hour.
          </p>
          <p className="mb-6 text-sm text-main-color/50">
            Nothing arrived? Check your spam folder. If you never added an email to your account, please contact the clinic.
          </p>
          <Link
            href="/register/signIn"
            className="inline-flex items-center gap-2 rounded-full bg-primary-color px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-dark-primary-color"
          >
            Back to sign in <FaArrowRight size={11} />
          </Link>
        </div>
      ) : (
        <>
          <p className="eyebrow mb-3">Password help</p>
          <h1 className="mb-2 text-4xl text-main-color">Forgot your password?</h1>
          <p className="mb-8 text-main-color/60">Enter your email and we'll send you a link to choose a new one.</p>

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form noValidate className="space-y-5">
                  <TextField name="email" label="Email" type="email" autoComplete="email" autoFocus />
                  {error && (
                    <p className="mb-0 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-primary-color py-3 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending…" : "Send reset link"}
                    {!isSubmitting && <FaArrowRight size={11} />}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link
              href="/register/signIn"
              className="inline-flex items-center gap-2 text-main-color/70 no-underline hover:text-primary-color"
            >
              <FaArrowLeft size={10} /> Back to sign in
            </Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}

export default ForgotPassword;
