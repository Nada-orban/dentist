"use client";
import React from "react";
import Link from "next/link";
import {
  FaPhoneAlt,
  FaArrowRight,
  FaTooth,
  FaUserMd,
  FaRegHeart,
  FaRegSmile,
} from "react-icons/fa";

const features = [
  {
    icon: FaTooth,
    title: "Advanced Technology",
    text: "For precise & comfortable care",
  },
  {
    icon: FaUserMd,
    title: "Experienced Team",
    text: "Skilled & caring professionals",
  },
  {
    icon: FaRegHeart,
    title: "Personalized Treatment",
    text: "Designed for your unique needs",
  },
  {
    icon: FaRegSmile,
    title: "Comfortable Environment",
    text: "Relax. We'll take care of you",
  },
];

function Landing() {
  return (
    <>
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-main-color ">
        <img
          src="/images/hero-chair.jpg"
          alt="Treatment room at Luxury Dental Clinic"
          className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-main-color/95 via-main-color/70 to-main-color/10" />

        <div className="relative z-10 container mx-auto px-6 pt-40 pb-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/80 mb-6">
            Healthy smiles · Brighter tomorrows
          </p>
          <h1 className="text-white text-4xl md:text-6xl leading-tight max-w-2xl">
            Modern Dental Care for a{" "}
            <span className="serif-em">Healthier You</span>
          </h1>
          <p className="text-white/85 mt-6 max-w-md leading-relaxed">
            Dental implants, periodontics and cosmetic dentistry. Specialized
            care, trusted results.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 bg-primary-color hover:bg-dark-primary-color text-white no-underline rounded-full px-7 py-3 text-sm font-medium transition-colors"
            >
              Book an Appointment
              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:01032946286"
              className="inline-flex items-center gap-3 text-white no-underline border border-white/50 hover:bg-white/10 rounded-full px-6 py-3 text-sm transition-colors"
            >
              <FaPhoneAlt className="text-xs" /> 01032946286
            </a>
          </div>
        </div>
      </section>

      <section className="bg-cream border-b border-main-color/10">
        <div className="container mx-auto px-6 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <Icon className="text-primary-color text-2xl mt-1 shrink-0" />
              <div>
                <p className="font-semibold text-sm mb-0">{title}</p>
                <p className="text-xs text-main-color/60 mb-0">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Landing;
