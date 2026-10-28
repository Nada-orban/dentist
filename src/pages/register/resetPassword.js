import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaArrowRight, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import API_URL from "../api/config";
import AuthLayout from "../../components/AuthLayout";
import { PasswordField, apiErrorText } from "../../components/FormKit";

const resetUrl = `${API_URL}/api/register/reset-password/`;

const validationSchema = Yup.object({
  password: Yup.string().min(8, "At least 8 characters").required("Choose a new password"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords don't match")
    .required("Repeat your new password"),
});

const Panel = ({ icon: Icon, tone, title, children }) => (
  <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
    <div
      className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full ${
        tone === "good" ? "bg-primary-color/15 text-primary-color" : "bg-red-50 text-red-500"
      }`}
    >
      <Icon size={24} />
    </div>
    <h1 className="mb-2 text-3xl text-main-color">{title}</h1>
    {children}
  </div>
);

function ResetPassword() {
  const router = useRouter();
  const { uid, token } = router.query;
  const [done, setDone] = useState(false);
  const [linkBroken, setLinkBroken] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    setError("");
    try {
      await axios.post(resetUrl, { uid, token, password: values.password });
      setDone(true);
    } catch (err) {
      const data = err.response?.data;
      if (err.response?.status === 400 && data?.password) {
        setErrors({ password: data.password.join(" ") });
      } else if (err.response?.status === 400 && data?.error) {
        setLinkBroken(true);
      } else {
        setError(apiErrorText(err));
      }
      setSubmitting(false);
    }
  };

  const askAgain = (
    <Link
      href="/register/forgotPassword"
      className="inline-flex items-center gap-2 rounded-full bg-primary-color px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-dark-primary-color"
    >
      Get a new link <FaArrowRight size={11} />
    </Link>
  );

  let content;
  if (done) {
    content = (
      <Panel icon={FaCheck} tone="good" title="Password changed">
        <p className="mb-6 text-main-color/70">Your password has been updated. You can sign in with it now.</p>
        <Link
          href="/register/signIn"
          className="inline-flex items-center gap-2 rounded-full bg-primary-color px-7 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-dark-primary-color"
        >
          Sign in <FaArrowRight size={11} />
        </Link>
      </Panel>
    );
  } else if (router.isReady && (!uid || !token || linkBroken)) {
    content = (
      <Panel icon={FaExclamationTriangle} tone="bad" title="This link doesn't work">
        <p className="mb-6 text-main-color/70">
          The reset link is invalid or has expired. Reset links work for 1 hour and only once.
        </p>
        {askAgain}
      </Panel>
    );
  } else {
    content = (
      <>
        <p className="eyebrow mb-3">Password help</p>
        <h1 className="mb-2 text-4xl text-main-color">Choose a new password</h1>
        <p className="mb-8 text-main-color/60">Pick something you haven't used before.</p>
        <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <Formik
            initialValues={{ password: "", confirm_password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate className="space-y-5">
                <PasswordField
                  name="password"
                  label="New password"
                  autoComplete="new-password"
                  hint="At least 8 characters. Avoid common or all-number passwords."
                />
                <PasswordField name="confirm_password" label="Repeat new password" autoComplete="new-password" />
                {error && (
                  <p className="mb-0 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting || !router.isReady}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-primary-color py-3 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
                >
                  {isSubmitting ? "Saving…" : "Change password"}
                  {!isSubmitting && <FaArrowRight size={11} />}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </>
    );
  }

  return (
    <AuthLayout>
      <Head>
        <title>Reset Password | Luxury Dental Clinic</title>
      </Head>
      {content}
    </AuthLayout>
  );
}

export default ResetPassword;
