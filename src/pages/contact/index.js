import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FaPhoneAlt, FaMapMarkerAlt, FaRegCalendarAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import API_URL from "../api/config";
import { PHONE, ADDRESS, MAPS_LINK } from "../../data/clinic";
import { TextField, TextAreaField, apiErrorText } from "../../components/FormKit";

const contactUrl = `${API_URL}/api/contact/`;

const initialValues = { full_name: "", email: "", phone: "", message: "", website: "" };

const validationSchema = Yup.object({
  full_name: Yup.string().trim().min(2, "Please enter your name").required("Your name is required"),
  email: Yup.string().email("Enter a valid email"),
  phone: Yup.string(),
  message: Yup.string().trim().min(10, "Please write a little more (at least 10 characters)").required("Please write your message"),
}).test("contact-way", "", function (values) {
  // Need at least one way to reply.
  if (values.email || values.phone) return true;
  return this.createError({ path: "email", message: "Add an email or a phone number so we can reply" });
});

const InfoCard = ({ icon: Icon, title, children }) => (
  <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-color/10 text-primary-color">
      <Icon size={18} />
    </div>
    <div className="min-w-0">
      <p className="eyebrow mb-1">{title}</p>
      {children}
    </div>
  </div>
);

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");
    try {
      await axios.post(contactUrl, {
        full_name: values.full_name.trim(),
        email: values.email.trim() || null,
        phone: values.phone.trim(),
        message: values.message.trim(),
        website: values.website, // hidden spam-trap box, always empty for real people
      });
      resetForm();
      setSent(true);
    } catch (err) {
      setError(
        err.response?.status === 429
          ? "You've sent several messages recently. Please call us instead, or try again later."
          : apiErrorText(err)
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Luxury Dental Clinic</title>
        <meta name="description" content="Get in touch with Luxury Dental Clinic: call us, visit us, or send a message." />
      </Head>

      <section className="border-b border-main-color/10 bg-white pb-12 pt-32">
        <div className="container mx-auto">
          <p className="eyebrow mb-4">Contact Us</p>
          <h1 className="max-w-2xl text-4xl text-main-color md:text-5xl">
            We'd love to <span className="serif-em">hear from you</span>
          </h1>
          <p className="mt-5 max-w-xl leading-relaxed text-main-color/70">
            Have a question about a treatment, or want to check something before you book? Send us a
            message or call us, and we'll get back to you.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container mx-auto grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <InfoCard icon={FaPhoneAlt} title="Call us">
              <a href={`tel:${PHONE}`} className="font-display text-2xl text-main-color no-underline hover:text-primary-color">
                {PHONE}
              </a>
            </InfoCard>

            <InfoCard icon={FaMapMarkerAlt} title="Visit us">
              <p className="mb-2 leading-relaxed text-main-color/80">{ADDRESS}</p>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary-color no-underline hover:underline"
              >
                Get directions <FaArrowRight size={10} />
              </a>
            </InfoCard>

            <InfoCard icon={FaRegCalendarAlt} title="Ready to visit?">
              <p className="mb-3 text-main-color/80">Skip the message and book your appointment online.</p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-main-color px-5 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-dark-primary-color"
              >
                Book online <FaArrowRight size={10} />
              </Link>
            </InfoCard>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            {sent ? (
              <div className="flex min-h-[22rem] flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-color/15 text-primary-color">
                  <FaCheck size={24} />
                </div>
                <h2 className="mb-2 text-3xl text-main-color">Message sent</h2>
                <p className="mb-6 max-w-sm text-main-color/70">
                  Thank you for contacting us. We'll get back to you as soon as we can.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="rounded-full border border-main-color/20 px-6 py-2.5 text-sm text-main-color transition-colors hover:bg-cream"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="mb-1 text-3xl text-main-color">Send us a message</h2>
                <p className="mb-6 text-sm text-main-color/60">Fields marked * are required.</p>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ isSubmitting }) => (
                    <Form noValidate>
                      <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                        <TextField name="full_name" label="Your name" required full autoComplete="name" />
                        <TextField name="email" label="Email" type="email" autoComplete="email" />
                        <TextField name="phone" label="Phone" type="tel" autoComplete="tel" />
                        <TextAreaField name="message" label="Your message" required rows={5} />
                        {/* Spam trap: hidden from people, bots fill it in. */}
                        <div className="hidden" aria-hidden="true">
                          <TextField name="website" label="Website" tabIndex={-1} autoComplete="off" />
                        </div>
                      </div>
                      <p className="mb-0 mt-3 text-xs text-main-color/50">
                        Please add an email or a phone number, so we can reply.
                      </p>
                      {error && (
                        <p className="mb-0 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
                          {error}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 inline-flex items-center gap-3 rounded-full bg-primary-color px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-dark-primary-color disabled:opacity-60"
                      >
                        {isSubmitting ? "Sending…" : "Send message"}
                        {!isSubmitting && <FaArrowRight size={11} />}
                      </button>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
